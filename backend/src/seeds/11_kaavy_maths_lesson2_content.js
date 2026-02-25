/**
 * Seed: Kaavy's Maths Y5 Term 2 Lesson 2 — Comparing & Ordering Fractions
 * Summary Notes + Homework + Quiz
 */

exports.seed = async function (knex) {
    const course = await knex('courses')
        .where({ subject_type: 'mathematics', year_level: 5 })
        .first();

    if (!course) { console.log('  ⚠ Mathematics Y5 course not found'); return; }

    const term2 = await knex('course_terms')
        .where({ course_id: course.id, term_number: 2 })
        .first();

    if (!term2) { console.log('  ⚠ Maths Y5 Term 2 not found'); return; }

    const lesson = await knex('lessons')
        .where({ term_id: term2.id, lesson_number: 2 })
        .first();

    if (!lesson) { console.log('  ⚠ Lesson 2 not found in Term 2'); return; }

    console.log(`  📝 Updating lesson: ${lesson.title} (${lesson.id})`);

    // ════════════════════════════════════════════
    //  SUMMARY NOTES
    // ════════════════════════════════════════════

    const contentNotes = {
        objectives: [
            'Compare fractions using benchmarks, common denominators, and cross-multiplication',
            'Order sets of fractions in ascending and descending order',
            'Represent and interpret fractions on a number line',
        ],
        html: `
<div class="lesson-rich-content">

<h2>1. The Logic of Fractional Magnitude</h2>
<p>The size of a fraction depends on the <strong>relationship</strong> between numerator and denominator, not the absolute value of either number.</p>

<div class="structure-card">
  <h4>The Denominator Principle</h4>
  <ul>
    <li>Larger denominator = <strong>Smaller pieces</strong> (when the whole is the same size)</li>
    <li>Therefore, <span class="frac"><sup>1</sup>&frasl;<sub>100</sub></span> is much smaller than <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span>, even though 100 &gt; 2</li>
  </ul>
</div>

<div class="structure-card">
  <h4>The Numerator Principle</h4>
  <ul>
    <li>With the same denominator, the fraction with the <strong>larger numerator</strong> represents more pieces</li>
    <li>Therefore, <span class="frac"><sup>5</sup>&frasl;<sub>8</sub></span> &gt; <span class="frac"><sup>3</sup>&frasl;<sub>8</sub></span></li>
  </ul>
</div>

<hr/>

<h2>2. The Benchmark Strategy (Mental Comparison)</h2>
<p>Before calculating, estimate by comparing fractions to <strong>benchmarks</strong>: 0, <span class="frac"><sup>1</sup>&frasl;<sub>4</sub></span>, <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span>, <span class="frac"><sup>3</sup>&frasl;<sub>4</sub></span>, 1</p>

<div class="info-box info-box-blue">
  <h4>The Halfway Test (Comparing to <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span>)</h4>
  <p>Calculate half of the denominator, then compare the numerator to this value:</p>
  <ul>
    <li>If numerator <strong>&lt;</strong> half of denominator &rarr; Fraction is <strong>less than <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span></strong></li>
    <li>If numerator <strong>&gt;</strong> half of denominator &rarr; Fraction is <strong>greater than <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span></strong></li>
  </ul>
  <p><em>Example:</em> <span class="frac"><sup>4</sup>&frasl;<sub>7</sub></span> — half of 7 = 3.5, and 4 &gt; 3.5, so <span class="frac"><sup>4</sup>&frasl;<sub>7</sub></span> &gt; <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span></p>
</div>

<div class="info-box info-box-amber">
  <h4>The "Gap" Rule (Fractions close to 1)</h4>
  <p>When fractions are one unit away from the whole (complements to 1):</p>
  <ul>
    <li><span class="frac"><sup>3</sup>&frasl;<sub>4</sub></span> is <span class="frac"><sup>1</sup>&frasl;<sub>4</sub></span> away from 1</li>
    <li><span class="frac"><sup>7</sup>&frasl;<sub>8</sub></span> is <span class="frac"><sup>1</sup>&frasl;<sub>8</sub></span> away from 1</li>
  </ul>
  <p><strong>Rule:</strong> The fraction with the <strong>smaller gap</strong> is the <strong>larger fraction</strong>.</p>
  <p>Since <span class="frac"><sup>1</sup>&frasl;<sub>8</sub></span> &lt; <span class="frac"><sup>1</sup>&frasl;<sub>4</sub></span>, then <span class="frac"><sup>7</sup>&frasl;<sub>8</sub></span> &gt; <span class="frac"><sup>3</sup>&frasl;<sub>4</sub></span> &#10003;</p>
</div>

<hr/>

<h2>3. The Common Denominator Method (Precise Comparison)</h2>
<p>To compare fractions with different denominators accurately, convert them to equivalent fractions sharing the <strong>same denominator</strong>.</p>

<div class="key-principle">
  <strong>The Comparison Protocol:</strong>
</div>

<div class="structure-card">
  <h4>Step 1: Find the Least Common Multiple (LCM)</h4>
  <p>The LCM is the smallest number that both denominators divide into evenly.</p>
  <p><em>Example:</em> LCM of 3 and 5 is 15 &nbsp;|&nbsp; LCM of 4 and 6 is 12</p>
</div>

<div class="structure-card">
  <h4>Step 2: Expand both fractions</h4>
  <div class="math-display">
    <span class="frac"><sup>2</sup>&frasl;<sub>3</sub></span> = <span class="frac"><sup>2 &times; 5</sup>&frasl;<sub>3 &times; 5</sub></span> = <span class="frac"><sup>10</sup>&frasl;<sub>15</sub></span>
    &nbsp;&nbsp;&nbsp;
    <span class="frac"><sup>3</sup>&frasl;<sub>5</sub></span> = <span class="frac"><sup>3 &times; 3</sup>&frasl;<sub>5 &times; 3</sub></span> = <span class="frac"><sup>9</sup>&frasl;<sub>15</sub></span>
  </div>
</div>

<div class="structure-card">
  <h4>Step 3: Compare numerators</h4>
  <p>Since 10 &gt; 9, then <span class="frac"><sup>10</sup>&frasl;<sub>15</sub></span> &gt; <span class="frac"><sup>9</sup>&frasl;<sub>15</sub></span></p>
  <p><strong>Conclusion:</strong> <span class="frac"><sup>2</sup>&frasl;<sub>3</sub></span> &gt; <span class="frac"><sup>3</sup>&frasl;<sub>5</sub></span> &#10003;</p>
</div>

<hr/>

<h2>4. The Cross-Multiplication Technique (Quick Comparison)</h2>
<p>For comparing two fractions <span class="frac"><sup>a</sup>&frasl;<sub>b</sub></span> and <span class="frac"><sup>c</sup>&frasl;<sub>d</sub></span> without finding LCM:</p>

<div class="selective-insight">
  <strong>Method:</strong> Multiply diagonally — numerator of first &times; denominator of second <em>vs.</em> denominator of first &times; numerator of second.
</div>

<div class="info-box info-box-blue">
  <h4>Example</h4>
  <p>Compare <span class="frac"><sup>2</sup>&frasl;<sub>5</sub></span> and <span class="frac"><sup>3</sup>&frasl;<sub>7</sub></span></p>
  <div class="math-display">
    2 &times; 7 = 14 &nbsp;&nbsp;&nbsp; vs &nbsp;&nbsp;&nbsp; 5 &times; 3 = 15
  </div>
  <p>Since 14 &lt; 15, then <span class="frac"><sup>2</sup>&frasl;<sub>5</sub></span> &lt; <span class="frac"><sup>3</sup>&frasl;<sub>7</sub></span></p>
  <p><em>This is equivalent to converting both to common denominator b &times; d and comparing a &times; d vs. c &times; b.</em></p>
</div>

<hr/>

<h2>5. Ordering Fractions</h2>
<p>To arrange multiple fractions in ascending or descending order:</p>

<div class="structure-card">
  <h4>Strategy</h4>
  <ol>
    <li><strong>Benchmark first:</strong> Group fractions by whether they are &lt;, =, or &gt; <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span></li>
    <li><strong>Find common denominator</strong> for the entire set</li>
    <li><strong>Convert all fractions</strong> to equivalent forms</li>
    <li><strong>Rank by numerator</strong> size</li>
    <li><strong>Restore original forms</strong> in final answer</li>
  </ol>
</div>

<div class="info-box info-box-blue">
  <h4>Worked Example</h4>
  <p>Order <span class="frac"><sup>2</sup>&frasl;<sub>3</sub></span>, <span class="frac"><sup>3</sup>&frasl;<sub>4</sub></span>, <span class="frac"><sup>5</sup>&frasl;<sub>8</sub></span>, <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span> from smallest to largest</p>
  <p><strong>Common denominator: 24</strong></p>
  <div class="math-display">
    <span class="frac"><sup>2</sup>&frasl;<sub>3</sub></span> = <span class="frac"><sup>16</sup>&frasl;<sub>24</sub></span> &nbsp;&nbsp;
    <span class="frac"><sup>3</sup>&frasl;<sub>4</sub></span> = <span class="frac"><sup>18</sup>&frasl;<sub>24</sub></span> &nbsp;&nbsp;
    <span class="frac"><sup>5</sup>&frasl;<sub>8</sub></span> = <span class="frac"><sup>15</sup>&frasl;<sub>24</sub></span> &nbsp;&nbsp;
    <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span> = <span class="frac"><sup>12</sup>&frasl;<sub>24</sub></span>
  </div>
  <p><strong>Order:</strong> <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span> &lt; <span class="frac"><sup>5</sup>&frasl;<sub>8</sub></span> &lt; <span class="frac"><sup>2</sup>&frasl;<sub>3</sub></span> &lt; <span class="frac"><sup>3</sup>&frasl;<sub>4</sub></span> &#10003;</p>
</div>

<hr/>

<h2>6. Number Line Representation</h2>
<p>Fractions represent <strong>positions</strong> on a continuous line between 0 and 1.</p>

<div class="structure-card">
  <h4>Placement Rules</h4>
  <ul>
    <li>Divide the 0–1 interval into equal parts corresponding to the denominator</li>
    <li>Count along from 0 the number of parts indicated by the numerator</li>
    <li>Equivalent fractions occupy the <strong>exact same point</strong> on the number line (e.g., <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span> and <span class="frac"><sup>2</sup>&frasl;<sub>4</sub></span> align perfectly)</li>
  </ul>
</div>

</div>
        `.trim(),
    };

    // ════════════════════════════════════════════
    //  HOMEWORK
    // ════════════════════════════════════════════

    const homeworkContent = {
        instructions: 'Complete in your Homework Book. Show all working for method marks.',
        html: `
<div class="homework-rich-content">

<div class="homework-task">
  <h3>Task 1: Benchmark Estimation <span class="time-badge">10 mins</span></h3>
  <p>Without calculating exact values, determine whether each fraction is <strong>less than</strong>, <strong>greater than</strong>, or <strong>equal to</strong> <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span>. Show your reasoning using the halfway test.</p>
  <ol type="a">
    <li><span class="frac"><sup>3</sup>&frasl;<sub>8</sub></span></li>
    <li><span class="frac"><sup>5</sup>&frasl;<sub>9</sub></span></li>
    <li><span class="frac"><sup>7</sup>&frasl;<sub>12</sub></span></li>
    <li><span class="frac"><sup>4</sup>&frasl;<sub>10</sub></span></li>
    <li><span class="frac"><sup>6</sup>&frasl;<sub>11</sub></span></li>
  </ol>
</div>

<div class="homework-task">
  <h3>Task 2: The Gap Rule Application <span class="time-badge">5 mins</span></h3>
  <p>Use the gap rule to compare these pairs (which fraction is closer to 1?). Write the correct inequality symbol (&lt; or &gt;).</p>
  <ol type="a">
    <li><span class="frac"><sup>4</sup>&frasl;<sub>5</sub></span> vs <span class="frac"><sup>7</sup>&frasl;<sub>8</sub></span></li>
    <li><span class="frac"><sup>2</sup>&frasl;<sub>3</sub></span> vs <span class="frac"><sup>5</sup>&frasl;<sub>6</sub></span></li>
    <li><span class="frac"><sup>6</sup>&frasl;<sub>7</sub></span> vs <span class="frac"><sup>8</sup>&frasl;<sub>9</sub></span></li>
  </ol>
</div>

<div class="homework-task">
  <h3>Task 3: Common Denominator Conversion <span class="time-badge">15 mins</span></h3>
  <p>Find the LCM of the denominators, convert both fractions, then compare using &lt;, &gt;, or =.</p>
  <ol type="a">
    <li><span class="frac"><sup>3</sup>&frasl;<sub>4</sub></span> and <span class="frac"><sup>5</sup>&frasl;<sub>6</sub></span> (LCM = ?)</li>
    <li><span class="frac"><sup>2</sup>&frasl;<sub>5</sub></span> and <span class="frac"><sup>3</sup>&frasl;<sub>8</sub></span> (LCM = ?)</li>
    <li><span class="frac"><sup>7</sup>&frasl;<sub>10</sub></span> and <span class="frac"><sup>3</sup>&frasl;<sub>4</sub></span> (LCM = ?)</li>
    <li><span class="frac"><sup>5</sup>&frasl;<sub>12</sub></span> and <span class="frac"><sup>4</sup>&frasl;<sub>9</sub></span> (LCM = ?)</li>
  </ol>
</div>

<div class="homework-task">
  <h3>Task 4: Cross-Multiplication Check <span class="time-badge">5 mins</span></h3>
  <p>Verify your answers for Task 3 parts (a) and (c) using the cross-multiplication method. Show the diagonal multiplication clearly.</p>
</div>

<div class="homework-task">
  <h3>Task 5: Ordering Challenge <span class="time-badge">10 mins</span></h3>
  <p>Arrange these sets of fractions in <strong>ascending order</strong> (smallest to largest). Show your common denominator work.</p>
  <ol type="a">
    <li><span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span>, <span class="frac"><sup>2</sup>&frasl;<sub>3</sub></span>, <span class="frac"><sup>1</sup>&frasl;<sub>6</sub></span>, <span class="frac"><sup>5</sup>&frasl;<sub>9</sub></span></li>
    <li><span class="frac"><sup>3</sup>&frasl;<sub>5</sub></span>, <span class="frac"><sup>7</sup>&frasl;<sub>10</sub></span>, <span class="frac"><sup>2</sup>&frasl;<sub>4</sub></span>, <span class="frac"><sup>3</sup>&frasl;<sub>6</sub></span></li>
  </ol>
</div>

<div class="homework-task">
  <h3>Task 6: Number Line Construction <span class="time-badge">5 mins</span></h3>
  <p>Draw a number line from 0 to 1 divided into twelfths. Mark and label the exact positions of:</p>
  <ul>
    <li><span class="frac"><sup>1</sup>&frasl;<sub>3</sub></span></li>
    <li><span class="frac"><sup>3</sup>&frasl;<sub>4</sub></span></li>
    <li><span class="frac"><sup>5</sup>&frasl;<sub>6</sub></span></li>
    <li><span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span></li>
  </ul>
  <p>Explain why <span class="frac"><sup>1</sup>&frasl;<sub>3</sub></span> and <span class="frac"><sup>4</sup>&frasl;<sub>12</sub></span> occupy the same position.</p>
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
            question: 'Which fraction is <strong>less than</strong> <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span>?',
            options: ['5/8', '4/7', '3/10', '6/11'],
            correctIndex: 2,
        },
        {
            section: 'A', type: 'multiple_choice', number: 2, marks: 1,
            question: 'According to the "Gap" Rule, which fraction is the <strong>largest</strong>?',
            options: ['2/3', '3/4', '7/8', '5/6'],
            correctIndex: 2,
        },
        {
            section: 'A', type: 'multiple_choice', number: 3, marks: 1,
            question: 'The correct inequality symbol to complete <span class="frac"><sup>3</sup>&frasl;<sub>5</sub></span> ___ <span class="frac"><sup>2</sup>&frasl;<sub>3</sub></span> is:',
            options: ['>', '<', '=', '≈'],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 4, marks: 1,
            question: 'What is the <strong>LCM</strong> of 6 and 8?',
            options: ['12', '24', '48', '14'],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 5, marks: 1,
            question: 'When comparing <span class="frac"><sup>4</sup>&frasl;<sub>9</sub></span> and <span class="frac"><sup>5</sup>&frasl;<sub>11</sub></span> using cross-multiplication:',
            options: [
                '4 × 11 = 44 and 9 × 5 = 45, so 4/9 < 5/11',
                '4 × 5 = 20 and 9 × 11 = 99, so 4/9 > 5/11',
                '4 + 11 = 15 and 9 + 5 = 14, so 4/9 > 5/11',
                'They are equal',
            ],
            correctIndex: 0,
        },
        {
            section: 'A', type: 'multiple_choice', number: 6, marks: 1,
            question: 'Which set of fractions is arranged in <strong>ascending order</strong>?',
            options: [
                '1/2, 2/3, 1/3, 3/4',
                '1/4, 1/3, 1/2, 2/3',
                '5/6, 3/4, 1/2, 1/3',
                '7/8, 5/6, 3/4, 1/2',
            ],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 7, marks: 1,
            question: 'On a number line from 0 to 1, the fraction <span class="frac"><sup>3</sup>&frasl;<sub>8</sub></span> would be positioned:',
            options: [
                'Closer to 0 than to 1/2',
                'Exactly at 1/2',
                'Closer to 1 than to 1/2',
                'To the right of 3/4',
            ],
            correctIndex: 0,
        },
        {
            section: 'A', type: 'multiple_choice', number: 8, marks: 1,
            question: 'Which statement is <strong>always true</strong> when comparing two proper fractions with the same numerator?',
            options: [
                'The fraction with the larger denominator is larger',
                'The fraction with the smaller denominator is larger',
                'The fractions are equal',
                'You cannot compare them without calculating',
            ],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 9, marks: 1,
            question: 'If <span class="frac"><sup>5</sup>&frasl;<sub>6</sub></span> and <span class="frac"><sup>?</sup>&frasl;<sub>18</sub></span> are equivalent, the missing numerator is:',
            options: ['10', '15', '20', '24'],
            correctIndex: 1,
        },
        {
            section: 'A', type: 'multiple_choice', number: 10, marks: 1,
            question: 'Four students ran a race. Their completion fractions were: Alex <span class="frac"><sup>3</sup>&frasl;<sub>4</sub></span>, Blake <span class="frac"><sup>5</sup>&frasl;<sub>6</sub></span>, Casey <span class="frac"><sup>2</sup>&frasl;<sub>3</sub></span>, Dana <span class="frac"><sup>7</sup>&frasl;<sub>12</sub></span>. Who is winning (furthest along)?',
            options: ['Alex', 'Blake', 'Casey', 'Dana'],
            correctIndex: 1,
        },

        // ── SECTION B: Short Answer (15 marks) ──
        {
            section: 'B',
            sectionTitle: 'Short Answer',
            sectionInstructions: 'Show all working for full marks.',
            type: 'short_answer',
            number: 11,
            marks: 4,
            question: `Compare the following pairs of fractions. Use the <strong>benchmark method</strong> (halfway test) for part (a) and the <strong>common denominator method</strong> for part (b). Show your reasoning.

<strong>a)</strong> <span class="frac"><sup>4</sup>&frasl;<sub>9</sub></span> vs <span class="frac"><sup>5</sup>&frasl;<sub>8</sub></span> (Benchmark: which side of <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span>?) (2 marks)

<strong>b)</strong> <span class="frac"><sup>5</sup>&frasl;<sub>6</sub></span> vs <span class="frac"><sup>7</sup>&frasl;<sub>9</sub></span> (Find LCM, convert, compare) (2 marks)`,
        },
        {
            section: 'B', type: 'short_answer', number: 12, marks: 3,
            question: `Use the <strong>Gap Rule</strong> to explain why <span class="frac"><sup>7</sup>&frasl;<sub>8</sub></span> &gt; <span class="frac"><sup>3</sup>&frasl;<sub>4</sub></span> without finding a common denominator. Reference the "missing pieces" in your explanation.`,
        },
        {
            section: 'B', type: 'short_answer', number: 13, marks: 4,
            question: `Arrange these fractions in <strong>descending order</strong> (largest to smallest):
