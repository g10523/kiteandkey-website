const { verifyToken } = require('../utils/auth');
const db = require('../config/database');

/**
 * Authenticate JWT token from request
 */
async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.substring(7);

        // Check if token is blacklisted
        const blacklisted = await db('token_blacklist')
            .where({ token })
            .where('expires_at', '>', new Date())
            .first();

        if (blacklisted) {
            return res.status(401).json({ error: 'Token has been revoked' });
        }

        // Verify token
        const decoded = verifyToken(token);

        if (!decoded || decoded.type !== 'access') {
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Get user from database
        const user = await db('users')
            .where({ id: decoded.id })
            .first();

        if (!user || !user.is_active) {
            return res.status(401).json({ error: 'User not found or inactive' });
        }

        // Attach user to request
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.first_name,
            lastName: user.last_name
        };

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ error: 'Authentication failed' });
    }
}

/**
 * Authorize specific roles
 */
function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }

        next();
    };
}

/**
 * Check if user owns resource or is admin
 */
function authorizeOwnership(getUserIdFromRequest) {
    return (req, res, next) => {
        const resourceUserId = getUserIdFromRequest(req);

        if (req.user.role === 'admin' || req.user.id === resourceUserId) {
            return next();
        }

        // Tutors can access their assigned students
        if (req.user.role === 'tutor') {
            // This would need to check the tutor_profiles.assigned_student_ids
            // Implementation depends on specific endpoint
            return next();
        }

        res.status(403).json({ error: 'Access denied' });
    };
}

module.exports = {
    authenticate,
    authorize,
    authorizeOwnership
};
