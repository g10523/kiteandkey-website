/**
 * BATTERY REGISTRY
 * Central configuration for all cognitive assessment batteries
 * 
 * Each battery includes:
 * - Test items and stimuli
 * - Scoring algorithms
 * - Norm tables
 * - Adaptive logic
 */

const workingMemoryBattery = require('./workingMemoryBattery');
const processingSpeedBattery = require('./processingSpeedBattery');
const patternRecognitionBattery = require('./patternRecognitionBattery');
const spatialReasoningBattery = require('./spatialReasoningBattery');
const verbalReasoningBattery = require('./verbalReasoningBattery');
const executiveFunctionBattery = require('./executiveFunctionBattery');
const focusAttentionBattery = require('./focusAttentionBattery');
const cognitiveEnduranceBattery = require('./cognitiveEnduranceBattery');

/**
 * Battery metadata for each cognitive dimension
 */
const BATTERY_METADATA = {
    working_memory: {
        id: 'working_memory',
        name: 'Working Memory',
        description: 'Ability to hold and manipulate information in mind',
        icon: 'brain',
        color: '#10B981',
        estimatedDuration: 8,
        subtests: ['Digit Span Forward', 'Digit Span Backward'],
        module: workingMemoryBattery
    },
    processing_speed: {
        id: 'processing_speed',
        name: 'Processing Speed',
        description: 'Speed of mental operations and decision-making',
        icon: 'zap',
        color: '#F59E0B',
        estimatedDuration: 5,
        subtests: ['Symbol Search', 'Coding'],
        module: processingSpeedBattery
    },
    pattern_recognition: {
        id: 'pattern_recognition',
        name: 'Pattern Recognition',
        description: 'Ability to identify patterns and relationships',
        icon: 'grid',
        color: '#8B5CF6',
        estimatedDuration: 12,
        subtests: ['Matrix Reasoning', 'Figure Weights'],
        module: patternRecognitionBattery
    },
    spatial_reasoning: {
        id: 'spatial_reasoning',
        name: 'Spatial Reasoning',
        description: 'Mental rotation and spatial visualization',
        icon: 'box',
        color: '#06B6D4',
        estimatedDuration: 10,
        subtests: ['Block Design', 'Visual Puzzles'],
        module: spatialReasoningBattery
    },
    verbal_reasoning: {
        id: 'verbal_reasoning',
        name: 'Verbal Reasoning',
        description: 'Language comprehension and verbal logic',
        icon: 'message-square',
        color: '#EF4444',
        estimatedDuration: 10,
        subtests: ['Similarities', 'Vocabulary'],
        module: verbalReasoningBattery
    },
    executive_function: {
        id: 'executive_function',
        name: 'Executive Function',
        description: 'Planning, inhibition, and cognitive flexibility',
        icon: 'target',
        color: '#EC4899',
        estimatedDuration: 12,
        subtests: ['Stroop Test', 'Trail Making'],
        module: executiveFunctionBattery
    },
    focus_attention: {
        id: 'focus_attention',
        name: 'Focus & Attention',
        description: 'Sustained attention and vigilance',
        icon: 'eye',
        color: '#14B8A6',
        estimatedDuration: 8,
        subtests: ['Continuous Performance', 'N-Back'],
        module: focusAttentionBattery
    },
    cognitive_endurance: {
        id: 'cognitive_endurance',
        name: 'Cognitive Endurance',
        description: 'Ability to maintain performance over time',
        icon: 'trending-up',
        color: '#6366F1',
        estimatedDuration: 15,
        subtests: ['Serial Sevens', 'Mental Arithmetic'],
        module: cognitiveEnduranceBattery
    }
};

/**
 * Get battery for a specific dimension
 */
function getBattery(dimension) {
    const metadata = BATTERY_METADATA[dimension];
    if (!metadata) {
        throw new Error(`Unknown dimension: ${dimension}`);
    }
    return metadata.module;
}

/**
 * Get metadata for a dimension
 */
function getMetadata(dimension) {
    const metadata = BATTERY_METADATA[dimension];
    if (!metadata) {
        throw new Error(`Unknown dimension: ${dimension}`);
    }
    return metadata;
}

/**
 * Get all available dimensions
 */
function getAllDimensions() {
    return Object.keys(BATTERY_METADATA);
}

/**
 * Get full battery suite info
 */
function getFullBatteryInfo() {
    return {
        name: 'MindPrint Complete Battery',
        version: '1.0.0',
        totalDimensions: Object.keys(BATTERY_METADATA).length,
        estimatedDuration: Object.values(BATTERY_METADATA).reduce(
            (sum, meta) => sum + meta.estimatedDuration,
            0
        ),
        dimensions: BATTERY_METADATA
    };
}

/**
 * Validate dimension ID
 */
function isValidDimension(dimension) {
    return dimension in BATTERY_METADATA;
}

module.exports = {
    BATTERY_METADATA,
    getBattery,
    getMetadata,
    getAllDimensions,
    getFullBatteryInfo,
    isValidDimension
};
