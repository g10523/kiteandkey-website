const express = require('express');
const router = express.Router();
const mindprintController = require('../controllers/mindprintController');
const { authenticate, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// Get student's profile
router.get('/:studentId', mindprintController.getProfile);

// Get historical trends
router.get('/:studentId/trends', mindprintController.getTrends);

// Recalculate profile (admin only)
router.post('/:studentId/recalculate',
    authorize('admin'),
    mindprintController.recalculateProfile
);

module.exports = router;
