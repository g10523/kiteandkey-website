import type { CognitiveDimensionId } from '../assessments/types';

export interface Intervention {
    id: string;
    targetDimension: CognitiveDimensionId;
    targetPercentileRange: [number, number]; // e.g., [0, 25] for low performers
    priority: 'critical' | 'recommended' | 'enhancement';
    title: string;
    description: string;
    scientificBasis: string; // Citation
    implementation: {
        sessionStructure: string[];
        materialsNeeded: string[];
        tutorScript: string; // Exactly what to say
        warningSigns: string[]; // When to stop/adjust
    };
    expectedOutcomes: {
        timeframe: string;
        measurableTarget: string;
        reassessmentTrigger: string;
    };
    progressTracking: {
        metrics: string[];
        frequency: string;
    };
}

export const WORKING_MEMORY_INTERVENTIONS: Intervention[] = [
    {
        id: 'wm-001',
        targetDimension: 'working_memory',
        targetPercentileRange: [0, 25],
        priority: 'critical',
        title: 'Cognitive Load Externalization',
        description: 'Reduce working memory demands by offloading information to external scaffolds',
        scientificBasis: 'Gathercole & Alloway (2008) - Working Memory in the Classroom',
        implementation: {
            sessionStructure: [
                'Pre-session: Provide problem set 24hrs in advance for pre-loading',
                'Opening: Write the "goal" on a sticky note, visible throughout',
                'During: Ban multi-step oral instructions - write all steps',
                'Breaks: 2-minute consolidation every 15 minutes',
                'Closing: Student verbalizes strategy while pointing to written work'
            ],
            materialsNeeded: [
                'Whiteboard for student use (not just tutor)',
                'Graphic organizer templates',
                'Step-numbered problem cards',
                'Timer for structured breaks'
            ],
            tutorScript: "I notice you hold a lot in your mind. Let's make the paper do the remembering so your brain can do the thinking. Every step we write down is one less thing to juggle.",
            warningSigns: [
                'Student resists writing steps ("I can do it in my head")',
                'Over-reliance on scaffolds when ready for independence',
                'Frustration with slower pace'
            ]
        },
        expectedOutcomes: {
            timeframe: '6-8 weeks',
            measurableTarget: '80% accuracy on 4-step problems with written scaffolds',
            reassessmentTrigger: 'Consistent success with current scaffold level'
        },
        progressTracking: {
            metrics: ['Steps written vs. skipped', 'Accuracy by problem length', 'Self-report of mental load (1-5)'],
            frequency: 'Every session'
        }
    },
    {
        id: 'wm-002',
        targetDimension: 'working_memory',
        targetPercentileRange: [0, 25],
        priority: 'critical',
        title: 'Chunking Strategy Training',
        description: 'Teach explicit chunking to compress information into manageable units',
        scientificBasis: 'Miller (1956) - The Magical Number Seven; Ericsson et al. (1980) - Chunking in expertise',
        implementation: {
            sessionStructure: [
                'Model: Tutor thinks aloud while chunking a complex problem',
                'We: Joint chunking with tutor prompting "What goes together?"',
                'You: Student chunks independently, tutor validates logic',
                'Transfer: Apply chunking to new domain (math → reading)'
            ],
            materialsNeeded: [
                'Highlighters (3 colors)',
                'Physical "chunk" cards to manipulate',
                'Before/after problem sets showing chunking'
            ],
            tutorScript: "Your brain has a slot machine - it can only hold so many coins at once. Chunking turns 10 pennies into 1 dime. Same value, fewer slots.",
            warningSigns: [
                'Arbitrary chunking without logical grouping',
                'Chunks too large (exceeds capacity)',
                'Difficulty transferring across subjects'
            ]
        },
        expectedOutcomes: {
            timeframe: '8-10 weeks',
            measurableTarget: 'Independent chunking of 7+ item lists into 3 meaningful groups',
            reassessmentTrigger: 'Spontaneous chunking in novel problems'
        },
        progressTracking: {
            metrics: ['Items per chunk', 'Chunk coherence rating (tutor)', 'Recall accuracy after chunking'],
            frequency: 'Bi-weekly'
        }
    },
    {
        id: 'wm-003',
        targetDimension: 'working_memory',
        targetPercentileRange: [25, 50],
        priority: 'recommended',
        title: 'Strategic Redundancy',
        description: 'Build multiple representation pathways to reduce single-channel load',
        scientificBasis: 'Paivio (1986) - Dual Coding Theory; Mayer (2009) - Multimedia Learning',
        implementation: {
            sessionStructure: [
                'Present: Verbal explanation + Visual diagram simultaneously',
                'Encode: Student draws while explaining aloud',
                'Consolidate: Student teaches back using both modalities',
                'Test: Remove one modality, assess stability'
            ],
            materialsNeeded: [
                'Dual-coding worksheet templates',
                'Mini-whiteboards for student drawing',
                'Recording device for student explanations'
            ],
            tutorScript: "We're going to store this in two brain files - pictures and words. If one file gets crowded, you have a backup.",
            warningSigns: [
                'Cognitive overload from managing dual channels',
                'Preference for single modality persists',
                'Speed reduction causing frustration'
            ]
        },
        expectedOutcomes: {
            timeframe: '4-6 weeks',
            measurableTarget: 'Successful recall using either visual or verbal cue alone',
            reassessmentTrigger: 'Consistent dual-channel spontaneous use'
        },
        progressTracking: {
            metrics: ['Representation quality score', 'Transfer success rate', 'Modality preference shift'],
            frequency: 'Monthly'
        }
    },
    {
        id: 'wm-004',
        targetDimension: 'working_memory',
        targetPercentileRange: [75, 100],
        priority: 'enhancement',
        title: 'Complex Problem Solving',
        description: 'Leverage high working memory for multi-variable, open-ended challenges',
        scientificBasis: 'Sweller (1988) - Cognitive Load Theory; expertise reversal effect',
        implementation: {
            sessionStructure: [
                'Present: Ill-structured problem with 5+ variables',
                'Explore: Minimal scaffolding, student manages complexity',
                'Extend: Add constraints mid-problem (increase load)',
                'Meta: Student articulates their load management strategy'
            ],
            materialsNeeded: [
                'Open-ended problem sets',
                'Variable manipulation cards',
                'Complex system diagrams'
            ],
            tutorScript: "Your working memory is a strength. We're going to push it to expert levels by holding multiple ideas in tension simultaneously.",
            warningSigns: [
                'Overconfidence leading to careless errors',
                'Frustration when finally challenged',
                'Difficulty explaining reasoning (automatization)'
            ]
        },
        expectedOutcomes: {
            timeframe: 'Ongoing',
            measurableTarget: 'Successful navigation of 6-variable problems with 2 constraint changes',
            reassessmentTrigger: 'Mastery of current complexity level'
        },
        progressTracking: {
            metrics: ['Variables managed', 'Constraint adaptation speed', 'Strategy articulation quality'],
            frequency: 'Per challenge'
        }
    }
];
