const db = require('../config/database');
const {
    hashPassword,
    verifyPassword,
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    getTokenExpiry
} = require('../utils/auth');

/**
 * Register new user with registration token
 */
async function register(req, res) {
    try {
        const { token, email, password, firstName, lastName, dateOfBirth, gradeLevel } = req.body;

        // Validate registration token
        const regToken = await db('registration_tokens')
            .where({ token_code: token, is_active: true })
            .where('expires_at', '>', new Date())
            .first();

        if (!regToken) {
            return res.status(400).json({ error: 'Invalid or expired registration token' });
        }

        if (regToken.used_count >= regToken.max_uses) {
            return res.status(400).json({ error: 'Registration token has been exhausted' });
        }

        // Check if email already exists
        const existingUser = await db('users').where({ email }).first();
        if (existingUser) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Create user
        const [user] = await db('users')
            .insert({
                email,
                password_hash: passwordHash,
                role: regToken.role,
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dateOfBirth,
                grade_level: gradeLevel,
                registration_token_id: regToken.id,
                is_verified: true  // Auto-verify since they used admin-generated token
            })
            .returning('*');

        // Create role-specific profile
        await createRoleProfile(user.id, regToken.role, regToken.metadata);

        // Log token usage
        await db('token_usage_logs').insert({
            token_id: regToken.id,
            used_by: user.id,
            ip_address: req.ip
        });

        // Update token usage count
        await db('registration_tokens')
            .where({ id: regToken.id })
            .increment('used_count', 1);

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
                email: user.email,
                role: user.role,
                firstName: user.first_name,
                lastName: user.last_name
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
}

/**
 * Login user
 */
async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await db('users')
            .where({ email })
            .first();

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const valid = await verifyPassword(password, user.password_hash);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if user is active
        if (!user.is_active) {
            return res.status(403).json({ error: 'Account has been deactivated' });
        }

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

module.exports = {
    register,
    login,
    refresh,
    logout
};
