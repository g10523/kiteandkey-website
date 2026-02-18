const db = require('../config/database');

/**
 * GET /api/students/:id/dashboard
 * Returns a composite payload with all data the frontend needs in a single request.
 * This replaces multiple parallel localStorage reads with one network round-trip.
 */
async function getDashboard(req, res) {
    try {
        const { id: studentId } = req.params;

        // Get user details
        const user = await db('users').where({ id: studentId }).first();
        if (!user) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Get student profile
        const studentProfile = await db('student_profiles')
            .where({ user_id: studentId })
            .first();

        // Get enrolled subjects
        const enrolledSubjects = studentProfile?.enrolled_subjects || [];

        // Get subjects (filtered by enrollment)
        let subjects = [];
        if (enrolledSubjects.length > 0) {
            subjects = await db('subjects')
                .whereIn('id', enrolledSubjects)
                .orderBy('title');
        }

        // Get assignments for enrolled subjects
        let assignments = [];
        if (enrolledSubjects.length > 0) {
            assignments = await db('assignments')
                .whereIn('subject_id', enrolledSubjects)
                .where('student_id', studentId)
                .orderBy('due_date', 'asc');
        }

        // Get tutoring sessions
        const sessions = await db('tutoring_sessions')
            .where({ student_id: studentId })
            .orderBy('scheduled_at', 'desc')
            .limit(20);

        // Get messages
        const messages = await db('messages')
            .where('sender_id', studentId)
            .orWhere('recipient_id', studentId)
            .orderBy('created_at', 'desc')
            .limit(50);

        // Get resources for enrolled subjects
        let resources = [];
        if (enrolledSubjects.length > 0) {
            resources = await db('resources')
                .whereIn('subject_id', enrolledSubjects)
                .orderBy('created_at', 'desc');
        }

        // Get MindPrint profile
        const mindprintProfile = await db('mindprint_profiles')
            .where({ student_id: studentId })
            .first();

        // Get assessments
        const assessments = await db('assessments')
            .where({ student_id: studentId })
            .orderBy('created_at', 'desc');

        // Get active interventions
        const interventions = await db('assigned_interventions')
            .select(
                'assigned_interventions.*',
                'intervention_protocols.title',
                'intervention_protocols.description',
                'intervention_protocols.target_dimension',
                'intervention_protocols.implementation',
                'intervention_protocols.expected_outcomes'
            )
            .leftJoin('intervention_protocols', 'assigned_interventions.protocol_id', 'intervention_protocols.id')
            .where({
                'assigned_interventions.student_id': studentId,
                'assigned_interventions.status': 'active'
            });

        // Get analytics summary
        const analytics = {
            total_subjects: enrolledSubjects.length,
            assessments_completed: assessments.length,
            active_interventions: interventions.length,
            last_login: user.last_login,
        };

        res.json({
            subjects: subjects.map(formatSubject),
            assignments: assignments.map(formatAssignment),
            sessions: sessions.map(formatSession),
            messages: messages.map(formatMessage),
            resources: resources.map(formatResource),
            analytics,
            mindprint_profile: mindprintProfile ? formatMindPrintProfile(mindprintProfile) : null,
            assessments: assessments.map(formatAssessment),
            interventions: interventions.map(formatIntervention),
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ error: 'Failed to load dashboard' });
    }
}

// ─── Formatters ───

function formatSubject(s) {
    return {
        id: s.id,
        title: s.title,
        description: s.description,
        icon: s.icon,
        color: s.color,
        progress: s.progress || 0,
        current_unit: s.current_unit,
        total_units: s.total_units,
        completed_units: s.completed_units,
        units: s.units ? JSON.parse(s.units) : [],
    };
}

function formatAssignment(a) {
    return {
        id: a.id,
        title: a.title,
        subject_id: a.subject_id,
        student_id: a.student_id,
        due_date: a.due_date,
        status: a.status,
        description: a.description,
        grade: a.grade,
    };
}

function formatSession(s) {
    return {
        id: s.id,
        tutor_id: s.tutor_id,
        student_id: s.student_id,
        subject_id: s.subject_id,
        scheduled_at: s.scheduled_at,
        duration_minutes: s.duration_minutes,
        status: s.status,
        notes: s.notes,
    };
}

function formatMessage(m) {
    return {
        id: m.id,
        sender_id: m.sender_id,
        recipient_id: m.recipient_id,
        subject: m.subject,
        body: m.body,
        is_read: m.is_read,
        created_at: m.created_at,
    };
}

function formatResource(r) {
    return {
        id: r.id,
        title: r.title,
        type: r.type,
        subject_id: r.subject_id,
        url: r.url,
        description: r.description,
        created_at: r.created_at,
    };
}

function formatMindPrintProfile(p) {
    return {
        id: p.id,
        student_id: p.student_id,
        archetype: p.archetype,
        archetype_description: p.archetype_description,
        dimension_scores: typeof p.dimension_scores === 'string'
            ? JSON.parse(p.dimension_scores) : p.dimension_scores,
        composite_scores: typeof p.composite_scores === 'string'
            ? JSON.parse(p.composite_scores) : p.composite_scores,
        development_edges: p.development_edges,
        strengths: p.strengths,
        calculated_at: p.calculated_at,
        next_reassessment_date: p.next_reassessment_date,
    };
}

