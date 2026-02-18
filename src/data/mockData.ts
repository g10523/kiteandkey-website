// ============================================
// MOCK DATA - KITE & KEY ACADEMY LMS
// Realistic Year 8 Student: Joshua Helvadjian
// ============================================

import type {
    Student,
    Subject,
    Assignment,
    TutoringSession,
    Message,
    AnalyticsData,
    Resource,
    Unit,
    RegistrationToken
} from '../types';
import { englishYear5 } from './courses/englishYear5';

// ============================================
// STUDENT PROFILE
// ============================================

export const currentStudent: Student = {
    id: 'student-001',
    role: 'student',
    firstName: 'Joshua',
    lastName: 'Helvadjian',
    email: 'joshua.helvadjian@student.kiteandkey.edu.au',
    yearLevel: 8,
    enrolledSubjects: ['english-8', 'mathematics-8', 'science-8'],
    mindPrintProfile: {
        type: 'Pattern-First Strategist',
        category: 'Strategic',
        description: 'Joshua possesses a "Pattern-First" cognitive architecture. He excels at identifying the underlying systems governing a topic before engaging with the mechanical details. Unlike procedural learners who thrive on step-by-step instructions, Joshua must understand the "why" and the "structure" to effectively retain the "how".',
        secondaryTraits: ['Narrative Connector', 'Abstract Synthesiser'],
        frictionPoints: [
            'Rote memorisation without context',
            'Repetitive drills before conceptual mastery',
            'Disjointed facts lacking a unifying framework'
        ],
        strengths: [
            'Rapid system identification',
            'Cross-context application of logic',
            'Deep retention once concepts are locked',
            'Predictive reasoning'
        ],
        cognitiveScores: {
            conceptVsProcedural: 85,
            visualVsVerbal: 72,
            speedVsDepth: 78,
            structureTolerance: 45,
            errorSensitivity: 60
        },
        learningPreferences: {
            visualLearning: 85,
            auditoryLearning: 45,
            kinestheticLearning: 40,
            readingWriting: 65
        },
        lessonAdaptations: {
            standardApproach: {
                explanation: 'Step-by-step rules (e.g., "First do X, then do Y").',
                reasoning: 'Focus on correct execution sequence.',
                visuals: 'Standard working tables or checklists.',
                tone: 'Instructional and imperative.'
            },
            adaptedApproach: {
                explanation: 'Global overview first (e.g., "Here is the entire system").',
                reasoning: 'Focus on why the steps exist and how they link.',
                visuals: 'Flowcharts and system diagrams.',
                tone: 'Analytical and collaborative.'
            },
            comparisonReasoning: 'Standard lessons fragment information, which causes Joshua to disengage. The adapted approach provides the "cognitive hanger" he needs to place the details upon.'
        },
        todaysAdaptation: {
            emphasize: [
                'The "Macro Structure" of the essay before writing',
                'Visual mapping of argument flow'
            ],
            minimize: [
                'Line-by-line sentence drills',
                'Isolated vocabulary lists'
            ],
            pacing: 'Slower initial setup phase to allow framework building, then accelerated execution.',
            checkIns: [
                'Confirm understanding of the central thesis logic',
                'Check for "drift" in the middle paragraphs'
            ],
            misconceptionAlerts: [
                'May over-complicate the introduction—remind to keep the thesis simple.'
            ]
        },
        feedbackInterpretation: {
            mistakeType: 'Skipped intermediate working steps in Algebra',
            cognitiveRootCause: 'Joshua solved the pattern mentally and deemed writing it down redundant.',
            standardFeedback: 'Show your working. You will lose marks for skipping steps.',
            mindPrintFeedback: 'You correctly identified the pattern, but the examiner needs to see the "proof of logic". Treat the working as a map for others to follow your brilliance.',
            correctionStrategy: 'Frame "showing work" as a communication skill, not a compliance task.'
        },
        revisionStrategy: {
            bestSequence: 'Broad Concept Review → Deep Dive into Mechanics → Synthesis',
            sessionLength: '45-minute deep work blocks (needs time to enter flow)',
            recommendedTools: [
                'Mind Maps / System Diagrams',
                'Feynman Technique (Teaching it back)',
                'Comparative Analysis Tables'
            ],
            examStrategy: 'Scan the entire paper first to build a mental map. Tackle complex problem-solving questions before rote procedure questions.'
        },
        growthView: {
            stableTraits: [
                'Preference for "Why" over "How"',
                'Visual-spatial reasoning speed'
            ],
            trainableTraits: [
                'Tolerance for procedural repetition',
                'Detail-oriented checking routines'
            ],
            compoundingEffect: 'By consistently anchoring new knowledge to existing mental models, Joshua is building a dense, interconnected web of understanding that will exponentially increase his ability to learn advanced topics in Year 10-12.',
            higherOrderOutcome: 'Developing into a Systems Thinker capable of solving novel complexity, rather than just a Process Follower.'
        },
        recommendations: [
            'Always start with the big picture',
            'Use visual frameworks to organize notes',
            'Focus on the logic, not just the steps',
            'Connect new topics to what you already know'
        ]
    }
};

