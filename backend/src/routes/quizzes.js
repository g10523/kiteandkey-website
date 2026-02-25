const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { authenticate, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// POST /api/quizzes/:quizId/attempts — submit quiz answers for server-side grading
router.post('/:quizId/attempts', quizController.submitAttempt);

// GET /api/quizzes/:quizId/attempts — get attempts for a quiz
router.get('/:quizId/attempts', quizController.getAttempts);

// GET /api/quizzes/:quizId/best — get best score for a student on a quiz
router.get('/:quizId/best', quizController.getBestScore);

// POST /api/quizzes — create quiz (admin/tutor only)
router.post('/',
    authorize('tutor', 'admin'),
    quizController.createQuiz
);

module.exports = router;
