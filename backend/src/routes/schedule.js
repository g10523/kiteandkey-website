const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
    getSchedule,
    updateClass,
    requestChange,
    getChangeRequests,
    reviewChangeRequest,
} = require('../controllers/scheduleController');

// All schedule routes require authentication
router.use(authenticate);

// GET  /api/schedule            — get classes for the logged-in user
router.get('/', getSchedule);

// PUT  /api/schedule/:id        — directly update a class (tutor/admin only)
router.put('/:id', updateClass);

// POST /api/schedule/request    — request a time change
router.post('/request', requestChange);

// GET  /api/schedule/requests   — view change requests
router.get('/requests', getChangeRequests);

// PUT  /api/schedule/requests/:id/review  — approve or reject
router.put('/requests/:id/review', reviewChangeRequest);

module.exports = router;
