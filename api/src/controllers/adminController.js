const db = require('../config/database');
const { hashPassword, generateTokenCode, getTokenExpiry } = require('../utils/auth');

/**
 * Get all users with pagination and filtering
 */
async function getUsers(req, res) {
    try {
        const { role, isActive, page = 1, limit = 50 } = req.query;

        let query = db('users').select(
            'users.*',
            db.raw('COALESCE(student_profiles.enrolled_subjects, tutor_profiles.subjects_teaching) as subjects')
        )
            .leftJoin('student_profiles', 'users.id', 'student_profiles.user_id')
            .leftJoin('tutor_profiles', 'users.id', 'tutor_profiles.user_id');

        if (role) {
            query = query.where('users.role', role);
        }

        if (isActive !== undefined) {
            query = query.where('users.is_active', isActive === 'true');
        }

        const offset = (parseInt(page) - 1) * parseInt(limit);
        const users = await query.limit(parseInt(limit)).offset(offset);

        const total = await db('users').count('* as count').first();

        res.json({
            users: users.map(u => ({
                id: u.id,
                email: u.email,
                role: u.role,
                firstName: u.first_name,
                lastName: u.last_name,
                phone: u.phone,
                dateOfBirth: u.date_of_birth,
                gradeLevel: u.grade_level,
                isActive: u.is_active,
                isVerified: u.is_verified,
                createdAt: u.created_at,
                last Login: u.last_login,
                subjects: u.subjects
            })),
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: parseInt(total.count)
            }
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

/**
 * Create new user (admin bypass of token system)
 */
async function createUser(req, res) {
    try {
        const {
            email, firstName, lastName, role, password,
            phone, dateOfBirth, gradeLevel, enrolledSubjects, parentId
        } = req.body;

        // Check if email exists
        const existing = await db('users').where({ email }).first();
        if (existing) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        // Generate random password if not provided
        const finalPassword = password || Math.random().toString(36).slice(-12);
        const passwordHash = await hashPassword(finalPassword);

        // Create user
        const [user] = await db('users')
            .insert({
                email,
                password_hash: passwordHash,
                role,
                first_name: firstName,
                last_name: lastName,
                phone,
                date_of_birth: dateOfBirth,
                grade_level: gradeLevel,
                created_by: req.user.id,
                is_verified: true
            })
            .returning('*');

        // Create role profile
        const metadata = { enrolledSubjects, parentId };
        await createRoleProfile(user.id, role, metadata);

        res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                firstName: user.first_name,
                lastName: user.last_name,
                temporaryPassword: password ? undefined : finalPassword
            }
        });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
}

/**
 * Update user
 */
async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Remove sensitive fields
        delete updates.password_hash;
        delete updates.id;

        // Map frontend field names to database columns
        const dbUpdates = {};
        if (updates.firstName) dbUpdates.first_name = updates.firstName;
        if (updates.lastName) dbUpdates.last_name = updates.lastName;
        if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
        if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;
        if (updates.gradeLevel) dbUpdates.grade_level = updates.gradeLevel;

        dbUpdates.updated_at = new Date();

        const [user] = await db('users')
            .where({ id })
            .update(dbUpdates)
            .returning('*');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                firstName: user.first_name,
                lastName: user.last_name,
                isActive: user.is_active
            }
        });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
}

/**
 * Delete user (soft delete)
 */
async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        await db('users')
            .where({ id })
            .update({
                is_active: false,
                updated_at: new Date()
            });

        res.json({ message: 'User deactivated successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
}

/**
 * Create registration token
 */
async function createToken(req, res) {
    try {
        const { role, maxUses, expiresInDays, metadata } = req.body;

        const tokenCode = generateTokenCode(role);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + expiresInDays);

        const [token] = await db('registration_tokens')
            .insert({
                token_code: tokenCode,
                role,
                created_by: req.user.id,
                expires_at: expiresAt,
                max_uses: maxUses,
                metadata
            })
            .returning('*');

        res.status(201).json({
            tokenCode: token.token_code,
            role: token.role,
            maxUses: token.max_uses,
            expiresAt: token.expires_at,
            createdAt: token.created_at
        });
    } catch (error) {
        console.error('Create token error:', error);
        res.status(500).json({ error: 'Failed to create token' });
    }
}

/**
 * Get all registration tokens
 */
async function getTokens(req, res) {
    try {
        const tokens = await db('registration_tokens')
            .select(
                'registration_tokens.*',
                'users.first_name as creator_first_name',
                'users.last_name as creator_last_name'
            )
            .leftJoin('users', 'registration_tokens.created_by', 'users.id')
            .orderBy('created_at', 'desc');

        res.json({
            tokens: tokens.map(t => ({
                id: t.id,
                tokenCode: t.token_code,
                role: t.role,
                createdBy: `${t.creator_first_name} ${t.creator_last_name}`,
                createdAt: t.created_at,
                expiresAt: t.expires_at,
                maxUses: t.max_uses,
                usedCount: t.used_count,
                isActive: t.is_active,
                isExpired: new Date(t.expires_at) < new Date(),
                metadata: t.metadata
            }))
        });
    } catch (error) {
        console.error('Get tokens error:', error);
        res.status(500).json({ error: 'Failed to fetch tokens' });
    }
}

/**
 * Revoke registration token
 */
async function revokeToken(req, res) {
    try {
        const { id } = req.params;

        await db('registration_tokens')
            .where({ id })
            .update({ is_active: false });

        res.json({ message: 'Token revoked successfully' });
    } catch (error) {
        console.error('Revoke token error:', error);
        res.status(500).json({ error: 'Failed to revoke token' });
    }
}

/**
 * Get analytics overview
 */
async function getAnalytics(req, res) {
    try {
        const totalStudents = await db('users')
            .where({ role: 'student', is_active: true })
            .count('* as count')
            .first();

        const activeInterventions = await db('assigned_interventions')
            .where({ status: 'active' })
            .count('* as count')
            .first();

        const assessmentsThisMonth = await db('assessments')
            .where('created_at', '>=', new Date(new Date().setDate(1)))
            .count('* as count')
            .first();

        // Calculate average fidelity
        const fidelityData = await db('session_logs')
            .join('assigned_interventions', 'session_logs.intervention_id', 'assigned_interventions.id')
            .join('intervention_protocols', 'assigned_interventions.protocol_id', 'intervention_protocols.id')
            .select('session_logs.protocol_steps_completed', 'intervention_protocols.implementation');

        let avgFidelity = 0;
        if (fidelityData.length > 0) {
            const fidelityScores = fidelityData.map(log => {
                const totalSteps = log.implementation.sessionStructure?.length || 1;
                const completedSteps = log.protocol_steps_completed?.length || 0;
                return (completedSteps / totalSteps) * 100;
            });
            avgFidelity = fidelityScores.reduce((a, b) => a + b, 0) / fidelityScores.length;
        }

        res.json({
            totalStudents: parseInt(totalStudents.count),
            activeInterventions: parseInt(activeInterventions.count),
            avgFidelityScore: Math.round(avgFidelity),
            assessmentsThisMonth: parseInt(assessmentsThisMonth.count)
        });
    } catch (error) {
        console.error('Get analytics error:', error);
        res.status(500).json({ error: 'Failed to fetch analytics' });
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
                subjects_teaching: metadata.subjectsTeaching || []
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
                user_id: userId
            });
            break;
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    createToken,
    getTokens,
    revokeToken,
    getAnalytics
};
