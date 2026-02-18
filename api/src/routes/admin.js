const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

// All admin routes require admin role
router.use(authenticate, authorize('admin'));

// User management
router.get('/users', adminController.getUsers);
router.post('/users', validate(schemas.createUser), adminController.createUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Token management
router.post('/tokens', validate(schemas.createToken), adminController.createToken);
router.get('/tokens', adminController.getTokens);
router.delete('/tokens/:id', adminController.revokeToken);

// Analytics
router.get('/analytics/overview', adminController.getAnalytics);

module.exports = router;