export const mockTokens: RegistrationToken[] = [
    {
        id: 'token-001',
        code: 'K&K-STUDENT-2026',
        role: 'student',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        isUsed: false
    },
    {
        id: 'token-002',
        code: 'K&K-TUTOR-2026',
        role: 'tutor',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        isUsed: false
    },
    {
        id: 'token-003',
        code: 'K&K-PARENT-2026',
        role: 'parent',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        isUsed: false
    },
    {
        id: 'token-004',
        code: 'K&K-ADMIN-2026',
        role: 'admin',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        isUsed: false
    }
];

// ============================================
// SUBJECTS & CURRICULUM
// ============================================

export const subjects: Subject[] = [
    englishYear5,  // Year 5 English - Informative & Persuasive Texts
    {
        id: 'english-8',
        name: 'English',
        yearLevel: 8,
        description: 'NSW Curriculum - Year 8 English',
        icon: 'BookOpen',
        color: '#a78bfa',
        progress: 68,
        currentUnit: 'Persuasive Writing & Rhetoric',
        totalUnits: 6,
        completedUnits: 4,
        confidenceLevel: 'high',
        units: [] // Will be populated below
    },
    {
        id: 'mathematics-8',
        name: 'Mathematics',
        yearLevel: 8,
        description: 'NSW Curriculum - Year 8 Mathematics',
        icon: 'Calculator',
        color: '#93c5fd',
        progress: 72,
        currentUnit: 'Linear Relationships',
        totalUnits: 8,
        completedUnits: 5,
        confidenceLevel: 'high',
        units: []
    },
    {
        id: 'science-8',
        name: 'Science',
        yearLevel: 8,
        description: 'NSW Curriculum - Year 8 Science',
        icon: 'Microscope',
        color: '#86efac',
        progress: 61,
        currentUnit: 'Chemical Reactions',
        totalUnits: 6,
        completedUnits: 3,
        confidenceLevel: 'medium',
        units: []
    }
];

// ============================================
// ENGLISH - UNITS & LESSONS
// ============================================

