/**
 * Seed: Kaavy's Year 5 Course Content
 *
 * English Year 5 — Term 1 (Narrative & Reading Comprehension) + Term 2 (Informative & Persuasive Texts)
 * Maths   Year 5 — Term 2 only (Fractions, Decimals & Measurement)
 *
 * Enrolls Kaavy as student, Duvindu as tutor.
 */

exports.seed = async function (knex) {
    const kaavy = await knex('users').where('username', 'Kaavy123').first();
    const duvindu = await knex('users').where('username', 'Duvindu123').first();
    const admin = await knex('users').where('role', 'admin').first();

    if (!kaavy || !duvindu) {
        console.log('  ⚠ Skipping Kaavy course seed — Kaavy or Duvindu not found');
        return;
    }

    // ── Clean only Kaavy-specific enrollments (don't nuke Joshua's data) ──
    const existingY5Courses = await knex('courses').where('year_level', 5).select('id');
    const y5Ids = existingY5Courses.map(c => c.id);

    if (y5Ids.length > 0) {
        await knex('course_enrollments').whereIn('course_id', y5Ids).del();
        // Delete lessons → terms → courses for Y5
        const y5Terms = await knex('course_terms').whereIn('course_id', y5Ids).select('id');
        const y5TermIds = y5Terms.map(t => t.id);
        if (y5TermIds.length > 0) {
            await knex('homework_tracking').whereIn('lesson_id',
                knex('lessons').whereIn('term_id', y5TermIds).select('id')
            ).del();
            await knex('lesson_access_logs').whereIn('lesson_id',
                knex('lessons').whereIn('term_id', y5TermIds).select('id')
            ).del();
            await knex('lessons').whereIn('term_id', y5TermIds).del();
        }
        await knex('course_terms').whereIn('course_id', y5Ids).del();
        await knex('courses').whereIn('id', y5Ids).del();
    }

    // ════════════════════════════════════════════
    //  1. CREATE COURSES
    // ════════════════════════════════════════════

    const [englishY5] = await knex('courses').insert({
        name: 'English',
        description: 'NSW Curriculum – Year 5 English. Narrative writing, reading comprehension, persuasive & informative texts.',
        subject_type: 'english',
        year_level: 5,
        curriculum_code: 'NSW',
        icon: 'BookOpen',
        color: '#7c3aed',
        is_active: true,
        created_by: admin?.id || null,
    }).returning('*');

    const [mathsY5] = await knex('courses').insert({
        name: 'Mathematics',
        description: 'NSW Curriculum – Year 5 Mathematics. Fractions, decimals, and measurement.',
        subject_type: 'mathematics',
        year_level: 5,
        curriculum_code: 'NSW',
        icon: 'Calculator',
        color: '#2563eb',
        is_active: true,
        created_by: admin?.id || null,
    }).returning('*');

    console.log('\n  ✅ Year 5 courses created');
    console.log(`     English Y5  ${englishY5.id}`);
    console.log(`     Maths Y5    ${mathsY5.id}`);

    // ════════════════════════════════════════════
    //  2. CREATE TERMS
    // ════════════════════════════════════════════

    async function createTerms(courseId, termData) {
        const results = [];
        for (const t of termData) {
            const [row] = await knex('course_terms').insert({
                course_id: courseId,
                term_number: t.number,
                title: t.title,
                is_locked: t.isLocked,
            }).returning('*');
            results.push(row);
        }
        return results;
    }

    const englishTerms = await createTerms(englishY5.id, [
        { number: 1, title: 'Narrative & Reading Comprehension', isLocked: false },
        { number: 2, title: 'Informative & Persuasive Texts', isLocked: false },
        { number: 3, title: 'Term 3', isLocked: true },
        { number: 4, title: 'Term 4', isLocked: true },
    ]);

    const mathsTerms = await createTerms(mathsY5.id, [
        { number: 1, title: 'Term 1', isLocked: true },
        { number: 2, title: 'Fractions, Decimals & Measurement', isLocked: false },
        { number: 3, title: 'Term 3', isLocked: true },
        { number: 4, title: 'Term 4', isLocked: true },
    ]);

    console.log('  ✅ Terms created');

    // ════════════════════════════════════════════
    //  3. CREATE LESSONS
    // ════════════════════════════════════════════

    async function createLessons(termId, lessonsArr) {
        for (const l of lessonsArr) {
            await knex('lessons').insert({
                term_id: termId,
                lesson_number: l.number,
                title: l.title,
                content_notes: JSON.stringify({
                    objectives: l.objectives || [],
                }),
                homework_content: JSON.stringify({
                    instructions: `Complete the ${l.title} practice questions in your homework book.`,
                }),
                is_accessible: l.accessible ?? false,
                quiz_questions: JSON.stringify(l.number % 3 === 0 ? [{ placeholder: true }] : []),
                quiz_settings: JSON.stringify({
                    available_from: null,
                    available_until: null,
                    due_date: null,
                    time_limit_minutes: 30,
                }),
            });
        }
    }

    // ─── ENGLISH TERM 1: Narrative & Reading Comprehension ───
    await createLessons(englishTerms[0].id, [
        {
            number: 1, title: 'Elements of Narrative Texts', accessible: true,
            objectives: ['Identify themes, characters, settings, and plot', 'Infer meaning using evidence from the text', 'Understand literal vs inferred information']
        },
        {
            number: 2, title: 'Character and Setting Development', accessible: true,
            objectives: ['Develop characters using description, dialogue, and action', 'Create vivid settings', 'Show vs tell techniques']
        },
        {
            number: 3, title: 'Plot Structure & Story Mapping', accessible: true,
            objectives: ['Understand orientation, complication, resolution', 'Map story structure', 'Identify key events']
        },
        {
            number: 4, title: 'Sentence Structure & Paragraphing', accessible: true,
            objectives: ['Use simple, compound, and complex sentences', 'Organize ideas into paragraphs', 'Apply correct punctuation']
        },
        {
            number: 5, title: 'Dialogue Punctuation', accessible: false,
            objectives: ['Punctuate direct speech correctly', 'Use dialogue to develop characters', 'Integrate speech into narratives']
        },
        {
            number: 6, title: 'Show vs Tell Techniques', accessible: false,
            objectives: ['Use descriptive language effectively', 'Create imagery through word choice', 'Engage readers through showing']
        },
        {
            number: 7, title: 'Editing and Improving Narratives', accessible: false,
            objectives: ['Revise for clarity and coherence', 'Check grammar and spelling', 'Improve word choice']
        },
        {
            number: 8, title: 'Reading Comprehension Strategies', accessible: false,
            objectives: ['Apply comprehension strategies', 'Make inferences from texts', 'Support answers with evidence']
        },
        {
            number: 9, title: 'Narrative Writing Assessment', accessible: false,
            objectives: ['Write a structured narrative', 'Apply learned techniques', 'Demonstrate understanding']
        },
        {
            number: 10, title: 'Reflection & Feedback', accessible: false,
            objectives: ['Reflect on learning', 'Provide peer feedback', 'Set goals for improvement']
        },
    ]);

    // ─── ENGLISH TERM 2: Informative & Persuasive Texts ───
    await createLessons(englishTerms[1].id, [
        {
            number: 1, title: 'Informative Text Features', accessible: false,
            objectives: ['Identify author purpose and point of view', 'Recognize text structures', 'Understand informative text features']
        },
        {
            number: 2, title: 'Research and Note-Taking Skills', accessible: false,
            objectives: ['Gather information from sources', 'Take effective notes', 'Organize research findings']
        },
        {
            number: 3, title: 'Structuring Informative Paragraphs', accessible: false,
            objectives: ['Write topic sentences', 'Develop supporting details', 'Use connectives effectively']
        },
        {
            number: 4, title: 'Introduction to Persuasive Writing', accessible: false,
            objectives: ['Understand persuasive purpose', 'Identify persuasive techniques', 'Distinguish fact from opinion']
        },
        {
            number: 5, title: 'Persuasive Devices', accessible: false,
            objectives: ['Use emotive language', 'Apply repetition for effect', 'Use modal verbs (must, should, might)']
        },
        {
            number: 6, title: 'Paragraph Structure for Arguments', accessible: false,
            objectives: ['Structure introduction, body, conclusion', 'Develop logical arguments', 'Support opinions with reasons']
        },
        {
            number: 7, title: 'Editing for Clarity and Cohesion', accessible: false,
            objectives: ['Revise for audience and purpose', 'Improve paragraph cohesion', 'Check grammar and punctuation']
        },
        {
            number: 8, title: 'Analysing Persuasive Texts', accessible: false,
            objectives: ['Compare persuasive techniques across texts', 'Evaluate effectiveness', "Identify author's perspective"]
        },
        {
            number: 9, title: 'Persuasive Writing Assessment', accessible: false,
            objectives: ['Write a persuasive text', 'Apply persuasive techniques', 'Structure arguments effectively']
        },
        {
            number: 10, title: 'Oral Presentation', accessible: false,
            objectives: ['Deliver a persuasive speech', 'Use tone, pace, and volume effectively']
        },
    ]);

    // ─── MATHS TERM 2: Fractions, Decimals & Measurement ───
    await createLessons(mathsTerms[1].id, [
        {
            number: 1, title: 'Equivalent Fractions', accessible: false,
            objectives: ['Use visual models to understand equivalence', 'Simplify fractions to lowest terms', 'Generate equivalent fractions']
        },
        {
            number: 2, title: 'Comparing & Ordering Fractions', accessible: false,
            objectives: ['Use number lines to compare fractions', 'Apply benchmarks (½, ¼, 1)', 'Order fractions from smallest to largest']
        },
        {
            number: 3, title: 'Adding & Subtracting Fractions', accessible: false,
            objectives: ['Add and subtract fractions with same denominators', 'Work with mixed numbers', 'Solve fraction word problems']
        },
        {
            number: 4, title: 'Decimals & Fractions Connection', accessible: false,
            objectives: ['Understand tenths and hundredths', 'Convert between fractions and decimals', 'Compare and order decimals']
        },
        {
            number: 5, title: 'Metric Length', accessible: false,
            objectives: ['Measure using mm, cm, m, km', 'Convert between metric units', 'Complete real-world measurement tasks']
        },
        {
            number: 6, title: 'Metric Mass', accessible: false,
            objectives: ['Measure using g and kg', 'Estimate and compare masses', 'Solve mass word problems']
        },
        {
            number: 7, title: 'Metric Capacity', accessible: false,
            objectives: ['Measure using mL and L', 'Convert between capacity units', 'Apply capacity in word problems']
        },
        {
            number: 8, title: 'Measurement Problem Solving', accessible: false,
            objectives: ['Apply measurement in multi-step problems', 'Choose appropriate units and tools', 'Estimate and check reasonableness']
        },
        {
            number: 9, title: 'Exam Preparation', accessible: false,
            objectives: ['Measurement word problems', 'Fraction reasoning questions']
        },
        {
            number: 10, title: 'Term 2 Exam', accessible: false,
            objectives: ['Assessment of fractions, decimals & measurement']
        },
    ]);

    console.log('  ✅ Lessons created');
    console.log('     English T1: 10 lessons (Narrative & Reading Comprehension)');
    console.log('     English T2: 10 lessons (Informative & Persuasive Texts)');
    console.log('     Maths T2:   10 lessons (Fractions, Decimals & Measurement)');

    // ════════════════════════════════════════════
    //  4. ENROLL USERS
    // ════════════════════════════════════════════

    const courseIds = [englishY5.id, mathsY5.id];

    for (const cid of courseIds) {
        await knex('course_enrollments').insert({
            course_id: cid,
            user_id: kaavy.id,
            role: 'student',
            enrolled_by: admin?.id || null,
        });
        await knex('course_enrollments').insert({
            course_id: cid,
            user_id: duvindu.id,
            role: 'tutor',
            enrolled_by: admin?.id || null,
        });
    }

    console.log('  ✅ Enrollments');
    console.log('     Kaavy   → English Y5, Maths Y5 (student)');
    console.log('     Duvindu → English Y5, Maths Y5 (tutor)');
    console.log('\n  ✅ Kaavy course seed complete!\n');
};
