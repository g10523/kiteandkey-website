/**
 * Seed: Joshua's Course Content — Term 1 & Term 2
 *
 * Creates 3 courses (English, Mathematics, Science) for Year 10,
 * then seeds 2 terms × 10 lessons per course with the real curriculum data.
 * Enrolls Joshua as student, Flynn as tutor.
 */

exports.seed = async function (knex) {
    // ── Look up users ──
    const joshua = await knex('users').where('username', 'Joshua123').first();
    const flynn = await knex('users').where('username', 'Flynn123').first();
    const admin = await knex('users').where('role', 'admin').first();

    if (!joshua || !flynn) {
        console.log('  ⚠ Skipping course seed — Joshua or Flynn not found');
        return;
    }

    // ── Clean existing data ──
    await knex('course_enrollments').del();
    await knex('homework_tracking').del();
    await knex('quiz_attempts').del();
    await knex('lesson_access_logs').del();
    await knex('lessons').del();
    await knex('course_terms').del();
    await knex('courses').del();

    // ════════════════════════════════════════════
    //  1. CREATE COURSES
    // ════════════════════════════════════════════

    const [english] = await knex('courses').insert({
        name: 'English',
        description: 'NSW Curriculum – Year 10 English. Analytical writing, persuasion, and critical literacy.',
        subject_type: 'english',
        year_level: 10,
        curriculum_code: 'NSW',
        icon: 'BookOpen',
        color: '#7c3aed',
        is_active: true,
        created_by: admin?.id || null,
    }).returning('*');

    const [maths] = await knex('courses').insert({
        name: 'Mathematics',
        description: 'NSW Curriculum – Year 10 Mathematics. Algebra, equations, linear relationships, and measurement.',
        subject_type: 'mathematics',
        year_level: 10,
        curriculum_code: 'NSW',
        icon: 'Calculator',
        color: '#2563eb',
        is_active: true,
        created_by: admin?.id || null,
    }).returning('*');

    const [science] = await knex('courses').insert({
        name: 'Science',
        description: 'NSW Curriculum – Year 10 Science. Chemical reactions, genetics, and evolution.',
        subject_type: 'science',
        year_level: 10,
        curriculum_code: 'NSW',
        icon: 'FlaskConical',
        color: '#059669',
        is_active: true,
        created_by: admin?.id || null,
    }).returning('*');

    console.log('\n  ✅ Courses created');
    console.log(`     English   ${english.id}`);
    console.log(`     Maths     ${maths.id}`);
    console.log(`     Science   ${science.id}`);

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

    const englishTerms = await createTerms(english.id, [
        { number: 1, title: 'Context, Themes & Authorial Purpose', isLocked: false },
        { number: 2, title: 'Persuasion, Argument & Critical Literacy', isLocked: false },
        { number: 3, title: 'Term 3', isLocked: true },
        { number: 4, title: 'Term 4', isLocked: true },
    ]);

    const mathsTerms = await createTerms(maths.id, [
        { number: 1, title: 'Algebra & Index Laws', isLocked: false },
        { number: 2, title: 'Linear Relationships & Measurement', isLocked: false },
        { number: 3, title: 'Term 3', isLocked: true },
        { number: 4, title: 'Term 4', isLocked: true },
    ]);

    const scienceTerms = await createTerms(science.id, [
        { number: 1, title: 'Reactions', isLocked: false },
        { number: 2, title: 'Personal Genetics & Evolutionary Change', isLocked: false },
        { number: 3, title: 'Term 3', isLocked: true },
        { number: 4, title: 'Term 4', isLocked: true },
    ]);

    console.log('  ✅ Terms created (4 per course, T1–T2 unlocked)');

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

    // ─── ENGLISH TERM 1: Context, Themes & Authorial Purpose ───
    await createLessons(englishTerms[0].id, [
        {
            number: 1, title: 'Context, Themes, and Authorial Purpose', accessible: true,
            objectives: ['Analyse historical and social context deeply', 'Identify complex themes and ideas', 'Examine authorial intent and purpose']
        },
        {
            number: 2, title: 'Character Analysis and Relationships', accessible: true,
            objectives: ['Analyse sophisticated character development', 'Examine complex relationships and dynamics', 'Use precise, embedded textual evidence']
        },
        {
            number: 3, title: 'Narrative Structure and Perspective', accessible: true,
            objectives: ['Analyse complex narrative structures', 'Examine how structure creates meaning', 'Evaluate authorial choices and effects']
        },
        {
            number: 4, title: 'Analytical Paragraph Mastery (Advanced TEEL/PEEL)', accessible: true,
            objectives: ['Master sophisticated analytical paragraphs', 'Develop depth and insight in analysis', 'Create cohesive, logical arguments']
        },
        {
            number: 5, title: 'Embedding and Analysing Quotations', accessible: false,
            objectives: ['Embed quotations fluently and precisely', 'Select highly relevant textual evidence', 'Analyse significance with sophistication']
        },
        {
            number: 6, title: 'Developing Sophisticated Arguments', accessible: false,
            objectives: ['Develop complex thesis statements', 'Create sustained, logical arguments', 'Synthesise ideas across the text']
        },
        {
            number: 7, title: 'Essay Planning and Drafting', accessible: false,
            objectives: ['Plan extended analytical essays', 'Structure sophisticated arguments', 'Develop coherent, insightful progression']
        },
        {
            number: 8, title: 'Editing for Precision and Cohesion', accessible: false,
            objectives: ['Revise for precision and clarity', 'Refine analytical language and tone', 'Polish formal academic register']
        },
        {
            number: 9, title: 'Analytical Essay Assessment', accessible: false,
            objectives: ['Write extended analytical essay', 'Apply sophisticated analysis', 'Demonstrate critical insight']
        },
        {
            number: 10, title: 'Reflection and Feedback', accessible: false,
            objectives: ['Reflect on analytical writing mastery', 'Respond to detailed feedback', 'Set Year 11 goals']
        },
    ]);

    // ─── ENGLISH TERM 2: Persuasion, Argument & Critical Literacy ───
    await createLessons(englishTerms[1].id, [
        {
            number: 1, title: 'Argument, Ideology, and Audience', accessible: false,
            objectives: ['Understand complex ideological positioning', 'Analyse sophisticated audience manipulation', 'Evaluate assumptions and values']
        },
        {
            number: 2, title: 'Analysing Bias and Representation', accessible: false,
            objectives: ['Identify subtle bias and representation', 'Examine ideology and power structures', 'Evaluate credibility and authority']
        },
        {
            number: 3, title: 'Rhetorical and Persuasive Techniques', accessible: false,
            objectives: ['Analyse sophisticated rhetorical devices', 'Examine logical reasoning and fallacies', 'Identify advanced persuasive strategies']
        },
        {
            number: 4, title: 'Structuring Sustained Arguments', accessible: false,
            objectives: ['Develop clear, sustained contention', 'Sequence complex arguments logically', 'Create evidence-based reasoning']
        },
        {
            number: 5, title: 'Counterarguments and Rebuttal', accessible: false,
            objectives: ['Address counterarguments effectively', 'Develop sophisticated rebuttals', 'Strengthen argument through opposition']
        },
        {
            number: 6, title: 'Language for Authority and Stance', accessible: false,
            objectives: ['Use modality and evaluative language', 'Apply nominalisation for formality', 'Employ advanced cohesive devices']
        },
        {
            number: 7, title: 'Speech Writing Techniques', accessible: false,
            objectives: ['Write sophisticated persuasive speeches', 'Structure oral arguments effectively', 'Use rhetorical devices for impact']
        },
        {
            number: 8, title: 'Speech Delivery and Engagement', accessible: false,
            objectives: ['Deliver speeches with authority', 'Use advanced vocal and non-verbal techniques', 'Engage and persuade sophisticated audiences']
        },
        {
            number: 9, title: 'Argumentative Writing Assessment', accessible: false,
            objectives: ['Write argumentative essay', 'Apply sustained logical reasoning', 'Demonstrate persuasive mastery']
        },
        {
            number: 10, title: 'Persuasive Speech', accessible: false,
            objectives: ['Deliver formal persuasive speech', 'Respond to critical opposition', 'Demonstrate oral authority']
        },
    ]);

    // ─── MATHS TERM 1: Algebra & Index Laws ───
    await createLessons(mathsTerms[0].id, [
        {
            number: 1, title: 'Review of Algebraic Expressions', accessible: true,
            objectives: ['Expanding brackets', 'Factorising common factors', 'Simplify complex expressions']
        },
        {
            number: 2, title: 'Factorisation Techniques', accessible: true,
            objectives: ['Difference of two squares', 'Simple quadratics (intro)', 'Apply factorisation strategies']
        },
        {
            number: 3, title: 'Index Laws', accessible: true,
            objectives: ['Multiplying, dividing, powers of powers', 'Negative indices', 'Apply index laws fluently']
        },
        {
            number: 4, title: 'Surds', accessible: true,
            objectives: ['Simplifying surds', 'Operations with surds', 'Rationalise denominators']
        },
        {
            number: 5, title: 'Algebraic Fractions', accessible: false,
            objectives: ['Simplifying', 'Substitution', 'Apply fraction skills to algebra']
        },
        {
            number: 6, title: 'Linear Equations', accessible: false,
            objectives: ['Multi-step equations', 'Equations with variables on both sides', 'Check solutions']
        },
        {
            number: 7, title: 'Problem Solving with Algebra', accessible: false,
            objectives: ['Translating word problems', 'Logical structure', 'Justify solution strategies']
        },
        {
            number: 8, title: 'Algebraic Reasoning & Proof', accessible: false,
            objectives: ['Justifying steps', 'Explaining solutions clearly', 'Mathematical communication']
        },
        {
            number: 9, title: 'Exam Preparation', accessible: false,
            objectives: ['Algebra drills', 'Common mistakes', 'Exam strategy']
        },
        {
            number: 10, title: 'Term 1 Exam', accessible: false,
            objectives: ['Assessment of algebra & indices', 'Reasoning-based questions']
        },
    ]);

    // ─── MATHS TERM 2: Linear Relationships & Measurement ───
    await createLessons(mathsTerms[1].id, [
        {
            number: 1, title: 'Coordinate Geometry', accessible: false,
            objectives: ['Plotting points', 'Interpreting graphs', 'Identify key features']
        },
        {
            number: 2, title: 'Linear Relationships', accessible: false,
            objectives: ['Tables of values', 'Straight-line graphs', 'Recognize linear patterns']
        },
        {
            number: 3, title: 'Gradient', accessible: false,
            objectives: ['Rate of change', 'Meaning in context', 'Calculate gradient from graphs']
        },
        {
            number: 4, title: 'Linear Equations of Lines', accessible: false,
            objectives: ['y = mx + b', 'Graphing from equations', 'Interpret gradient and y-intercept']
        },
        {
            number: 5, title: 'Distance, Speed & Time', accessible: false,
            objectives: ['Formula manipulation', 'Real-world problems', 'Rearrange formulas']
        },
        {
            number: 6, title: 'Perimeter & Area', accessible: false,
            objectives: ['Composite figures', 'Algebraic expressions in formulas', 'Apply area formulas']
        },
        {
            number: 7, title: 'Volume & Surface Area', accessible: false,
            objectives: ['Prisms and cylinders', 'Apply volume formulas', 'Calculate surface area']
        },
        {
            number: 8, title: 'Measurement Problem Solving', accessible: false,
            objectives: ['Multi-step applications', 'Choose appropriate formulas', 'Justify solution methods']
        },
        {
            number: 9, title: 'Exam Preparation', accessible: false,
            objectives: ['Graph interpretation', 'Formula rearrangement', 'Measurement reasoning']
        },
        {
            number: 10, title: 'Term 2 Exam', accessible: false,
            objectives: ['Assessment of linear relationships & measurement']
        },
    ]);

    // ─── SCIENCE TERM 1: Reactions ───
    await createLessons(scienceTerms[0].id, [
        {
            number: 1, title: 'The Law of Conservation of Mass', accessible: true,
            objectives: ['Explain the meaning of the law of conservation of mass', 'Conduct a practical investigation to demonstrate the law of conservation of mass in a chemical reaction', 'Investigate and explain how mass is conserved in closed systems']
        },
        {
            number: 2, title: 'Writing Chemical Formulas', accessible: true,
            objectives: ['Use IUPAC naming conventions to construct the chemical formula for common ionic and covalent compounds', 'Represent chemical reactions by predicting products and writing word and balanced chemical equations with states', 'Model simple chemical reactions to show that atoms are rearranged and mass is conserved during a reaction']
        },
        {
            number: 3, title: 'Features of a Reaction', accessible: true,
            objectives: ['Determine the features of reactions by conducting synthesis, decomposition, displacement and neutralisation reactions', 'Identify pH as the measure of acidity and compare the pH of a range of common substances to the pH of pure water', 'Use pH indicators or meters to measure the pH change of neutralisation reactions']
        },
        {
            number: 4, title: 'Rates of Chemical Reactions', accessible: true,
            objectives: ['Investigate and explain how concentration, surface area, temperature and catalysts affect the rate of reactions', 'Conduct a practical investigation to test a measurable hypothesis with a cause-and-effect relationship', 'Graph data that communicates the investigation findings in a scientific report']
        },
        {
            number: 5, title: 'Nuclear Reactions Part 1', accessible: false,
            objectives: ['Describe the conditions that cause a nucleus to be unstable']
        },
        {
            number: 6, title: 'Nuclear Reactions Part 2', accessible: false,
            objectives: ['Represent alpha and beta reactions as nuclear reactions', 'Describe nuclear fission and nuclear fusion']
        },
        {
            number: 7, title: 'Applications of Radioisotopes', accessible: false,
            objectives: ['Evaluate the societal benefits and considerations of using radioisotopes in medicine, industry and environmental monitoring']
        },
        {
            number: 8, title: 'Reactions in Context', accessible: false,
            objectives: ['Investigate a chemical or nuclear reaction used in industry to produce an important product', 'Outline the impacts on the environment of nuclear reactions, including raw materials, production stages and nuclear waste']
        },
        {
            number: 9, title: 'Topic Test', accessible: false,
            objectives: ['Assessment of all Term 1 content']
        },
        {
            number: 10, title: 'Review', accessible: false,
            objectives: ['Feedback and reflection on Term 1 learning']
        },
    ]);

    // ─── SCIENCE TERM 2: Personal Genetics & Evolutionary Change ───
    await createLessons(scienceTerms[1].id, [
        {
            number: 1, title: 'Genetic Information in Living Things', accessible: false,
            objectives: ['Identify that all organisms have information coded in genetic material', 'Observe and model the arrangement of genetic information to define and compare DNA, gene, chromosome and genome']
        },
        {
            number: 2, title: 'DNA Structure, Function and Discovery', accessible: false,
            objectives: ['Relate the structure of the DNA double helix to its functions', 'Discuss the nature of scientific discovery by comparing the contributions of scientists involved in the discovery of DNA structure']
        },
        {
            number: 3, title: 'Inheritance and Source of Variation', accessible: false,
            objectives: ['Outline how genetic information is passed on to offspring by sexual and asexual reproduction', 'Identify that multiple genes and multiple environmental factors interact in the development of most traits', 'Explain how DNA mutation can result in genetic variation with beneficial, harmful or minimal effects']
        },
        {
            number: 4, title: 'Predicting Inheritance Patterns', accessible: false,
            objectives: ['Outline the connection between genotypes and phenotypes, using Mendelian inheritance for both plants and animals', 'Use pedigrees and Punnett squares to model monogenic gene-trait relationships and make predictions about inheritance patterns']
        },
        {
            number: 5, title: 'Genetic Technologies and their Applications', accessible: false,
            objectives: ['Identify examples of current and emerging genetic technologies', 'Discuss applications of genetic technologies in conservation, agriculture, industry and medicine']
        },
        {
            number: 6, title: 'Genetic Testing and Ethical Implications', accessible: false,
            objectives: ['Discuss the applications of genetic testing and its associated social, economic and ethical implications', 'Use an ethical framework to construct evidence-based written arguments about the implications of genetic technology']
        },
        {
            number: 7, title: 'Evolution by Natural Selection', accessible: false,
            objectives: ['Explain how the processes of natural selection and isolation can lead to changes within and between species', 'Investigate, using evidence, how the complexity and diversity of organisms have changed over geological timescales']
        },
        {
            number: 8, title: 'Developing the Theory of Evolution in Context', accessible: false,
            objectives: ['Identify and discuss Aboriginal and/or Torres Strait Islander Peoples\' artwork that indicate changes in plants and animals', 'Discuss how scientists developed and refined the theory of evolution']
        },
        {
            number: 9, title: 'Test', accessible: false,
            objectives: ['Assessment of all Term 2 content']
        },
        {
            number: 10, title: 'Review', accessible: false,
            objectives: ['Feedback and reflection on Term 2 learning']
        },
    ]);

    console.log('  ✅ Lessons created (10 per term × 4 terms × 3 courses)');

    // ════════════════════════════════════════════
    //  4. ENROLL USERS
    // ════════════════════════════════════════════

    const courseIds = [english.id, maths.id, science.id];

    for (const cid of courseIds) {
        // Enroll Joshua as student
        await knex('course_enrollments').insert({
            course_id: cid,
            user_id: joshua.id,
            role: 'student',
            enrolled_by: admin?.id || null,
        });
        // Enroll Flynn as tutor
        await knex('course_enrollments').insert({
            course_id: cid,
            user_id: flynn.id,
            role: 'tutor',
            enrolled_by: admin?.id || null,
        });
    }

    console.log('  ✅ Enrollments');
    console.log('     Joshua → English, Maths, Science (student)');
    console.log('     Flynn  → English, Maths, Science (tutor)');

    console.log('\n  ✅ Course seed complete!\n');
};
