const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 12;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY || '15m';
const JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || '7d';

/**
 * Hash password using bcrypt
 */
async function hashPassword(password) {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
}

/**
 * Verify password against hash
 */
async function verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
}

/**
 * Generate JWT access token
 */
function generateAccessToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
        type: 'access'
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_ACCESS_EXPIRY });
}

/**
 * Generate JWT refresh token
 */
function generateRefreshToken(user) {
    const payload = {
        id: user.id,
        type: 'refresh'
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRY });
}

/**
 * Verify JWT token
 */
function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

/**
 * Generate registration token code
 */
function generateTokenCode(role) {
    const prefix = 'K&K';
    const roleCode = role.substring(0, 3).toUpperCase();
    const random = crypto.randomBytes(3).toString('hex').toUpperCase();
    return `${prefix}-${roleCode}-${random}`;
}

/**
 * Generate password reset token
 */
function generateResetToken() {
    return crypto.randomBytes(32).toString('hex');
}

/**
 * Get token expiry time from duration string
 */
function getTokenExpiry(duration = '15m') {
    const match = duration.match(/^(\d+)([smhd])$/);
    if (!match) throw new Error('Invalid duration format');

    const value = parseInt(match[1]);
    const unit = match[2];

    const now = new Date();
    switch (unit) {
        case 's': return new Date(now.getTime() + value * 1000);
        case 'm': return new Date(now.getTime() + value * 60 * 1000);
        case 'h': return new Date(now.getTime() + value * 60 * 60 * 1000);
        case 'd': return new Date(now.getTime() + value * 24 * 60 * 60 * 1000);
        default: throw new Error('Invalid time unit');
    }
}

module.exports = {
    hashPassword,
    verifyPassword,
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    generateTokenCode,
    generateResetToken,
    getTokenExpiry
};
