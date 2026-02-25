/**
 * Course Controller — Kite & Key Academy LMS
 *
 * GET  /api/courses                   – list courses the caller can see
 * GET  /api/courses/:courseId          – single course with terms + lessons
 * PUT  /api/courses/:courseId/lessons/:lessonId/access  – toggle lesson access (tutor/admin)
 * PUT  /api/courses/:courseId/lessons/:lessonId/homework – mark homework done (student)
 */

const db = require('../config/database');

// ─── Helpers ────────────────────────────────────

/** Get child IDs for a parent */
async function getChildIds(parentUserId) {
    const parent = await db('parent_profiles').where('user_id', parentUserId).first();
    if (!parent || !parent.child_ids?.length) return [];
    return parent.child_ids;
}

/** Get student IDs linked to a tutor */
async function getTutorStudentIds(tutorUserId) {
    const tutor = await db('tutor_profiles').where('user_id', tutorUserId).first();
    if (!tutor || !tutor.assigned_student_ids?.length) return [];
    return tutor.assigned_student_ids;
}

// ─── GET /api/courses ───────────────────────────

async function listCourses(req, res) {
    try {
        const { id, role } = req.user;
        let courseIds = [];

        if (role === 'admin') {
            // Admin sees all courses
            const courses = await db('courses').where('is_active', true).orderBy('subject_type');
            return res.json(courses);
        }

        if (role === 'student') {
            const enrollments = await db('course_enrollments')
                .where({ user_id: id })
                .select('course_id');
            courseIds = enrollments.map(e => e.course_id);
        } else if (role === 'tutor') {
            const studentIds = await getTutorStudentIds(id);
            // A tutor sees courses their students are enrolled in
            const enrollments = await db('course_enrollments')
                .whereIn('user_id', studentIds)
                .select('course_id');
            courseIds = [...new Set(enrollments.map(e => e.course_id))];
        } else if (role === 'parent') {
            const childIds = await getChildIds(id);
            const enrollments = await db('course_enrollments')
                .whereIn('user_id', childIds)
                .select('course_id');
            courseIds = [...new Set(enrollments.map(e => e.course_id))];
        }

        if (courseIds.length === 0) {
            return res.json([]);
        }

        const courses = await db('courses')
            .whereIn('id', courseIds)
            .where('is_active', true)
            .orderBy('subject_type');

        return res.json(courses);
    } catch (err) {
        console.error('listCourses error:', err);
        return res.status(500).json({ error: 'Failed to fetch courses' });
    }
}

// ─── GET /api/courses/:courseId ──────────────────

async function getCourse(req, res) {
    try {
        const { id, role } = req.user;
        const { courseId } = req.params;

        // Fetch course
        const course = await db('courses').where('id', courseId).first();
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Access check (unless admin)
        if (role !== 'admin') {
            let allowedUserIds = [id];
            if (role === 'parent') {
                const childIds = await getChildIds(id);
                allowedUserIds = childIds;
            } else if (role === 'tutor') {
                const studentIds = await getTutorStudentIds(id);
                allowedUserIds = [id, ...studentIds];
            }

            const enrolled = await db('course_enrollments')
                .where('course_id', courseId)
                .whereIn('user_id', allowedUserIds)
                .first();
            if (!enrolled) {
                return res.status(403).json({ error: 'Not enrolled in this course' });
            }
        }

        // Fetch terms
        const terms = await db('course_terms')
            .where('course_id', courseId)
            .orderBy('term_number');

        // Fetch lessons for all terms
        const termIds = terms.map(t => t.id);
        const lessons = await db('lessons')
            .whereIn('term_id', termIds)
            .orderBy('lesson_number');

        // If student, also fetch homework status
        let homeworkMap = {};
        if (role === 'student') {
            const hw = await db('homework_tracking')
                .where('student_id', id)
                .whereIn('lesson_id', lessons.map(l => l.id));
            hw.forEach(h => { homeworkMap[h.lesson_id] = h.completed_in_book; });
        }

        // If student, also fetch quiz scores
        let quizMap = {};
        if (role === 'student') {
            const quizzes = await db('quiz_attempts')
                .where('student_id', id)
                .where('status', 'completed')
                .whereIn('lesson_id', lessons.map(l => l.id));
            quizzes.forEach(q => { quizMap[q.lesson_id] = q.score; });
        }

        // Assemble response
        const termsWithLessons = terms.map(term => ({
            id: term.id,
            number: term.term_number,
            title: term.title || `Term ${term.term_number}`,
            isLocked: term.is_locked,
            lessons: lessons
                .filter(l => l.term_id === term.id)
                .map(l => ({
                    id: l.id,
                    number: l.lesson_number,
                    title: l.title,
                    isAccessible: l.is_accessible,
                    hasNotes: l.content_notes && Object.keys(l.content_notes).length > 0,
                    hasHomework: l.homework_content && Object.keys(l.homework_content).length > 0,
                    hasQuiz: l.quiz_questions && l.quiz_questions.length > 0,
                    quizSettings: l.quiz_settings || {},
                    quizQuestions: l.quiz_questions || [],
                    contentNotes: l.content_notes || {},
                    homeworkContent: l.homework_content || {},
                    homeworkCompleted: homeworkMap[l.id] || false,
                    quizScore: quizMap[l.id] ?? null,
                })),
        }));

        return res.json({
            ...course,
            terms: termsWithLessons,
        });
    } catch (err) {
        console.error('getCourse error:', err);
        return res.status(500).json({ error: 'Failed to fetch course' });
    }
}

// ─── PUT /api/courses/:courseId/lessons/:lessonId/access ──

async function toggleLessonAccess(req, res) {
    try {
        const { role } = req.user;
        if (role !== 'tutor' && role !== 'admin') {
            return res.status(403).json({ error: 'Tutors/admins only' });
        }

        const { lessonId } = req.params;
        const { isAccessible } = req.body;

        await db('lessons').where('id', lessonId).update({
            is_accessible: isAccessible,
            updated_at: db.fn.now(),
        });

        // Log access change
        await db('lesson_access_logs').insert({
            lesson_id: lessonId,
            tutor_id: req.user.id,
            action: isAccessible ? 'grant' : 'revoke',
        });

        return res.json({ success: true, isAccessible });
    } catch (err) {
        console.error('toggleLessonAccess error:', err);
        return res.status(500).json({ error: 'Failed to update access' });
    }
}

// ─── PUT /api/courses/:courseId/lessons/:lessonId/homework ──

async function toggleHomework(req, res) {
    try {
        const { id, role } = req.user;
        if (role !== 'student') {
            return res.status(403).json({ error: 'Students only' });
        }

        const { lessonId } = req.params;
        const { completed } = req.body;

        // Upsert
        const existing = await db('homework_tracking')
            .where({ lesson_id: lessonId, student_id: id })
            .first();

        if (existing) {
            await db('homework_tracking')
                .where('id', existing.id)
                .update({ completed_in_book: completed, marked_at: completed ? db.fn.now() : null });
        } else {
            await db('homework_tracking').insert({
                lesson_id: lessonId,
                student_id: id,
                completed_in_book: completed,
                marked_at: completed ? db.fn.now() : null,
            });
        }

        return res.json({ success: true, completed });
    } catch (err) {
        console.error('toggleHomework error:', err);
        return res.status(500).json({ error: 'Failed to update homework' });
    }
}

module.exports = {
    listCourses,
    getCourse,
    toggleLessonAccess,
    toggleHomework,
};