function formatAssessment(a) {
    return {
        id: a.id,
        student_id: a.student_id,
        tutor_id: a.tutor_id,
        dimension: a.dimension,
        test_type: a.test_type,
        raw_scores: typeof a.raw_scores === 'string' ? JSON.parse(a.raw_scores) : a.raw_scores,
        calculated_results: typeof a.calculated_results === 'string'
            ? JSON.parse(a.calculated_results) : a.calculated_results,
        behavioral_observations: a.behavioral_observations,
        status: a.status,
        created_at: a.created_at,
    };
}

function formatIntervention(i) {
    return {
        id: i.id,
        protocol_id: i.protocol_id,
        student_id: i.student_id,
        title: i.title,
        description: i.description,
        target_dimension: i.target_dimension,
        status: i.status,
        assigned_at: i.assigned_at,
        target_end_date: i.target_end_date,
        sessions_completed: i.sessions_completed,
        sessions_target: i.sessions_target,
        implementation: typeof i.implementation === 'string'
            ? JSON.parse(i.implementation) : i.implementation,
        expected_outcomes: typeof i.expected_outcomes === 'string'
            ? JSON.parse(i.expected_outcomes) : i.expected_outcomes,
    };
}

/**
 * POST /api/students/migrate-data
 * Import legacy localStorage data into the database
 */
async function migrateData(req, res) {
    try {
        const studentId = req.user.id;
        const { assessments, interventions, mindprintProfile } = req.body;

        const trx = await db.transaction();

        try {
            // 1. Migrate MindPrint Profile if provided and not exists
            if (mindprintProfile) {
                const existing = await trx('mindprint_profiles').where({ student_id: studentId }).first();
                if (!existing) {
                    await trx('mindprint_profiles').insert({
                        student_id: studentId,
                        archetype: mindprintProfile.archetype,
                        archetype_description: mindprintProfile.archetypeDescription,
                        dimension_scores: JSON.stringify(mindprintProfile.cognitiveScores || {}),
                        composite_scores: JSON.stringify(mindprintProfile.compositeScores || {}),
                        development_edges: mindprintProfile.frictionPoints || [],
                        strengths: mindprintProfile.strengths || [],
                        calculated_at: new Date()
                    });
                }
            }

            // 2. Migrate Assessments
            if (assessments && Array.isArray(assessments)) {
                for (const asm of assessments) {
                    // Skip if identical assessment exists (naive check by date/type)
                    // In a real migration, we might want more robust deduping
                    const exists = await trx('assessments')
                        .where({ student_id: studentId, created_at: new Date(asm.date || asm.createdAt) })
                        .first();

                    if (!exists) {
                        await trx('assessments').insert({
                            student_id: studentId,
                            dimension: asm.dimensionId || asm.dimension, // Handle both formats
                            test_type: asm.testType || 'standard',
                            raw_scores: JSON.stringify(asm.rawScores || {}),
                            calculated_results: JSON.stringify(asm.calculatedResults || {}),
                            behavioral_observations: asm.behavioralObservations,
                            created_at: new Date(asm.date || asm.createdAt),
                            status: 'completed'
                        });
                    }
                }
            }

            // 3. Migrate Interventions
            if (interventions && Array.isArray(interventions)) {
                for (const inv of interventions) {
                    // Create protocol if not exists (mock data might have ad-hoc protocols)
                    let protocolId = null;
                    // Try to find matching protocol by title
                    const protocol = await trx('intervention_protocols').where({ title: inv.title }).first();
                    if (protocol) {
                        protocolId = protocol.id;
                    } else {
                        // Create ad-hoc protocol
                        const [newProtocol] = await trx('intervention_protocols').insert({
                            title: inv.title,
                            description: inv.description || 'Legacy intervention',
                            target_dimension: 'general', // Default
                            implementation: JSON.stringify({}),
                            expected_outcomes: JSON.stringify([]),
                            created_by: req.user.id // Self-created for migration
                        }).returning('id');
                        protocolId = newProtocol.id;
                    }

                    // Assign intervention
                    const [assigned] = await trx('assigned_interventions').insert({
                        student_id: studentId,
                        protocol_id: protocolId,
                        status: inv.status || 'active',
                        assigned_at: new Date(inv.assignedDate || inv.createdAt || Date.now()),
                        sessions_completed: inv.progressLog ? inv.progressLog.length : 0,
                        sessions_target: inv.totalSessions || 12
                    }).returning('id');

                    // Migrate logs
                    if (inv.progressLog && Array.isArray(inv.progressLog)) {
                        const logs = inv.progressLog.map(log => ({
                            intervention_id: assigned.id,
                            session_date: new Date(log.date),
                            duration_minutes: log.duration || 30,
                            notes: log.notes,
                            protocol_steps_completed: JSON.stringify([]),
                            fidelity_score: 100 // Assume legacy logs were faithful
                        }));
                        if (logs.length > 0) {
                            await trx('session_logs').insert(logs);
                        }
                    }
                }
            }

            await trx.commit();
            res.json({ message: 'Migration successful' });
        } catch (err) {
            await trx.rollback();
            throw err;
        }
    } catch (error) {
        console.error('Migration error:', error);
        res.status(500).json({ error: 'Failed to migrate data' });
    }
}

module.exports = {
    getDashboard,
    migrateData
};
