const db = require('../config/database');

/**
 * PUT /api/admin/content/:lessonId/visibility
 * Update content visibility for a lesson and optionally its quiz
 */
async function updateVisibility(req, res) {
    try {
        const { lessonId } = req.params;
        const { isVisible, quizVisible, studentId, notes } = req.body;

        // Upsert content_visibility record
        const existingRecord = await db('content_visibility')
            .where({
                content_id: lessonId,
                content_type: 'lesson',
                ...(studentId ? { student_id: studentId } : {}),
            })
            .first();

        const visibilityData = {
            content_type: 'lesson',
            content_id: lessonId,
            student_id: studentId || null,
            is_visible: isVisible,
            set_by: req.user.id,
            set_at: new Date(),
            notes: notes || null,
        };

        if (existingRecord) {
            await db('content_visibility')
                .where({ id: existingRecord.id })
                .update(visibilityData);
        } else {
            await db('content_visibility').insert(visibilityData);
        }

        // Handle quiz visibility if provided
        if (quizVisible !== undefined) {
            const existingQuiz = await db('content_visibility')
                .where({
                    content_id: lessonId,
                    content_type: 'quiz',
                    ...(studentId ? { student_id: studentId } : {}),
                })
                .first();

            const quizData = {
                content_type: 'quiz',
                content_id: lessonId,
                student_id: studentId || null,
                is_visible: quizVisible,
                set_by: req.user.id,
                set_at: new Date(),
                notes: notes || null,
            };

            if (existingQuiz) {
                await db('content_visibility')
                    .where({ id: existingQuiz.id })
                    .update(quizData);
            } else {
                await db('content_visibility').insert(quizData);
            }
        }

        // Audit log
        await db('audit_log').insert({
            user_id: req.user.id,
            action: 'content_visibility_change',
            entity_type: 'lesson',
            entity_id: lessonId,
            details: JSON.stringify({ isVisible, quizVisible, studentId }),
        });

        res.json({
            message: 'Visibility updated successfully',
            lessonId,
            isVisible,
            quizVisible,
        });
    } catch (error) {
        console.error('Update visibility error:', error);
        res.status(500).json({ error: 'Failed to update visibility' });
    }
}

/**
 * GET /api/admin/content/visibility
 * Get all content visibility settings, optionally filtered by subject
 */
async function getVisibilitySettings(req, res) {
    try {
        const { subjectId, studentId } = req.query;

        let query = db('content_visibility')
            .select(
                'content_visibility.*',
                'users.first_name as set_by_first_name',
                'users.last_name as set_by_last_name'
            )
            .leftJoin('users', 'content_visibility.set_by', 'users.id')
            .orderBy('content_visibility.set_at', 'desc');

        if (studentId) {
            query = query.where('content_visibility.student_id', studentId);
        }

        const settings = await query;

        res.json({
            settings: settings.map(s => ({
                id: s.id,
                contentType: s.content_type,
                contentId: s.content_id,
                studentId: s.student_id,
                isVisible: s.is_visible,
                releaseDate: s.release_date,
                hideDate: s.hide_date,
                setBy: `${s.set_by_first_name} ${s.set_by_last_name}`,
                setAt: s.set_at,
                notes: s.notes,
            })),
        });
    } catch (error) {
        console.error('Get visibility settings error:', error);
        res.status(500).json({ error: 'Failed to get visibility settings' });
    }
}

/**
 * PUT /api/admin/content/:lessonId/release-date
 * Set a scheduled release date for content
 */
async function setReleaseDate(req, res) {
    try {
        const { lessonId } = req.params;
        const { releaseDate, hideDate, contentType = 'lesson' } = req.body;

        const existingRecord = await db('content_visibility')
            .where({
                content_id: lessonId,
                content_type: contentType,
            })
            .first();

        const data = {
            release_date: releaseDate ? new Date(releaseDate) : null,
            hide_date: hideDate ? new Date(hideDate) : null,
            set_by: req.user.id,
            set_at: new Date(),
        };

        if (existingRecord) {
            await db('content_visibility')
                .where({ id: existingRecord.id })
                .update(data);
        } else {
            await db('content_visibility').insert({
                content_type: contentType,
                content_id: lessonId,
                is_visible: true,
                ...data,
            });
        }

        res.json({
            message: 'Release date set successfully',
            lessonId,
            releaseDate,
            hideDate,
        });
    } catch (error) {
        console.error('Set release date error:', error);
        res.status(500).json({ error: 'Failed to set release date' });
    }
}

module.exports = {
    updateVisibility,
    getVisibilitySettings,
    setReleaseDate,
};
