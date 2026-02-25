/**
 * Seed: Kaavy's Maths Y5 Term 2 Lesson 1 — Equivalent Fractions & Simplification
 * Summary Notes + Homework + Quiz
 */

exports.seed = async function (knex) {
    const course = await knex('courses')
        .where({ subject_type: 'mathematics', year_level: 5 })
        .first();

    if (!course) {
        console.log('  ⚠ Mathematics Y5 course not found — skipping');
        return;
    }

    const term2 = await knex('course_terms')
        .where({ course_id: course.id, term_number: 2 })
        .first();

    if (!term2) {
        console.log('  ⚠ Maths Y5 Term 2 not found — skipping');
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
    //  SUMMARY NOTES
    // ════════════════════════════════════════════

    const contentNotes = {
        objectives: [
            'Understand equivalent fractions as identical values with different representations',
            'Simplify fractions to lowest terms using HCF',
            'Generate fraction families and apply equivalence to real-world problems',
        ],
        html: `
<div class="lesson-rich-content">

<h2>1. The Concept of Equivalence</h2>
<p>Equivalent fractions are different <strong>numerical representations</strong> of the same <strong>quantitative value</strong>. They describe identical portions of a whole using different denominators.</p>

<h3>Three Representational Models</h3>
<div class="structure-card">
  <ul>
    <li><strong>Area Model:</strong> Dividing shapes into equal parts (pizzas, rectangles, circles)</li>
    <li><strong>Length Model:</strong> Number lines or fraction strips showing identical points</li>
    <li><strong>Set Model:</strong> Groups of objects where subsets maintain the same ratio (e.g., 2 out of 4 red balls = 4 out of 8 red balls)</li>
  </ul>
</div>

<div class="key-principle">
  <strong>Core Principle:</strong> The <strong>ratio</strong> between numerator and denominator remains constant.
</div>

<hr/>

<h2>2. The Golden Rule of Equivalence</h2>

<div class="selective-insight">
  <strong>"Whatever operation you perform on the numerator, you must perform identically on the denominator."</strong>
</div>

<h3>Mathematical Representation</h3>
<div class="math-display">
  <span class="frac"><sup>a</sup>&frasl;<sub>b</sub></span> = <span class="frac"><sup>a &times; n</sup>&frasl;<sub>b &times; n</sub></span> = <span class="frac"><sup>a &divide; n</sup>&frasl;<sub>b &divide; n</sub></span>
  &nbsp;&nbsp;<em>(where n &ne; 0)</em>
</div>

<div class="info-box info-box-blue">
  <h4>&#9878; The Seesaw Analogy</h4>
  <p>A fraction is balanced. If you only change one side (multiply or divide only the numerator), the balance tips — the value changes. To maintain equivalence, both sides must change equally.</p>
</div>

<h3>Operations</h3>
<table class="info-table">
  <thead><tr><th>Operation</th><th>What It Does</th><th>When to Use</th></tr></thead>
  <tbody>
    <tr><td><strong>Expanding (Building Up)</strong></td><td>Multiply numerator and denominator by the same integer</td><td>Creating common denominators</td></tr>
    <tr><td><strong>Simplifying (Reducing)</strong></td><td>Divide numerator and denominator by the same integer</td><td>Finding lowest terms</td></tr>
  </tbody>
</table>

<hr/>

<h2>3. Simplification to Lowest Terms</h2>
<p>A fraction is in <strong>lowest terms</strong> (simplest form) when the numerator and denominator share no common factors other than 1 (i.e., they are <strong>coprime</strong>).</p>

<h3>The Simplification Protocol</h3>

<div class="structure-card">
  <h4>Step 1: List all factors</h4>
  <p>Example: <span class="frac"><sup>12</sup>&frasl;<sub>18</sub></span></p>
  <ul>
    <li>12: {1, 2, 3, 4, 6, 12}</li>
    <li>18: {1, 2, 3, 6, 9, 18}</li>
  </ul>
</div>

<div class="structure-card">
  <h4>Step 2: Identify the Highest Common Factor (HCF)</h4>
  <ul>
    <li>Common factors: {1, 2, 3, 6}</li>
    <li><strong>HCF = 6</strong></li>
  </ul>
</div>

<div class="structure-card">
  <h4>Step 3: Divide both by the HCF</h4>
  <div class="math-display">
    <span class="frac"><sup>12 &divide; 6</sup>&frasl;<sub>18 &divide; 6</sub></span> = <span class="frac"><sup>2</sup>&frasl;<sub>3</sub></span>
  </div>
</div>

<div class="structure-card">
  <h4>Step 4: Verify</h4>
  <p>Check if 2 and 3 share any factors other than 1. They do not. &#10003; Lowest terms achieved.</p>
</div>

<div class="info-box info-box-amber">
  <h4>Alternative Method: Stage Cancelling</h4>
  <div class="math-display">
    <span class="frac"><sup>12</sup>&frasl;<sub>18</sub></span>
    &rarr; <span class="frac"><sup>6</sup>&frasl;<sub>9</sub></span> <em>(&divide; 2)</em>
    &rarr; <span class="frac"><sup>2</sup>&frasl;<sub>3</sub></span> <em>(&divide; 3)</em>
  </div>
</div>

<hr/>

<h2>4. Generating Fraction Families</h2>
<p>A <strong>fraction family</strong> is an infinite set of equivalent fractions derived from a base fraction (the simplest form).</p>

<h3>Expansion Strategy</h3>
<div class="key-principle">
  <strong>Scale Factor</strong> = New Denominator &divide; Original Denominator<br/>
  Apply this factor to the numerator.
</div>

<div class="info-box info-box-blue">
  <h4>Example</h4>
  <p>Complete: <span class="frac"><sup>3</sup>&frasl;<sub>5</sub></span> = <span class="frac"><sup>?</sup>&frasl;<sub>20</sub></span></p>
  <ul>
    <li>Scale factor: 20 &divide; 5 = <strong>4</strong></li>
    <li>New numerator: 3 &times; 4 = <strong>12</strong></li>
    <li>Therefore: <span class="frac"><sup>3</sup>&frasl;<sub>5</sub></span> = <span class="frac"><sup>12</sup>&frasl;<sub>20</sub></span> &#10003;</li>
  </ul>
</div>

<hr/>

<h2>5. Special Properties & Rules</h2>

<div class="structure-card">
  <h4>The Zero-One Rule</h4>
  <p>Any fraction where numerator equals denominator equals <strong>1</strong>.</p>
  <div class="math-display">
    <span class="frac"><sup>5</sup>&frasl;<sub>5</sub></span> = <span class="frac"><sup>100</sup>&frasl;<sub>100</sub></span> = 1
  </div>
  <p>This explains why multiplying by <span class="frac"><sup>2</sup>&frasl;<sub>2</sub></span> or <span class="frac"><sup>5</sup>&frasl;<sub>5</sub></span> doesn't change value — you're multiplying by 1.</p>
</div>

<div class="structure-card">
  <h4>Comparison Strategy</h4>
  <p>When comparing <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span> and <span class="frac"><sup>2</sup>&frasl;<sub>4</sub></span>:</p>
  <ol>
    <li>Simplify both to lowest terms: <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span> and <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span></li>
    <li>Or expand to common denominator: <span class="frac"><sup>2</sup>&frasl;<sub>4</sub></span> and <span class="frac"><sup>2</sup>&frasl;<sub>4</sub></span></li>
  </ol>
  <p>Both methods confirm equivalence. &#10003;</p>
</div>

<hr/>

<h2>6. Real-World Applications</h2>
<p>Equivalent fractions enable:</p>
<ul>
  <li><strong>Measurement conversion</strong> — half a metre = <span class="frac"><sup>50</sup>&frasl;<sub>100</sub></span> metres</li>
  <li><strong>Recipe scaling</strong> — doubling ingredients maintains ratios</li>
  <li><strong>Probability comparison</strong> — <span class="frac"><sup>2</sup>&frasl;<sub>4</sub></span> chance = <span class="frac"><sup>4</sup>&frasl;<sub>8</sub></span> chance</li>
  <li><strong>Data interpretation</strong> — simplifying survey results for reporting</li>
</ul>

<div class="selective-insight">
  <strong>Key Insight:</strong> Different labels, same value. The representation changes; the quantity does not.
</div>

</div>
        `.trim(),
    };

    // ════════════════════════════════════════════
    //  HOMEWORK
    // ════════════════════════════════════════════

    const homeworkContent = {
        instructions: 'Complete in your Homework Book. Show all working for HCF identification.',
        html: `
<div class="homework-rich-content">

<div class="homework-task">
  <h3>Task 1: Conceptual Understanding <span class="time-badge">10 mins</span></h3>
  <p>Draw three different area models (rectangles divided differently) to prove that <span class="frac"><sup>2</sup>&frasl;<sub>3</sub></span> = <span class="frac"><sup>4</sup>&frasl;<sub>6</sub></span> = <span class="frac"><sup>8</sup>&frasl;<sub>12</sub></span>. Shade the equivalent portions and label the numerators and denominators clearly.</p>
</div>

<div class="homework-task">
  <h3>Task 2: Simplification Practice <span class="time-badge">15 mins</span></h3>
  <p>Simplify the following fractions to their lowest terms using the HCF method. List the factors, identify the HCF, then show the division step.</p>
  <ol type="a">
    <li><span class="frac"><sup>16</sup>&frasl;<sub>24</sub></span></li>
    <li><span class="frac"><sup>35</sup>&frasl;<sub>50</sub></span></li>
    <li><span class="frac"><sup>48</sup>&frasl;<sub>72</sub></span></li>
    <li><span class="frac"><sup>27</sup>&frasl;<sub>81</sub></span></li>
  </ol>
</div>

<div class="homework-task">
  <h3>Task 3: Fraction Families <span class="time-badge">10 mins</span></h3>
  <p>Complete the following equivalent fraction families by finding the missing numerators or denominators:</p>
  <ol type="a">
    <li><span class="frac"><sup>3</sup>&frasl;<sub>4</sub></span> = <span class="frac"><sup>?</sup>&frasl;<sub>16</sub></span> = <span class="frac"><sup>15</sup>&frasl;<sub>?</sub></span> = <span class="frac"><sup>?</sup>&frasl;<sub>32</sub></span></li>
    <li><span class="frac"><sup>5</sup>&frasl;<sub>6</sub></span> = <span class="frac"><sup>10</sup>&frasl;<sub>?</sub></span> = <span class="frac"><sup>?</sup>&frasl;<sub>30</sub></span> = <span class="frac"><sup>25</sup>&frasl;<sub>?</sub></span></li>
    <li><span class="frac"><sup>?</sup>&frasl;<sub>9</sub></span> = <span class="frac"><sup>4</sup>&frasl;<sub>6</sub></span> = <span class="frac"><sup>?</sup>&frasl;<sub>27</sub></span> = <span class="frac"><sup>16</sup>&frasl;<sub>?</sub></span></li>
  </ol>
</div>

<div class="homework-task">
  <h3>Task 4: Error Analysis <span class="time-badge">5 mins</span></h3>
  <p>Jamie claims that <span class="frac"><sup>3</sup>&frasl;<sub>8</sub></span> = <span class="frac"><sup>4</sup>&frasl;<sub>9</sub></span> because "he added 1 to both top and bottom."</p>
  <p>Explain why Jamie's method is mathematically incorrect. Use the "Golden Rule" or the Seesaw Analogy in your explanation, and calculate the correct equivalent to <span class="frac"><sup>3</sup>&frasl;<sub>8</sub></span> with a denominator of 9 (or explain why 9 is impossible).</p>
</div>

<div class="homework-task">
  <h3>Task 5: Application Problem <span class="time-badge">10 mins</span></h3>
  <p>A chocolate bar is divided into 24 equal squares.</p>
  <ol type="a">
    <li>If you eat 6 squares, what fraction of the bar have you eaten? (Write in lowest terms) <span class="marks">(1 mark)</span></li>
    <li>Your friend eats <span class="frac"><sup>1</sup>&frasl;<sub>3</sub></span> of an identical bar. Prove using equivalent fractions whether you ate more, less, or the same amount as your friend. <span class="marks">(2 marks)</span></li>
    <li>If you eat <span class="frac"><sup>2</sup>&frasl;<sub>3</sub></span> of the bar and give <span class="frac"><sup>2</sup>&frasl;<sub>6</sub></span> to your sister, who receives more chocolate? Use simplification to justify your answer. <span class="marks">(2 marks)</span></li>
  </ol>
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
            sectionInstructions: 'Select the correct answer. Calculators not permitted.',
            type: 'multiple_choice',
            number: 1,
            marks: 1,
            question: 'Which fraction is <strong>not</strong> equivalent to <span class="frac"><sup>3</sup>&frasl;<sub>5</sub></span>?',
            options: [
                '6/10',
                '9/15',
                '12/20',
                '15/25',
            ],
            correctIndex: 3, // 15/25 = 3/5, all are equivalent. Let me re-check the original: D is 15/25 which IS equivalent. Actually all are equivalent to 3/5. Let me re-read the question... The question says "not equivalent" but all options given ARE equivalent. This must be an error in the source material. Let me fix it by making one option wrong.
        },
        {
            section: 'A', type: 'multiple_choice', number: 2, marks: 1,
            question: 'The Highest Common Factor (HCF) of 36 and 48 is:',
            options: ['6', '8', '12', '18'],
            correctIndex: 2,
        },
        {
            section: 'A', type: 'multiple_choice', number: 3, marks: 1,
            question: 'A pizza is cut into 8 slices. You eat 2 slices. Which equivalent fraction represents the amount you ate?',
            options: ['1/4', '2/16', '3/12', '4/8'],
            correctIndex: 0,
        },
        {
            section: 'A', type: 'multiple_choice', number: 4, marks: 1,
            question: 'When simplifying <span class="frac"><sup>28</sup>&frasl;<sub>42</sub></span>, the correct first step using the HCF method is:',
            options: [
                'Divide both by 2 to get 14/21',
                'Divide both by 7 to get 4/6',
                'Divide both by 14 to get 2/3',
                'Divide both by 28 to get 1/1.5',
            ],
            correctIndex: 2,
        },
        {
            section: 'A', type: 'multiple_choice', number: 5, marks: 1,
            question: 'Which operation <strong>always</strong> produces an equivalent fraction?',
            options: [
                'Adding 5 to both numerator and denominator',
                'Subtracting 3 from both numerator and denominator',
                'Multiplying both numerator and denominator by the same non-zero number',
                'Dividing the numerator by 2 and multiplying the denominator by 2',
            ],
            correctIndex: 2,
        },
        {
            section: 'A', type: 'multiple_choice', number: 6, marks: 1,
            question: 'The fraction <span class="frac"><sup>48</sup>&frasl;<sub>64</sub></span> in lowest terms is:',
            options: ['12/16', '6/8', '3/4', '24/32'],
            correctIndex: 2,
        },
        {
            section: 'A', type: 'multiple_choice', number: 7, marks: 1,
            question: 'If <span class="frac"><sup>5</sup>&frasl;<sub>8</sub></span> = <span class="frac"><sup>?</sup>&frasl;<sub>40</sub></span>, the missing numerator is:',
            options: ['20', '25', '30', '35'],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 8, marks: 1,
            question: 'Which model <strong>best</strong> represents <span class="frac"><sup>2</sup>&frasl;<sub>3</sub></span> = <span class="frac"><sup>4</sup>&frasl;<sub>6</sub></span>?',
            options: [
                'Two circles: one divided into 3 parts with 2 shaded, another divided into 6 parts with 4 shaded, showing equal shaded area',
                'A number line showing 0.66',
                'Two separate pizzas of different sizes',
                'A pie chart showing 50%',
            ],
            correctIndex: 0,
        },
        {
            section: 'A', type: 'multiple_choice', number: 9, marks: 1,
            question: 'The fraction <span class="frac"><sup>0</sup>&frasl;<sub>7</sub></span> is equivalent to:',
            options: ['7/0', '0', '1', '1/7'],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 10, marks: 1,
            question: 'A recipe calls for <span class="frac"><sup>3</sup>&frasl;<sub>4</sub></span> cup of sugar. If you triple the recipe, how much sugar do you need?',
            options: ['6/8 cups', '9/12 cups', '9/4 cups (= 2 and 1/4)', '9/4 cups'],
            correctIndex: 2,
        },

        // ── SECTION B: Short Answer (15 marks) ──
        {
            section: 'B',
            sectionTitle: 'Short Answer',
            sectionInstructions: 'Show all working for full marks.',
            type: 'short_answer',
            number: 11,
            marks: 4,
            question: `Consider the fraction <span class="frac"><sup>60</sup>&frasl;<sub>84</sub></span>.

<strong>a)</strong> Find the HCF of 60 and 84 by listing all factors of each number. (2 marks)
<strong>b)</strong> Simplify <span class="frac"><sup>60</sup>&frasl;<sub>84</sub></span> to its lowest terms using your HCF from part (a). Show the division step. (2 marks)`,
        },
        {
            section: 'B', type: 'short_answer', number: 12, marks: 3,
            question: `Generate a <strong>family of four equivalent fractions</strong> starting from <span class="frac"><sup>2</sup>&frasl;<sub>7</sub></span>.

Show the multiplication operations used to create each one (e.g., <span class="frac"><sup>2 &times; 2</sup>&frasl;<sub>7 &times; 2</sub></span> = <span class="frac"><sup>4</sup>&frasl;<sub>14</sub></span>).`,
        },
        {
            section: 'B', type: 'short_answer', number: 13, marks: 4,
            question: `Two students are arguing about who ate more pizza.
<ul>
  <li><strong>Alex</strong> ate <span class="frac"><sup>3</sup>&frasl;<sub>6</sub></span> of a large pizza.</li>
  <li><strong>Blake</strong> ate <span class="frac"><sup>4</sup>&frasl;<sub>8</sub></span> of an identical large pizza.</li>
  <li><strong>Casey</strong> ate <span class="frac"><sup>2</sup>&frasl;<sub>4</sub></span> of a third identical pizza.</li>
</ul>

<strong>a)</strong> Convert all fractions to their lowest terms. (2 marks)
<strong>b)</strong> Who ate the most pizza? Justify your answer mathematically. (2 marks)`,
        },
        {
            section: 'B', type: 'short_answer', number: 14, marks: 4,
            question: `A librarian organises <span class="frac"><sup>24</sup>&frasl;<sub>30</sub></span> of the books on Monday and <span class="frac"><sup>4</sup>&frasl;<sub>10</sub></span> of the books on Tuesday.

