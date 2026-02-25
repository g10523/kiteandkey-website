const db = require('../config/database');

/**
 * ─────────────────────────────────────────────
 *  SECURITY MIDDLEWARE
 *  Kite & Key Academy — Backend Security Layer
 * ─────────────────────────────────────────────
 */

const LOCKOUT_THRESHOLD = 5;        // failed attempts before lockout
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Log a security event to the security_events table
 */
async function logSecurityEvent({
    eventType,
    userId = null,
    email = null,
    req = null,
    metadata = {},
    severity = 'info'
}) {
    try {
        await db('security_events').insert({
            event_type: eventType,
            user_id: userId,
            email,
            ip_address: req ? (req.ip || req.connection?.remoteAddress) : null,
            user_agent: req ? req.headers['user-agent'] : null,
            metadata: JSON.stringify(metadata),
            severity
        });
    } catch (err) {
        // Never let logging failures crash the request
        console.error('Failed to log security event:', err.message);
    }
}

/**
 * Record a login attempt (success or failure) for brute-force tracking
 */
async function recordLoginAttempt(email, ip, success) {
    try {
        await db('login_attempts').insert({
            email,
            ip_address: ip,
            success
        });
    } catch (err) {
        console.error('Failed to record login attempt:', err.message);
    }
}

/**
 * Check if an email or IP is currently locked out due to too many failed attempts
 * Returns { locked: boolean, remainingMs: number }
 */
async function checkLockout(email, ip) {
    try {
        const windowStart = new Date(Date.now() - LOCKOUT_WINDOW_MS);

        // Count recent failures for this email
        const emailAttempts = await db('login_attempts')
            .where({ email, success: false })
            .where('attempted_at', '>=', windowStart)
            .count('* as count')
            .first();

        // Count recent failures for this IP
        const ipAttempts = await db('login_attempts')
            .where({ ip_address: ip, success: false })
            .where('attempted_at', '>=', windowStart)
            .count('* as count')
            .first();

        const emailCount = parseInt(emailAttempts.count);
        const ipCount = parseInt(ipAttempts.count);

        if (emailCount >= LOCKOUT_THRESHOLD || ipCount >= LOCKOUT_THRESHOLD) {
            // Find the oldest relevant attempt to calculate remaining lockout time
            const oldestRelevant = await db('login_attempts')
                .where(function () {
                    this.where({ email, success: false })
                        .orWhere({ ip_address: ip, success: false });
                })
                .where('attempted_at', '>=', windowStart)
                .orderBy('attempted_at', 'asc')
                .first();

            const remainingMs = oldestRelevant
                ? LOCKOUT_WINDOW_MS - (Date.now() - new Date(oldestRelevant.attempted_at).getTime())
                : LOCKOUT_WINDOW_MS;

            return { locked: true, remainingMs: Math.max(0, remainingMs) };
        }

        return { locked: false, remainingMs: 0 };
    } catch (err) {
        console.error('Lockout check failed:', err.message);
        return { locked: false, remainingMs: 0 }; // Fail open
    }
}

/**
 * Middleware: Sanitise request body strings (strip dangerous characters)
 */
function sanitiseRequestBody(req, res, next) {
    if (req.body && typeof req.body === 'object') {
        sanitiseObject(req.body);
    }
    next();
}

function sanitiseObject(obj) {
    for (const key of Object.keys(obj)) {
        if (typeof obj[key] === 'string') {
            // Remove null bytes and other control characters (except newlines/tabs)
            obj[key] = obj[key].replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            sanitiseObject(obj[key]);
        }
    }
}

/**
 * Middleware: Add extra security headers beyond what Helmet provides
 */
function extraSecurityHeaders(req, res, next) {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '0'); // Modern browsers: CSP replaces this
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    next();
}

/**
 * Middleware: Validate Content-Type on POST/PUT/PATCH requests
 */
function validateContentType(req, res, next) {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        const contentType = req.headers['content-type'];
        if (contentType && !contentType.includes('application/json') && !contentType.includes('multipart/form-data')) {
            return res.status(415).json({ error: 'Unsupported Media Type. Use application/json.' });
        }
    }
    next();
}

/**
 * Middleware: Log all authentication-related requests for audit
 */
function auditAuthRequests(req, res, next) {
    if (req.path.startsWith('/api/auth') || req.path.startsWith('/api/admin')) {
        const originalSend = res.send;
        res.send = function (body) {
            // Log after response is determined
            const statusCode = res.statusCode;
            if (statusCode >= 400) {
                logSecurityEvent({
                    eventType: `HTTP_${statusCode}`,
                    req,
                    metadata: {
                        path: req.path,
                        method: req.method,
                        statusCode
                    },
                    severity: statusCode >= 500 ? 'critical' : 'warning'
                });
            }
            originalSend.call(this, body);
        };
    }
    next();
}

module.exports = {
    logSecurityEvent,
    recordLoginAttempt,
    checkLockout,
    sanitiseRequestBody,
    extraSecurityHeaders,
    validateContentType,
    auditAuthRequests,
    LOCKOUT_THRESHOLD,
    LOCKOUT_WINDOW_MS
};
