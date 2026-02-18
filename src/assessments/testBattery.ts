import type { AssessmentTest } from './types';

export const workingMemoryTests: AssessmentTest[] = [
    {
        id: 'wm-screener',
        dimensionId: 'working_memory',
        name: 'Digit Span (Forward & Reverse)',
        level: 'screener',
        durationMinutes: 5,
        reliability: 0.82,
        validityEvidence: [
            'Strongly correlates with WISC-V Digit Span',
            'High predictive validity for mental math speed'
        ],
        materials: [
            'Stopwatch',
            'Standardized number sequences'
        ],
        instructions: [
            'I am going to say some numbers. Listen carefully, and when I am through, say them right after me.',
            'Start with 3 digits. If correct, increase by 1. Stop after two failures at the same span length.',
            'Repeat for Reverse: Now I am going to say some more numbers, but this time I want you to say them backwards.'
        ],
        scoringRubric: {
            rawScoreRange: [0, 16],
            interpretation: 'Raw score is the total number of correct trials across both forward and reverse conditions.'
        }
    },
    {
        id: 'wm-standard',
        dimensionId: 'working_memory',
        name: 'Letter-Number Sequencing',
        level: 'standard',
        durationMinutes: 10,
        reliability: 0.88,
        validityEvidence: [
            'Measures active manipulation of information',
            'Heavily loaded on the General Intelligence (g) factor'
        ],
        materials: [
            'Scoring sheet',
            'List of mixed letter-number strings'
        ],
        instructions: [
            'I am going to say a group of letters and numbers. After I say them, I want you to tell me the numbers first, in order, starting with the lowest number.',
            'Then tell me the letters in alphabetical order.',
            'Example: If I say "C - 1 - A", you should say "1 - A - C".'
        ],
        scoringRubric: {
            rawScoreRange: [0, 30],
            interpretation: 'One point for each correctly ordered sequence.'
        }
    },
    {
        id: 'wm-diagnostic',
        dimensionId: 'working_memory',
        name: 'N-Back Visual-Spatial Task',
        level: 'diagnostic',
        durationMinutes: 15,
        reliability: 0.91,
        validityEvidence: [
            'Gold standard for executive working memory',
            'Differentiates between domain-specific and domain-general memory capacity'
        ],
        materials: [
            'Computer/Tablet required',
            'Standardized visual stimuli'
        ],
        instructions: [
            'You will see a series of shapes appearing on the screen one by one.',
            'At 2-Back level: Press the button if the current shape is the same as the one shown two steps ago.',
            'Maintain focus for 5 minutes of continuous stimulation.'
        ],
        scoringRubric: {
            rawScoreRange: [0, 100],
            interpretation: 'Percentage of correct detections (hits) minus false alarms.'
        }
    }
];

export const testBattery: AssessmentTest[] = [
    ...workingMemoryTests,
    // ... other dimension tests will be added in Phase 2
];
