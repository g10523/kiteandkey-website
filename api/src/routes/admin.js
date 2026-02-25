const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

// All admin routes require admin role
router.use(authenticate, authorize('admin'));

// ═══════════════════════════════════════
//  USER MANAGEMENT
// ═══════════════════════════════════════
router.get('/users', adminController.getUsers);
router.post('/users', validate(schemas.createUser), adminController.createUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// ═══════════════════════════════════════
//  SECURITY KEY MANAGEMENT
// ═══════════════════════════════════════
router.post('/security-keys', validate(schemas.createSecurityKey), adminController.createKey);
router.get('/security-keys', adminController.getKeys);
router.delete('/security-keys/:id', adminController.revokeKey);

// ═══════════════════════════════════════
//  SECURITY EVENT LOG
// ═══════════════════════════════════════
router.get('/security-events', adminController.getSecurityEvents);

// ═══════════════════════════════════════
//  LEGACY TOKEN MANAGEMENT
// ═══════════════════════════════════════
router.post('/tokens', validate(schemas.createToken), adminController.createToken);
router.get('/tokens', adminController.getTokens);
router.delete('/tokens/:id', adminController.revokeToken);

// ═══════════════════════════════════════
//  ANALYTICS
// ═══════════════════════════════════════
router.get('/analytics/overview', adminController.getAnalytics);

module.exports = router;
