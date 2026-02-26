/**
 * Grading Controller
 * Endpoints for:
 *   - Students submitting quiz answers
 *   - Tutors viewing submissions & grading them
 */

const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// ─────────────────────────────────────────────
// STUDENT: Submit quiz answers
// POST /api/grading/lessons/:lessonId/submit
// ─────────────────────────────────────────────
async function submitQuiz(req, res) {
    try {
        const { lessonId } = req.params;
        const studentId = req.user.id;
        const { answers } = req.body;

        if (!answers || typeof answers !== 'object') {
            return res.status(400).json({ error: 'answers object is required' });
        }

        // Verify lesson exists
        const lesson = await db('lessons').where('id', lessonId).first();
        if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

        // Calculate auto-score for MC questions
        const questions = typeof lesson.quiz_questions === 'string'
            ? JSON.parse(lesson.quiz_questions)
            : lesson.quiz_questions || [];

        let autoScore = 0;
        questions.forEach(q => {
            if (q.type === 'multiple_choice' && q.correctIndex !== undefined) {
                const key = `mc_${q.number}`;
                if (answers[key] === q.correctIndex) {
                    autoScore += q.marks;
                }
            }
        });

        // Upsert quiz attempt (one attempt per student per lesson)
        const existing = await db('quiz_attempts')
            .where({ lesson_id: lessonId, student_id: studentId })
            .first();

        if (existing) {
            await db('quiz_attempts').where('id', existing.id).update({
                answers_json: JSON.stringify(answers),
                score: autoScore,
                status: 'submitted',
                completed_at: db.fn.now(),
                updated_at: db.fn.now(),
            });
            return res.json({ success: true, attemptId: existing.id, autoScore });
        }

        const [attempt] = await db('quiz_attempts').insert({
            id: uuidv4(),
            lesson_id: lessonId,
            student_id: studentId,
            answers_json: JSON.stringify(answers),
            score: autoScore,
            status: 'submitted',
            started_at: db.fn.now(),
            completed_at: db.fn.now(),
            created_at: db.fn.now(),
            updated_at: db.fn.now(),
        }).returning('*');

        res.json({ success: true, attemptId: attempt.id, autoScore });
    } catch (err) {
        console.error('submitQuiz error:', err);
        res.status(500).json({ error: 'Failed to submit quiz' });
    }
}

// ─────────────────────────────────────────────
// STUDENT: Get my attempt for a lesson
// GET /api/grading/lessons/:lessonId/my-attempt
// ─────────────────────────────────────────────
async function getMyAttempt(req, res) {
    try {
        const { lessonId } = req.params;
        const studentId = req.user.id;

        const attempt = await db('quiz_attempts')
            .where({ lesson_id: lessonId, student_id: studentId })
            .first();

        if (!attempt) return res.json({ attempt: null });

        res.json({
            attempt: {
                ...attempt,
                answers_json: typeof attempt.answers_json === 'string'
                    ? JSON.parse(attempt.answers_json)
                    : attempt.answers_json,
                question_marks: typeof attempt.question_marks === 'string'
                    ? JSON.parse(attempt.question_marks)
                    : attempt.question_marks,
            }
        });
    } catch (err) {
        console.error('getMyAttempt error:', err);
        res.status(500).json({ error: 'Failed to fetch attempt' });
    }
}

// ─────────────────────────────────────────────
// TUTOR/ADMIN: List all submissions for a lesson
// GET /api/grading/lessons/:lessonId/submissions
// ─────────────────────────────────────────────
async function listSubmissions(req, res) {
    try {
        const { lessonId } = req.params;
        const user = req.user;

        // Tutors can only see their assigned students; admins see all
        let query = db('quiz_attempts as qa')
            .join('users as u', 'u.id', 'qa.student_id')
            .join('lessons as l', 'l.id', 'qa.lesson_id')
            .where('qa.lesson_id', lessonId)
            .select(
                'qa.id as attempt_id',
                'qa.student_id',
                'u.first_name',
                'u.last_name',
                'u.username',
                'qa.status',
                'qa.score',
                'qa.tutor_final_mark',
                'qa.tutor_comment',
                'qa.graded_at',
                'qa.completed_at',
                'l.title as lesson_title',
                'l.quiz_settings',
            );

        if (user.role === 'tutor') {
            // Filter to assigned students only
            const tutorProfile = await db('tutor_profiles').where({ user_id: user.id }).first();
            const assignedIds = tutorProfile?.assigned_student_ids || [];
            query = query.whereIn('qa.student_id', assignedIds);
        }

        const submissions = await query;

        const formatted = submissions.map(s => ({
            ...s,
            quiz_settings: typeof s.quiz_settings === 'string'
                ? JSON.parse(s.quiz_settings)
                : s.quiz_settings,
        }));

        res.json({ submissions: formatted });
    } catch (err) {
        console.error('listSubmissions error:', err);
        res.status(500).json({ error: 'Failed to list submissions' });
    }
}

