const db = require('../config/database');
const { calculatePercentile, determineArchetype } = require('../utils/mindprint');
const batteryRegistry = require('../assessments/batteryRegistry');

// In-memory storage for active assessments (replace with DB inproduction)
const activeAssessments = new Map();
const assessmentResults = new Map();

/**
 * Create new assessment and auto-calculate MindPrint
 */
async function createAssessment(req, res) {
    try {
        const {
            studentId,
            dimension,
            testType = 'standard',
            rawScores,
            behavioralObservations,
            environmentalFactors
        } = req.body;

        // Calculate percentile from raw scores
        const calculatedResults = calculatePercentile(dimension, rawScores.total, {
            age: await getStudentAge(studentId),
            testType
        });

        // Save assessment
        const [assessment] = await db('assessments')
            .insert({
                student_id: studentId,
                tutor_id: req.user.id,
                dimension,
                test_type: testType,
                raw_scores: JSON.stringify(rawScores),
                calculated_results: JSON.stringify(calculatedResults),
                behavioral_observations: behavioralObservations,
                environmental_factors: JSON.stringify(environmentalFactors)
            })
            .returning('*');

        // Auto-recalculate MindPrint profile
        const profile = await recalculateMindPrintProfile(studentId);

        // Auto-assign interventions if needed
        await autoAssignInterventions(studentId, profile);

        res.status(201).json({
            assessment: formatAssessment(assessment),
            profile
        });
    } catch (error) {
        console.error('Create assessment error:', error);
        res.status(500).json({ error: 'Failed to create assessment' });
    }
}

/**
 * Get assessments (filter by student/tutor/recent)
 */
async function getAssessments(req, res) {
    try {
        const { studentId, limit = 50 } = req.query;

        let query = db('assessments')
            .select(
                'assessments.*',
                'students.first_name as student_first_name',
                'students.last_name as student_last_name',
                'tutors.first_name as tutor_first_name',
                'tutors.last_name as tutor_last_name'
            )
            .leftJoin('users as students', 'assessments.student_id', 'students.id')
            .leftJoin('users as tutors', 'assessments.tutor_id', 'tutors.id')
            .orderBy('assessments.created_at', 'desc');

        // Filter by student if provided
        if (studentId) {
            query = query.where('assessments.student_id', studentId);
        }

        // Role-based filtering
        if (req.user.role === 'student') {
            query = query.where('assessments.student_id', req.user.id);
        } else if (req.user.role === 'tutor') {
            // Tutors see assessments for their assigned students
            const tutorProfile = await db('tutor_profiles')
                .where({ user_id: req.user.id })
                .first();
            query = query.whereIn('assessments.student_id', tutorProfile.assigned_student_ids || []);
        }

        const assessments = await query.limit(parseInt(limit));

        res.json({
            assessments: assessments.map(formatAssessment)
        });
    } catch (error) {
        console.error('Get assessments error:', error);
        res.status(500).json({ error: 'Failed to fetch assessments' });
    }
}

/**
 * Get single assessment
 */
async function getAssessment(req, res) {
    try {
        const { id } = req.params;

        const assessment = await db('assessments')
            .where({ id })
            .first();

        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found' });
        }

        // Check authorization
        if (req.user.role === 'student' && assessment.student_id !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.json({
            assessment: formatAssessment(assessment)
        });
    } catch (error) {
        console.error('Get assessment error:', error);
        res.status(500).json({ error: 'Failed to fetch assessment' });
    }
}

/**
 * Helper: Recalculate MindPrint profile from assessments
 */