const englishUnits: Unit[] = [
    {
        id: 'eng-unit-1',
        subjectId: 'english-8',
        title: 'Narrative Techniques',
        description: 'Exploring character development, plot structure, and narrative voice',
        order: 1,
        isLocked: false,
        progress: 100,
        lessons: [
            {
                id: 'eng-lesson-1-1',
                unitId: 'eng-unit-1',
                title: 'Character Development',
                description: 'Understanding how authors create complex, believable characters',
                order: 1,
                duration: 45,
                isCompleted: true,
                isLocked: false,
                learningObjectives: [
                    'Identify direct and indirect characterization techniques',
                    'Analyze how characters change throughout a narrative',
                    'Understand the relationship between character and conflict'
                ],
                whyItMatters: 'Strong character development is the foundation of compelling storytelling. Understanding how characters are crafted helps you both analyze literature more deeply and create your own engaging narratives.',
                content: {
                    sections: [
                        {
                            type: 'explanation',
                            title: 'What is Character Development?',
                            content: 'Character development is the process by which an author reveals a character\'s personality, motivations, and growth throughout a story. Authors use two main techniques: direct characterization (explicitly telling us about a character) and indirect characterization (showing us through actions, dialogue, thoughts, and interactions).'
                        },
                        {
                            type: 'example',
                            title: 'Characterization in Action',
                            content: 'Consider these two approaches:\n\nDirect: "Sarah was a brave and determined student."\n\nIndirect: "Sarah took a deep breath, squared her shoulders, and walked into the principal\'s office to defend her friend, even though her hands were shaking."',
                            examples: [
                                'The indirect approach shows us Sarah\'s bravery through her actions',
                                'We see her determination in her physical gestures',
                                'Her shaking hands reveal her humanity and make her courage more real'
                            ]
                        }
                    ]
                },
                isVisibleToStudent: true,
                quiz: {
                    id: 'quiz-eng-1-1',
                    lessonId: 'eng-lesson-1-1',
                    title: 'Character Development Quiz',
                    description: 'Test your understanding of direct and indirect characterization techniques',
                    timeLimit: 15,
                    passingScore: 70,
                    isRequired: true,
                    isVisibleToStudent: true,
                    maxAttempts: 3,
                    attempts: [
                        {
                            id: 'quiz-attempt-1',
                            quizId: 'quiz-eng-1-1',
                            studentId: 'student-001',
                            startedAt: new Date('2026-01-10T14:30:00'),
                            completedAt: new Date('2026-01-10T14:42:00'),
                            score: 85,
                            answers: {
                                'q1': 1,
                                'q2': 'Actions, dialogue, thoughts, appearance, and interactions with others',
                                'q3': 0,
                                'q4': 1,
                                'q5': 'The shaking hands show vulnerability, making her courage more realistic and relatable'
                            },
                            timeSpent: 720,
                            isPassed: true
                        }
                    ],
                    questions: [
                        {
                            id: 'q1',
                            question: 'Which of the following is an example of DIRECT characterization?',
                            type: 'multiple-choice',
                            options: [
                                'The character slammed the door and stormed out of the room.',
                                'The narrator states: "Marcus was the most generous person in the village."',
                                'She carefully counted her coins before deciding what to buy.',
                                'His friends always came to him when they needed advice.'
                            ],
                            correctAnswer: 1,
                            explanation: 'Direct characterization occurs when the author explicitly tells us about a character\'s traits. The narrator directly stating "Marcus was the most generous person" is a clear example.',
                            difficulty: 'easy'
                        },
                        {
                            id: 'q2',
                            question: 'List at least THREE methods authors use for indirect characterization.',
                            type: 'short-answer',
                            correctAnswer: 'Actions, dialogue, thoughts, appearance, and interactions with others',
                            explanation: 'Indirect characterization reveals character through: actions (what they do), dialogue (what they say), thoughts (what they think), appearance (how they look), and interactions (how others respond to them). This is sometimes remembered as STEAL: Speech, Thoughts, Effects on others, Actions, Looks.',
                            difficulty: 'medium'
                        },
                        {
                            id: 'q3',
                            question: 'In the example "Sarah took a deep breath, squared her shoulders, and walked into the principal\'s office to defend her friend, even though her hands were shaking," what does the detail about shaking hands reveal?',
                            type: 'multiple-choice',
                            options: [
                                'That Sarah is weak and shouldn\'t be defending her friend',
                                'That Sarah is nervous but acting courageously despite her fear',
                                'That Sarah is cold and needs a jacket',
                                'That Sarah is angry at the principal'
                            ],
                            correctAnswer: 1,
                            explanation: 'The shaking hands show Sarah\'s nervousness, but the fact that she proceeds anyway demonstrates true courage—acting despite fear, not without it. This makes her more realistic and relatable.',
                            difficulty: 'medium'
                        },
                        {
                            id: 'q4',
                            question: 'True or False: Indirect characterization is generally more engaging than direct characterization because it allows readers to draw their own conclusions.',
                            type: 'true-false',
                            options: ['True', 'False'],
                            correctAnswer: 0,
                            explanation: 'True. Indirect characterization engages readers by showing rather than telling, allowing them to actively participate in understanding the character. This creates a more immersive reading experience.',
                            difficulty: 'easy'
                        },
                        {
                            id: 'q5',
                            question: 'Why is the detail about Sarah\'s "shaking hands" important to her characterization? Explain in 1-2 sentences.',
                            type: 'short-answer',
                            correctAnswer: 'The shaking hands show vulnerability, making her courage more realistic and relatable',
                            explanation: 'The shaking hands reveal Sarah\'s humanity and fear, which makes her brave action more meaningful. True courage is acting despite fear, not without it. This detail prevents her from seeming unrealistically perfect.',
                            difficulty: 'hard'
                        }
                    ]
                }
            },
            {
                id: 'eng-lesson-1-2',
                unitId: 'eng-unit-1',
                title: 'Plot Structure & Story Arcs',
                description: 'Mastering the five-act structure and narrative pacing',
                order: 2,
                duration: 50,
                isCompleted: true,
                isLocked: false,
                learningObjectives: [
                    'Identify the five stages of plot structure',
                    'Understand how tension builds throughout a narrative',
                    'Recognize different types of conflict'
                ],
                whyItMatters: 'Every story you\'ve ever loved follows a structure that creates emotional engagement. Understanding this structure gives you the tools to analyze any narrative and craft your own compelling stories.',
                content: {
                    sections: [
                        {
                            type: 'explanation',
                            title: 'The Five-Act Structure',
                            content: 'Most narratives follow a pattern: Exposition (introduction), Rising Action (building tension), Climax (turning point), Falling Action (consequences), and Resolution (conclusion). This structure mirrors how we naturally experience and process stories.'
                        }
                    ]
                },
                isVisibleToStudent: true,
                quiz: {
                    id: 'quiz-eng-1-2',
                    lessonId: 'eng-lesson-1-2',
                    title: 'Plot Structure Quiz',
                    description: 'Demonstrate your understanding of narrative structure and story arcs',
                    timeLimit: 20,
                    passingScore: 70,
                    isRequired: true,
                    isVisibleToStudent: true,
                    maxAttempts: 3,
                    attempts: [],
                    questions: [
                        {
                            id: 'q1',
                            question: 'What is the primary purpose of the EXPOSITION in a story?',
                            type: 'multiple-choice',
                            options: [
                                'To resolve all conflicts and end the story',
                                'To introduce characters, setting, and the initial situation',
                                'To present the most intense moment of conflict',
                                'To show the consequences of the climax'
                            ],
                            correctAnswer: 1,
                            explanation: 'The exposition establishes the story\'s foundation by introducing who the characters are, where and when the story takes place, and what the initial situation is before conflict arises.',
                            difficulty: 'easy'
                        },
                        {
                            id: 'q2',
                            question: 'At which point in the plot structure does the protagonist face their greatest challenge or make a crucial decision?',
                            type: 'multiple-choice',
                            options: [
                                'Exposition',
                                'Rising Action',
                                'Climax',
                                'Resolution'
                            ],
                            correctAnswer: 2,
                            explanation: 'The climax is the turning point of the story where tension reaches its peak and the protagonist faces their greatest challenge. This is the moment of highest dramatic intensity.',
                            difficulty: 'easy'
                        },
                        {
                            id: 'q3',
                            question: 'Arrange these plot elements in the correct order: A) Resolution, B) Rising Action, C) Climax, D) Exposition, E) Falling Action',
                            type: 'short-answer',
                            correctAnswer: 'D, B, C, E, A',
                            explanation: 'The correct narrative structure flows: Exposition (introduction) → Rising Action (building tension) → Climax (turning point) → Falling Action (consequences) → Resolution (conclusion).',
                            difficulty: 'medium'
                        },
                        {
                            id: 'q4',
                            question: 'True or False: The rising action should include multiple complications or obstacles that increase tension.',
                            type: 'true-false',
                            options: ['True', 'False'],
                            correctAnswer: 0,
                            explanation: 'True. The rising action builds tension through a series of complications, conflicts, and obstacles that escalate toward the climax. Each event should raise the stakes.',
                            difficulty: 'medium'
                        }
                    ]
                }
            }
        ],
        checkpoint: {
            id: 'eng-checkpoint-1',
            unitId: 'eng-unit-1',
            title: 'Narrative Techniques Checkpoint',
            description: 'Test your understanding of character development and plot structure',
            questions: [],
            passingScore: 70,
            attempts: [
                {
                    id: 'attempt-1',
                    date: new Date('2026-01-10'),
                    score: 85,
                    answers: {},
                    timeSpent: 1200
                }
            ],
            isUnlocked: true
        }
    },
    {
        id: 'eng-unit-2',
        subjectId: 'english-8',
        title: 'Poetry Analysis',
        description: 'Understanding poetic devices, structure, and interpretation',
        order: 2,
        isLocked: false,
        progress: 100,
        lessons: [],
        checkpoint: {
            id: 'eng-checkpoint-2',
            unitId: 'eng-unit-2',
            title: 'Poetry Analysis Checkpoint',
            description: 'Demonstrate your ability to analyze poetic techniques',
            questions: [],
            passingScore: 70,
            attempts: [
                {
                    id: 'attempt-2',
                    date: new Date('2026-01-12'),
                    score: 92,
                    answers: {},
                    timeSpent: 1080
                }
            ],
            isUnlocked: true
        }
    },
    {
        id: 'eng-unit-3',
        subjectId: 'english-8',
        title: 'Persuasive Writing & Rhetoric',
        description: 'Crafting compelling arguments and understanding rhetorical devices',
        order: 3,
        isLocked: false,
        progress: 65,
        lessons: [
            {
                id: 'eng-lesson-3-1',
                unitId: 'eng-unit-3',
                title: 'Understanding Rhetoric',
                description: 'The art of persuasion through ethos, pathos, and logos',
                order: 1,
                duration: 45,
                isCompleted: true,
                isLocked: false,
                learningObjectives: [
                    'Define and identify ethos, pathos, and logos',
                    'Understand how rhetorical appeals work together',
                    'Recognize rhetoric in everyday communication'
                ],
                whyItMatters: 'Rhetoric isn\'t just about formal speeches—it\'s how we persuade others every day. Understanding these techniques helps you communicate more effectively and recognize when others are trying to persuade you.',
                content: {
                    sections: [
                        {
                            type: 'explanation',
                            title: 'The Three Pillars of Persuasion',
                            content: 'Ancient Greek philosopher Aristotle identified three modes of persuasion:\n\nEthos (credibility): Establishing trust and authority\nPathos (emotion): Appealing to feelings and values\nLogos (logic): Using reason and evidence\n\nEffective persuasion typically combines all three.'
                        }
                    ]
                }
            },
            {
                id: 'eng-lesson-3-2',
                unitId: 'eng-unit-3',
                title: 'Building Strong Arguments',
                description: 'Structuring persuasive essays with clear claims and evidence',
                order: 2,
                duration: 50,
                isCompleted: false,
                isLocked: false,
                learningObjectives: [
                    'Construct clear thesis statements',
                    'Support claims with relevant evidence',
                    'Address counterarguments effectively'
                ],
                whyItMatters: 'Whether you\'re writing an essay, debating a point, or advocating for change, the ability to build and defend an argument is essential for academic success and civic participation.',
                content: {
                    sections: [
                        {
                            type: 'explanation',
                            title: 'The Anatomy of an Argument',
                            content: 'A strong argument has three essential components:\n\n1. Claim: Your position or thesis\n2. Evidence: Facts, examples, and expert opinions that support your claim\n3. Reasoning: The logical connection between your evidence and claim\n\nThe strongest arguments also acknowledge and refute counterarguments.'
                        }
                    ]
                }
            }
        ]
    },
    {
        id: 'eng-unit-4',
        subjectId: 'english-8',
        title: 'Media Literacy',
        description: 'Analyzing how media shapes meaning and influences audiences',
        order: 4,
        isLocked: false,
        progress: 0,
        lessons: []
    },
    {
        id: 'eng-unit-5',
        subjectId: 'english-8',
        title: 'Shakespeare Study',
        description: 'Exploring themes, language, and context in Shakespearean drama',
        order: 5,
        isLocked: true,
        progress: 0,
        lessons: []
    },
    {
        id: 'eng-unit-6',
        subjectId: 'english-8',
        title: 'Creative Writing',
        description: 'Developing your own narrative voice and style',
        order: 6,
        isLocked: true,
        progress: 0,
        lessons: []
    }
];

