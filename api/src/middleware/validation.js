const Joi = require('joi');

/**
 * Validation middleware factory
 */
function validate(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            return res.status(400).json({ error: 'Validation failed', details: errors });
        }

        req.body = value;
        next();
    };
}

// Common validation schemas
const schemas = {
    register: Joi.object({
        token: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string()
            .min(8)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
            .required()
            .messages({
                'string.pattern.base': 'Password must contain uppercase, lowercase, number, and special character'
            }),
        firstName: Joi.string().min(2).max(100).required(),
        lastName: Joi.string().min(2).max(100).required(),
        dateOfBirth: Joi.date().when('role', {
            is: 'student',
            then: Joi.required()
        }),
        gradeLevel: Joi.number().min(5).max(10).when('role', {
            is: 'student',
            then: Joi.required()
        })
    }),

    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),

    createToken: Joi.object({
        role: Joi.string().valid('student', 'tutor', 'parent').required(),
        maxUses: Joi.number().min(1).default(1),
        expiresInDays: Joi.number().min(1).max(365).default(30),
        metadata: Joi.object().optional()
    }),

    createUser: Joi.object({
        email: Joi.string().email().required(),
        firstName: Joi.string().min(2).max(100).required(),
        lastName: Joi.string().min(2).max(100).required(),
        role: Joi.string().valid('student', 'tutor', 'parent', 'admin').required(),
        password: Joi.string().min(8).optional(),
        phone: Joi.string().optional(),
        dateOfBirth: Joi.date().optional(),
        gradeLevel: Joi.number().min(5).max(10).optional(),
        enrolledSubjects: Joi.array().items(Joi.string()).optional(),
        parentId: Joi.string().uuid().optional()
    }),

    saveAssessment: Joi.object({
        studentId: Joi.string().uuid().required(),
        dimension: Joi.string().required(),
        testType: Joi.string().valid('screener', 'standard', 'diagnostic').default('standard'),
        rawScores: Joi.object().required(),
        behavioralObservations: Joi.string().optional(),
        environmentalFactors: Joi.object().optional()
    }),

    createSessionLog: Joi.object({
        interventionId: Joi.string().uuid().required(),
        studentId: Joi.string().uuid().required(),
        scheduledDate: Joi.date().required(),
        durationMinutes: Joi.number().min(1).optional(),
        protocolStepsCompleted: Joi.array().items(Joi.string()).required(),
        stepsSkipped: Joi.array().items(Joi.string()).default([]),
        materialsUsed: Joi.array().items(Joi.string()).default([]),
        scriptAdherence: Joi.string().valid('full', 'partial', 'adapted', 'none').required(),
        adaptationsMade: Joi.string().allow('').optional(),
        engagementLevel: Joi.number().min(1).max(5).required(),
        cognitiveLoad: Joi.number().min(1).max(5).optional(),
        strategyUse: Joi.string().optional(),
        breakthroughs: Joi.array().items(Joi.string()).default([]),
        frustrations: Joi.array().items(Joi.string()).default([]),
        objectiveMet: Joi.boolean().required(),
        evidence: Joi.string().allow('').optional(),
        nextSessionAdjustment: Joi.string().allow('').optional(),
        requiresSupervision: Joi.boolean().default(false),
        reassessmentRecommended: Joi.boolean().default(false)
    })
};

module.exports = {
    validate,
    schemas
};
