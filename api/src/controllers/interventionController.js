const db = require('../config/database');
const protocols = require('../assessments/interventionProtocols');

/**
 * Get all active interventions for a student
 */
async function getStudentInterventions(req, res) {
    try {
        const studentId = req.params.studentId || req.user.id;

        // Mock data for now if DB not fully ready
        const interventions = [
            {
                id: 'int_001',
                studentId,
                status: 'active',
                sessionsCompleted: 2,
                sessionsTarget: 5,
                assignedDate: new Date(Date.now() - 86400000 * 3).toISOString(),
                protocol: protocols.getProtocolById('wm_chunking_101')
            },
            {
                id: 'int_002',
                studentId,
                status: 'active',
                sessionsCompleted: 0,
                sessionsTarget: 8,
                assignedDate: new Date(Date.now() - 86400000).toISOString(),
                protocol: protocols.getProtocolById('ef_stop_think')
            }
        ];

        res.json(interventions);
    } catch (error) {
        console.error('Error fetching interventions:', error);
        res.status(500).json({ error: error.message });
    }
}

/**
 * Assign intervention based on MindPrint profile
 */
async function autoAssignInterventions(studentId, profile) {
    const assignedInterventions = [];

    // Logic: If any dimension < 30th percentile, assign "critical" intervention
    profile.dimensions.forEach(dim => {
        if (dim.percentile < 30) {
            const availableProtocols = protocols.getProtocolsByDimension(dim.dimension);
            const critical = availableProtocols.find(p => p.priority === 'critical');

            if (critical) {
                assignedInterventions.push({
                    id: `int_${Date.now()}_${dim.dimension}`,
                    studentId,
                    protocol: critical,
                    status: 'active',
                    sessionsCompleted: 0,
                    sessionsTarget: critical.expectedSessions,
                    assignedDate: new Date().toISOString(),
                    assignedBy: 'system'
                });
            }
        }
    });

    return assignedInterventions;
}

/**
 * Update intervention progress
 */
async function updateInterventionProgress(req, res) {
    try {
        const { id } = req.params;
        const { sessionIncrement = 1, notes } = req.body;

        // In production, update DB
        res.json({
            success: true,
            id,
            newCount: 3, // Mock incremented
            status: 'active'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getStudentInterventions,
    autoAssignInterventions,
    updateInterventionProgress
};
