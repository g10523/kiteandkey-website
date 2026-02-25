const db = require('../config/database');

/**
 * POST /api/quizzes/:quizId/attempts
 * Submit answers for server-side grading.
 * Prevents answer key leaking to the frontend.
 */
async function submitAttempt(req, res) {
    try {
        const { quizId } = req.params;
        const { answers, timeSpent } = req.body;
        const studentId = req.user.id;

        // Get quiz with answer key from database
        const quiz = await db('quizzes')
            .where({ id: quizId })
            .first();

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        // Check attempt limits
        const previousAttempts = await db('quiz_attempts')
            .where({ quiz_id: quizId, student_id: studentId })
            .count('* as count')
            .first();

        const attemptCount = parseInt(previousAttempts.count);
        const maxAttempts = quiz.max_attempts;

        if (maxAttempts && attemptCount >= maxAttempts) {
            return res.status(403).json({
                error: 'Maximum attempts reached',
                maxAttempts,
                attemptCount,
            });
        }

        // Grade the quiz server-side
        const questions = typeof quiz.questions === 'string'
            ? JSON.parse(quiz.questions) : quiz.questions;
        const answerKey = typeof quiz.answer_key === 'string'
            ? JSON.parse(quiz.answer_key) : quiz.answer_key;

        let correctCount = 0;
        const gradedQuestions = questions.map((q, idx) => {
            const studentAnswer = answers[q.id] || answers[idx];
            const correctAnswer = answerKey[q.id] || answerKey[idx];

            let isCorrect = false;
            if (q.type === 'short_answer' || q.type === 'short-answer') {
                // Fuzzy match for short answers
                isCorrect = studentAnswer &&
                    studentAnswer.toLowerCase().trim() === correctAnswer?.toLowerCase().trim();
            } else {
                isCorrect = studentAnswer === correctAnswer;
            }

            if (isCorrect) correctCount++;

            return {
                questionId: q.id,
                studentAnswer,
                correctAnswer,
                isCorrect,
                explanation: q.explanation || null,
                points: isCorrect ? (q.points || 1) : 0,
            };
        });

        const totalPoints = questions.reduce((sum, q) => sum + (q.points || 1), 0);
        const earnedPoints = gradedQuestions.reduce((sum, g) => sum + g.points, 0);
        const score = Math.round((earnedPoints / totalPoints) * 100);
        const passed = score >= (quiz.passing_score || 70);

        // Save attempt
        const [attempt] = await db('quiz_attempts')
            .insert({
                quiz_id: quizId,
                student_id: studentId,
                answers: JSON.stringify(answers),
                graded_results: JSON.stringify(gradedQuestions),
                score,
                passed,
                time_spent: timeSpent,
                attempt_number: attemptCount + 1,
            })
            .returning('*');

        res.status(201).json({
            attempt: {
                id: attempt.id,
                score,
                passed,
                attemptNumber: attempt.attempt_number,
                maxAttempts,
                gradedQuestions,
                timeSpent,
                completedAt: attempt.created_at,
            },
        });
    } catch (error) {
        console.error('Submit quiz attempt error:', error);
        res.status(500).json({ error: 'Failed to submit quiz attempt' });
    }
}

/**
 * GET /api/quizzes/:quizId/attempts
 * Get all attempts for a student on a quiz
 */
async function getAttempts(req, res) {
    try {
        const { quizId } = req.params;
        const studentId = req.query.studentId || req.user.id;

        // Students can only see their own attempts
        if (req.user.role === 'student' && studentId !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const attempts = await db('quiz_attempts')
            .where({ quiz_id: quizId, student_id: studentId })
            .orderBy('created_at', 'desc');

        res.json({
            attempts: attempts.map(a => ({
                id: a.id,
                score: a.score,
                passed: a.passed,
                attemptNumber: a.attempt_number,
                timeSpent: a.time_spent,
                completedAt: a.created_at,
            })),
        });
    } catch (error) {
        console.error('Get quiz attempts error:', error);
        res.status(500).json({ error: 'Failed to get quiz attempts' });
    }
}

/**
 * GET /api/quizzes/:quizId/best
 * Get best score for a student on a quiz
 */
async function getBestScore(req, res) {
    try {
        const { quizId } = req.params;
        const studentId = req.query.studentId || req.user.id;

        const best = await db('quiz_attempts')
            .where({ quiz_id: quizId, student_id: studentId })
            .max('score as best_score')
            .first();

        res.json({
            bestScore: best?.best_score || null,
            quizId,
            studentId,
        });
    } catch (error) {
        console.error('Get best score error:', error);
        res.status(500).json({ error: 'Failed to get best score' });
    }
}

/**
 * POST /api/quizzes
 * Create a new quiz (admin/tutor)
 */
async function createQuiz(req, res) {
    try {
        const { lessonId, title, description, questions, answerKey, timeLimit, passingScore, maxAttempts } = req.body;

        const [quiz] = await db('quizzes')
            .insert({
                lesson_id: lessonId,
                title,
                description,
                questions: JSON.stringify(questions),
                answer_key: JSON.stringify(answerKey),
                time_limit: timeLimit,
                passing_score: passingScore || 70,
                max_attempts: maxAttempts,
                created_by: req.user.id,
            })
            .returning('*');

        res.status(201).json({
            quiz: {
                id: quiz.id,
                lessonId: quiz.lesson_id,
                title: quiz.title,
                description: quiz.description,
                timeLimit: quiz.time_limit,
                passingScore: quiz.passing_score,
                maxAttempts: quiz.max_attempts,
            },
        });
    } catch (error) {
        console.error('Create quiz error:', error);
        res.status(500).json({ error: 'Failed to create quiz' });
    }
}

module.exports = {
    submitAttempt,
    getAttempts,
    getBestScore,
    createQuiz,
};