// ============================================
// MATHEMATICS - UNITS & LESSONS
// ============================================

const mathematicsUnits: Unit[] = [
    {
        id: 'math-unit-1',
        subjectId: 'mathematics-8',
        title: 'Number & Algebra Foundations',
        description: 'Integers, fractions, decimals, and algebraic thinking',
        order: 1,
        isLocked: false,
        progress: 100,
        lessons: []
    },
    {
        id: 'math-unit-2',
        subjectId: 'mathematics-8',
        title: 'Ratios & Proportional Reasoning',
        description: 'Understanding relationships between quantities',
        order: 2,
        isLocked: false,
        progress: 100,
        lessons: []
    },
    {
        id: 'math-unit-3',
        subjectId: 'mathematics-8',
        title: 'Linear Relationships',
        description: 'Graphing, equations, and understanding rate of change',
        order: 3,
        isLocked: false,
        progress: 78,
        lessons: [
            {
                id: 'math-lesson-3-1',
                unitId: 'math-unit-3',
                title: 'Introduction to Linear Equations',
                description: 'Understanding y = mx + b and what it represents',
                order: 1,
                duration: 45,
                isCompleted: true,
                isLocked: false,
                learningObjectives: [
                    'Understand the components of a linear equation',
                    'Identify slope and y-intercept from an equation',
                    'Recognize linear relationships in real-world contexts'
                ],
                whyItMatters: 'Linear relationships appear everywhere in real life—from calculating costs to predicting trends. Understanding them gives you a powerful tool for modeling and solving real-world problems.',
                content: {
                    sections: [
                        {
                            type: 'explanation',
                            title: 'What is a Linear Equation?',
                            content: 'A linear equation describes a straight-line relationship between two variables. The standard form is y = mx + b, where:\n\nm = slope (rate of change)\nb = y-intercept (starting value)\n\nThis simple equation can model countless real-world situations.'
                        },
                        {
                            type: 'example',
                            title: 'Real-World Example',
                            content: 'Imagine a phone plan that costs $30 per month plus $0.10 per text message.\n\nCost = 0.10(messages) + 30\n\nThis is a linear equation where:\n• Slope (m) = $0.10 per message\n• Y-intercept (b) = $30 base cost',
                            examples: [
                                'If you send 100 messages: Cost = 0.10(100) + 30 = $40',
                                'If you send 200 messages: Cost = 0.10(200) + 30 = $50',
                                'The relationship is linear because each message costs the same amount'
                            ]
                        }
                    ]
                }
            },
            {
                id: 'math-lesson-3-2',
                unitId: 'math-unit-3',
                title: 'Graphing Linear Equations',
                description: 'Visualizing linear relationships on the coordinate plane',
                order: 2,
                duration: 50,
                isCompleted: true,
                isLocked: false,
                learningObjectives: [
                    'Plot points on a coordinate plane',
                    'Graph linear equations using slope and y-intercept',
                    'Interpret graphs in context'
                ],
                whyItMatters: 'Graphs transform abstract equations into visual stories. Being able to read and create graphs helps you understand data, make predictions, and communicate mathematical ideas clearly.',
                content: {
                    sections: [
                        {
                            type: 'explanation',
                            title: 'From Equation to Graph',
                            content: 'To graph y = mx + b:\n\n1. Start at the y-intercept (b) on the y-axis\n2. Use the slope (m) to find the next point\n3. Connect the points with a straight line\n\nThe slope tells you how steep the line is and which direction it goes.'
                        }
                    ]
                }
            },
            {
                id: 'math-lesson-3-3',
                unitId: 'math-unit-3',
                title: 'Solving Linear Equations',
                description: 'Finding unknown values using algebraic techniques',
                order: 3,
                duration: 45,
                isCompleted: false,
                isLocked: false,
                learningObjectives: [
                    'Apply inverse operations to solve equations',
                    'Check solutions by substitution',
                    'Solve multi-step linear equations'
                ],
                whyItMatters: 'Solving equations is like being a mathematical detective—you use logical steps to find unknown values. This skill is fundamental to all higher mathematics and scientific problem-solving.',
                content: {
                    sections: [
                        {
                            type: 'explanation',
                            title: 'The Balance Method',
                            content: 'Think of an equation as a balanced scale. Whatever you do to one side, you must do to the other to keep it balanced.\n\nTo solve for x, use inverse operations to isolate the variable:\n• Addition ↔ Subtraction\n• Multiplication ↔ Division'
                        }
                    ]
                }
            }
        ]
    },
    {
        id: 'math-unit-4',
        subjectId: 'mathematics-8',
        title: 'Geometry & Measurement',
        description: 'Area, volume, and geometric reasoning',
        order: 4,
        isLocked: false,
        progress: 0,
        lessons: []
    },
    {
        id: 'math-unit-5',
        subjectId: 'mathematics-8',
        title: 'Statistics & Probability',
        description: 'Data analysis and understanding chance',
        order: 5,
        isLocked: true,
        progress: 0,
        lessons: []
    },
    {
        id: 'math-unit-6',
        subjectId: 'mathematics-8',
        title: 'Pythagoras & Trigonometry',
        description: 'Right-angled triangles and spatial reasoning',
        order: 6,
        isLocked: true,
        progress: 0,
        lessons: []
    }
];