<div class="math-display">
  <span class="frac"><sup>2</sup>&frasl;<sub>3</sub></span>, &nbsp;
  <span class="frac"><sup>3</sup>&frasl;<sub>5</sub></span>, &nbsp;
  <span class="frac"><sup>5</sup>&frasl;<sub>8</sub></span>, &nbsp;
  <span class="frac"><sup>7</sup>&frasl;<sub>12</sub></span>
</div>

<strong>a)</strong> Find a suitable common denominator (not necessarily the LCM, but effective). (1 mark)
<strong>b)</strong> Show the converted fractions. (2 marks)
<strong>c)</strong> Write the final ordered sequence using the original fraction forms. (1 mark)`,
        },
        {
            section: 'B', type: 'short_answer', number: 14, marks: 4,
            question: `Jamie claims that <span class="frac"><sup>3</sup>&frasl;<sub>7</sub></span> &gt; <span class="frac"><sup>2</sup>&frasl;<sub>5</sub></span> because "3 is bigger than 2 and 7 is bigger than 5."

<strong>a)</strong> Explain the <strong>error</strong> in Jamie's reasoning regarding denominator size. (2 marks)
<strong>b)</strong> Prove the correct relationship using <strong>cross-multiplication</strong>. (2 marks)`,
        },

        // ── SECTION C: Extended Response (10 marks) ──
        {
            section: 'C',
            sectionTitle: 'Extended Response',
            type: 'extended_response',
            number: 15,
            marks: 10,
            passage: `<h4>Runner Positions on a 1-kilometre Track</h4>
