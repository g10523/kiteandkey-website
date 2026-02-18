const db = require('../config/database');
const { recalculateMindPrintProfile } = require('./assessmentController');

/**
 * Get student's MindPrint profile
 */
async function getProfile(req, res) {
    try {
        const { studentId } = req.params;

        // Check authorization
        if (req.user.role === 'student' && req.user.id !== studentId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const profile = await db('mindprint_profiles')
            .where({ student_id: studentId })
            .first();

        if (!profile) {
            return res.status(404).json({
                error: 'Profile not found',
                message: 'Student needs to complete assessments first'
            });
        }

        res.json({
            profile: formatProfile(profile)
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
}

/**
 * Get historical trends for dimension
 */
async function getTrends(req, res) {
    try {
        const { studentId } = req.params;
        const { dimension } = req.query;

        let query = db('assessments')
            .select('dimension', 'calculated_results', 'created_at', 'id')
            .where({ student_id: studentId })
            .orderBy('created_at', 'asc');

        if (dimension) {
            query = query.where({ dimension });
        }

        const assessments = await query;

        // Group by dimension
        const trendsByDimension = new Map();

        for (const assessment of assessments) {
            const results = JSON.parse(assessment.calculated_results);
            const dim = assessment.dimension;

            if (!trendsByDimension.has(dim)) {
                trendsByDimension.set(dim, []);
            }

            trendsByDimension.get(dim).push({
                date: assessment.created_at,
                percentile: results.percentile,
                standardScore: results.standardScore,
                assessmentId: assessment.id
            });
        }

        // Convert to array format
        const trends = Array.from(trendsByDimension.entries()).map(([dimension, history]) => ({
            dimension,
            history
        }));

        res.json({ trends });
    } catch (error) {
        console.error('Get trends error:', error);
        res.status(500).json({ error: 'Failed to fetch trends' });
    }
}

/**
 * Force recalculation of profile (admin tool)
 */
async function recalculateProfile(req, res) {
    try {
        const { studentId } = req.params;

        const profile = await recalculateMindPrintProfile(studentId);

        res.json({
            profile,
            message: 'Profile recalculated successfully'
        });
    } catch (error) {
        console.error('Recalculate profile error:', error);
        res.status(500).json({ error: 'Failed to recalculate profile' });
    }
}

/**
 * Helper: Format profile for API response
 */
function formatProfile(profile) {
    return {
        id: profile.id,
        studentId: profile.student_id,
        archetype: profile.archetype,
        archetypeDescription: profile.archetype_description,
        dimensions: JSON.parse(profile.dimension_scores),
        compositeScores: JSON.parse(profile.composite_scores),
        developmentEdges: profile.development_edges,
        strengths: profile.strengths,
        calculatedAt: profile.calculated_at,
        nextReassessmentDate: profile.next_reassessment_date
    };
}

module.exports = {
    getProfile,
    getTrends,
    recalculateProfile
};