// ============================================
// SCIENCE - UNITS & LESSONS
// ============================================

const scienceUnits: Unit[] = [
    {
        id: 'sci-unit-1',
        subjectId: 'science-8',
        title: 'Cells & Body Systems',
        description: 'Understanding the building blocks of life',
        order: 1,
        isLocked: false,
        progress: 100,
        lessons: []
    },
    {
        id: 'sci-unit-2',
        subjectId: 'science-8',
        title: 'Energy & Motion',
        description: 'Forces, energy transfer, and the laws of motion',
        order: 2,
        isLocked: false,
        progress: 100,
        lessons: []
    },
    {
        id: 'sci-unit-3',
        subjectId: 'science-8',
        title: 'Chemical Reactions',
        description: 'How substances interact and transform',
        order: 3,
        isLocked: false,
        progress: 55,
        lessons: [
            {
                id: 'sci-lesson-3-1',
                unitId: 'sci-unit-3',
                title: 'Introduction to Chemical Reactions',
                description: 'What happens when substances combine or break apart',
                order: 1,
                duration: 50,
                isCompleted: true,
                isLocked: false,
                learningObjectives: [
                    'Define chemical reactions and distinguish them from physical changes',
                    'Identify signs that a chemical reaction has occurred',
                    'Understand the law of conservation of mass'
                ],
                whyItMatters: 'Chemical reactions are happening all around you—from cooking food to your body digesting nutrients. Understanding these processes helps you make sense of the natural world and human technology.',
                content: {
                    sections: [
                        {
                            type: 'explanation',
                            title: 'What is a Chemical Reaction?',
                            content: 'A chemical reaction occurs when substances (reactants) interact to form new substances (products) with different properties. Unlike physical changes (like melting ice), chemical reactions create new molecules.\n\nKey concept: In any chemical reaction, atoms are rearranged but never created or destroyed (Law of Conservation of Mass).'
                        },
                        {
                            type: 'example',
                            title: 'Everyday Chemical Reactions',
                            content: 'Baking a cake involves multiple chemical reactions:\n• Baking soda + acid → carbon dioxide gas (makes it rise)\n• Proteins in eggs change structure when heated\n• Sugars caramelize at high temperatures\n\nThese reactions are irreversible—you can\'t "unbake" a cake!',
                            examples: [
                                'Rust forming on iron (iron + oxygen → iron oxide)',
                                'Photosynthesis in plants (CO₂ + water + light → glucose + oxygen)',
                                'Burning wood (wood + oxygen → ash + smoke + heat)'
                            ]
                        }
                    ]
                }
            },
            {
                id: 'sci-lesson-3-2',
                unitId: 'sci-unit-3',
                title: 'Types of Chemical Reactions',
                description: 'Synthesis, decomposition, and displacement reactions',
                order: 2,
                duration: 45,
                isCompleted: true,
                isLocked: false,
                learningObjectives: [
                    'Classify reactions by type',
                    'Predict products of simple reactions',
                    'Write word equations for chemical reactions'
                ],
                whyItMatters: 'Recognizing patterns in chemical reactions helps scientists predict outcomes, design new materials, and solve problems from medicine to environmental science.',
                content: {
                    sections: [
                        {
                            type: 'explanation',
                            title: 'Four Main Types of Reactions',
                            content: '1. Synthesis: A + B → AB (combining)\n2. Decomposition: AB → A + B (breaking apart)\n3. Single Displacement: A + BC → AC + B (one swap)\n4. Double Displacement: AB + CD → AD + CB (two swaps)\n\nEach type follows predictable patterns.'
                        }
                    ]
                }
            },
            {
                id: 'sci-lesson-3-3',
                unitId: 'sci-unit-3',
                title: 'Balancing Chemical Equations',
                description: 'Ensuring atoms are conserved in reactions',
                order: 3,
                duration: 50,
                isCompleted: false,
                isLocked: false,
                learningObjectives: [
                    'Understand why equations must be balanced',
                    'Balance simple chemical equations',
                    'Interpret coefficients in balanced equations'
                ],
                whyItMatters: 'Balanced equations are the language of chemistry. They tell us exactly how much of each substance is needed and produced—essential for everything from cooking recipes to industrial manufacturing.',
                content: {
                    sections: [
                        {
                            type: 'explanation',
                            title: 'The Balancing Act',
                            content: 'Chemical equations must be balanced because atoms cannot be created or destroyed. The number of each type of atom must be the same on both sides of the equation.\n\nWe balance equations by adding coefficients (numbers in front of molecules), never by changing subscripts (which would change the substance itself).'
                        }
                    ]
                }
            }
        ]
    },
    {
        id: 'sci-unit-4',
        subjectId: 'science-8',
        title: 'Earth & Space Systems',
        description: 'Plate tectonics, rock cycle, and Earth\'s place in the universe',
        order: 4,
        isLocked: false,
        progress: 0,
        lessons: []
    },
    {
        id: 'sci-unit-5',
        subjectId: 'science-8',
        title: 'Ecosystems & Sustainability',
        description: 'Understanding interactions in nature and human impact',
        order: 5,
        isLocked: true,
        progress: 0,
        lessons: []
    },
    {
        id: 'sci-unit-6',
        subjectId: 'science-8',
        title: 'Scientific Investigation',
        description: 'Designing experiments and analyzing data',
        order: 6,
        isLocked: true,
        progress: 0,
        lessons: []
    }
];

