const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate, schemas } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

// POST /api/auth/register — requires a valid security key
router.post('/register', validate(schemas.register), authController.register);

// POST /api/auth/login — brute-force protected via middleware
router.post('/login', validate(schemas.login), authController.login);

// POST /api/auth/refresh — exchange refresh token for new access token
router.post('/refresh', authController.refresh);

// POST /api/auth/logout — blacklist current token
router.post('/logout', authController.logout);

// GET /api/auth/me — validate session and return current user
router.get('/me', authenticate, authController.me);

module.exports = router;
