/**
 * Grading Routes — /api/grading
 */
const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const {
    submitQuiz,
    getMyAttempt,
    listSubmissions,
    getAttemptDetail,
    gradeAttempt,
} = require('../controllers/gradingController');

router.use(authenticate);

// Student endpoints
router.post('/lessons/:lessonId/submit', authorize('student'), submitQuiz);
router.get('/lessons/:lessonId/my-attempt', authorize('student', 'tutor', 'admin'), getMyAttempt);

// Tutor / Admin endpoints
router.get('/lessons/:lessonId/submissions', authorize('tutor', 'admin'), listSubmissions);
router.get('/attempts/:attemptId', authorize('tutor', 'admin', 'student'), getAttemptDetail);
router.post('/attempts/:attemptId/grade', authorize('tutor', 'admin'), gradeAttempt);

module.exports = router;