// Assign units to subjects
subjects[0].units = englishUnits;
subjects[1].units = mathematicsUnits;
subjects[2].units = scienceUnits;

// ============================================
// ASSIGNMENTS
// ============================================

export const assignments: Assignment[] = [
    {
        id: 'assign-1',
        subjectId: 'english-8',
        title: 'Persuasive Essay: Climate Action',
        description: 'Write a 500-word persuasive essay arguing for or against a specific climate policy. Use ethos, pathos, and logos effectively.',
        dueDate: new Date('2026-01-20'),
        status: 'in-progress',
        attachments: []
    },
    {
        id: 'assign-2',
        subjectId: 'mathematics-8',
        title: 'Linear Equations Problem Set',
        description: 'Complete problems 1-20 on linear equations worksheet. Show all working.',
        dueDate: new Date('2026-01-18'),
        status: 'not-started',
        attachments: []
    },
    {
        id: 'assign-3',
        subjectId: 'science-8',
        title: 'Chemical Reactions Lab Report',
        description: 'Write up your findings from the vinegar and baking soda experiment. Include hypothesis, method, results, and conclusion.',
        dueDate: new Date('2026-01-22'),
        status: 'not-started',
        attachments: []
    },
    {
        id: 'assign-4',
        subjectId: 'english-8',
        title: 'Poetry Analysis: "The Road Not Taken"',
        description: 'Analyze Robert Frost\'s poem, identifying poetic devices and interpreting meaning.',
        dueDate: new Date('2026-01-08'),
        submittedDate: new Date('2026-01-07'),
        status: 'graded',
        grade: 88,
        feedback: 'Excellent analysis of metaphor and symbolism. Your interpretation of the poem\'s ambiguity was particularly insightful. To improve: consider how the poem\'s form (stanzas, rhyme scheme) contributes to its meaning.',
        attachments: []
    }
];

