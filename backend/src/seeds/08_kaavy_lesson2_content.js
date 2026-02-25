/**
 * Seed: Kaavy's English Y5 Term 2 Lesson 2 — Research and Note-Taking Skills
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
        .where({ term_id: term2.id, lesson_number: 2 })
        .first();

    if (!lesson) {
        console.log('  ⚠ Lesson 2 not found in Term 2 — skipping');
        return;
    }

    console.log(`  📝 Updating lesson: ${lesson.title} (${lesson.id})`);

    // ════════════════════════════════════════════
    //  SUMMARY NOTES
    // ════════════════════════════════════════════

    const contentNotes = {
        objectives: [
            'Identify main topics and key information',
            'Apply effective note-taking techniques',
            'Organise research findings using tables and headings',
        ],
        html: `
<div class="lesson-rich-content">

<h2>1. Identifying Main Topics and Key Information</h2>

<h3>Finding the Main Topic</h3>
<p>The main topic is the <strong>central subject</strong> that all paragraphs discuss. It is broader than a single detail but specific enough to cover all content.</p>
<ul>
  <li>Usually introduced in the title or first paragraph</li>
  <li>Supported by multiple pieces of evidence throughout the text</li>
  <li><strong>Not</strong> the same as a theme (message) or specific detail</li>
</ul>

<h3>Locating Specific Information (Scanning)</h3>
<p>When researching, you must locate precise facts quickly without reading every word:</p>
<ul>
  <li>Use <strong>keywords</strong> from your research question (e.g., "communication," "survival," "threats")</li>
  <li>Look for <strong>signpost words</strong> (first, secondly, however, for example)</li>
  <li>Check topic sentences (usually first sentence of each paragraph)</li>
  <li>Use text features (bold headings, subheadings) as navigation tools</li>
</ul>

<h3>Evaluating Usefulness for Research</h3>
<p>Not all information deserves a note. Ask:</p>
<div class="structure-card">
  <ul>
    <li>Is it a <strong>fact</strong> (verifiable) or <strong>opinion</strong> (beliefs/feelings)?</li>
    <li>Is it <strong>relevant</strong> to my specific research question?</li>
    <li>Is it <strong>specific</strong> enough to be valuable (avoid vague statements like "Dolphins are cute")?</li>
    <li>Does it come from a <strong>credible</strong> part of the text (statistics vs. anecdotes)?</li>
  </ul>
</div>

<hr/>

<h2>2. Taking Effective Notes</h2>

<div class="key-principle">
  <strong>The Golden Rules of Note-Taking:</strong>
  <ol>
    <li><strong>Short:</strong> Fragments and phrases, not complete sentences</li>
    <li><strong>Own Words:</strong> Paraphrase to demonstrate understanding (avoids plagiarism)</li>
    <li><strong>Keywords:</strong> Extract technical terms and central concepts only</li>
    <li><strong>Organised:</strong> Group under clear headings or subtopics</li>
  </ol>
</div>

<h3>The Conversion Process (Sentences → Notes)</h3>

<div class="info-box info-box-blue">
  <h4>Example 1</h4>
  <p><strong>Original:</strong> <em>"Dolphins use clicks and whistles to communicate with each other."</em></p>
  <ul>
    <li>Identify core concept: Communication method</li>
    <li>Strip unnecessary words: "Dolphins," "use," "to communicate with each other" (implied)</li>
    <li><strong>Note format:</strong> <code>Communication:</code> clicks and whistles</li>
  </ul>
</div>

<div class="info-box info-box-amber">
  <h4>Example 2</h4>
  <p><strong>Original:</strong> <em>"Dolphins often work together to surround schools of fish, which makes hunting easier."</em></p>
  <ul>
    <li>Core concept: Hunting strategy / Teamwork</li>
    <li>Keywords: surround, schools, hunting, easier</li>
    <li><strong>Note format:</strong> <code>Teamwork when hunting:</code> surround fish → easier to catch food</li>
  </ul>
</div>

<h3>What to Avoid</h3>
<div class="structure-card">
  <ul>
    <li>❌ Copying full sentences (wastes time, risks plagiarism)</li>
    <li>❌ Writing everything down (indicates lack of discrimination)</li>
    <li>❌ Disconnected facts without context or headings</li>
  </ul>
</div>

<hr/>

<h2>3. Organising Research Findings</h2>

<div class="selective-insight">
  <strong>Why Organisation Matters:</strong> Raw notes are useless without structure. Organisation transforms data into <strong>usable knowledge</strong> for writing reports.
</div>

<h3>The Table Method</h3>
<p>Create columns with <strong>headings</strong> that represent subtopics of your research question.</p>

<table class="info-table">
  <thead>
    <tr><th>Heading</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Animal Adaptations</strong></td><td>Sloths: slow movement, arboreal (tree-dwelling)</td></tr>
    <tr><td></td><td>Tree frogs: sticky toe pads for climbing</td></tr>
    <tr><td><strong>Plant Adaptations</strong></td><td>Tall trees: reach high for sunlight</td></tr>
    <tr><td></td><td>Small plants: large leaves for light capture</td></tr>
    <tr><td><strong>Threats</strong></td><td>Deforestation (human activity)</td></tr>
    <tr><td></td><td>Plastic pollution / fishing nets (for marine topics)</td></tr>
  </tbody>
</table>

<h3>Benefits of Table Organisation</h3>
<ul>
  <li><strong>Visual pattern recognition</strong> — seeing which subtopics have enough evidence</li>
  <li><strong>Easy transition to paragraph writing</strong> — each heading = potential paragraph</li>
  <li><strong>Prevents repetition</strong> — clearly see what you've already recorded</li>
  <li><strong>Identifies research gaps</strong> — empty cells show what you still need to find</li>
</ul>

<h3>Creating Effective Headings</h3>
<div class="structure-card">
  <ul>
    <li>Must be <strong>mutually exclusive</strong> (no overlapping categories)</li>
    <li>Must be <strong>collectively exhaustive</strong> (cover all main aspects of the text)</li>
    <li>Should reflect your <strong>research question</strong> focus</li>
    <li>Examples: <em>Survival Strategies, Environmental Threats, Communication Methods, Physical Characteristics</em></li>
  </ul>
</div>

<hr/>

<h2>4. The Research Process Workflow</h2>

<div class="structure-card">
  <h4>Step 1: Formulate Research Question</h4>
  <ul>
    <li>Specific, not too broad (e.g., <em>"How do rainforest plants compete for sunlight?"</em> NOT <em>"Tell me about rainforests"</em>)</li>
    <li>Guides what information to keep vs. discard</li>
  </ul>
</div>

<div class="structure-card">
  <h4>Step 2: Active Reading</h4>
  <ul>
    <li>Skim first for overall structure and relevance</li>
    <li>Scan second for specific facts answering your question</li>
    <li>Close read only relevant sections</li>
  </ul>
</div>

<div class="structure-card">
  <h4>Step 3: Note-Taking</h4>
  <ul>
    <li>Convert sentences to keywords immediately</li>
    <li>Maintain source citation (page number, author, title)</li>
    <li>Use consistent abbreviations (e.g., w/ = with, → = leads to/results in)</li>
  </ul>
</div>

<div class="structure-card">
  <h4>Step 4: Synthesis</h4>
  <ul>
    <li>Sort notes under appropriate headings</li>
    <li>Look for connections between facts (cause/effect, compare/contrast)</li>
    <li>Identify which headings have sufficient evidence for writing</li>
  </ul>
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
  <h3>Task 1: Main Topic & Specific Information <span class="time-badge">10 mins</span></h3>
  <p>Read the following text carefully:</p>

  <blockquote class="passage">
    <strong>The Honeybee Colony</strong><br/>
    Honeybees are social insects that live in highly organised colonies of up to 60,000 individuals. Each colony consists of one queen, thousands of female worker bees, and several hundred male drones during breeding season.<br/><br/>
    Worker bees perform different duties depending on their age. Young workers clean cells and feed larvae, while older workers forage for nectar and pollen. The foraging workers communicate food sources to their sisters through a "waggle dance" that indicates direction and distance from the hive.<br/><br/>
    Despite their importance to agriculture, honeybee populations face serious threats. Pesticides used in farming can disorient foraging bees, preventing them from returning to the hive. Additionally, the Varroa destructor mite parasitizes bees, spreading viruses that weaken entire colonies.
  </blockquote>

  <p><strong>Questions:</strong></p>
  <ol>
    <li>What is the main topic of this text? How is it broader than just "bees"? <span class="marks">(2 marks)</span></li>
    <li>Which paragraph provides information about <strong>communication methods</strong>? Quote the specific sentence that proves your answer. <span class="marks">(2 marks)</span></li>
    <li>Would the sentence <em>"Honeybees are the most important insects in the world"</em> be useful for research? Why or why not? <span class="marks">(2 marks)</span></li>
  </ol>
</div>

<div class="homework-task">
  <h3>Task 2: Note-Taking Conversion <span class="time-badge">15 mins</span></h3>
  <p>Convert the following sentences into effective research notes using the format demonstrated in class (keywords, fragments, organised under implied headings). Do <strong>not</strong> copy full sentences.</p>
  <ol type="a">
    <li><em>"The Great Barrier Reef stretches over 2,300 kilometres and is visible from space, making it the world's largest coral reef system."</em></li>
    <li><em>"Rising ocean temperatures cause coral bleaching, which occurs when corals expel the symbiotic algae living in their tissues, turning them completely white."</em></li>
    <li><em>"Crown-of-thorns starfish prey on coral polyps and can devastate large sections of reef if their populations grow unchecked."</em></li>
    <li><em>"Marine biologists are developing new techniques to regenerate damaged coral, including 3D-printed artificial reef structures that encourage new coral growth."</em></li>
  </ol>
</div>

<div class="homework-task">
  <h3>Task 3: Organisation & Synthesis <span class="time-badge">10 mins</span></h3>
  <p>Imagine you are researching the question: <em>"What threats do coral reefs face and how are scientists responding?"</em></p>
  <p>Using your notes from Task 2 (above), create a two-column table with the headings <strong>"Threats"</strong> and <strong>"Conservation Solutions"</strong>. Sort your notes appropriately.</p>
  <p>Then, answer: Why is it helpful to organise your notes this way before writing a report? (3–4 sentences)</p>
</div>

<div class="homework-task">
  <h3>Task 4: Critical Evaluation <span class="time-badge">5 mins</span></h3>
  <p>A classmate has taken these notes:</p>
  <ul>
    <li><em>"The reef is pretty and lots of fish live there"</em></li>
    <li><em>"Coral bleaching happens when it gets hot"</em></li>
    <li><em>"2,300 km long"</em></li>
  </ul>
  <p>Identify <strong>three</strong> weaknesses in these notes regarding the research question from Task 3. For each weakness, explain how to improve it.</p>
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
            question: 'Which of the following best describes a <strong>main topic</strong>?',
            options: [
                'A specific detail mentioned in the final paragraph',
                'The central subject that all paragraphs discuss and support',
                "The author's personal opinion about the subject",
                'A list of examples given in the text',
            ],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 2, marks: 1,
            question: 'When scanning a text to find information about "communication," you should:',
            options: [
                'Read every word carefully from beginning to end',
                'Look for keywords, headings, or topic sentences related to communication',
                'Skip the text and guess based on the title',
                'Only read the last paragraph',
            ],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 3, marks: 1,
            question: 'Why is the sentence <em>"Dolphins are cute animals"</em> generally <strong>not useful</strong> for research?',
            options: [
                'It contains spelling errors',
                'It is an opinion, not a verifiable fact',
                'It is too long to write in notes',
                'Dolphins are not actually cute',
            ],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 4, marks: 1,
            question: 'Which of the following represents <strong>effective note-taking</strong>?',
            options: [
                'Copying: "Dolphins must regularly swim to the surface in order to breathe through a blowhole located on top of their heads."',
                'Writing: Respiration: surface regularly, blowhole (top of head)',
                'Writing: "Dolphins breathe through a blowhole on their heads by swimming to the surface regularly."',
                'Drawing a picture of a dolphin without labels',
            ],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 5, marks: 1,
            question: 'The primary purpose of organising notes under <strong>headings</strong> is to:',
            options: [
                'Make the notebook look neater',
                'Group related information for easier synthesis and report writing',
                'Fill up empty space on the page',
                'Hide information from other students',
            ],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 6, marks: 1,
            question: 'Which note would best fit under the heading <strong>"Human Impact"</strong>?',
            options: [
                '"Sloths move slowly to avoid predators"',
                '"Tall trees reach for sunlight"',
                '"Plastic pollution threatens dolphin survival"',
                '"Tree frogs have sticky toe pads"',
            ],
            correctIndex: 2,
        },
        {
            section: 'A', type: 'multiple_choice', number: 7, marks: 1,
            question: 'When converting research notes into a paragraph, a well-organised table helps the writer to:',
            options: [
                'Avoid doing any actual writing',
                'See which subtopics have sufficient evidence to form paragraphs',
                'Copy directly from the table without thinking',
                'Change the research question halfway through',
            ],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 8, marks: 1,
            question: 'Which research question is <strong>specific enough</strong> for effective note-taking?',
            options: [
                'Tell me about oceans',
                'How does plastic pollution specifically affect marine mammal breathing and behaviour?',
                'Everything about dolphins',
                'Why are animals important?',
            ],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 9, marks: 1,
            question: '"Synthesis" in research means:',
            options: [
                'Copying text word-for-word from multiple sources',
                'Combining and connecting information from various notes to form new understanding',
                'Writing as fast as possible',
                'Only using one source for your entire project',
            ],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 10, marks: 1,
            question: 'Which of the following notes demonstrates <strong>paraphrasing</strong> (writing in your own words)?',
            options: [
                '"Rainforests are warm, wet environments"',
                'Climate: high rainfall, warm temps year-round',
                '"Rainforests receive large amounts of rainfall throughout the year"',
                '"Warm, wet, lots of rain"',
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
            question: `Read the following text:

<blockquote><strong>The Numbat</strong><br/>
The numbat is a small marsupial native to Western Australia. Unlike most marsupials, numbats are active during the day (diurnal) because their primary food source—termites—is most abundant in daylight hours. Using their sharp claws and long sticky tongues, numbats can consume up to 20,000 termites daily.<br/><br/>
Habitat loss due to land clearing for agriculture has severely reduced numbat populations. Conservation groups have established fenced reserves free from predators such as foxes and cats, allowing numbats to breed safely in protected environments.</blockquote>

<strong>a)</strong> What is the main topic of this text? (1 mark)<br/>
<strong>b)</strong> Which paragraph gives information about <strong>survival adaptations</strong>? Provide one piece of evidence from that paragraph to support your answer. (2 marks)<br/>
<strong>c)</strong> Would the sentence <em>"Numbats are the cutest Australian animals"</em> be useful for research? Explain why or why not. (1 mark)`,
        },
        {
            section: 'B', type: 'short_answer', number: 12, marks: 6,
            question: `Convert the following sentences into effective research notes. Do not copy full sentences. Use keywords and fragments only.

<strong>a)</strong> <em>"Emperor penguins have developed dense, overlapping feathers that provide waterproof insulation against the freezing Antarctic temperatures."</em> (2 marks)

<strong>b)</strong> <em>"Climate change is reducing sea ice coverage, which threatens penguin breeding grounds and food sources, forcing colonies to travel further to find sustenance."</em> (2 marks)

<strong>c)</strong> <em>"Researchers use satellite imagery and microchipped tracking devices to monitor penguin population movements and identify critical habitat zones requiring protection."</em> (2 marks)`,
        },
        {
            section: 'B', type: 'short_answer', number: 13, marks: 3,
            question: `You are researching the question: <em>"How do emperor penguins survive in extreme cold, and what threats do they face?"</em>

Organise the notes you created in Question 12 into a table with two appropriate headings. Write the table in your answer booklet.`,
        },
        {
            section: 'B', type: 'short_answer', number: 14, marks: 2,
            question: 'Explain why it is academically dishonest to copy full sentences from a source into your notes without quotation marks, even if you intend to change them later when writing your report.',
        },

        // ── SECTION C: Extended Response (10 marks) ──
        {
            section: 'C',
            sectionTitle: 'Extended Response',
            type: 'extended_response',
            number: 15,
            marks: 10,
            passage: `<h4>Adaptations of the Australian Bilby</h4>

<p>The greater bilby is a nocturnal marsupial that has evolved remarkable adaptations for survival in Australia's arid regions. Its most distinctive feature is its large, rabbit-like ears which serve multiple functions. These ears contain extensive blood vessels that help regulate body temperature, releasing heat during hot desert nights. Additionally, the ears provide acute hearing that detects insects moving underground.</p>

<p>Bilbies possess strong forelimbs and long claws perfectly designed for digging. They construct complex spiral burrows up to two metres deep, which provide shelter from predators and extreme temperatures. A single bilby may maintain up to twelve different burrows within its home range.</p>

<p>Dietary adaptations allow bilbies to thrive in nutrient-poor environments. They are omnivorous, consuming insects, seeds, fungi, and bulbs. Their long, slender snouts enable them to dig into soil and termite mounds with precision, while their tongues are adapted to lick up food sources efficiently.</p>

<p>Despite these survival mechanisms, bilbies face extinction threats from introduced predators. Feral cats and foxes hunt bilbies effectively because the native marsupials did not evolve with these terrestrial predators. Competition from rabbits for burrowing sites and food resources further endangers remaining populations.</p>`,
            subQuestions: [
                {
                    label: 'a',
                    title: 'Note-Taking Table',
                    marks: 4,
                    question: 'Imagine you are taking notes for a report titled <em>"Physical Adaptations of Australian Marsupials."</em><br/><br/>Create a table with two columns: <strong>"Adaptation"</strong> and <strong>"Function/Purpose"</strong>. Extract and convert information from the text to fill in at least <strong>four rows</strong> of your table. Write your notes as short phrases, not full sentences.',
                },
                {
                    label: 'b',
                    title: 'Research Process',
                    marks: 4,
                    question: 'Explain the process you would use to determine which information from the text is relevant to your research question and which should be discarded. In your answer, refer to:<ul><li>The difference between physical adaptations and threats (2 marks)</li><li>The importance of specificity in note-taking (2 marks)</li></ul>',
                },
                {
                    label: 'c',
                    title: 'Additional Heading',
                    marks: 2,
                    question: 'Suggest one additional heading (other than Physical Adaptations or Threats) that could be used to organise information from this text for a different research focus. Explain what information would fit under this heading.',
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
            question: 'Create a mnemonic device (acrostic, rhyme, or short phrase) to help students remember the four characteristics of effective notes: <strong>Short, Own Words, Keywords, Organised</strong>.',
            isBonus: true,
        },
    ];

    const quizSettings = {
        title: 'Selective Grade Quiz — Research and Note-Taking Skills',
        time_limit_minutes: 30,
        total_marks: 35,
        bonus_marks: 2,
        instructions: 'Answer all questions. Write in complete sentences unless instructed otherwise. Use evidence from texts where provided.',
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

    console.log('  ✅ Lesson 2 content updated:');
    console.log('     📖 Summary Notes: 4 sections — Main Topics, Note-Taking, Organising, Research Workflow');
    console.log('     📝 Homework: 4 tasks (Main Topic, Note-Taking Conversion, Organisation, Critical Eval)');
    console.log('     🧪 Quiz: 16 questions (10 MC + 4 Short Answer + 1 Extended + 1 Bonus)');
    console.log('     Total marks: 35 + 2 bonus\n');
};