async function recalculateMindPrintProfile(studentId) {
    // Get all assessments for student
    const assessments = await db('assessments')
        .where({ student_id: studentId })
        .orderBy('created_at', 'desc');

    // Group by dimension, take most recent
    const dimensionMap = new Map();
    for (const assessment of assessments) {
        if (!dimensionMap.has(assessment.dimension)) {
            dimensionMap.set(assessment.dimension, assessment);
        }
    }

    // Build dimension scores
    const dimensionScores = Array.from(dimensionMap.entries()).map(([dimension, assessment]) => {
        const results = JSON.parse(assessment.calculated_results);
        return {
            dimension,
            percentile: results.percentile,
            standardScore: results.standardScore,
            lastAssessed: assessment.created_at
        };
    });

    // Calculate composite scores
    const compositeScores = calculateCompositeScores(dimensionScores);

    // Determine archetype
    const archetype = determineArchetype(dimensionScores);

    // Identify development edges (<25th) and strengths (>75th)
    const developmentEdges = dimensionScores
        .filter(d => d.percentile < 25)
        .map(d => d.dimension);

    const strengths = dimensionScores
        .filter(d => d.percentile > 75)
        .map(d => d.dimension);

    // Upsert profile
    const [profile] = await db('mindprint_profiles')
        .insert({
            student_id: studentId,
            archetype: archetype.name,
            archetype_description: archetype.description,
            dimension_scores: JSON.stringify(dimensionScores),
            composite_scores: JSON.stringify(compositeScores),
            development_edges: developmentEdges,
            strengths: strengths,
            next_reassessment_date: calculateNextReassessment()
        })
        .onConflict('student_id')
        .merge()
        .returning('*');

    return formatProfile(profile);
}

/**
 * Helper: Auto-assign interventions for development edges
 */
async function autoAssignInterventions(studentId, profile) {
    const developmentEdges = profile.developmentEdges || [];

    for (const dimension of developmentEdges) {
        const dimensionScore = profile.dimensions.find(d => d.dimension === dimension);

        //Find matching protocols
        const protocols = await db('intervention_protocols')
            .where('target_dimension', dimension)
            .where('target_range_min', '<=', dimensionScore.percentile)
            .where('target_range_max', '>=', dimensionScore.percentile)
            .orderBy('priority', 'asc')
            .limit(2);

        // Assign top protocols
        for (const protocol of protocols) {
            // Check if already assigned
            const existing = await db('assigned_interventions')
                .where({
                    student_id: studentId,
                    protocol_id: protocol.id,
                    status: 'active'
                })
                .first();

            if (!existing) {
                await db('assigned_interventions').insert({
                    protocol_id: protocol.id,
                    student_id: studentId,
                    assigned_by: 'system', // Auto-assigned
                    status: 'active',
                    sessions_target: 12, // Default 12 sessions
                    target_end_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days
                });
            }
        }
    }
}

/**
 * Helper functions
 */
async function getStudentAge(studentId) {
    const user = await db('users').where({ id: studentId }).first();
    if (!user.date_of_birth) return 15; // Default age
    const birthDate = new Date(user.date_of_birth);
    const today = new Date();
    return today.getFullYear() - birthDate.getFullYear();
}

function calculateCompositeScores(dimensionScores) {
    // Calculate fluid intelligence, cognitive efficiency, etc.
    const wmScore = dimensionScores.find(d => d.dimension === 'working_memory')?.percentile || 50;
    const psScore = dimensionScores.find(d => d.dimension === 'processing_speed')?.percentile || 50;

    return {
        fluidIntelligence: Math.round((wmScore + psScore) / 2),
        cognitiveEfficiency: psScore
    };
}

function calculateNextReassessment() {
    const date = new Date();
    date.setDate(date.getDate() + 90); // 90 days from now
    return date;
}

function formatAssessment(assessment) {
    return {
        id: assessment.id,
        studentId: assessment.student_id,
        tutorId: assessment.tutor_id,
        dimension: assessment.dimension,
        testType: assessment.test_type,
        rawScores: JSON.parse(assessment.raw_scores),
        calculatedResults: JSON.parse(assessment.calculated_results),
        behavioralObservations: assessment.behavioral_observations,
        environmentalFactors: assessment.environmental_factors ? JSON.parse(assessment.environmental_factors) : null,
        status: assessment.status,
        createdAt: assessment.created_at
    };
}

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

