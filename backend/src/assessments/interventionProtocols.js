/**
 * INTERVENTION PROTOCOLS
 * 
 * Standardized evidence-based interventions for cognitive development.
 * These are mapped to specific cognitive dimensions and archetypes.
 */

const INTERVENTION_PROTOCOLS = {
    working_memory: [
        {
            id: 'wm_chunking_101',
            name: 'The Chunking Mastery',
            dimension: 'working_memory',
            priority: 'critical',
            description: 'Learn to group information into meaningful units to bypass working memory limits.',
            expectedSessions: 5,
            level: 'beginner',
            evidenceStrength: 'high'
        },
        {
            id: 'wm_n_back_trainer',
            name: 'N-Back Neuro-Plasticity',
            dimension: 'working_memory',
            priority: 'recommended',
            description: 'Direct neuro-cognitive training using adaptive N-Back tasks.',
            expectedSessions: 20,
            level: 'intermediate',
            evidenceStrength: 'high'
        }
    ],
    processing_speed: [
        {
            id: 'ps_rapid_naming',
            name: 'Rapid Automatized Naming',
            dimension: 'processing_speed',
            priority: 'critical',
            description: 'Exercises to improve the speed of retrieval from long-term memory.',
            expectedSessions: 10,
            level: 'beginner',
            evidenceStrength: 'high'
        }
    ],
    executive_function: [
        {
            id: 'ef_stop_think',
            name: 'Stop-Think-Go Protocol',
            dimension: 'executive_function',
            priority: 'critical',
            description: 'Metacognitive strategy for impulse control and planning.',
            expectedSessions: 8,
            level: 'beginner',
            evidenceStrength: 'high'
        },
        {
            id: 'ef_task_switch',
            name: 'Cognitive Flex-Builder',
            dimension: 'executive_function',
            priority: 'recommended',
            description: 'Drills focused on rapid switching between different rule sets.',
            expectedSessions: 12,
            level: 'intermediate',
            evidenceStrength: 'moderate'
        }
    ],
    focus_attention: [
        {
            id: 'fa_pomodoro_plus',
            name: 'Deep Work Intervals',
            dimension: 'focus_attention',
            priority: 'recommended',
            description: 'Building sustained attention capacity through graduated intervals.',
            expectedSessions: 15,
            level: 'beginner',
            evidenceStrength: 'moderate'
        }
    ],
    verbal_reasoning: [
        {
            id: 'vr_semantic_mapping',
            name: 'Concept Weaver',
            dimension: 'verbal_reasoning',
            priority: 'recommended',
            description: 'Visualizing relationships between complex verbal concepts.',
            expectedSessions: 10,
            level: 'intermediate',
            evidenceStrength: 'high'
        }
    ]
};

/**
 * Get protocols for a dimension
 */
function getProtocolsByDimension(dimension) {
    return INTERVENTION_PROTOCOLS[dimension] || [];
}

/**
 * Get protocol by ID
 */
function getProtocolById(id) {
    for (const dim in INTERVENTION_PROTOCOLS) {
        const protocol = INTERVENTION_PROTOCOLS[dim].find(p => p.id === id);
        if (protocol) return protocol;
    }
    return null;
}

module.exports = {
    INTERVENTION_PROTOCOLS,
    getProtocolsByDimension,
    getProtocolById
};
