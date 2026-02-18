import type { CognitiveDimension } from './types';

export const cognitiveDimensions: CognitiveDimension[] = [
    {
        id: 'working_memory',
        name: 'Working Memory',
        description: 'The "Mental Scratchpad"',
        definition: 'The ability to hold and manipulate information in mind over short periods. It is essential for complex tasks like mental math, reading comprehension, and multi-step directions.',
        realWorldExamples: [
            'Remembering a phone number while looking for a pen',
            'Keeping track of your place in a long sentence',
            'Mental calculation (e.g., 24 x 7)'
        ],
        neurologicalBasis: 'Primarily localized in the prefrontal cortex and the posterior parietal cortex, forming a frontoparietal network.',
        academicImpact: [
            'Math computation and word problems',
            'Following complex classroom instructions',
            'Writing essays (holding the argument while choosing words)'
        ]
    },
    {
        id: 'processing_speed',
        name: 'Processing Speed',
        description: 'Cognitive Tempo',
        definition: 'The time it takes to perceive and respond to information. Not a measure of intelligence, but of efficiency.',
        realWorldExamples: [
            'Copying notes from a board',
            'Quickly scanning a text for a specific word',
            'Responding to a question in a fast-paced conversation'
        ],
        neurologicalBasis: 'Reflects the integrity of white matter tracts and myelination within the brain.',
        academicImpact: [
            'Completing timed tests',
            'Taking notes during lectures',
            'Automaticity in basic math facts'
        ]
    },
    {
        id: 'executive_function',
        name: 'Executive Function',
        description: 'The "Chief Operating Officer"',
        definition: 'A set of mental skills that include self-regulation, planning, and task initiation. It helps the brain prioritize and achieve goals.',
        realWorldExamples: [
            'Starting a homework assignment without being nagged',
            'Breaking a large project into smaller tasks',
            'Controlling impulses in social situations'
        ],
        neurologicalBasis: 'Dorso-lateral prefrontal cortex (dlPFC) is the primary hub for executive control.',
        academicImpact: [
            'Organization of materials',
            'Planning and drafting long-form writing',
            'Managing homework deadlines'
        ]
    },
    {
        id: 'verbal_reasoning',
        name: 'Verbal Reasoning',
        description: 'Language Logic',
        definition: 'The ability to understand and reason using concepts framed in words. It involves comprehension, vocabulary, and verbal abstraction.',
        realWorldExamples: [
            'Understanding a complex analogy',
            'Inferring a character\'s motive in a novel',
            'Paraphrasing a difficult non-fiction text'
        ],
        neurologicalBasis: 'Localized in left-hemisphere networks, including Broca\'s and Wernicke\'s areas.',
        academicImpact: [
            'Reading comprehension',
            'Vocabulary acquisition',
            'Expressive writing and debate'
        ]
    },
    {
        id: 'spatial_reasoning',
        name: 'Spatial Reasoning',
        description: 'Mental Architecture',
        definition: 'The ability to visualize and manipulate 2D and 3D objects in the mind\'s eye.',
        realWorldExamples: [
            'Reading a map',
            'Solving a puzzle or building a LEGO set',
            'Mentally rotating a shape'
        ],
        neurologicalBasis: 'Largely managed by the right posterior parietal lobe.',
        academicImpact: [
            'Geometry and advanced mathematics',
            'Understanding diagrams in Science',
            'Art and design tasks'
        ]
    },
    {
        id: 'pattern_recognition',
        name: 'Pattern Recognition',
        description: 'Abstract Logic',
        definition: 'The ability to perceive logical sequences and relationships between non-verbal objects.',
        realWorldExamples: [
            'Recognizing a trend in a graph',
            'Identifying the next shape in a series',
            'Debugging code by spotting recurring errors'
        ],
        neurologicalBasis: 'Involves the lateral prefrontal cortex and ventral visual stream.',
        academicImpact: [
            'Mathematical problem solving',
            'Scientific method and hypothesis testing',
            'Computer programming'
        ]
    },
    {
        id: 'focus_attention',
        name: 'Focus & Attention',
        description: 'Sustained Concentration',
        definition: 'The ability to maintain focus on a single task while filtering out distractions over a period of time.',
        realWorldExamples: [
            'Reading a book for 30 minutes without checking a phone',
            'Listening to a teacher in a noisy classroom',
            'Focusing on a test for its entire duration'
        ],
        neurologicalBasis: 'Regulated by the Ascending Reticular Activating System (ARAS) and the thalamic reticular nucleus.',
        academicImpact: [
            'Consistency in work quality',
            'Absorbing information during lessons',
            'Avoiding "careless errors"'
        ]
    },
    {
        id: 'cognitive_endurance',
        name: 'Cognitive Endurance',
        description: 'Mental Stamina',
        definition: 'The capacity to maintain peak cognitive performance throughout long or demanding periods of mental effort.',
        realWorldExamples: [
            'Maintaining sharp thinking in the final hour of a 3-hour exam',
            'Studying effectively high-focus subjects back-to-back',
            'Retaining focus at the end of a long school day'
        ],
        neurologicalBasis: 'Linked to metabolic efficiency in the brain and the anterior cingulate cortex\'s assessment of effort.',
        academicImpact: [
            'Performance in long examinations',
            'Late-afternoon academic productivity',
            'Sustained effort on complex term projects'
        ]
    }
];