/**
 * START INTERACTIVE ASSESSMENT
 * POST /api/assessments/start
 */
async function startInteractiveAssessment(req, res) {
    try {
        const { studentId, dimension, testType = 'standard' } = req.body;

        if (!studentId || !dimension) {
            return res.status(400).json({
                error: 'Student ID and dimension are required'
            });
        }

        // Generate assessment ID
        const assessmentId = `assess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Get battery based on dimension
        let battery;
        try {
            const batteryModule = batteryRegistry.getBattery(dimension);
            battery = batteryModule.generateBattery(testType);
        } catch (error) {
            return res.status(400).json({
                error: `Dimension '${dimension}' not available or error generating battery: ${error.message}`
            });
        }

        // Store assessment state
        activeAssessments.set(assessmentId, {
            id: assessmentId,
            studentId,
            dimension,
            testType,
            battery,
            responses: [],
            startedAt: new Date().toISOString(),
            status: 'in_progress'
        });

        res.json({
            assessmentId,
            battery: {
                id: battery.id,
                dimension: battery.dimension,
                duration_minutes: battery.duration_minutes,
                items: battery.items,
                instructions: battery.instructions
            },
            instructions: battery.instructions,
            time_limit: battery.duration_minutes
        });
    } catch (error) {
        console.error('Error starting assessment:', error);
        res.status(500).json({ error: error.message });
    }
}

/**
 * SUBMIT ITEM RESPONSE
 * POST /api/assessments/response
 */
async function submitInteractiveResponse(req, res) {
    try {
        const { assessmentId, itemId, response, responseTime } = req.body;

        if (!assessmentId || !itemId || response === undefined) {
            return res.status(400).json({
                error: 'Assessment ID, item ID, and response are required'
            });
        }

        const assessment = activeAssessments.get(assessmentId);
        if (!assessment) {
            return res.status(404).json({
                error: 'Assessment not found or expired'
            });
        }

        // Find the item in the battery
        const item = assessment.battery.items.find(i => i.id === itemId);
        if (!item) {
            return res.status(404).json({
                error: 'Item not found in battery'
            });
        }

        // Check correctness based on trial type
        let correct = false;
        try {
            const batteryModule = batteryRegistry.getBattery(assessment.dimension);

            // Find which subtest this item belongs to
            if (item.type === 'digit_span_forward') {
                correct = batteryModule.digitSpanForward.checkCorrect(item, response);
            } else if (item.type === 'digit_span_backward') {
                correct = batteryModule.digitSpanBackward.checkCorrect(item, response);
            } else {
                // Generic check for other test types
                correct = batteryModule[item.type]?.checkCorrect ? batteryModule[item.type].checkCorrect(item, response) : (JSON.stringify(response) === JSON.stringify(item.correctResponse));
            }
        } catch (error) {
            console.warn('Error checking correctness:', error);
            correct = JSON.stringify(response) === JSON.stringify(item.correctResponse);
        }

        // Store response
        const responseData = {
            itemId,
            response,
            correct,
            responseTime,
            timestamp: new Date().toISOString()
        };

        assessment.responses.push(responseData);

        // Update assessment
        activeAssessments.set(assessmentId, assessment);

        res.json({
            success: true,
            progress: {
                current: assessment.responses.length,
                total: assessment.battery.items.length
            }
        });
    } catch (error) {
        console.error('Error submitting response:', error);
        res.status(500).json({ error: error.message });
    }
}

/**
 * COMPLETE ASSESSMENT
 * POST /api/assessments/:id/complete
 */
async function completeInteractiveAssessment(req, res) {
    try {
        const { id } = req.params;
        const { behavioralObservations } = req.body;

        const assessment = activeAssessments.get(id);
        if (!assessment) {
            return res.status(404).json({
                error: 'Assessment not found'
            });
        }

        // Calculate scores based on dimension
        let results;
        if (assessment.dimension === 'working_memory') {
            results = calculateWorkingMemoryScores(assessment);
        } else {
            return res.status(400).json({
                error: `Scoring for '${assessment.dimension}' not yet implemented`
            });
        }

        // Build final assessment object
        const finalAssessment = {
            ...assessment,
            status: 'completed',
            completedAt: new Date().toISOString(),
            behavioralObservations,
            results
        };

        // Store results
        assessmentResults.set(id, finalAssessment);
        activeAssessments.delete(id);

        // Mock profile response (in production, update database)
        const profile = {
            studentId: assessment.studentId,
            archetype: {
                id: 'developing',
                name: 'Developing Profile',
                confidence: 0.5,
                description: 'Your cognitive profile is developing as you complete more assessments.'
            },
            dimensions: [{
                dimension: 'working_memory',
                name: 'Working Memory',
                percentile: results.percentile,
                confidenceInterval: results.confidenceInterval,
                trend: 'stable',
                lastAssessed: new Date().toISOString(),
                standardScore: results.compositeScore
            }],
            compositeScores: {
                fluidIntelligence: 50,
                cognitiveEfficiency: results.percentile,
                executiveFunction: 50,
                verbalReasoning: 50
            },
            developmentEdges: results.percentile < 25 ? ['working_memory'] : [],
            strengths: results.percentile > 75 ? ['working_memory'] : [],
            calculatedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        res.json({
            assessment: finalAssessment,
            results,
            profile,
            interventionsAssigned: []
        });
    } catch (error) {
        console.error('Error completing assessment:', error);
        res.status(500).json({ error: error.message });
    }
}

/**
 * Helper: Calculate Working Memory scores from responses
 */
function calculateWorkingMemoryScores(assessment) {
    const responses = assessment.responses;

    // Separate forward and backward responses
    const forwardResponses = responses.filter(r => {
        const item = assessment.battery.items.find(i => i.id === r.itemId);
        return item?.type === 'digit_span_forward';
    });

    const backwardResponses = responses.filter(r => {
        const item = assessment.battery.items.find(i => i.id === r.itemId);
        return item?.type === 'digit_span_backward';
    });

    // Calculate longest span for each
    const forwardSpan = calculateLongestSpan(forwardResponses, assessment.battery.items);
    const backwardSpan = calculateLongestSpan(backwardResponses, assessment.battery.items);

    // Mock age (in production, get from student profile)
    const ageMonths = 144; // 12 years old

    // Use battery scoring
    const scores = workingMemoryBattery.calculateScore(ageMonths, forwardSpan, backwardSpan);

    return {
        dimension: 'working_memory',
        ...scores,
        totalResponses: responses.length,
        correctResponses: responses.filter(r => r.correct).length,
        averageResponseTime: responses.reduce((sum, r) => sum + (r.responseTime || 0), 0) / responses.length,
        completedAt: new Date().toISOString()
    };
}

/**
 * Helper: Calculate longest span achieved
 */
function calculateLongestSpan(responses, items) {
    const spanGroups = new Map();

    responses.forEach(r => {
        const item = items.find(i => i.id === r.itemId);
        if (!item) return;

        const span = item.span;
        if (!spanGroups.has(span)) {
            spanGroups.set(span, []);
        }
        spanGroups.get(span).push(r);
    });

    let longestSpan = 0;
    spanGroups.forEach((responses, span) => {
        const correctCount = responses.filter(r => r.correct).length;
        // Need 2/2 correct to count
        if (correctCount >= 2 && span > longestSpan) {
            longestSpan = span;
        }
    });

    // If no span had 2/2, find highest with at least 1 correct
    if (longestSpan === 0) {
        spanGroups.forEach((responses, span) => {
            const correctCount = responses.filter(r => r.correct).length;
            if (correctCount > 0 && span > longestSpan) {
                longestSpan = span;
            }
        });
    }

    return longestSpan;
}

module.exports = {
    createAssessment,
    getAssessments,
    getAssessment,
    recalculateMindPrintProfile,
    // Interactive assessment methods
    startInteractiveAssessment,
    submitInteractiveResponse,
    completeInteractiveAssessment
};