<p>Four athletes are training on a 1-kilometre track. Their positions are marked as fractions of the total distance:</p>
<ul>
  <li><strong>Runner A:</strong> <span class="frac"><sup>5</sup>&frasl;<sub>8</sub></span> of the way around</li>
  <li><strong>Runner B:</strong> <span class="frac"><sup>2</sup>&frasl;<sub>3</sub></span> of the way around</li>
  <li><strong>Runner C:</strong> <span class="frac"><sup>3</sup>&frasl;<sub>5</sub></span> of the way around</li>
  <li><strong>Runner D:</strong> <span class="frac"><sup>7</sup>&frasl;<sub>12</sub></span> of the way around</li>
</ul>`,
            subQuestions: [
                {
                    label: 'a',
                    title: 'Analysis & Comparison',
                    marks: 6,
                    question: `<strong>a)</strong> Convert all four fractions to equivalent fractions with a common denominator of <strong>120</strong>. Show your expansion calculations. (4 marks)

<strong>b)</strong> Determine the order of the runners from <strong>first place (furthest)</strong> to <strong>last place (least far)</strong>. (1 mark)

<strong>c)</strong> Calculate exactly how much further (in kilometres, as a fraction) Runner B is than Runner D. Show your working. (1 mark)`,
                },
                {
                    label: 'b',
                    title: 'Number Line Representation',
                    marks: 4,
                    question: `Draw a number line from 0 to 1 and mark the positions of all four runners (A, B, C, D).

