/**
 * Seed: Kaavy's English Y5 Term 2 Lesson 1 — Full embedded content
 * Summary Notes + Homework + Quiz (structured for the QuizView component)
 */

exports.seed = async function (knex) {
  // Find the lesson: English Y5 → Term 2 → Lesson 1
  const course = await knex('courses')
    .where({ subject_type: 'english', year_level: 5 })
    .first();

  if (!course) {
    console.log('  ⚠ English Y5 course not found — skipping lesson content seed');
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
    .where({ term_id: term2.id, lesson_number: 1 })
    .first();

  if (!lesson) {
    console.log('  ⚠ Lesson 1 not found in Term 2 — skipping');
    return;
  }

  console.log(`  📝 Updating lesson: ${lesson.title} (${lesson.id})`);

  // ════════════════════════════════════════════
  //  SUMMARY NOTES (rich HTML)
  // ════════════════════════════════════════════

  const contentNotes = {
    objectives: [
      'Identify author purpose and point of view',
      'Recognize text structures',
      'Understand informative text features',
    ],
    html: `
<div class="lesson-rich-content">

<h2>1. Purpose of Informative Texts</h2>
<p>Informative texts exist to <strong>educate, explain, or describe</strong> factual information. Unlike narratives (which tell stories) or persuasive texts (which argue opinions), informative texts prioritize <strong>objectivity</strong> and <strong>clarity</strong>.</p>

<h3>Primary Purposes:</h3>
<ul>
  <li><strong>Explain:</strong> How processes work (e.g., "How Volcanoes Erupt")</li>
  <li><strong>Describe:</strong> Characteristics and features (e.g., "The Great Barrier Reef Ecosystem")</li>
  <li><strong>Instruct:</strong> Step-by-step procedures (e.g., "How to Conduct a Scientific Experiment")</li>
  <li><strong>Report:</strong> Present findings from research (e.g., "Recent Discoveries in Mars Exploration")</li>
</ul>

<div class="key-principle">
  <strong>Key Principle:</strong> The reader should finish the text knowing <strong>more</strong> than when they started, without being convinced to believe or do something specific.
</div>

<hr/>

<h2>2. Author's Purpose vs. Point of View</h2>

<h3>Author's Purpose (Why write it?)</h3>
<ul>
  <li>To inform: <em>"The water cycle consists of three main stages..."</em></li>
  <li>To entertain: <em>"The angry storm clouds gathered like furious giants..."</em> (This is narrative, not informative)</li>
  <li>To persuade: <em>"We must protect our water resources immediately..."</em></li>
</ul>

<h3>Point of View (Through which lens?)</h3>

<div class="info-box info-box-blue">
  <h4>Objective</h4>
  <p>Neutral, fact-based, no personal feelings</p>
  <ul>
    <li><em>Third person pronouns:</em> he, she, it, they, the species, the system</li>
    <li><em>Evidence:</em> Statistics, expert testimony, observable data</li>
  </ul>
</div>

<div class="info-box info-box-amber">
  <h4>Subjective</h4>
  <p>Personal interpretations, emotions, or judgments</p>
  <ul>
    <li><em>First person:</em> I believe, in my opinion, we think</li>
    <li><em>Bias indicators:</em> Obviously, certainly, everyone knows (these suggest opinion, not fact)</li>
  </ul>
</div>

<div class="selective-insight">
  <strong>Selective Insight:</strong> Even "factual" texts contain <strong>implicit</strong> purpose. A text about "The Benefits of Recycling" informs but also subtly persuades through topic selection.
</div>

<hr/>

<h2>3. Text Structures (Organizational Patterns)</h2>

<div class="structure-card">
  <h4>A. Description Pattern</h4>
  <ul>
    <li>Focuses on attributes, characteristics, and qualities</li>
    <li>Uses sensory details and precise adjectives</li>
    <li><strong>Signal words:</strong> <code>appears as</code>, <code>characteristics include</code>, <code>consists of</code>, <code>for example</code></li>
  </ul>
</div>

<div class="structure-card">
  <h4>B. Sequence/Chronological Pattern</h4>
  <ul>
    <li>Orders information by time or steps</li>
    <li>Critical for procedures, historical accounts, life cycles</li>
    <li><strong>Signal words:</strong> <code>first</code>, <code>subsequently</code>, <code>finally</code>, <code>prior to</code>, <code>following</code>, <code>simultaneously</code></li>
  </ul>
</div>

<div class="structure-card">
  <h4>C. Cause and Effect Pattern</h4>
  <ul>
    <li>Explains relationships between actions and consequences</li>
    <li>May be single cause→multiple effects or multiple causes→single effect</li>
    <li><strong>Signal words:</strong> <code>because</code>, <code>consequently</code>, <code>results in</code>, <code>leads to</code>, <code>therefore</code>, <code>due to</code></li>
  </ul>
</div>

<div class="structure-card">
  <h4>D. Compare and Contrast Pattern</h4>
  <ul>
    <li>Highlights similarities (comparison) and differences (contrast)</li>
    <li>Organized by subject (all info about A, then all about B) or by feature (alternating points)</li>
    <li><strong>Signal words:</strong> <code>similarly</code>, <code>whereas</code>, <code>in contrast</code>, <code>unlike</code>, <code>both</code>, <code>share</code>, <code>however</code></li>
  </ul>
</div>

<div class="structure-card">
  <h4>E. Problem and Solution Pattern</h4>
  <ul>
    <li>Identifies an issue and proposes resolution(s)</li>
    <li>Common in scientific and environmental texts</li>
    <li><strong>Signal words:</strong> <code>the problem is</code>, <code>one solution</code>, <code>to address this</code>, <code>challenge</code>, <code>resolution</code></li>
  </ul>
</div>

<div class="structure-card">
  <h4>F. Enumeration/List Pattern</h4>
  <ul>
    <li>Groups information by categories or numbered points</li>
    <li>Uses topic sentences with clear listing language</li>
    <li><strong>Signal words:</strong> <code>numerous factors</code>, <code>several types</code>, <code>can be classified</code>, <code>firstly</code>, <code>secondly</code></li>
  </ul>
</div>

<hr/>

<h2>4. Language Features of Informative Texts</h2>

<h3>Tense Usage</h3>
<table class="info-table">
  <thead><tr><th>Tense</th><th>Use</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Simple Present</td><td>Universal truths and general facts</td><td><em>The heart pumps blood</em></td></tr>
    <tr><td>Simple Past</td><td>Historical discoveries or completed studies</td><td><em>Darwin observed finches</em></td></tr>
    <tr><td>Present Perfect</td><td>Recent research with current relevance</td><td><em>Scientists have discovered...</em></td></tr>
  </tbody>
</table>

<h3>Voice</h3>
<ul>
  <li><strong>Passive Voice:</strong> Emphasizes the action/research rather than the researcher (<em>The experiment was conducted</em> vs. <em>We conducted the experiment</em>)</li>
  <li><strong>Active Voice:</strong> Used for clarity in instructions or when the agent is important</li>
</ul>

<h3>Vocabulary</h3>
<ul>
  <li><strong>Technical/Subject-specific:</strong> Photosynthesis, precipitation, tectonic, democracy</li>
  <li><strong>Abstract Nouns:</strong> evaporation, globalization, photosynthesis (concepts rather than concrete objects)</li>
  <li><strong>Precise Verbs:</strong> indicates, demonstrates, illustrates, identifies (avoid vague words like "says" or "shows")</li>
</ul>

<h3>Cohesive Devices</h3>
<ul>
  <li><strong>Reference words:</strong> this, these, that (referring back to previous information)</li>
  <li><strong>Lexical chains:</strong> Repeated use of key terms and synonyms to maintain topic focus</li>
</ul>


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
  <h3>Task 1: Analysis <span class="time-badge">15 mins</span></h3>
  <p>Read the following short text and answer the questions:</p>

  <blockquote class="passage">
    "The Great Pacific Garbage Patch is not an island of solid waste, as commonly believed. Rather, it consists of microplastics—tiny fragments less than 5mm in size—suspended throughout the water column. These particles originate from land-based sources, including plastic bags, bottles, and fishing gear that break down over decades. Consequently, marine life ingests these particles, leading to bioaccumulation in the food chain. Scientists have identified over 700 species affected by this pollution. To address this crisis, environmental engineers have developed ocean cleanup technologies, including floating barriers that capture debris without harming wildlife."
  </blockquote>

  <ol>
    <li>Identify the <strong>primary text structure</strong> used in this passage. Justify your answer with two specific phrases from the text. <span class="marks">(3 marks)</span></li>
    <li>List three <strong>technical terms</strong> used and explain what they mean in this context. <span class="marks">(3 marks)</span></li>
    <li>Is this text <strong>objective or subjective</strong>? Provide evidence to support your judgment. <span class="marks">(2 marks)</span></li>
    <li>Rewrite the sentence beginning with <em>"Consequently..."</em> using a different cause-and-effect connective of your choice. <span class="marks">(2 marks)</span></li>
  </ol>
</div>

<div class="homework-task">
  <h3>Task 2: Application <span class="time-badge">10 mins</span></h3>
  <p>Choose a topic from the list below. Write a paragraph (8–10 lines) using the <strong>Description Pattern</strong> structure. Include at least two technical terms and use the present tense throughout.</p>
  <div class="topic-chips">
    <span>The Solar System</span>
    <span>A Favourite Animal's Habitat</span>
    <span>How a Smartphone Works</span>
    <span>The Water Cycle</span>
  </div>
</div>

<div class="homework-task">
  <h3>Task 3: Critical Thinking <span class="time-badge">5 mins</span></h3>
  <p>Explain why informative texts rarely use <strong>exclamation marks</strong>. In your answer, consider the relationship between punctuation, tone, and purpose. (Write 3–4 sentences)</p>
</div>

</div>
        `.trim(),
  };

  // ════════════════════════════════════════════
  //  QUIZ (structured for the QuizView component)
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
      question: 'Which sentence best demonstrates the <strong>objective point of view</strong> required in informative texts?',
      options: [
        'I think that climate change is the most serious problem we face today.',
        'Climate change is obviously caused by human activities and must be stopped now.',
        'Research indicates that global temperatures have risen by 1.1°C since pre-industrial times.',
        'Everyone knows that recycling is the best way to save our beautiful planet.',
      ],
      correctIndex: 2,
    },
    {
      section: 'A', type: 'multiple_choice', number: 2, marks: 1,
      question: 'In a text structured using <strong>compare and contrast</strong>, which connective pair would you expect to find?',
      options: ['First, then', 'Because, therefore', 'Similarly, however', 'The problem is, the solution is'],
      correctIndex: 2,
    },
    {
      section: 'A', type: 'multiple_choice', number: 3, marks: 1,
      question: 'A text explaining "How to Construct a Volcanic Eruption Model" would most likely use which structure?',
      options: ['Problem and Solution', 'Chronological/Sequence', 'Cause and Effect', 'Description'],
      correctIndex: 1,
    },
    {
      section: 'A', type: 'multiple_choice', number: 4, marks: 1,
      question: 'Which feature indicates that a text is <strong>instructive</strong> rather than merely descriptive?',
      options: [
        'Use of colourful adjectives',
        'Presence of historical dates',
        'Imperative verbs (commands) and numbered steps',
        'References to scientific studies',
      ],
      correctIndex: 2,
    },
    {
      section: 'A', type: 'multiple_choice', number: 5, marks: 1,
      question: '"The experiment was conducted over a three-week period." This sentence uses passive voice to:',
      options: [
        'Hide who conducted the experiment',
        'Emphasize the timeframe rather than the researcher',
        'Make the sentence more confusing',
        "Express the author's opinion",
      ],
      correctIndex: 1,
    },
    {
      section: 'A', type: 'multiple_choice', number: 6, marks: 1,
      question: 'A lexical chain in a text about "The Amazon Rainforest" might include:',
      options: [
        'Rainforest, trees, canopy, deforestation, ecosystem',
        'Rainforest, desert, arctic, ocean',
        'Happy, exciting, dangerous, beautiful',
        'I, me, my, mine',
      ],
      correctIndex: 0,
    },
    {
      section: 'A', type: 'multiple_choice', number: 7, marks: 1,
      question: 'Which of the following is <strong>NOT</strong> a characteristic of informative text language?',
      options: [
        'Use of present tense for general facts',
        'Technical vocabulary specific to the topic',
        'Emotive adjectives designed to frighten the reader',
        'Formal tone without contractions',
      ],
      correctIndex: 2,
    },
    {
      section: 'A', type: 'multiple_choice', number: 8, marks: 1,
      question: 'The sentence <em>"Although bats are often feared, they play a crucial role in pollination"</em> signals which structure?',
      options: ['Purely descriptive', 'Compare and contrast', 'Cause and effect', 'Problem and solution'],
      correctIndex: 1,
    },
    {
      section: 'A', type: 'multiple_choice', number: 9, marks: 1,
      question: 'In a scientific report, why would the writer include a glossary?',
      options: [
        'To show off their vocabulary',
        'To define technical terms for the reader',
        'To make the text longer',
        'To persuade readers to buy a dictionary',
      ],
      correctIndex: 1,
    },
    {
      section: 'A', type: 'multiple_choice', number: 10, marks: 1,
      question: 'Which topic sentence indicates the text will use <strong>enumeration</strong> (listing) structure?',
      options: [
        'There are three primary types of volcanic eruptions.',
        'The eruption destroyed the entire village.',
        'Volcanoes are dangerous because they explode.',
        'If we study volcanoes, we can predict eruptions.',
      ],
      correctIndex: 0,
    },

    // ── SECTION B: Short Answer (15 marks) ──
    {
      section: 'B',
      sectionTitle: 'Short Answer',
      type: 'short_answer',
      number: 11,
      marks: 4,
      question: `Read the following text excerpt:

<blockquote>"The monarch butterfly's migration is one of nature's most remarkable phenomena. Unlike other butterflies, monarchs undertake a multigenerational journey spanning up to 4,000 kilometres. First, the butterflies store fat reserves by feeding on nectar. Next, they use environmental cues, specifically the angle of sunlight, to navigate southward. As a result of this incredible navigation system, monarchs return to the exact same forests as their ancestors, despite never having visited these locations themselves."</blockquote>

Identify <strong>two</strong> different text structures used in this passage. For each structure:
<ul>
  <li>Name the structure (1 mark each)</li>
  <li>Quote one word or phrase that signals this structure (1 mark each)</li>
</ul>`,
    },
    {
      section: 'B', type: 'short_answer', number: 12, marks: 4,
      question: 'Explain the difference between <strong>author\'s purpose</strong> and <strong>author\'s point of view</strong>. Use examples from any informative text you have studied this term to illustrate your answer.',
    },
    {
      section: 'B', type: 'short_answer', number: 13, marks: 3,
      question: `A student has written: <em>"I think that the water cycle is super cool because it rains and then the sun makes the water disappear and that's amazing!!!"</em>

Identify <strong>three</strong> ways this sentence fails to meet informative text conventions. Rewrite the sentence correctly.`,
    },
    {
      section: 'B', type: 'short_answer', number: 14, marks: 4,
      question: `Analyze the following sentence: <em>"Due to deforestation and climate change, numerous species face extinction; however, conservation efforts have successfully stabilized several populations."</em>
<ul>
  <li>Identify the text structure(s) present (2 marks)</li>
  <li>Explain how the connectives function to link ideas (2 marks)</li>
</ul>`,
    },

    // ── SECTION C: Extended Response (10 marks) ──
    {
      section: 'C',
      sectionTitle: 'Extended Response',
      type: 'extended_response',
      number: 15,
      marks: 10,
      passage: `<h4>The Hidden World of Caves</h4>

<p>Cave systems represent some of Earth's most ancient and mysterious environments. These subterranean formations develop through distinct geological processes that span millennia.</p>

<p>The formation of solution caves, the most common type, begins when slightly acidic rainwater seeps through soil and fractures in bedrock. This water absorbs carbon dioxide from soil and air, forming weak carbonic acid. Consequently, the acidic water dissolves carbonate rocks, particularly limestone, creating underground voids. Over thousands of years, these voids expand into vast chambers and networks.</p>

<p>Three primary features characterize mature cave systems. Stalactites form when mineral-rich water drips from cave ceilings, leaving calcite deposits that accumulate downward like icicles. Conversely, stalagmites build upward from the cave floor where droplets land. When these formations meet, they create columns. Unlike popular belief, these structures grow extremely slowly—approximately one cubic centimetre per century.</p>

<p>Cave ecosystems support unique biodiversity. Troglophiles, species that can survive both inside and outside caves, include certain bats and crickets. In contrast, troglobites have evolved complete dependence on cave environments, losing pigmentation and eyesight over generations. The discovery of extremophiles—organisms surviving without sunlight—in these dark zones has revolutionized scientific understanding of life's adaptability.</p>`,
      subQuestions: [
        {
          label: 'a',
          title: 'Text Structure Analysis',
          marks: 4,
          question: 'Identify and explain <strong>two</strong> different text structures used in this passage. Provide specific evidence (quotations) to support your identification.',
        },
        {
          label: 'b',
          title: 'Language Features',
          marks: 3,
          question: 'Identify three technical terms used in the text. For each term, explain how its use enhances the informative purpose of the text.',
        },
        {
          label: 'c',
          title: 'Critical Evaluation',
          marks: 3,
          question: 'The author states these formations grow "extremely slowly—approximately one cubic centimetre per century." Why has the author included this specific statistic? How does this choice reflect informative text conventions?',
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
      question: 'Create a hierarchical diagram (bullet points acceptable) showing how you would organize an informative text about "The History of Australian Currency" using <strong>three</strong> different text structures we have studied. Label each section with the structure name and justify why that structure suits that section.',
      isBonus: true,
    },
  ];

  const quizSettings = {
    title: 'Selective Grade Quiz — Informative Text Features',
    time_limit_minutes: 30,
    total_marks: 35,
    bonus_marks: 2,
    instructions: 'Answer all questions. Use evidence from texts where required.',
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

  console.log('  ✅ Lesson content updated:');
  console.log('     📖 Summary Notes: 5 sections with rich HTML');
  console.log('     📝 Homework: 3 tasks (Analysis, Application, Critical Thinking)');
  console.log('     🧪 Quiz: 16 questions (10 MC + 4 Short Answer + 1 Extended + 1 Bonus)');
  console.log('     Total marks: 35 + 2 bonus\n');
};
