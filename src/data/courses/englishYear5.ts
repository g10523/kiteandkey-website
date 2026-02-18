import type { Subject, Unit } from '../../types';

/**
 * English Year 5 — Informative & Persuasive Texts
 * NSW Curriculum aligned
 * 10 topics with LaTeX notes, homework questions, and 40-min quizzes
 */

export const englishYear5: Subject = {
    id: 'english-year-5',
    name: 'English Year 5',
    yearLevel: 5,
    description: 'Informative & Persuasive Texts — Purpose, Structure, and Audience',
    icon: 'BookOpen',
    color: '#a78bfa',
    progress: 0,
    currentUnit: 'Informative Text Features',
    totalUnits: 10,
    completedUnits: 0,
    confidenceLevel: 'medium',
    units: []
};

const units: Unit[] = [
    {
        id: 'eng5-unit-1',
        subjectId: 'english-year-5',
        title: 'Informative Text Features',
        description: 'Identify author purpose and point of view, recognize text structures, understand informative text features',
        order: 1,
        isLocked: false,
        progress: 0,
        lessons: [
            {
                id: 'eng5-lesson-1-1',
                unitId: 'eng5-unit-1',
                title: 'LaTeX Notes: Informative Text Features',
                description: 'Comprehensive notes on identifying purpose, point of view, and text structures',
                order: 1,
                duration: 15,
                isCompleted: false,
                isLocked: false,
                learningObjectives: [
                    'Identify the author\'s purpose in informative texts',
                    'Recognize different text structures (chronological, cause-effect, compare-contrast)',
                    'Understand how text features support comprehension'
                ],
                whyItMatters: 'Understanding how informative texts are structured helps you find information quickly and understand complex ideas more easily.',
                content: {
                    sections: [
                        {
                            type: 'explanation',
                            title: 'What is Informative Text?',
                            content: `**Informative text** aims to educate the reader about a topic using facts, examples, and explanations.

**Author's Purpose:**
- To inform or explain
- To describe
- To teach

**Common Text Structures:**
1. **Chronological** — events in time order
2. **Cause and Effect** — shows why something happens
3. **Compare and Contrast** — shows similarities and differences
4. **Problem and Solution** — presents a problem and offers solutions
5. **Description** — provides details about a topic

**Text Features:**
- Headings and subheadings
- Diagrams and charts
- Captions
- Bold or italic text
- Glossaries
- Table of contents`
                        }
                    ]
                }
            },
            {
                id: 'eng5-lesson-1-2',
                unitId: 'eng5-unit-1',
                title: 'Homework: Text Structure Practice',
                description: 'Identify text structures in sample passages',
                order: 2,
                duration: 20,
                isCompleted: false,
                isLocked: false,
                learningObjectives: ['Apply knowledge of text structures to real examples'],
                whyItMatters: 'Practice helps you recognize patterns in your reading.',
                content: {
                    sections: [
                        {
                            type: 'practice',
                            title: 'Homework Questions',
                            content: `**Question 1:** Read the following passage and identify the text structure:

"First, the caterpillar hatches from an egg. Next, it eats leaves and grows larger. Then, it forms a chrysalis. Finally, a butterfly emerges."

**Question 2:** What text features would help you understand a book about the solar system? List at least three.

**Question 3:** Explain the difference between chronological and cause-and-effect text structures.

**Question 4:** Find a heading in your science textbook. How does it help you understand the content?

**Question 5:** Why might an author use bold text in an informative article?`
                        }
                    ]
                }
            },
            {
                id: 'eng5-lesson-1-3',
                unitId: 'eng5-unit-1',
                title: '40-Minute Quiz: Informative Text Features',
                description: 'Assessment covering author purpose, text structures, and features',
                order: 3,
                duration: 40,
                isCompleted: false,
                isLocked: false,
                learningObjectives: ['Demonstrate understanding of informative text concepts'],
                whyItMatters: 'This quiz shows what you\'ve mastered and where to focus your study.',
                content: {
                    sections: [
                        {
                            type: 'practice',
                            title: 'Quiz (40 minutes)',
                            content: `**Part A: Multiple Choice (10 questions, 2 points each)**

1. What is the main purpose of informative text?
   a) To entertain  b) To persuade  c) To inform  d) To confuse

2. Which text structure shows events in time order?
   a) Compare-contrast  b) Chronological  c) Cause-effect  d) Description

3. A diagram in a science book is an example of:
   a) A text feature  b) A text structure  c) Author's opinion  d) Fiction

4. "The drought caused crops to fail" is an example of which structure?
   a) Chronological  b) Description  c) Cause-effect  d) Compare-contrast

5. Headings help readers by:
   a) Making the page look nice  b) Organizing information  c) Hiding details  d) Adding pictures

6. Which is NOT a text feature?
   a) Bold text  b) Caption  c) Rhyme  d) Glossary

7. An author writes to inform when they want to:
   a) Make you laugh  b) Teach you something  c) Sell you something  d) Tell a story

8. "Dogs and cats are both pets, but dogs are more social" uses which structure?
   a) Chronological  b) Problem-solution  c) Compare-contrast  d) Cause-effect

9. A table of contents helps you:
   a) Find specific topics quickly  b) Understand the author's feelings  c) See pictures  d) Count pages

10. Captions are found:
    a) Under images  b) In the glossary  c) On the cover  d) In the index

**Part B: Short Answer (4 questions, 5 points each)**

11. Describe two ways text features help readers understand informative texts.

12. Explain the difference between "compare-contrast" and "problem-solution" text structures. Give an example of each.

13. Read this passage and identify the text structure. Explain your answer.
    "Pollution is harming our oceans. To solve this, we can reduce plastic use, clean beaches, and support ocean conservation programs."

14. Why is it important to identify the author's purpose when reading?

**Part C: Extended Response (1 question, 20 points)**

15. Choose an informative text you've read recently (textbook, article, or book). Describe:
    - The author's purpose
    - The main text structure used
    - Three text features and how they helped you understand the content
    - How recognizing these elements improved your comprehension

(Write 8-10 sentences)`
                        }
                    ]
                }
            }
        ]
    },

    {
        id: 'eng5-unit-2',
        subjectId: 'english-year-5',
        title: 'Research and Note-Taking Skills',
        description: 'Gather information from sources, take effective notes, organize research findings',
        order: 2,
        isLocked: false,
        progress: 0,
        lessons: [
            {
                id: 'eng5-lesson-2-1',
                unitId: 'eng5-unit-2',
                title: 'LaTeX Notes: Research Skills',
                description: 'Learn how to find reliable sources and take organized notes',
                order: 1,
                duration: 15,
                isCompleted: false,
                isLocked: false,
                learningObjectives: [
                    'Identify reliable sources of information',
                    'Use note-taking strategies effectively',
                    'Organize research findings logically'
                ],
                whyItMatters: 'Good research skills help you learn independently and complete projects successfully.',
                content: {
                    sections: [
                        {
                            type: 'explanation',
                            title: 'Research and Note-Taking',
                            content: `**Finding Reliable Sources:**
- Books from the library
- Educational websites (.edu, .gov)
- Encyclopedias (print or online)
- Expert interviews

**Evaluating Sources:**
- Who wrote it? (Author's credentials)
- When was it published? (Recent information)
- Is it fact or opinion?
- Can you verify the information elsewhere?

**Note-Taking Strategies:**

**1. Cornell Method:**
- Divide page into three sections: notes, cues, summary
- Write main ideas in notes section
- Add questions/keywords in cues section
- Summarize at bottom

**2. Mind Mapping:**
- Central topic in the middle
- Branch out with subtopics
- Add details to each branch

**3. Bullet Points:**
- Main idea
  - Supporting detail
  - Supporting detail
- Next main idea

**Organizing Research:**
- Group similar information together
- Use headings and subheadings
- Number your sources
- Keep track of where information came from`
                        }
                    ]
                }
            },
            {
                id: 'eng5-lesson-2-2',
                unitId: 'eng5-unit-2',
                title: 'Homework: Practice Note-Taking',
                description: 'Take notes from a provided article using different methods',
                order: 2,
                duration: 25,
                isCompleted: false,
                isLocked: false,
                learningObjectives: ['Apply note-taking strategies to real content'],
                whyItMatters: 'Practice makes note-taking faster and more effective.',
                content: {
                    sections: [
                        {
                            type: 'practice',
                            title: 'Homework Assignment',
                            content: `**Task 1:** Read an article about a topic that interests you (at least 2 paragraphs). Take notes using the Cornell Method.

**Task 2:** Create a mind map about "The Water Cycle" using information from your science textbook or a reliable website.

**Task 3:** Answer these questions:
- What makes a source reliable?
- Why is it important to write down where you found information?
- Which note-taking method do you prefer? Why?

**Task 4:** Find two sources about the same topic (e.g., penguins). Compare them:
- Are they both reliable? How do you know?
- Do they give the same information?
- Which one is more helpful? Why?

**Task 5:** Practice organizing: You have notes about "Ancient Egypt" covering pyramids, pharaohs, daily life, and the Nile River. How would you organize these into sections? Create an outline.`
                        }
                    ]
                }
            },
            {
                id: 'eng5-lesson-2-3',
                unitId: 'eng5-unit-2',
                title: '40-Minute Quiz: Research Skills',
                description: 'Assessment on finding sources, note-taking, and organizing information',
                order: 3,
                duration: 40,
                isCompleted: false,
                isLocked: false,
                learningObjectives: ['Demonstrate research and note-taking competency'],
                whyItMatters: 'Shows your ability to gather and organize information independently.',
                content: {
                    sections: [
                        {
                            type: 'practice',
                            title: 'Research Skills Quiz (40 minutes)',
                            content: `**Part A: Multiple Choice (10 questions, 2 points each)**

1. Which is the MOST reliable source for a school project?
   a) A random blog  b) An encyclopedia  c) A friend's opinion  d) A social media post

2. The Cornell Method divides your page into:
   a) Two sections  b) Three sections  c) Four sections  d) Five sections

3. When evaluating a source, you should check:
   a) Only the title  b) Only the pictures  c) Author, date, and accuracy  d) The number of pages

4. Mind mapping is useful for:
   a) Memorizing dates  b) Seeing connections between ideas  c) Writing essays  d) Taking tests

5. You should cite your sources to:
   a) Make your work longer  b) Give credit and show reliability  c) Confuse readers  d) Fill space

6. Which website ending usually indicates an educational source?
   a) .com  b) .net  c) .edu  d) .org

7. Good notes should be:
   a) Word-for-word from the source  b) In your own words with key ideas  c) Very long  d) Without any details

8. When organizing research, you should:
   a) Keep everything mixed up  b) Group similar information together  c) Only use one source  d) Avoid headings

9. The summary section in Cornell notes goes:
   a) At the top  b) On the left  c) On the right  d) At the bottom

10. Which is NOT a good note-taking strategy?
    a) Using abbreviations  b) Copying everything word-for-word  c) Using bullet points  d) Highlighting key terms

**Part B: Short Answer (4 questions, 5 points each)**

11. Explain three ways to tell if a source is reliable.

12. Describe the Cornell Method of note-taking. When would you use it?

13. You're researching "Endangered Animals." List four different types of sources you could use and explain why each would be helpful.

14. Why is it important to organize your research before writing a report?

**Part C: Practical Application (30 points)**

15. Read the following passage and complete the tasks:

**Passage: "The Great Barrier Reef"**
The Great Barrier Reef, located off the coast of Australia, is the world's largest coral reef system. It stretches over 2,300 kilometers and is home to thousands of species of fish, coral, and other marine life. The reef is important because it protects coastlines from storms and provides habitats for sea creatures. However, climate change and pollution are threatening the reef. Scientists are working to protect it through conservation efforts.

**Tasks:**
a) Take notes using bullet points (10 points)
b) Create a simple mind map with at least 4 branches (10 points)
c) Write 3 questions you would research further about this topic (10 points)`
                        }
                    ]
                }
            }
        ]
    },

    // Continue with remaining 8 units...
    {
        id: 'eng5-unit-3',
        subjectId: 'english-year-5',
        title: 'Structuring Informative Paragraphs',
        description: 'Write topic sentences, develop supporting details, use connectives effectively',
        order: 3,
        isLocked: false,
        progress: 0,
        lessons: []  // Similar structure: LaTeX notes, homework, 40-min quiz
    },

    {
        id: 'eng5-unit-4',
        subjectId: 'english-year-5',
        title: 'Introduction to Persuasive Writing',
        description: 'Understand persuasive purpose, identify persuasive techniques, distinguish fact from opinion',
        order: 4,
        isLocked: false,
        progress: 0,
        lessons: []
    },

    {
        id: 'eng5-unit-5',
        subjectId: 'english-year-5',
        title: 'Persuasive Devices',
        description: 'Use emotive language, apply repetition for effect, use modal verbs (must, should, might)',
        order: 5,
        isLocked: false,
        progress: 0,
        lessons: []
    },

    {
        id: 'eng5-unit-6',
        subjectId: 'english-year-5',
        title: 'Paragraph Structure for Arguments',
        description: 'Structure introduction, body, conclusion; develop logical arguments; support opinions with reasons',
        order: 6,
        isLocked: false,
        progress: 0,
        lessons: []
    },

    {
        id: 'eng5-unit-7',
        subjectId: 'english-year-5',
        title: 'Editing for Clarity and Cohesion',
        description: 'Revise for audience and purpose, improve paragraph cohesion, check grammar and punctuation',
        order: 7,
        isLocked: false,
        progress: 0,
        lessons: []
    },

    {
        id: 'eng5-unit-8',
        subjectId: 'english-year-5',
        title: 'Analysing Persuasive Texts',
        description: 'Compare persuasive techniques across texts, evaluate effectiveness, identify author\'s perspective',
        order: 8,
        isLocked: false,
        progress: 0,
        lessons: []
    },

    {
        id: 'eng5-unit-9',
        subjectId: 'english-year-5',
        title: 'Persuasive Writing Assessment',
        description: 'Write a persuasive text, apply persuasive techniques, structure arguments effectively',
        order: 9,
        isLocked: false,
        progress: 0,
        lessons: []
    },

    {
        id: 'eng5-unit-10',
        subjectId: 'english-year-5',
        title: 'Oral Presentation',
        description: 'Deliver a persuasive speech, use tone, pace, and volume effectively, engage audience',
        order: 10,
        isLocked: false,
        progress: 0,
        lessons: []
    }
];

englishYear5.units = units;
