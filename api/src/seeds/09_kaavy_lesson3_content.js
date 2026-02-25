/**
 * Seed: Kaavy's English Y5 Term 2 Lesson 3 — Structuring Informative Paragraphs
 * Summary Notes + Homework + Quiz
 */

exports.seed = async function (knex) {
    const course = await knex('courses')
        .where({ subject_type: 'english', year_level: 5 })
        .first();

    if (!course) {
        console.log('  ⚠ English Y5 course not found — skipping');
        return;
    }

    const term2 = await knex('course_terms')
        .where({ course_id: course.id, term_number: 2 })
        .first();

    if (!term2) {
        console.log('  ⚠ English Y5 Term 2 not found — skipping');
        return;
    }

    const lesson = await knex('lessons')
        .where({ term_id: term2.id, lesson_number: 3 })
        .first();

    if (!lesson) {
        console.log('  ⚠ Lesson 3 not found in Term 2 — skipping');
        return;
    }

    console.log(`  📝 Updating lesson: ${lesson.title} (${lesson.id})`);

    // ════════════════════════════════════════════
    //  SUMMARY NOTES
    // ════════════════════════════════════════════

    const contentNotes = {
        objectives: [
            'Understand TEEL paragraph structure for informative writing',
            'Craft effective topic sentences',
            'Use connectives to create cohesion and coherence',
        ],
        html: `
<div class="lesson-rich-content">

<h2>1. The Architecture of an Informative Paragraph</h2>
<p>A well-structured paragraph is a complete unit of thought. Like a building, it requires a strong foundation (topic sentence), supporting walls (evidence/details), and connecting materials (connectives) to hold it together.</p>

<div class="key-principle">
  <strong>The TEEL Structure (Informative Variation):</strong>
</div>

<div class="structure-card">
  <h4>T – Topic Sentence</h4>
  <ul>
    <li><strong>Function:</strong> Introduces the controlling idea of the paragraph</li>
    <li><strong>Characteristics:</strong> Specific enough to be covered in 5–7 sentences, general enough to require explanation</li>
    <li><strong>Placement:</strong> Always first (for informative writing)</li>
    <li><strong>Test:</strong> If you read only the topic sentence, you should know exactly what the paragraph will discuss</li>
  </ul>
</div>

<div class="structure-card">
  <h4>E – Explanation & Evidence (Supporting Details)</h4>
  <ul>
    <li><strong>Quantity:</strong> 3–5 details per paragraph</li>
    <li><strong>Types:</strong>
      <ul>
        <li><strong>Facts:</strong> Verifiable data (statistics, measurements, classifications)</li>
        <li><strong>Examples:</strong> Specific instances that illustrate the general point</li>
        <li><strong>Definitions:</strong> Clarification of technical terms</li>
        <li><strong>Explanations:</strong> "How" and "Why" the topic sentence is true</li>
      </ul>
    </li>
    <li><strong>Quality Check:</strong> Each detail must directly prove or illustrate the topic sentence</li>
  </ul>
</div>

<div class="structure-card">
  <h4>E – Elaboration (Deepening Understanding)</h4>
  <ul>
    <li>Extending the evidence with specific consequences or mechanisms</li>
    <li>Answering "So what?" or "How exactly?"</li>
  </ul>
</div>

<div class="structure-card">
  <h4>L – Link (Concluding Sentence)</h4>
  <ul>
    <li>Returns to the main idea</li>
    <li>May transition to the next paragraph</li>
    <li>Reinforces the "takeaway" for the reader</li>
  </ul>
</div>

<hr/>

<h2>2. Crafting Effective Topic Sentences</h2>

<div class="selective-insight">
  <strong>The Formula:</strong> [Specific Subject] + [Specific Claim/Focus] = Strong Topic Sentence
</div>

<h3>Weak vs. Strong</h3>
<div class="info-box info-box-amber">
  <h4>❌ Weak</h4>
  <p><em>"Rainforests are green."</em> — Too obvious, no direction</p>
</div>
<div class="info-box info-box-blue">
  <h4>✅ Strong</h4>
  <p><em>"Rainforests function as Earth's primary oxygen production systems through complex photosynthetic processes."</em> — Specific, debatable, directional</p>
</div>

<h3>Anatomy of Excellence</h3>
<ol>
  <li><strong>Clarity:</strong> No ambiguous pronouns (it, they) without antecedents</li>
  <li><strong>Specificity:</strong> Avoids vague adjectives (good, bad, nice, interesting)</li>
  <li><strong>Scope:</strong> Can be proven in 5–7 sentences (not too broad)</li>
  <li><strong>Objectivity:</strong> No personal opinion (I think, I believe) in informative writing</li>
</ol>

<div class="key-principle">
  <strong>Diagnostic Test:</strong> If you can write "In this paragraph, I will discuss…" before your sentence and it makes sense, you have a topic sentence.
</div>

<hr/>

<h2>3. Developing Supporting Details (The Evidence Layer)</h2>

<h3>The Hierarchy of Detail</h3>
<table class="info-table">
  <thead><tr><th>Level</th><th>Role</th><th>Example Signal Words</th></tr></thead>
  <tbody>
    <tr><td><strong>Major Detail</strong></td><td>Directly supports topic sentence</td><td><code>primarily</code>, <code>fundamentally</code></td></tr>
    <tr><td><strong>Minor Detail</strong></td><td>Provides specific evidence for the major detail</td><td><code>for instance</code>, statistics</td></tr>
    <tr><td><strong>Explanation</strong></td><td>Interprets the evidence for the reader</td><td><code>this means</code>, <code>as a result</code></td></tr>
  </tbody>
</table>

<h3>Quality Control for Details</h3>
<ul>
  <li><strong>Relevance:</strong> Does this fact prove the topic sentence or just relate to the general subject?</li>
  <li><strong>Specificity:</strong> "Many animals are adapted" → "Fennec foxes possess oversized ears measuring 15 cm"</li>
  <li><strong>Objectivity:</strong> Eliminate emotive language (cruel, beautiful, disgusting) in favour of functional description</li>
</ul>

<div class="selective-insight">
  <strong>The "So What?" Test:</strong> After writing each detail, ask: "So what? Why does this matter?" The answer becomes your next sentence (elaboration).
</div>

<hr/>

<h2>4. Connectives: The Glue of Cohesion</h2>
<p>Connectives are logical signposts that guide the reader through your argument. They create <strong>cohesion</strong> (flow within the paragraph) and <strong>coherence</strong> (logical connection between ideas).</p>

<h3>Taxonomy of Connectives</h3>

<table class="info-table">
  <thead><tr><th>Type</th><th>Simple</th><th>Sophisticated</th></tr></thead>
  <tbody>
    <tr><td><strong>Additive</strong></td><td>also, too, as well as</td><td>furthermore, moreover, in addition, similarly</td></tr>
    <tr><td><strong>Exemplifying</strong></td><td>for example, such as</td><td>for instance, specifically, namely, to illustrate</td></tr>
    <tr><td><strong>Causal</strong></td><td>because, since</td><td>therefore, thus, consequently, as a result, due to</td></tr>
    <tr><td><strong>Contrastive</strong></td><td>but, however</td><td>in contrast, conversely, although, despite, whereas</td></tr>
    <tr><td><strong>Sequential</strong></td><td>first, then, finally</td><td>initially, subsequently, following this, ultimately</td></tr>
  </tbody>
</table>

<h3>Selective Usage</h3>
<div class="structure-card">
  <ul>
    <li>Do <strong>not</strong> begin every sentence with a connective (creates mechanical rhythm)</li>
    <li>Vary position: start of sentence (<em>However, …</em>) or embedded (<em>The experiment, however, failed…</em>)</li>
    <li>Match the logical relationship precisely (don't use "however" when you mean "therefore")</li>
  </ul>
</div>

<hr/>

<h2>5. Synthesis: Building the Paragraph</h2>

<h3>Step-by-Step Construction</h3>
<div class="structure-card">
  <ol>
    <li><strong>Step 1:</strong> Write your topic sentence (controlling idea)</li>
    <li><strong>Step 2:</strong> Brainstorm 3–5 pieces of evidence that prove that idea</li>
    <li><strong>Step 3:</strong> Arrange logically (general → specific OR chronological OR spatial)</li>
    <li><strong>Step 4:</strong> Insert connectives to show relationships between sentences</li>
    <li><strong>Step 5:</strong> Write a linking sentence that reinforces the main idea</li>
  </ol>
</div>

<h3>Example Analysis</h3>
<div class="info-box info-box-blue">
  <p><strong>Topic Sentence:</strong> <em>Desert animals possess physiological adaptations that minimize water loss.</em></p>
  <p><strong>Detail 1:</strong> <em>For example,</em> the kangaroo rat produces highly concentrated urine, excreting waste with minimal liquid.</p>
  <p><strong>Detail 2:</strong> <em>Furthermore,</em> many desert species are nocturnal, avoiding evaporative water loss during extreme daytime heat.</p>
  <p><strong>Detail 3:</strong> <em>Because</em> metabolic processes generate water, some desert mammals can survive solely on metabolic water derived from seeds.</p>
  <p><strong>Link:</strong> These convergent evolutionary traits demonstrate how natural selection solves environmental challenges.</p>
</div>

<div class="key-principle">
  <strong>Cohesion Check:</strong> Each sentence refers back to the topic (desert animals / water loss) and forward to the next logical point.
</div>

</div>
        `.trim(),
    };

    // ════════════════════════════════════════════
    //  HOMEWORK
    // ════════════════════════════════════════════

    const homeworkContent = {
        instructions: 'Complete in your Homework Book',
        html: `
<div class="homework-rich-content">

<div class="homework-task">
  <h3>Task 1: Topic Sentence Analysis <span class="time-badge">10 mins</span></h3>
  <p>Read the following topic sentences and evaluate them using the criteria of clarity, specificity, and scope. Rewrite any weak sentences to make them stronger.</p>

  <p><strong>a)</strong> <em>"Sharks are interesting."</em><br/>
  Evaluation: _____________________________________________________________<br/>
  Rewrite: _______________________________________________________________</p>

  <p><strong>b)</strong> <em>"Polar bears have white fur and they swim and they eat seals and they live in cold places."</em><br/>
  Evaluation: _____________________________________________________________<br/>
  Rewrite: _______________________________________________________________</p>

  <p><strong>c)</strong> <em>"The process of photosynthesis converts light energy into chemical energy through complex biochemical pathways in plant chloroplasts."</em><br/>
  Evaluation: _______________________________________________________________</p>
</div>

<div class="homework-task">
  <h3>Task 2: Supporting Detail Development <span class="time-badge">15 mins</span></h3>
  <p>Given the topic sentence below, write three supporting details that could form a complete paragraph. Ensure you use at least two different types of details (fact, example, definition, explanation).</p>

  <blockquote class="passage">
    <strong>Topic Sentence:</strong> "The Great Barrier Reef faces multifaceted threats from anthropogenic activities that compromise its ecological integrity."
  </blockquote>

  <p>Detail 1 (Fact/Statistic): _______________________________________________<br/>
  Detail 2 (Example): ____________________________________________________<br/>
  Detail 3 (Explanation of mechanism): _____________________________________</p>
</div>

<div class="homework-task">
  <h3>Task 3: Connective Application <span class="time-badge">10 mins</span></h3>
  <p>Join the following pairs of sentences using appropriate connectives. Indicate which <em>type</em> of relationship you are showing (Additive, Causal, Contrastive, Exemplifying).</p>

  <p><strong>a)</strong> Coral polyps secrete calcium carbonate. Reef structures form over centuries.<br/>
  Relationship: __________ Connective sentence: _____________________________</p>

  <p><strong>b)</strong> Elephants are massive mammals. They move almost silently through forests.<br/>
  Relationship: __________ Connective sentence: _____________________________</p>

  <p><strong>c)</strong> Wolves hunt in packs. They are cooperative predators.<br/>
  Relationship: __________ Connective sentence: _____________________________</p>
</div>

<div class="homework-task">
  <h3>Task 4: Paragraph Construction <span class="time-badge">15 mins</span></h3>
  <p>Using the research notes you organised in Lesson 2 (or new notes on the topic below), write one complete informative paragraph about <strong>"Arctic Adaptations."</strong></p>
  <p>Your paragraph must include:</p>
  <ul>
    <li>One underlined topic sentence</li>
    <li>Three numbered supporting details (demonstrating at least two different detail types)</li>
    <li>Two connectives circled or highlighted</li>
    <li>A concluding sentence that links back to the main idea</li>
  </ul>
</div>

</div>
        `.trim(),
    };

    // ════════════════════════════════════════════
    //  QUIZ
    // ════════════════════════════════════════════

    const quizQuestions = [
        // ── SECTION A: Multiple Choice (10 marks) ──
        {
            section: 'A',
            sectionTitle: 'Multiple Choice',
            sectionInstructions: 'Circle the correct answer.',
            type: 'multiple_choice',
            number: 1,
            marks: 1,
            question: 'Which of the following is the <strong>primary function</strong> of a topic sentence?',
            options: [
                'To entertain the reader with humour',
                "To introduce the main idea and control the paragraph's focus",
                'To provide a detailed example of the previous point',
                'To conclude the paragraph with a summary',
            ],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 2, marks: 1,
            question: 'Identify the <strong>strongest</strong> topic sentence for an informative paragraph:',
            options: [
                'Honeybees are insects.',
                'Honeybees play a crucial role in global food production through pollination.',
                'I think honeybees are important and everyone should like them.',
                'Honeybees are yellow and black and they fly and they make honey and they live in hives.',
            ],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 3, marks: 1,
            question: 'Which supporting detail <strong>best</strong> develops the topic sentence: <em>"Desert plants have evolved water conservation mechanisms."</em>',
            options: [
                'Deserts are very hot places with little rain.',
                'The saguaro cactus expands its pleated stem to store water during rare rainfall events.',
                'Many people think cacti are interesting plants.',
                'Deserts exist on every continent.',
            ],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 4, marks: 1,
            question: 'The connective <strong>"therefore"</strong> signals which type of relationship?',
            options: [
                'Contrast',
                'Cause and effect (result/consequence)',
                'Addition',
                'Example',
            ],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 5, marks: 1,
            question: 'In the TEEL structure, what is the purpose of the <strong>"Link"</strong> sentence?',
            options: [
                'To introduce a new topic unrelated to the paragraph',
                "To connect the paragraph's evidence back to the main idea and potentially transition to the next paragraph",
                'To provide the first piece of evidence',
                'To ask the reader a question',
            ],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 6, marks: 1,
            question: 'Which sentence demonstrates <strong>elaboration</strong> (extending a detail to explain its significance)?',
            options: [
                'Penguins have thick feathers.',
                'Penguins have thick feathers; these trap air close to the body, providing insulation against sub-zero Antarctic temperatures.',
                'Penguins are birds that cannot fly.',
                'Penguins eat fish.',
            ],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 7, marks: 1,
            question: 'Which connective would <strong>best</strong> join these sentences: <em>"Marine animals face plastic pollution. Many species ingest microplastics, confusing them for food."</em>',
            options: [
                'However',
                'For example',
                'Although',
                'Therefore',
            ],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 8, marks: 1,
            question: 'A paragraph contains a topic sentence about elephant communication, followed by details about elephant diet and habitat. This paragraph suffers from:',
            options: [
                'Lack of cohesion (off-topic details)',
                'Too many connectives',
                'Excessive technical vocabulary',
                'Being too short',
            ],
            correctIndex: 0,
        },
        {
            section: 'A', type: 'multiple_choice', number: 9, marks: 1,
            question: 'The phrase <em>"In addition"</em> is classified as which type of connective?',
            options: [
                'Contrastive',
                'Causal',
                'Additive',
                'Sequential',
            ],
            correctIndex: 2,
        },
        {
            section: 'A', type: 'multiple_choice', number: 10, marks: 1,
            question: 'Which choice best demonstrates <strong>cohesion</strong> (sentences flowing logically from one to the next)?',
            options: [
                'Elephants are large. Fish swim in the ocean. Birds can fly.',
                'Elephants are large mammals. However, they are agile swimmers. Furthermore, their trunks function as snorkels when crossing deep water.',
                'Elephants are large. I like elephants. Elephants eat plants.',
                'Elephants are large. Therefore, ants are small.',
            ],
            correctIndex: 1,
        },

        // ── SECTION B: Short Answer (15 marks) ──
        {
            section: 'B',
            sectionTitle: 'Short Answer',
            type: 'short_answer',
            number: 11,
            marks: 4,
            question: `Analyze the following paragraph. Identify the <strong>topic sentence</strong>, <strong>two supporting details</strong>, and <strong>one connective</strong>.

<blockquote>"Marine bioluminescence serves as a sophisticated survival mechanism in deep-sea environments. Many organisms, such as the anglerfish, produce light through chemical reactions involving luciferin and oxygen. Furthermore, some species use bioluminescence to confuse predators by releasing glowing particles that act as decoys. These adaptations allow creatures to hunt, communicate, and survive in permanent darkness."</blockquote>

<strong>a)</strong> Topic sentence (1 mark)<br/>
<strong>b)</strong> Two supporting details (2 marks)<br/>
<strong>c)</strong> One connective and its function (1 mark)`,
        },
        {
            section: 'B', type: 'short_answer', number: 12, marks: 4,
            question: `The following topic sentence is weak: <em>"Tigers are big cats."</em>

<strong>a)</strong> Identify <strong>two</strong> specific weaknesses (e.g., vagueness, obviousness, lack of direction). (2 marks)

<strong>b)</strong> Rewrite this as a <strong>strong</strong> topic sentence suitable for a selective-level informative paragraph about tiger adaptations. (2 marks)`,
        },
        {
            section: 'B', type: 'short_answer', number: 13, marks: 3,
            question: `Explain why the following paragraph lacks cohesion and rewrite it with appropriate connectives to improve flow:

<blockquote>"Wolves hunt in packs. They can take down large prey. Elephants live in herds. They protect their young from predators. Pack hunting requires cooperation."</blockquote>

<strong>Diagnosis:</strong> What is wrong with this paragraph?<br/>
<strong>Rewritten paragraph</strong> (3–4 sentences):`,
        },
        {
            section: 'B', type: 'short_answer', number: 14, marks: 4,
            question: `Distinguish between a <strong>fact</strong> and an <strong>example</strong> as types of supporting details.
<ul>
  <li>Define each (2 marks)</li>
  <li>Explain when you would use each type to support a topic sentence (2 marks)</li>
</ul>`,
        },

        // ── SECTION C: Extended Response (10 marks) ──
        {
            section: 'C',
            sectionTitle: 'Extended Response',
            type: 'extended_response',
            number: 15,
            marks: 10,
            passage: `<h4>Read the informative paragraph below:</h4>

<p><em>The migration of the monarch butterfly represents one of the most remarkable navigational feats in the animal kingdom. Unlike birds that learn migration routes from parents, monarchs complete their journey through genetic programming. For example, the butterflies use a circadian clock combined with sun compass orientation to maintain their southwesterly heading. Additionally, they possess specialized photoreceptors in their antennae that detect polarized light patterns. Consequently, despite never having made the journey before, fourth-generation monarchs return to the same overwintering sites as their great-grandparents.</em></p>`,
            subQuestions: [
                {
                    label: 'a',
                    title: 'Analysis — Complete the Table',
                    marks: 4,
                    question: `Complete a table analysing the paragraph's structure with these rows:
<ul>
  <li>Topic Sentence (Main Idea)</li>
  <li>Type of Detail 1 (Fact / Example / Explanation) — quote evidence</li>
  <li>Connective showing addition — quote it</li>
  <li>Connective showing result / consequence — quote it</li>
</ul>`,
                },
                {
                    label: 'b',
                    title: 'Application — Write a Paragraph',
                    marks: 6,
                    question: `You are writing an informative text about <strong>"The Impact of Deforestation on Orangutans."</strong>

<strong>Task i:</strong> Write one strong topic sentence that could begin a paragraph about either (a) habitat loss or (b) food scarcity. (2 marks)

<strong>Task ii:</strong> Write three supporting sentences that develop your chosen topic sentence. You must:
<ul>
  <li>Use at least <strong>two different types</strong> of supporting details (e.g., fact + example, or definition + explanation)</li>
  <li>Include <strong>at least one connective</strong> (underline the connective)</li>
  <li>Ensure all details directly support your topic sentence (4 marks)</li>
</ul>`,
                },
            ],
        },

        // ── BONUS ──
        {
            section: 'BONUS',
            sectionTitle: 'Bonus Challenge (Optional)',
            type: 'extended_response',
            number: 16,
            marks: 2,
            question: 'Create a mnemonic device to help students remember the three essential components of a structured informative paragraph: <strong>Topic sentence, Supporting details, Connectives</strong>.',
            isBonus: true,
        },
    ];

    const quizSettings = {
        title: 'Selective Grade Quiz — Structuring Informative Paragraphs',
        time_limit_minutes: 30,
        total_marks: 35,
        bonus_marks: 2,
        instructions: 'Answer all questions. Use complete sentences for short answer and extended response sections.',
        available_from: null,
        available_until: null,
        due_date: null,
    };

    // ── Update the lesson row ──
    await knex('lessons').where('id', lesson.id).update({
        content_notes: JSON.stringify(contentNotes),
        homework_content: JSON.stringify(homeworkContent),
        quiz_questions: JSON.stringify(quizQuestions),
        quiz_settings: JSON.stringify(quizSettings),
        is_accessible: true,
        updated_at: knex.fn.now(),
    });

    console.log('  ✅ Lesson 3 content updated:');
    console.log('     📖 Summary Notes: 5 sections — TEEL, Topic Sentences, Details, Connectives, Synthesis');
    console.log('     📝 Homework: 4 tasks (Topic Analysis, Detail Dev, Connectives, Paragraph Construction)');
    console.log('     🧪 Quiz: 16 questions (10 MC + 4 Short Answer + 1 Extended + 1 Bonus)');
    console.log('     Total marks: 35 + 2 bonus\n');
};
