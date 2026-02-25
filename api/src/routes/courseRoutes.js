/**
 * Course Routes — /api/courses
 */
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
    listCourses,
    getCourse,
    toggleLessonAccess,
    toggleHomework,
} = require('../controllers/courseController');

// All routes require authentication
router.use(authenticate);

router.get('/', listCourses);
router.get('/:courseId', getCourse);
router.put('/:courseId/lessons/:lessonId/access', toggleLessonAccess);
router.put('/:courseId/lessons/:lessonId/homework', toggleHomework);

module.exports = router;