// ============================================
// TUTORING SESSIONS
// ============================================

export const tutoringSessions: TutoringSession[] = [
    {
        id: 'session-1',
        subjectId: 'mathematics-8',
        tutorName: 'Philo Daoud',
        date: new Date('2026-01-16T16:00:00'),
        duration: 60,
        type: 'small-group',
        status: 'upcoming',
        location: 'Room 3B'
    },
    {
        id: 'session-2',
        subjectId: 'english-8',
        tutorName: 'Lucia Han',
        date: new Date('2026-01-17T15:30:00'),
        duration: 45,
        type: 'individual',
        status: 'upcoming',
        location: 'Room 2A'
    },
    {
        id: 'session-3',
        subjectId: 'science-8',
        tutorName: 'Gihan Wijemanne',
        date: new Date('2026-01-13T16:00:00'),
        duration: 60,
        type: 'small-group',
        status: 'completed',
        notes: 'Covered balancing chemical equations. Joshua showed strong conceptual understanding. Recommended: more practice with complex equations.',
        location: 'Science Lab 1'
    }
];

// ============================================
// MESSAGES
// ============================================

export const messages: Message[] = [
    {
        id: 'msg-1',
        from: 'Lucia Han',
        fromRole: 'tutor',
        subject: 'Great work on your poetry analysis!',
        body: 'Hi Joshua,\n\nI just finished grading your Robert Frost analysis and I\'m really impressed! Your interpretation of the poem\'s ambiguity was particularly insightful. You clearly understand that the poem isn\'t just about choosing a path, but about how we construct narratives about our choices.\n\nFor your next analysis, I\'d love to see you also consider how the poem\'s form contributes to its meaning. Think about why Frost chose this particular rhyme scheme and stanza structure.\n\nKeep up the excellent work!\n\nBest,\nLucia',
        date: new Date('2026-01-14T10:30:00'),
        isRead: true,
        attachments: []
    },
    {
        id: 'msg-2',
        from: 'Philo Daoud',
        fromRole: 'tutor',
        subject: 'Reminder: Tutoring session Thursday',
        body: 'Hi Joshua,\n\nJust a reminder that we have our small-group tutoring session this Thursday at 4:00 PM in Room 3B. We\'ll be working on solving linear equations and tackling some real-world application problems.\n\nPlease bring your textbook and the problem set from last week.\n\nSee you then!\n\nPhilo',
        date: new Date('2026-01-14T14:15:00'),
        isRead: false,
        attachments: []
    },
    {
        id: 'msg-3',
        from: 'Kite & Key Academy',
        fromRole: 'system',
        subject: 'New resources available: Persuasive Writing Guide',
        body: 'New learning resources have been added to your Resources library:\n\n• Persuasive Writing Techniques Guide\n• Rhetorical Devices Cheat Sheet\n• Sample Persuasive Essays\n\nThese resources align with your current English unit and will help you with your upcoming essay assignment.\n\nAccess them anytime from the Resources page.',
        date: new Date('2026-01-13T09:00:00'),
        isRead: true,
        attachments: []
    }
];