Your diagram must show:
<ul>
  <li>Equal divisions appropriate for comparing these fractions (suggestion: use 24ths or 120ths)</li>
  <li>Accurate relative spacing</li>
  <li>Labels indicating which letter corresponds to which position</li>
</ul>

<strong>OR</strong> (if drawing is not possible): Describe in 3–4 sentences exactly where each runner would be positioned relative to the benchmarks <span class="frac"><sup>1</sup>&frasl;<sub>2</sub></span> and 1.`,
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
            question: `Find a fraction that sits exactly <strong>halfway</strong> between <span class="frac"><sup>3</sup>&frasl;<sub>4</sub></span> and <span class="frac"><sup>4</sup>&frasl;<sub>5</sub></span> on the number line.

Show your method (Hint: convert to common denominator first, then find the midpoint).`,
            isBonus: true,
        },
    ];

    const quizSettings = {
        title: 'Selective Grade Quiz — Comparing & Ordering Fractions',
        time_limit_minutes: 30,
        total_marks: 35,
        bonus_marks: 2,
        instructions: 'Answer all questions. Calculators not permitted. Show all working for partial credit. Use mathematical symbols correctly.',
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

    console.log('  ✅ Maths Lesson 2 content updated:');
    console.log('     📖 Summary Notes: 6 sections — Magnitude, Benchmarks, Common Denom, Cross-Multiply, Ordering, Number Lines');
    console.log('     📝 Homework: 6 tasks (Benchmark, Gap Rule, Common Denom, Cross-Mult, Ordering, Number Line)');
    console.log('     🧪 Quiz: 16 questions (10 MC + 4 Short Answer + 1 Extended + 1 Bonus)');
    console.log('     Total marks: 35 + 2 bonus\n');
};
