const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const { authenticate, authorize } = require('../middleware/auth');

// All content management routes require authentication + admin or tutor role
router.use(authenticate, authorize('admin', 'tutor'));

// PUT /api/admin/content/:lessonId/visibility — toggle lesson/quiz visibility
router.put('/:lessonId/visibility', contentController.updateVisibility);

// GET /api/admin/content/visibility — get all content visibility settings
router.get('/visibility', contentController.getVisibilitySettings);

// PUT /api/admin/content/:lessonId/release-date — set release date
router.put('/:lessonId/release-date', contentController.setReleaseDate);

module.exports = router;
