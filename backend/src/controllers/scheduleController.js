const db = require('../config/database');

/**
 * Get the schedule for the logged-in user.
 * - Students see their own classes
 * - Tutors see classes they teach
 * - Parents see their children's classes
 * - Admins see everything
 */
async function getSchedule(req, res) {
    try {
        const { id, role } = req.user;
        let query = db('scheduled_classes as sc')
            .join('users as student', 'sc.student_id', 'student.id')
            .join('users as tutor', 'sc.tutor_id', 'tutor.id')
            .select(
                'sc.*',
                'student.first_name as student_first_name',
                'student.last_name as student_last_name',
                'student.username as student_username',
                'tutor.first_name as tutor_first_name',
                'tutor.last_name as tutor_last_name',
                'tutor.username as tutor_username'
            )
            .where('sc.is_active', true)
            .orderBy('sc.day_of_week')
            .orderBy('sc.start_time');

        if (role === 'student') {
            query = query.where('sc.student_id', id);
        } else if (role === 'tutor') {
            query = query.where('sc.tutor_id', id);
        } else if (role === 'parent') {
            const parent = await db('parent_profiles').where({ user_id: id }).first();
            const childIds = parent?.child_ids || [];
            if (childIds.length === 0) return res.json([]);
            query = query.whereIn('sc.student_id', childIds);
        }
        // admin: no filter — see all

        const classes = await query;
        res.json(classes);
    } catch (error) {
        console.error('Get schedule error:', error);
        res.status(500).json({ error: 'Failed to load schedule' });
    }
}

/**
 * Update a class time directly (tutor-only).
 */
async function updateClass(req, res) {
    try {
        const { id: classId } = req.params;
        const { day_of_week, start_time, end_time, location } = req.body;
        const { id: userId, role } = req.user;

        const cls = await db('scheduled_classes').where({ id: classId }).first();
        if (!cls) return res.status(404).json({ error: 'Class not found' });

        // Only the assigned tutor (or admin) may directly edit
        if (role !== 'admin' && cls.tutor_id !== userId) {
            return res.status(403).json({ error: 'Only the assigned tutor can directly update the schedule' });
        }

        const updated = await db('scheduled_classes')
            .where({ id: classId })
            .update({
                day_of_week: day_of_week ?? cls.day_of_week,
                start_time: start_time ?? cls.start_time,
                end_time: end_time ?? cls.end_time,
                location: location ?? cls.location,
                updated_at: new Date(),
            })
            .returning('*');

        res.json(updated[0]);
    } catch (error) {
        console.error('Update class error:', error);
        res.status(500).json({ error: 'Failed to update class' });
    }
}

/**
 * Request a schedule change (student or parent).
 */
async function requestChange(req, res) {
    try {
        const { class_id, proposed_day, proposed_start_time, proposed_end_time, reason } = req.body;
        const { id: userId } = req.user;

        const cls = await db('scheduled_classes').where({ id: class_id }).first();
        if (!cls) return res.status(404).json({ error: 'Class not found' });

        const [request] = await db('schedule_change_requests')
            .insert({
                class_id,
                requested_by: userId,
                proposed_day,
                proposed_start_time,
                proposed_end_time,
                reason: reason || null,
                status: 'pending',
            })
            .returning('*');

        res.status(201).json(request);
    } catch (error) {
        console.error('Request change error:', error);
        res.status(500).json({ error: 'Failed to submit change request' });
    }
}

/**
 * Get change requests visible to the current user.
 */
async function getChangeRequests(req, res) {
    try {
        const { id, role } = req.user;

        let query = db('schedule_change_requests as cr')
            .join('scheduled_classes as sc', 'cr.class_id', 'sc.id')
            .join('users as requester', 'cr.requested_by', 'requester.id')
            .join('users as student', 'sc.student_id', 'student.id')
            .select(
                'cr.*',
                'sc.subject',
                'sc.day_of_week as current_day',
                'sc.start_time as current_start_time',
                'sc.end_time as current_end_time',
                'student.first_name as student_first_name',
                'student.last_name as student_last_name',
                'requester.first_name as requester_first_name',
                'requester.last_name as requester_last_name'
            )
            .orderBy('cr.created_at', 'desc');

        if (role === 'tutor') {
            query = query.where('sc.tutor_id', id);
        } else if (role === 'student') {
            query = query.where('sc.student_id', id);
        } else if (role === 'parent') {
            const parent = await db('parent_profiles').where({ user_id: id }).first();
            const childIds = parent?.child_ids || [];
            if (childIds.length === 0) return res.json([]);
            query = query.whereIn('sc.student_id', childIds);
        }
        // admin: no filter

        const requests = await query;
        res.json(requests);
    } catch (error) {
        console.error('Get change requests error:', error);
        res.status(500).json({ error: 'Failed to load change requests' });
    }
}

/**
 * Approve or reject a change request (tutor or admin only).
 */
async function reviewChangeRequest(req, res) {
    try {
        const { id: requestId } = req.params;
        const { status, review_note } = req.body; // status: 'approved' | 'rejected'
        const { id: userId, role } = req.user;

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ error: 'Status must be approved or rejected' });
        }

        const request = await db('schedule_change_requests').where({ id: requestId }).first();
        if (!request) return res.status(404).json({ error: 'Request not found' });

        const cls = await db('scheduled_classes').where({ id: request.class_id }).first();
        if (!cls) return res.status(404).json({ error: 'Associated class not found' });

        // Only the assigned tutor or admin can review
        if (role !== 'admin' && cls.tutor_id !== userId) {
            return res.status(403).json({ error: 'Only the assigned tutor can review schedule changes' });
        }

        // Update the request
        const [updated] = await db('schedule_change_requests')
            .where({ id: requestId })
            .update({
                status,
                reviewed_by: userId,
                reviewed_at: new Date(),
                review_note: review_note || null,
                updated_at: new Date(),
            })
            .returning('*');

        // If approved, also update the class itself
        if (status === 'approved') {
            await db('scheduled_classes')
                .where({ id: request.class_id })
                .update({
                    day_of_week: request.proposed_day,
                    start_time: request.proposed_start_time,
                    end_time: request.proposed_end_time,
                    updated_at: new Date(),
                });
        }

        res.json(updated);
    } catch (error) {
        console.error('Review change request error:', error);
        res.status(500).json({ error: 'Failed to review change request' });
    }
}

module.exports = {
    getSchedule,
    updateClass,
    requestChange,
    getChangeRequests,
    reviewChangeRequest,
};
