exports.seed = async function (knex) {
    // Insert intervention protocols from the existing cognitiveInterventions.ts
    await knex('intervention_protocols').insert([
        {
            target_dimension: 'working_memory',
            target_range_min: 0,
            target_range_max: 25,
            priority: 'critical',
            title: 'Cognitive Load Externalization',
            description: 'Reduce working memory demands by offloading information to external scaffolds',
            scientific_basis: 'Gathercole & Alloway (2008) - Working Memory in the Classroom',
            implementation: JSON.stringify({
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
            }),
            expected_outcomes: JSON.stringify({
                timeframe: '6-8 weeks',
                timeframeWeeks: 8,
                measurableTarget: '80% accuracy on 4-step problems with written scaffolds',
                reassessmentTrigger: 'Consistent success with current scaffold level'
            }),
            version: 1
        },
        {
            target_dimension: 'working_memory',
            target_range_min: 0,
            target_range_max: 25,
            priority: 'critical',
            title: 'Chunking Strategy Training',
            description: 'Teach explicit chunking to compress information into manageable units',
            scientific_basis: 'Miller (1956) - The Magical Number Seven; Ericsson et al. (1980) - Chunking in expertise',
            implementation: JSON.stringify({
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
            }),
            expected_outcomes: JSON.stringify({
                timeframe: '8-10 weeks',
                timeframeWeeks: 10,
                measurableTarget: 'Independent chunking of 7+ item lists into 3 meaningful groups',
                reassessmentTrigger: 'Spontaneous chunking in novel problems'
            }),
            version: 1
        },
        {
            target_dimension: 'working_memory',
            target_range_min: 25,
            target_range_max: 50,
            priority: 'recommended',
            title: 'Strategic Redundancy',
            description: 'Build multiple representation pathways to reduce single-channel load',
            scientific_basis: 'Paivio (1986) - Dual Coding Theory; Mayer (2009) - Multimedia Learning',
            implementation: JSON.stringify({
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
            }),
            expected_outcomes: JSON.stringify({
                timeframe: '4-6 weeks',
                timeframeWeeks: 6,
                measurableTarget: 'Successful recall using either visual or verbal cue alone',
                reassessmentTrigger: 'Consistent dual-channel spontaneous use'
            }),
            version: 1
        },
        {
            target_dimension: 'working_memory',
            target_range_min: 75,
            target_range_max: 100,
            priority: 'enhancement',
            title: 'Complex Problem Solving',
            description: 'Leverage high working memory for multi-variable, open-ended challenges',
            scientific_basis: 'Sweller (1988) - Cognitive Load Theory; expertise reversal effect',
            implementation: JSON.stringify({
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
            }),
            expected_outcomes: JSON.stringify({
                timeframe: 'Ongoing',
                timeframeWeeks: 52,
                measurableTarget: 'Successful navigation of 6-variable problems with 2 constraint changes',
                reassessmentTrigger: 'Mastery of current complexity level'
            }),
            version: 1
        }
    ]);

    console.log('✅ Seeded intervention protocols successfully');
};