// ─────────────────────────────────────────────
// TUTOR/ADMIN: Get full submission detail (answers + questions)
// GET /api/grading/attempts/:attemptId
// ─────────────────────────────────────────────
async function getAttemptDetail(req, res) {
    try {
        const { attemptId } = req.params;
        const user = req.user;

        const attempt = await db('quiz_attempts as qa')
            .join('users as u', 'u.id', 'qa.student_id')
            .join('lessons as l', 'l.id', 'qa.lesson_id')
            .where('qa.id', attemptId)
            .select(
                'qa.*',
                'u.first_name',
                'u.last_name',
                'u.username',
                'l.title as lesson_title',
                'l.quiz_questions',
                'l.quiz_settings',
            )
            .first();

        if (!attempt) return res.status(404).json({ error: 'Attempt not found' });

        // Tutors: verify the student is assigned to them
        if (user.role === 'tutor') {
            const tutorProfile = await db('tutor_profiles').where({ user_id: user.id }).first();
            const assignedIds = tutorProfile?.assigned_student_ids || [];
            if (!assignedIds.includes(attempt.student_id)) {
                return res.status(403).json({ error: 'Access denied' });
            }
        }

        const parse = (v) => {
            if (!v) return v;
            return typeof v === 'string' ? JSON.parse(v) : v;
        };

        res.json({
            attempt: {
                ...attempt,
                answers_json: parse(attempt.answers_json),
                question_marks: parse(attempt.question_marks),
                quiz_questions: parse(attempt.quiz_questions),
                quiz_settings: parse(attempt.quiz_settings),
            }
        });
    } catch (err) {
        console.error('getAttemptDetail error:', err);
        res.status(500).json({ error: 'Failed to fetch attempt detail' });
    }
}

// ─────────────────────────────────────────────
// TUTOR/ADMIN: Submit grades for an attempt
// POST /api/grading/attempts/:attemptId/grade
// Body: { questionMarks: {...}, finalMark: number, comment: string }
// ─────────────────────────────────────────────
async function gradeAttempt(req, res) {
    try {
        const { attemptId } = req.params;
        const user = req.user;
        const { questionMarks, finalMark, comment } = req.body;

        if (finalMark === undefined || finalMark === null) {
            return res.status(400).json({ error: 'finalMark is required' });
        }

        const attempt = await db('quiz_attempts').where('id', attemptId).first();
        if (!attempt) return res.status(404).json({ error: 'Attempt not found' });

        // Tutors: verify assigned student
        if (user.role === 'tutor') {
            const tutorProfile = await db('tutor_profiles').where({ user_id: user.id }).first();
            const assignedIds = tutorProfile?.assigned_student_ids || [];
            if (!assignedIds.includes(attempt.student_id)) {
                return res.status(403).json({ error: 'Access denied' });
            }
        }

        await db('quiz_attempts').where('id', attemptId).update({
            question_marks: JSON.stringify(questionMarks || {}),
            tutor_final_mark: finalMark,
            tutor_comment: comment || null,
            graded_by: user.id,
            graded_at: db.fn.now(),
            status: 'graded',
            updated_at: db.fn.now(),
        });

        res.json({ success: true, message: 'Quiz graded successfully' });
    } catch (err) {
        console.error('gradeAttempt error:', err);
        res.status(500).json({ error: 'Failed to grade attempt' });
    }
}

module.exports = {
    submitQuiz,
    getMyAttempt,
    listSubmissions,
    getAttemptDetail,
    gradeAttempt,
};