// ============================================
// ANALYTICS
// ============================================

export const analyticsData: AnalyticsData = {
    lessonsCompleted: 24,
    totalLessons: 48,
    averageAccuracy: 84,
    timeSpentLearning: 18.5,
    streakDays: 7,
    subjectBreakdown: [
        {
            subjectId: 'english-8',
            subjectName: 'English',
            progress: 68,
            accuracy: 88,
            timeSpent: 7.2
        },
        {
            subjectId: 'mathematics-8',
            subjectName: 'Mathematics',
            progress: 72,
            accuracy: 82,
            timeSpent: 6.8
        },
        {
            subjectId: 'science-8',
            subjectName: 'Science',
            progress: 61,
            accuracy: 81,
            timeSpent: 4.5
        }
    ],
    weeklyActivity: [
        { week: 'Week 1', lessonsCompleted: 3, timeSpent: 2.5 },
        { week: 'Week 2', lessonsCompleted: 5, timeSpent: 4.2 },
        { week: 'Week 3', lessonsCompleted: 4, timeSpent: 3.8 },
        { week: 'Week 4', lessonsCompleted: 6, timeSpent: 5.1 },
        { week: 'This Week', lessonsCompleted: 6, timeSpent: 2.9 }
    ],
    improvementTrend: [
        { month: 'Sep', accuracy: 76 },
        { month: 'Oct', accuracy: 79 },
        { month: 'Nov', accuracy: 81 },
        { month: 'Dec', accuracy: 83 },
        { month: 'Jan', accuracy: 84 }
    ]
};

// ============================================
// RESOURCES
// ============================================

export const resources: Resource[] = [
    {
        id: 'res-1',
        title: 'Persuasive Writing Techniques Guide',
        type: 'revision-pack',
        subjectId: 'english-8',
        description: 'Comprehensive guide to rhetorical devices and persuasive strategies',
        url: '#',
        uploadDate: new Date('2026-01-13'),
        size: '2.4 MB'
    },
    {
        id: 'res-2',
        title: 'Linear Equations Formula Sheet',
        type: 'formula-sheet',
        subjectId: 'mathematics-8',
        description: 'Quick reference for all linear equation formulas and methods',
        url: '#',
        uploadDate: new Date('2026-01-10'),
        size: '1.1 MB'
    },
    {
        id: 'res-3',
        title: 'Chemical Reactions Video Series',
        type: 'video',
        subjectId: 'science-8',
        description: 'Visual demonstrations of common chemical reactions',
        url: '#',
        uploadDate: new Date('2026-01-12'),
        size: '45 MB'
    },
    {
        id: 'res-4',
        title: 'Year 8 English Reading List',
        type: 'reading',
        subjectId: 'english-8',
        description: 'Recommended novels and texts for Year 8 students',
        url: '#',
        uploadDate: new Date('2026-01-05'),
        size: '0.8 MB'
    }
];
