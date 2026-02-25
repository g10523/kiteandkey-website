const db = require('../config/database');
const {
    hashPassword,
    verifyPassword,
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    getTokenExpiry
} = require('../utils/auth');
const {
    validateSecurityKey,
    consumeSecurityKey
} = require('../utils/securityKeys');
const {
    logSecurityEvent,
    recordLoginAttempt,
    checkLockout
} = require('../middleware/security');

/**
 * Register new user with security key
 * 
 * The security key system replaces the old token system. Each key:
 * - Is tied to a specific role
 * - Can only be used once
 * - Must not be expired or revoked
 */
async function register(req, res) {
    try {
        const { securityKey, token, username, email, password, firstName, lastName, dateOfBirth, gradeLevel } = req.body;

        // Determine which key to use — support both 'securityKey' and legacy 'token' field
        const keyToValidate = securityKey || token;

        if (!keyToValidate) {
            return res.status(400).json({ error: 'Security key is required for registration' });
        }

        // ─── First try the new security_keys system ───
        let useSecurityKey = false;
        let keyResult = null;

        try {
            // Check if security_keys table exists
            const tableExists = await db.schema.hasTable('security_keys');
            if (tableExists) {
                keyResult = await validateSecurityKey(keyToValidate);
                if (keyResult.valid) {
                    useSecurityKey = true;
                }
            }
        } catch (err) {
            // Table doesn't exist yet, fall through to legacy tokens
            console.log('Security keys table not available, falling back to registration tokens');
        }

        let assignedRole;

        if (useSecurityKey) {
            // ── New security key path ──
            assignedRole = keyResult.keyRecord.role;

            // Log the key validation
            await logSecurityEvent({
                eventType: 'SECURITY_KEY_VALIDATED',
                email,
                req,
                metadata: { keyId: keyResult.keyRecord.id, role: assignedRole },
                severity: 'info'
            });
        } else {
            // ── Legacy registration token path ──
            const regToken = await db('registration_tokens')
                .where({ token_code: keyToValidate, is_active: true })
                .where('expires_at', '>', new Date())
                .first();

            if (!regToken) {
                await logSecurityEvent({
                    eventType: 'REGISTRATION_FAILED',
                    email,
                    req,
                    metadata: { reason: 'Invalid or expired key/token' },
                    severity: 'warning'
                });
                return res.status(400).json({ error: 'Invalid or expired security key' });
            }

            if (regToken.used_count >= regToken.max_uses) {
                return res.status(400).json({ error: 'Security key has been exhausted' });
            }

            assignedRole = regToken.role;
        }

        // Check if username already exists
        if (username) {
            const existingUsername = await db('users').where({ username }).first();
            if (existingUsername) {
                return res.status(409).json({ error: 'Username already taken' });
            }
        }

        // Check if email already exists (if provided)
        if (email) {
            const existingUser = await db('users').where({ email }).first();
            if (existingUser) {
                await logSecurityEvent({
                    eventType: 'REGISTRATION_FAILED',
                    email: username || email,
                    req,
                    metadata: { reason: 'Email already registered' },
                    severity: 'warning'
                });
                return res.status(409).json({ error: 'Email already registered' });
            }
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Create user
        const [user] = await db('users')
            .insert({
                username: username || email,
                email: email || `${(username || '').toLowerCase()}@kiteandkey.academy`,
                password_hash: passwordHash,
                role: assignedRole,
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dateOfBirth,
                grade_level: gradeLevel,
                is_verified: true  // Auto-verify since they used a security key
            })
            .returning('*');

        // Create role-specific profile
        await createRoleProfile(user.id, assignedRole, {});

        if (useSecurityKey) {
            // Consume the security key (mark as used)
            await consumeSecurityKey(
                keyResult.keyRecord.id,
                user.id,
                req.ip || req.connection?.remoteAddress
            );

            await logSecurityEvent({
                eventType: 'SECURITY_KEY_CONSUMED',
                userId: user.id,
                email,
                req,
                metadata: { keyId: keyResult.keyRecord.id, role: assignedRole },
                severity: 'info'
            });
        } else {
            // Legacy token path — update usage
            const regToken = await db('registration_tokens')
                .where({ token_code: keyToValidate })
                .first();

            await db('token_usage_logs').insert({
                token_id: regToken.id,
                used_by: user.id,
                ip_address: req.ip
            });

            await db('registration_tokens')
                .where({ id: regToken.id })
                .increment('used_count', 1);
        }

        // Log successful registration
        await logSecurityEvent({
            eventType: 'REGISTRATION_SUCCESS',
            userId: user.id,
            email,
            req,
            metadata: { role: assignedRole },
            severity: 'info'
        });

        // Generate JWT tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Set refresh token in httpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(201).json({
            accessToken,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                firstName: user.first_name,
                lastName: user.last_name
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        await logSecurityEvent({
            eventType: 'REGISTRATION_ERROR',
            req,
            metadata: { error: error.message },
            severity: 'critical'
        });
        res.status(500).json({ error: 'Registration failed' });
    }
}

/**
 * Login user — with brute-force protection
 */
async function login(req, res) {
    try {
        const { username, password } = req.body;
        const clientIp = req.ip || req.connection?.remoteAddress;

        // ─── Check lockout before anything else ───
        try {
            const lockout = await checkLockout(username, clientIp);
            if (lockout.locked) {
                const minutesRemaining = Math.ceil(lockout.remainingMs / 60000);
                await logSecurityEvent({
                    eventType: 'LOGIN_LOCKED_OUT',
                    email: username,
                    req,
                    metadata: { minutesRemaining },
                    severity: 'warning'
                });
                return res.status(429).json({
                    error: `Account temporarily locked. Try again in ${minutesRemaining} minute(s).`
                });
            }
        } catch (err) {
            // If lockout check fails (e.g. table doesn't exist yet), proceed with login
            console.log('Lockout check skipped:', err.message);
        }

        // Find user by username
        const user = await db('users')
            .where({ username })
            .first();

        if (!user) {
            await recordLoginAttempt(username, clientIp, false).catch(() => { });
            await logSecurityEvent({
                eventType: 'LOGIN_FAILED',
                email: username,
                req,
                metadata: { reason: 'User not found' },
                severity: 'warning'
            }).catch(() => { });
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const valid = await verifyPassword(password, user.password_hash);
        if (!valid) {
            await recordLoginAttempt(username, clientIp, false).catch(() => { });
            await logSecurityEvent({
                eventType: 'LOGIN_FAILED',
                userId: user.id,
                email: username,
                req,
                metadata: { reason: 'Invalid password' },
                severity: 'warning'
            }).catch(() => { });
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if user is active
        if (!user.is_active) {
            await logSecurityEvent({
                eventType: 'LOGIN_INACTIVE_ACCOUNT',
                userId: user.id,
                email: username,
                req,
                severity: 'warning'
            }).catch(() => { });
            return res.status(403).json({ error: 'Account has been deactivated' });
        }

        // Record successful login
        await recordLoginAttempt(username, clientIp, true).catch(() => { });
        await logSecurityEvent({
            eventType: 'LOGIN_SUCCESS',
            userId: user.id,
            email: username,
            req,
            severity: 'info'
        }).catch(() => { });

        // Update last login
        await db('users')
            .where({ id: user.id })
            .update({ last_login: new Date() });

        // Check if MindPrint exists (for students)
        let mindPrintComplete = false;
        if (user.role === 'student') {
            const profile = await db('mindprint_profiles')
                .where({ student_id: user.id })
                .first();
            mindPrintComplete = !!profile;
        }

        // Generate JWT tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Set refresh token in httpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({
            accessToken,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                firstName: user.first_name,
                lastName: user.last_name,
                mindPrintComplete
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
}

/**
 * Refresh access token
 */
async function refresh(req, res) {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({ error: 'No refresh token provided' });
        }

        // Verify refresh token
        const decoded = verifyToken(refreshToken);

        if (!decoded || decoded.type !== 'refresh') {
            return res.status(401).json({ error: 'Invalid refresh token' });
        }

        // Get user
        const user = await db('users')
            .where({ id: decoded.id })
            .first();

        if (!user || !user.is_active) {
            return res.status(401).json({ error: 'User not found or inactive' });
        }

        // Generate new access token
        const accessToken = generateAccessToken(user);

        res.json({ accessToken });
    } catch (error) {
        console.error('Refresh error:', error);
        res.status(401).json({ error: 'Token refresh failed' });
    }
}

/**
 * Logout user
 */
async function logout(req, res) {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            const decoded = verifyToken(token);

            if (decoded) {
                // Add token to blacklist
                await db('token_blacklist').insert({
                    token,
                    expires_at: new Date(decoded.exp * 1000)
                });

                await logSecurityEvent({
                    eventType: 'LOGOUT',
                    userId: decoded.id,
                    req,
                    severity: 'info'
                }).catch(() => { });
            }
        }

        // Clear refresh cookie
        res.clearCookie('refreshToken');

        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Logout failed' });
    }
}

/**
 * Helper: Create role-specific profile
 */
async function createRoleProfile(userId, role, metadata = {}) {
    switch (role) {
        case 'student':
            await db('student_profiles').insert({
                user_id: userId,
                enrolled_subjects: metadata.enrolledSubjects || [],
                parent_id: metadata.parentId || null
            });
            break;

        case 'tutor':
            await db('tutor_profiles').insert({
                user_id: userId,
                subjects_teaching: metadata.subjectsTeaching || [],
                max_students: metadata.maxStudents || 20
            });
            break;

        case 'parent':
            await db('parent_profiles').insert({
                user_id: userId,
                child_ids: []
            });
            break;

        case 'admin':
            await db('admin_profiles').insert({
                user_id: userId,
                can_create_tokens: metadata.canCreateTokens || false,
                can_manage_users: metadata.canManageUsers !== false,
                can_view_analytics: metadata.canViewAnalytics !== false
            });
            break;
    }
}

/**
 * Get current authenticated user
 */
async function me(req, res) {
    res.json({ user: req.user });
}

module.exports = {
    register,
    login,
    refresh,
    logout,
    me
};
