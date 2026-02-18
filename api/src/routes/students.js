const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticate, authorizeOwnership } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// GET /api/students/:id/dashboard — composite dashboard payload
router.get('/:id/dashboard',
    authorizeOwnership(req => req.params.id),
    studentController.getDashboard
);

// POST /api/students/migrate-data — Import legacy localStorage data
router.post('/migrate-data', studentController.migrateData);

module.exports = router;