<strong>a)</strong> Simplify both fractions to their lowest terms. (2 marks)
<strong>b)</strong> On which day did the librarian complete a larger <strong>proportion</strong> of the task? Explain your reasoning. (2 marks)`,
        },

        // ── SECTION C: Extended Response (10 marks) ──
        {
            section: 'C',
            sectionTitle: 'Extended Response',
            type: 'extended_response',
            number: 15,
            marks: 10,
            subQuestions: [
                {
                    label: 'a',
                    title: 'Pattern Recognition',
                    marks: 4,
                    question: `Consider the following sequence of equivalent fractions:

<div class="math-display">
  <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span>, &nbsp;
  <span class="frac"><sup>2</sup>&frasl;<sub>4</sub></span>, &nbsp;
  <span class="frac"><sup>3</sup>&frasl;<sub>6</sub></span>, &nbsp;
  <span class="frac"><sup>4</sup>&frasl;<sub>8</sub></span>, &nbsp;
  <span class="frac"><sup>5</sup>&frasl;<sub>10</sub></span>, &nbsp; ...
</div>

<strong>a)</strong> Write the next <strong>two</strong> fractions in this pattern. (1 mark)
<strong>b)</strong> If the pattern continues, what would be the <strong>20th</strong> fraction in this sequence? Write it and simplify to lowest terms. (2 marks)
<strong>c)</strong> Explain the relationship between the numerator and denominator in every fraction of this sequence. (1 mark)`,
                },
                {
                    label: 'b',
                    title: 'Problem Solving — Cake Problem',
                    marks: 6,
                    question: `A chef cuts three identical rectangular cakes differently:
<ul>
  <li><strong>Cake A:</strong> Cut into 12 equal slices</li>
  <li><strong>Cake B:</strong> Cut into 18 equal slices</li>
  <li><strong>Cake C:</strong> Cut into 24 equal slices</li>
</ul>

At a party:
<ul>
  <li>From Cake A, <strong>9</strong> slices are eaten</li>
  <li>From Cake B, <strong>12</strong> slices are eaten</li>
  <li>From Cake C, <strong>16</strong> slices are eaten</li>
</ul>

<strong>a)</strong> Write a fraction (in lowest terms) representing the amount eaten from each cake. (3 marks)
<strong>b)</strong> Prove mathematically whether the same amount was eaten from each cake, or if one had more eaten. (2 marks)
<strong>c)</strong> If the chef wanted to cut a fourth identical cake so that <span class="frac"><sup>2</sup>&frasl;<sub>3</sub></span> of it equals exactly the amount eaten from Cake A, into how many pieces should she cut it, and how many should be served? (1 mark)`,
                },
            ],
        },

        // ── BONUS ──
        {
            section: 'BONUS',
            sectionTitle: 'Bonus Challenge (Optional)',
            type: 'short_answer',
            number: 16,
            marks: 2,
            question: `Find the value of <em>x</em> that makes this equation true:

<div class="math-display">
  <span class="frac"><sup>36</sup>&frasl;<sub>48</sub></span> = <span class="frac"><sup>15</sup>&frasl;<sub><em>x</em></sub></span>
</div>

Show your working using equivalence principles (HCF or cross-multiplication concepts).`,
            isBonus: true,
        },
    ];

    // Fix Q1: all original options are equivalent to 3/5. Replace D with a non-equivalent fraction.
    quizQuestions[0].options = [
        '6/10',
        '9/15',
        '15/24',
        '12/20',
    ];
    quizQuestions[0].correctIndex = 2; // 15/24 = 5/8, NOT equivalent to 3/5

    const quizSettings = {
        title: 'Selective Grade Quiz — Equivalent Fractions & Simplification',
        time_limit_minutes: 30,
        total_marks: 35,
        bonus_marks: 2,
        instructions: 'Answer all questions. Calculators not permitted. Show all working for partial credit.',
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

    console.log('  ✅ Maths Lesson 1 content updated:');
    console.log('     📖 Summary Notes: 6 sections — Equivalence, Golden Rule, Simplification, Families, Properties, Applications');
    console.log('     📝 Homework: 5 tasks (Area Models, Simplification, Families, Error Analysis, Application)');
    console.log('     🧪 Quiz: 16 questions (10 MC + 4 Short Answer + 1 Extended + 1 Bonus)');
    console.log('     Total marks: 35 + 2 bonus\n');
};
