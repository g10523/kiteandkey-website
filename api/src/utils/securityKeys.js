const crypto = require('crypto');
const bcrypt = require('bcrypt');
const db = require('../config/database');

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 12;

/**
 * ─────────────────────────────────────────────
 *  SECURITY KEY UTILITIES
 *  Kite & Key Academy — Account Creation Keys
 * ─────────────────────────────────────────────
 * 
 * Security keys are cryptographically random strings that must be provided
 * during account registration. Each key:
 *   - Is tied to a specific role (student, tutor, parent, admin)
 *   - Can only be used once
 *   - Is stored as a bcrypt hash (plaintext never persisted)
 *   - Has an expiry date
 *   - Can be revoked by an admin
 */

/**
 * Generate a new security key
 * Format: KK-{ROLE}-{RANDOM}  e.g. KK-STU-A3F9C1D2E4
 * Returns the plaintext key (to be given to the intended user)
 */
function generateSecurityKey(role) {
    const rolePrefix = {
        student: 'STU',
        tutor: 'TUT',
        parent: 'PAR',
        admin: 'ADM'
    }[role] || 'UNK';

    const random = crypto.randomBytes(5).toString('hex').toUpperCase();
    return `KK-${rolePrefix}-${random}`;
}

/**
 * Hash a security key for secure storage
 */
async function hashSecurityKey(plainKey) {
    return bcrypt.hash(plainKey, BCRYPT_ROUNDS);
}

/**
 * Verify a plaintext security key against a hash
 */
async function verifySecurityKey(plainKey, hash) {
    return bcrypt.compare(plainKey, hash);
}

/**
 * Create and store a new security key in the database
 * Returns { id, plaintextKey, label, role, expiresAt }
 */
async function createSecurityKey({
    role,
    label,
    createdBy = null,
    expiresInDays = 90
}) {
    const plaintextKey = generateSecurityKey(role);
    const keyHash = await hashSecurityKey(plaintextKey);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    const [record] = await db('security_keys')
        .insert({
            key_hash: keyHash,
            key_label: label,
            role,
            expires_at: expiresAt,
            created_by: createdBy
        })
        .returning('*');

    return {
        id: record.id,
        plaintextKey,
        label: record.key_label,
        role: record.role,
        expiresAt: record.expires_at,
        createdAt: record.created_at
    };
}

/**
 * Validate a security key for registration
 * Checks: exists, not used, not revoked, not expired
 * Returns { valid: boolean, error?: string, keyRecord?: object }
 */
async function validateSecurityKey(plaintextKey) {
    // Get all active, unused, non-expired keys
    const activeKeys = await db('security_keys')
        .where({ is_used: false, is_active: true })
        .where('expires_at', '>', new Date());

    if (activeKeys.length === 0) {
        return { valid: false, error: 'No valid security keys available' };
    }

    // Check the plaintext key against each hash
    for (const keyRecord of activeKeys) {
        const match = await verifySecurityKey(plaintextKey, keyRecord.key_hash);
        if (match) {
            return { valid: true, keyRecord };
        }
    }

    return { valid: false, error: 'Invalid security key' };
}

/**
 * Mark a security key as used
 */
async function consumeSecurityKey(keyId, userId, ipAddress = null) {
    await db('security_keys')
        .where({ id: keyId })
        .update({
            is_used: true,
            used_by: userId,
            used_at: new Date(),
            ip_used_from: ipAddress
        });
}

/**
 * Revoke a security key (admin action)
 */
async function revokeSecurityKey(keyId) {
    await db('security_keys')
        .where({ id: keyId })
        .update({ is_active: false });
}

/**
 * Get all security keys (for admin dashboard)
 */
async function getAllSecurityKeys() {
    const keys = await db('security_keys')
        .leftJoin('users as creator', 'security_keys.created_by', 'creator.id')
        .leftJoin('users as consumer', 'security_keys.used_by', 'consumer.id')
        .select(
            'security_keys.*',
            'creator.first_name as creator_first_name',
            'creator.last_name as creator_last_name',
            'consumer.first_name as consumer_first_name',
            'consumer.last_name as consumer_last_name',
            'consumer.email as consumer_email'
        )
        .orderBy('security_keys.created_at', 'desc');

    return keys.map(k => ({
        id: k.id,
        label: k.key_label,
        role: k.role,
        isUsed: k.is_used,
        isActive: k.is_active,
        isExpired: new Date(k.expires_at) < new Date(),
        expiresAt: k.expires_at,
        createdAt: k.created_at,
        createdBy: k.creator_first_name
            ? `${k.creator_first_name} ${k.creator_last_name}`
            : 'System',
        usedBy: k.consumer_email || null,
        usedAt: k.used_at,
        ipUsedFrom: k.ip_used_from
    }));
}

module.exports = {
    generateSecurityKey,
    hashSecurityKey,
    verifySecurityKey,
    createSecurityKey,
    validateSecurityKey,
    consumeSecurityKey,
    revokeSecurityKey,
    getAllSecurityKeys
};
