// app/courses/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Brain,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Target,
  FileText,
  Award,
  ExternalLink,
  Sparkles,
  Rocket,
  Lightbulb,
  Users,
  TrendingUp,
  MessageCircle,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

/* =========================
   Scroll Animation Hook
========================= */

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/* =========================
   Types
========================= */

type SubjectId = "english" | "maths" | "science";

interface SyllabusOutcome {
  code: string;
  description: string;
}

interface StrandData {
  strand: string;
  outcomes: SyllabusOutcome[];
}

interface YearData {
  year: number;
  stage: string;
  overview: string;
  focusAreas: string[];
  strands: StrandData[];
  keySkills: string[];
  assessmentFocus: string[];
}

interface SubjectData {
  id: SubjectId;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  tagline: string;
  years: number[];
  syllabusUrl: string;
  syllabus: Record<number, YearData>;
}

/* =========================
   Helper Function
========================= */

function getCoursePageUrl(subject: SubjectId, year: number): string {
  return `/courses/year-${year}/${subject}`;
}

/* =========================
   Syllabus Data (NSW NESA)
========================= */

const SUBJECTS: Record<SubjectId, SubjectData> = {
  english: {
    id: "english",
    name: "English",
    icon: <BookOpen size={28} />,
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    borderColor: "#DDD6FE",
    description: "Developing confident communicators through reading, writing, and critical analysis.",
    tagline: "Clarity in thought leads to clarity in writing.",
    years: [5, 6, 7, 8, 9, 10],
    syllabusUrl: "https://curriculum.nsw.edu.au/learning-areas/english/english-k-10",
    syllabus: {
      5: {
        year: 5,
        stage: "Stage 3",
        overview: "In Year 5, students develop their ability to communicate effectively for a range of purposes. They engage with increasingly complex texts, refine their writing skills, and build critical thinking through analysis of language and meaning.",
        focusAreas: [
          "Reading and viewing a range of text types",
          "Writing for different purposes and audiences",
          "Oral presentation and discussion skills",
          "Understanding language structures and features",
        ],
        strands: [
          {
            strand: "Reading and Viewing",
            outcomes: [
              { code: "EN3-RECOM-01", description: "Reads and views imaginative, informative and persuasive texts, selecting and navigating texts for a range of purposes" },
              { code: "EN3-UARL-01", description: "Understands and applies knowledge of language forms and features to respond to and compose texts" },
            ],
          },
          {
            strand: "Writing and Representing",
            outcomes: [
              { code: "EN3-CWT-01", description: "Plans, creates and revises imaginative, informative and persuasive texts for a range of purposes and audiences" },
              { code: "EN3-HANDW-01", description: "Uses a fluent and legible style to write and develops a personal handwriting style" },
            ],
          },
          {
            strand: "Speaking and Listening",
            outcomes: [
              { code: "EN3-OLC-01", description: "Communicates effectively by using considered language to guide and engage an audience on familiar and introduced topics" },
            ],
          },
        ],
        keySkills: ["Inferential reading comprehension", "Persuasive writing techniques", "Vocabulary expansion", "Paragraph and text structure", "Oral presentation confidence", "Responding to texts analytically"],
        assessmentFocus: ["Reading comprehension tasks", "Persuasive and narrative writing", "Oral presentations", "Grammar and punctuation"],
      },
      6: {
        year: 6,
        stage: "Stage 3",
        overview: "Year 6 consolidates Stage 3 learning and prepares students for the transition to high school. Students engage with more sophisticated texts, develop nuanced writing skills, and strengthen their ability to analyse and evaluate information.",
        focusAreas: [
          "Critical analysis of texts",
          "Extended writing in multiple genres",
          "Transition preparation for Stage 4",
          "Advanced comprehension strategies",
        ],
        strands: [
          {
            strand: "Reading and Viewing",
            outcomes: [
              { code: "EN3-RECOM-01", description: "Reads and views imaginative, informative and persuasive texts that extend and interpret ideas" },
              { code: "EN3-UARL-02", description: "Analyses and evaluates how language features and structures are used in texts to create meaning" },
            ],
          },
          {
            strand: "Writing and Representing",
            outcomes: [
              { code: "EN3-CWT-02", description: "Composes increasingly complex texts demonstrating control over text structures and language features" },
              { code: "EN3-SPELL-01", description: "Applies knowledge of spelling patterns, word origins and morphemes to spell unfamiliar words" },
            ],
          },
          {
            strand: "Speaking and Listening",
            outcomes: [
              { code: "EN3-OLC-02", description: "Plans and delivers presentations selecting language and techniques appropriate to purpose and audience" },
            ],
          },
        ],
        keySkills: ["Critical evaluation of texts", "Extended narrative and persuasive writing", "Research and note-taking", "Complex sentence structures", "Formal oral presentations", "Preparation for high school English"],
        assessmentFocus: ["NAPLAN preparation", "Extended writing pieces", "Text analysis responses", "Research presentations"],
      },
      7: {
        year: 7,
        stage: "Stage 4",
        overview: "Year 7 marks the beginning of Stage 4, where students engage with more complex literary and non-literary texts. They develop analytical skills, explore different perspectives, and refine their ability to construct cohesive, well-argued responses.",
        focusAreas: [
          "Transition to secondary English",
          "Introduction to literary analysis",
          "Developing analytical writing",
          "Exploring diverse text types",
        ],
        strands: [
          {
            strand: "Reading and Viewing",
            outcomes: [
              { code: "EN4-RVL-01", description: "Uses an increasing range of skills, strategies and knowledge to fluently read, view and comprehend texts" },
              { code: "EN4-URB-01", description: "Understands how texts represent individual and collective human experience" },
            ],
          },
          {
            strand: "Writing and Representing",
            outcomes: [
              { code: "EN4-ECA-01", description: "Effectively and critically uses processes of planning, composing, reviewing and editing to create texts" },
              { code: "EN4-ECB-01", description: "Composes and responds to texts using knowledge of subject matter, language forms and features" },
            ],
          },
          {
            strand: "Speaking and Listening",
            outcomes: [
              { code: "EN4-OLA-01", description: "Uses processes of speaking and listening to collaborate on tasks, negotiate roles, share ideas and present outcomes" },
            ],
          },
        ],
        keySkills: ["Literary analysis fundamentals", "Essay structure and argumentation", "Responding to unseen texts", "Understanding author purpose and context", "Collaborative discussion skills", "Drafting and editing processes"],
        assessmentFocus: ["Text response essays", "Creative writing tasks", "Comprehension assessments", "Speaking and listening tasks"],
      },
      8: {
        year: 8,
        stage: "Stage 4",
        overview: "Year 8 builds on foundational Stage 4 skills, introducing students to more sophisticated analytical frameworks. Students explore diverse texts, develop their personal voice in writing, and strengthen critical thinking about representation and perspective.",
        focusAreas: [
          "Deepening analytical skills",
          "Exploring representation in texts",
          "Personal voice and style development",
          "Intertextual connections",
        ],
        strands: [
          {
            strand: "Reading and Viewing",
            outcomes: [
              { code: "EN4-RVL-01", description: "Uses an increasing range of skills, strategies and knowledge to fluently read, view and comprehend texts" },
              { code: "EN4-URA-01", description: "Understands how ideas, characters and themes in texts are shaped by stylistic features and form" },
            ],
          },
          {
            strand: "Writing and Representing",
            outcomes: [
              { code: "EN4-ECA-01", description: "Effectively uses processes of planning, drafting, reviewing and editing to compose sophisticated texts" },
              { code: "EN4-HYA-01", description: "Analyses the ways that language forms and features shape meaning and response" },
            ],
          },
          {
            strand: "Speaking and Listening",
            outcomes: [
              { code: "EN4-OLB-01", description: "Uses effective strategies for speaking and listening with purpose to explore ideas and evaluate perspectives" },
            ],
          },
        ],
        keySkills: ["Comparative text analysis", "Understanding context and perspective", "Sustained analytical writing", "Developing personal writing voice", "Critical evaluation of arguments", "Research integration"],
        assessmentFocus: ["Extended analytical responses", "Creative writing portfolios", "Oral presentations and debates", "In-class essay assessments"],
      },
      9: {
        year: 9,
        stage: "Stage 5",
        overview: "Year 9 begins Stage 5, where students engage with complex literary and non-literary texts. They develop sophisticated analytical skills, explore how texts position readers, and prepare for the demands of senior English.",
        focusAreas: [
          "Introduction to Stage 5 requirements",
          "Complex textual analysis",
          "Understanding textual positioning",
          "Preparation for senior English",
        ],
        strands: [
          {
            strand: "Reading and Viewing",
            outcomes: [
              { code: "EN5-RVL-01", description: "Uses sophisticated skills and strategies to read and view complex texts for a wide range of purposes" },
              { code: "EN5-URB-01", description: "Understands and explains the ways texts represent human experience and cultural significance" },
            ],
          },
          {
            strand: "Writing and Representing",
            outcomes: [
              { code: "EN5-ECA-01", description: "Skilfully uses planning, composing, reviewing and editing processes to craft sophisticated texts" },
              { code: "EN5-URA-01", description: "Analyses and evaluates how language forms, features and structures shape meaning" },
            ],
          },
          {
            strand: "Speaking and Listening",
            outcomes: [
              { code: "EN5-OLA-01", description: "Uses sophisticated oral language techniques to engage audiences for a range of purposes" },
            ],
          },
        ],
        keySkills: ["Advanced literary analysis", "Thesis-driven essay writing", "Understanding cultural and historical context", "Critical evaluation of media texts", "Sophisticated vocabulary and expression", "Examination techniques"],
        assessmentFocus: ["Extended response essays", "Unseen text analysis", "Creative writing with reflection", "Multimodal presentations"],
      },
      10: {
        year: 10,
        stage: "Stage 5",
        overview: "Year 10 completes Stage 5 and prepares students for Stage 6 (senior) English. Students engage with challenging texts, refine analytical and compositional skills, and develop the critical thinking required for HSC success.",
        focusAreas: [
          "Stage 6 preparation",
          "Advanced analytical frameworks",
          "Sophisticated composition",
          "HSC pathway readiness",
        ],
        strands: [
          {
            strand: "Reading and Viewing",
            outcomes: [
              { code: "EN5-RVL-01", description: "Independently uses skills and strategies to read and view complex texts in different media and technologies" },
              { code: "EN5-URC-01", description: "Critically analyses how texts position audiences and construct meaning through language and form" },
            ],
          },
          {
            strand: "Writing and Representing",
            outcomes: [
              { code: "EN5-ECB-01", description: "Composes sophisticated creative and discursive texts that demonstrate control of language" },
              { code: "EN5-ECA-01", description: "Critically evaluates own and others' texts, making sophisticated refinements" },
            ],
          },
          {
            strand: "Speaking and Listening",
            outcomes: [
              { code: "EN5-OLB-01", description: "Uses highly developed speaking and listening skills for complex purposes in a range of contexts" },
            ],
          },
        ],
        keySkills: ["HSC-level analytical writing", "Sustained argument development", "Sophisticated textual connections", "Independent critical thinking", "Examination time management", "Stage 6 course preparation"],
        assessmentFocus: ["Trial HSC-style assessments", "Major creative works", "Extended analytical essays", "Stage 6 pathway preparation"],
      },
    },
  },
  maths: {
    id: "maths",
    name: "Mathematics",
    icon: <Calculator size={28} />,
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    description: "Building mathematical understanding through reasoning, problem-solving, and fluency.",
    tagline: "Concept-first, confidence-driven mathematics.",
    years: [5, 6, 7, 8, 9, 10],
    syllabusUrl: "https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-k-10",
    syllabus: {
      5: {
        year: 5,
        stage: "Stage 3",
        overview: "In Year 5, students develop fluency with whole numbers and decimals, explore fractions, and build foundational algebraic thinking. They apply mathematical understanding to real-world problems and develop reasoning skills.",
        focusAreas: [
          "Place value and operations with larger numbers",
          "Fractions, decimals and percentages",
          "Introduction to algebraic thinking",
          "Geometric reasoning and measurement",
        ],
        strands: [
          {
            strand: "Number and Algebra",
            outcomes: [
              { code: "MA3-RN-01", description: "Applies an understanding of place value and the role of zero to read and represent whole numbers to billions and decimals to thousandths" },
              { code: "MA3-AR-01", description: "Selects and applies appropriate strategies to solve addition and subtraction problems" },
              { code: "MA3-MR-01", description: "Selects and applies appropriate strategies to solve multiplication and division problems" },
            ],
          },
          {
            strand: "Measurement and Space",
            outcomes: [
              { code: "MA3-GM-01", description: "Locates and describes position on maps using grid references and directional language" },
              { code: "MA3-2DS-01", description: "Investigates and classifies two-dimensional shapes including triangles and quadrilaterals based on their properties" },
              { code: "MA3-UM-01", description: "Selects and uses the appropriate unit and device to measure length, area, volume and capacity" },
            ],
          },
          {
            strand: "Statistics and Probability",
            outcomes: [
              { code: "MA3-DATA-01", description: "Collects, organises and interprets data, constructing data displays including tables, column graphs and picture graphs" },
              { code: "MA3-CHAN-01", description: "Conducts chance experiments and describes probabilities using fractions, decimals and percentages" },
            ],
          },
        ],
        keySkills: ["Mental computation strategies", "Written algorithms for four operations", "Fraction and decimal equivalence", "Problem-solving with multiple steps", "Measuring and converting units", "Data collection and interpretation"],
        assessmentFocus: ["Number operations fluency", "Problem-solving tasks", "Measurement applications", "NAPLAN preparation"],
      },
      6: {
        year: 6,
        stage: "Stage 3",
        overview: "Year 6 consolidates Stage 3 mathematics and prepares students for secondary school. Students work with all four operations on whole numbers, fractions, and decimals, and develop algebraic reasoning through patterns and relationships.",
        focusAreas: [
          "Consolidating number operations",
          "Fractions and decimals in context",
          "Algebraic patterns and relationships",
          "Preparation for Stage 4",
        ],
        strands: [
          {
            strand: "Number and Algebra",
            outcomes: [
              { code: "MA3-RN-03", description: "Determines percentages of quantities and expresses one quantity as a percentage of another" },
              { code: "MA3-MR-02", description: "Uses mental and written strategies to multiply and divide decimals by whole numbers" },
              { code: "MA3-RQF-01", description: "Compares, orders and calculates with fractions, decimals and percentages" },
            ],
          },
          {
            strand: "Measurement and Space",
            outcomes: [
              { code: "MA3-2DS-02", description: "Calculates the area and perimeter of rectangles and triangles" },
              { code: "MA3-3DS-01", description: "Visualises, sketches and constructs three-dimensional objects including prisms and pyramids" },
            ],
          },
          {
            strand: "Statistics and Probability",
            outcomes: [
              { code: "MA3-DATA-02", description: "Interprets and compares data displays including dot plots, column graphs and line graphs" },
              { code: "MA3-CHAN-02", description: "Describes and compares observed and expected frequencies of outcomes" },
            ],
          },
        ],
        keySkills: ["Operations with fractions and decimals", "Percentage calculations", "Area and perimeter formulas", "Order of operations", "Algebraic pattern recognition", "Statistical reasoning"],
        assessmentFocus: ["NAPLAN mathematics", "Problem-solving investigations", "High school readiness assessment", "Extended response tasks"],
      },
      7: {
        year: 7,
        stage: "Stage 4",
        overview: "Year 7 introduces students to secondary mathematics with a focus on developing algebraic thinking, extending number concepts to integers and rational numbers, and building geometric reasoning skills.",
        focusAreas: [
          "Introduction to algebra",
          "Working with integers",
          "Ratio and rates",
          "Geometric properties and reasoning",
        ],
        strands: [
          {
            strand: "Number and Algebra",
            outcomes: [
              { code: "MA4-INT-01", description: "Compares, orders and calculates with integers, applying a range of strategies to solve problems" },
              { code: "MA4-RAT-01", description: "Operates with fractions, decimals, percentages and ratios" },
              { code: "MA4-ALG-01", description: "Uses algebraic techniques to simplify, expand and factorise simple algebraic expressions" },
              { code: "MA4-EQU-01", description: "Uses algebraic techniques to solve simple linear equations" },
            ],
          },
          {
            strand: "Measurement and Space",
            outcomes: [
              { code: "MA4-ANG-01", description: "Identifies and uses angle relationships including those related to parallel lines" },
              { code: "MA4-ARE-01", description: "Calculates the areas of composite shapes involving triangles, rectangles and parallelograms" },
            ],
          },
          {
            strand: "Statistics and Probability",
            outcomes: [
              { code: "MA4-DAT-01", description: "Collects, organises and analyses data sets, calculating mean, median, mode and range" },
              { code: "MA4-PRO-01", description: "Determines probabilities for single-step experiments with equally likely outcomes" },
            ],
          },
        ],
        keySkills: ["Integer operations", "Basic algebraic manipulation", "Solving one-step equations", "Angle relationships", "Area and perimeter calculations", "Statistical measures"],
        assessmentFocus: ["Algebraic skills tests", "Problem-solving tasks", "Geometry investigations", "Statistical analysis projects"],
      },
      8: {
        year: 8,
        stage: "Stage 4",
        overview: "Year 8 extends Stage 4 concepts with a focus on linear relationships, index notation, and further geometric reasoning. Students develop fluency with algebraic manipulation and apply mathematics to increasingly complex problems.",
        focusAreas: [
          "Linear relationships and graphing",
          "Index notation and powers",
          "Congruence and transformations",
          "Pythagoras' theorem introduction",
        ],
        strands: [
          {
            strand: "Number and Algebra",
            outcomes: [
              { code: "MA4-IND-01", description: "Operates with positive integer and zero indices of numerical bases" },
              { code: "MA4-ALG-02", description: "Simplifies algebraic expressions involving the four operations and positive integer indices" },
              { code: "MA4-EQU-02", description: "Solves linear equations of increasing complexity" },
              { code: "MA4-LIN-01", description: "Creates and interprets tables and graphs of linear relationships" },
            ],
          },
          {
            strand: "Measurement and Space",
            outcomes: [
              { code: "MA4-PYT-01", description: "Applies Pythagoras' theorem to calculate side lengths in right-angled triangles" },
              { code: "MA4-VOL-01", description: "Calculates volumes of prisms and cylinders" },
            ],
          },
          {
            strand: "Statistics and Probability",
            outcomes: [
              { code: "MA4-DAT-02", description: "Analyses data using summary statistics and measures of spread" },
              { code: "MA4-PRO-02", description: "Calculates probabilities for multi-step chance experiments using tree diagrams" },
            ],
          },
        ],
        keySkills: ["Linear graphing and interpretation", "Index laws application", "Multi-step equation solving", "Pythagoras' theorem", "Volume calculations", "Probability tree diagrams"],
        assessmentFocus: ["Algebra and equations tests", "Pythagoras investigations", "Linear relationships tasks", "Semester examinations"],
      },
      9: {
        year: 9,
        stage: "Stage 5",
        overview: "Year 9 begins Stage 5 with students developing sophisticated algebraic skills, trigonometric reasoning, and statistical analysis. Students work with linear and non-linear relationships and prepare for senior mathematics.",
        focusAreas: [
          "Expanding algebraic techniques",
          "Introduction to trigonometry",
          "Linear and simple non-linear functions",
          "Financial mathematics",
        ],
        strands: [
          {
            strand: "Number and Algebra",
            outcomes: [
              { code: "MA5-IND-01", description: "Applies index laws to simplify algebraic expressions involving negative and fractional indices" },
              { code: "MA5-ALG-01", description: "Simplifies algebraic expressions involving fractions and factorises monic quadratic trinomials" },
              { code: "MA5-EQU-01", description: "Solves linear equations, linear inequalities and simple quadratic equations" },
            ],
          },
          {
            strand: "Measurement and Space",
            outcomes: [
              { code: "MA5-TRG-01", description: "Applies trigonometric ratios to solve problems involving right-angled triangles" },
              { code: "MA5-ARE-01", description: "Calculates the surface area and volume of right pyramids, cones and spheres" },
            ],
          },
          {
            strand: "Statistics and Probability",
            outcomes: [
              { code: "MA5-DAT-01", description: "Uses statistical displays and measures to compare data sets" },
              { code: "MA5-PRO-01", description: "Calculates relative frequencies and conditional probabilities" },
            ],
          },
        ],
        keySkills: ["Expanding and factorising expressions", "Trigonometric ratios (SOH CAH TOA)", "Coordinate geometry", "Simultaneous equations introduction", "Surface area and volume", "Bivariate data analysis"],
        assessmentFocus: ["Algebraic manipulation tests", "Trigonometry applications", "Problem-solving investigations", "Yearly examinations"],
      },
      10: {
        year: 10,
        stage: "Stage 5",
        overview: "Year 10 completes Stage 5 and prepares students for senior mathematics courses. Students consolidate algebraic skills, extend trigonometry, and develop the analytical reasoning required for Stage 6 success.",
        focusAreas: [
          "Advanced algebra and functions",
          "Extended trigonometry",
          "Quadratic relationships",
          "Preparation for Stage 6 pathways",
        ],
        strands: [
          {
            strand: "Number and Algebra",
            outcomes: [
              { code: "MA5-QUA-01", description: "Solves quadratic equations using a variety of techniques including the quadratic formula" },
              { code: "MA5-SIM-02", description: "Solves simultaneous equations including one linear and one non-linear equation" },
              { code: "MA5-POL-01", description: "Recognises, describes and sketches polynomials and determines key features" },
            ],
          },
          {
            strand: "Measurement and Space",
            outcomes: [
              { code: "MA5-TRG-02", description: "Applies trigonometry to solve problems including those involving non-right-angled triangles" },
              { code: "MA5-CIR-01", description: "Applies deductive reasoning to prove circle theorems" },
            ],
          },
          {
            strand: "Statistics and Probability",
            outcomes: [
              { code: "MA5-DAT-02", description: "Uses standard deviation to analyse data and makes inferences about populations" },
              { code: "MA5-PRO-02", description: "Solves problems involving counting techniques and probability" },
            ],
          },
        ],
        keySkills: ["Quadratic equations and graphing", "Sine and cosine rules", "Functions and relations", "Logarithms (advanced pathway)", "Circle geometry proofs", "Statistical inference"],
        assessmentFocus: ["Stage 5 consolidation exams", "HSC pathway assessments", "Problem-solving investigations", "Stage 6 course recommendations"],
      },
    },
  },
  science: {
    id: "science",
    name: "Science",
    icon: <FlaskConical size={28} />,
    color: "#10B981",
    bgColor: "#ECFDF5",
    borderColor: "#A7F3D0",
    description: "Exploring the natural world through inquiry, investigation, and scientific reasoning.",
    tagline: "Understanding systems, not just facts.",
    years: [7, 8, 9, 10],
    syllabusUrl: "https://curriculum.nsw.edu.au/learning-areas/science/science-7-10",
    syllabus: {
      7: {
        year: 7,
        stage: "Stage 4",
        overview: "Year 7 Science introduces students to scientific inquiry and the foundational concepts of biology, chemistry, physics, and Earth science. Students develop skills in observation, measurement, and evidence-based reasoning.",
        focusAreas: [
          "Introduction to scientific method",
          "Classification and living systems",
          "Properties of matter",
          "Forces and energy basics",
        ],
        strands: [
          {
            strand: "Working Scientifically",
            outcomes: [
              { code: "SC4-4WS", description: "Identifies questions and problems that can be tested or researched and makes predictions based on scientific knowledge" },
              { code: "SC4-5WS", description: "Collaboratively and individually produces a plan to investigate questions and problems" },
              { code: "SC4-6WS", description: "Follows a sequence of instructions to safely undertake a range of investigation types" },
              { code: "SC4-7WS", description: "Processes and analyses data from investigations to identify trends, patterns and relationships" },
            ],
          },
          {
            strand: "Knowledge and Understanding",
            outcomes: [
              { code: "SC4-14LW", description: "Relates the structure and function of living things to their classification, survival and reproduction" },
              { code: "SC4-16CW", description: "Describes the observed properties and behaviour of matter using scientific models about particle motion" },
              { code: "SC4-10PW", description: "Describes the action of unbalanced forces in everyday situations" },
            ],
          },
        ],
        keySkills: ["Scientific investigation design", "Safe laboratory practices", "Recording observations accurately", "Data collection and presentation", "Drawing scientific diagrams", "Writing scientific reports"],
        assessmentFocus: ["Practical investigations", "Research tasks", "Topic tests", "Scientific reports"],
      },
      8: {
        year: 8,
        stage: "Stage 4",
        overview: "Year 8 Science builds on foundational concepts, introducing cells and body systems, chemical reactions, energy transformations, and Earth's geological processes. Students develop more sophisticated inquiry skills.",
        focusAreas: [
          "Cells and body systems",
          "Chemical reactions and compounds",
          "Energy transformations",
          "Earth's structure and processes",
        ],
        strands: [
          {
            strand: "Working Scientifically",
            outcomes: [
              { code: "SC4-5WS", description: "Produces a plan to investigate questions and problems, identifying variables to be changed, measured and controlled" },
              { code: "SC4-7WS", description: "Processes and analyses data to identify trends, patterns and relationships, and draws conclusions" },
              { code: "SC4-8WS", description: "Selects and uses appropriate strategies to produce creative and plausible solutions to problems" },
              { code: "SC4-9WS", description: "Presents science ideas using appropriate scientific language and representations" },
            ],
          },
          {
            strand: "Knowledge and Understanding",
            outcomes: [
              { code: "SC4-15LW", description: "Explains how multicellular organisms rely on coordinated and interdependent internal systems" },
              { code: "SC4-17CW", description: "Explains how understanding of properties of elements, compounds and chemical reactions has been applied" },
              { code: "SC4-11PW", description: "Discusses how scientific understanding has contributed to finding solutions involving energy transfers" },
            ],
          },
        ],
        keySkills: ["Controlling variables in experiments", "Microscope operation", "Chemical equation writing", "Energy flow diagrams", "Analysing secondary sources", "Evaluating scientific claims"],
        assessmentFocus: ["Depth studies", "Practical examinations", "Research investigations", "Semester examinations"],
      },
      9: {
        year: 9,
        stage: "Stage 5",
        overview: "Year 9 Science introduces Stage 5 concepts including ecosystems and evolution, atomic structure and the periodic table, waves and electromagnetic spectrum, and plate tectonics.",
        focusAreas: [
          "Ecosystems and evolution",
          "Atomic structure and periodic table",
          "Waves and energy transfer",
          "Plate tectonics and Earth systems",
        ],
        strands: [
          {
            strand: "Working Scientifically",
            outcomes: [
              { code: "SC5-4WS", description: "Develops questions or hypotheses to be investigated scientifically" },
              { code: "SC5-5WS", description: "Produces a plan to investigate identified questions, hypotheses or problems" },
              { code: "SC5-6WS", description: "Undertakes first-hand investigations to collect valid and reliable data and information" },
              { code: "SC5-7WS", description: "Processes, analyses and evaluates data to develop evidence-based arguments" },
            ],
          },
          {
            strand: "Knowledge and Understanding",
            outcomes: [
              { code: "SC5-14LW", description: "Analyses interactions between components and processes within biological systems" },
              { code: "SC5-16CW", description: "Explains how models, theories and laws about matter have been refined with new evidence" },
              { code: "SC5-10PW", description: "Applies models, theories and laws to explain phenomena involving energy, force and motion" },
            ],
          },
        ],
        keySkills: ["Hypothesis development", "Experimental design", "Data analysis and evaluation", "Understanding atomic models", "Ecosystem analysis", "Critical evaluation of evidence"],
        assessmentFocus: ["Student research projects", "Extended experimental investigations", "Depth studies", "Yearly examinations"],
      },
      10: {
        year: 10,
        stage: "Stage 5",
        overview: "Year 10 Science completes Stage 5 and prepares students for senior science courses. Students explore genetics and evolution, chemical reactions and rates, motion and forces, and the universe.",
        focusAreas: [
          "Genetics, inheritance and evolution",
          "Chemical reactions and rates",
          "Motion, forces and momentum",
          "The universe and Earth's place in space",
        ],
        strands: [
          {
            strand: "Working Scientifically",
            outcomes: [
              { code: "SC5-7WS", description: "Processes, analyses and evaluates data and develops evidence-based arguments and conclusions" },
              { code: "SC5-8WS", description: "Applies scientific understanding and critical thinking skills to suggest possible solutions" },
              { code: "SC5-9WS", description: "Presents science ideas and evidence using appropriate scientific language and representations" },
            ],
          },
          {
            strand: "Knowledge and Understanding",
            outcomes: [
              { code: "SC5-15LW", description: "Explains how the theory of evolution by natural selection is supported by scientific evidence" },
              { code: "SC5-17CW", description: "Discusses the importance of chemical reactions and describes factors that influence reaction rates" },
              { code: "SC5-11PW", description: "Explains how motion, forces and energy are related and applies quantitative relationships" },
            ],
          },
        ],
        keySkills: ["Punnett squares and genetics problems", "Balancing chemical equations", "Motion calculations (speed, acceleration)", "Evaluating scientific theories", "Communicating scientific arguments", "Preparation for senior science"],
        assessmentFocus: ["Student research projects", "Practical examinations", "Depth studies", "Stage 6 pathway assessments"],
      },
    },
  },
};

const INCLUSIONS = [
  { icon: <Brain size={24} />, title: "MindPrint Assessment", description: "Cognitive profiling to understand how your child learns best" },
  { icon: <Users size={24} />, title: "1-on-1 Tutoring", description: "Personalised attention with expert tutors" },
  { icon: <FileText size={24} />, title: "Custom Resources", description: "Tailored worksheets and study materials" },
  { icon: <TrendingUp size={24} />, title: "Progress Tracking", description: "Regular reports and cognitive updates" },
  { icon: <MessageCircle size={24} />, title: "Parent Updates", description: "Consistent communication about progress" },
  { icon: <Calendar size={24} />, title: "Flexible Scheduling", description: "Sessions that fit your family's routine" },
];

/* =========================
   Page Component
========================= */

export default function CoursesPage() {
  const heroAnim = useScrollAnimation();
  const subjectsAnim = useScrollAnimation();
  const syllabusAnim = useScrollAnimation();
  const philosophyAnim = useScrollAnimation();
  const inclusionsAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  const [activeSubject, setActiveSubject] = useState<SubjectId>("english");
  const [activeYear, setActiveYear] = useState<number>(7);
  const [expandedStrands, setExpandedStrands] = useState<Record<number, boolean>>({});

  const subject = SUBJECTS[activeSubject];
  const syllabus = subject.syllabus[activeYear];

  // Reset to valid year when subject changes
  useEffect(() => {
    if (!subject.years.includes(activeYear)) {
      setActiveYear(subject.years[0]);
    }
    setExpandedStrands({});
  }, [activeSubject, subject.years, activeYear]);

  const toggleStrand = (index: number) => {
    setExpandedStrands((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Current course page URL
  const coursePageUrl = getCoursePageUrl(activeSubject, activeYear);

  return (
    <main className="min-h-screen bg-[#FAFAFA] overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F3F9] via-[#FAFAFA] to-[#FAFAFA]" />
        <div className="absolute top-20 right-1/4 h-[500px] w-[500px] rounded-full bg-[#E6E1F2]/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-[#DDD4F2]/30 blur-3xl" />

        <div
          ref={heroAnim.ref}
          className={`relative mx-auto max-w-4xl px-6 text-center transition-all duration-1000 ${heroAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#8C84A8] mb-4">
            Structured Learning Pathways
          </p>
          <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#3F3A52]">
            Courses at Kite &amp; Key
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-[#5E5574] font-medium">
            Tailored support across key learning years
          </p>
          <p className="mt-6 text-lg text-[#6B647F] leading-relaxed max-w-2xl mx-auto">
            We support students from Year 5 to Year 10 through carefully structured
            English, Mathematics, and Science programs — aligned with the NSW syllabus
            and guided by our MindPrint framework.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/consultation"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#5E5574]/20 transition-all hover:bg-[#4F4865] hover:shadow-xl hover:-translate-y-0.5"
            >
              Book a Free Consultation
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/mindprint"
              className="inline-flex items-center gap-2 rounded-xl border border-[#D9CFF2] bg-white/80 backdrop-blur-sm px-8 py-4 text-base font-semibold text-[#5E5574] transition-all hover:border-[#5E5574]/30 hover:bg-white"
            >
              How We Teach
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SUBJECT SELECTOR ================= */}
      <section ref={subjectsAnim.ref} className="py-20 border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-6xl px-6">
          <div
            className={`text-center mb-12 transition-all duration-700 ${subjectsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#3F3A52]">
              Explore Our Subjects
            </h2>
            <p className="mt-4 text-lg text-[#6B647F]">
              Select a subject and year level to view syllabus details.
            </p>
          </div>

          {/* Subject Cards */}
          <div
            className={`grid gap-6 md:grid-cols-3 mb-10 transition-all duration-700 delay-100 ${subjectsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            {Object.values(SUBJECTS).map((subj, index) => (
              <button
                key={subj.id}
                onClick={() => setActiveSubject(subj.id)}
                className={`group relative rounded-2xl border p-6 text-left transition-all duration-300 ${activeSubject === subj.id
                  ? "border-[#5E5574] bg-white shadow-lg scale-[1.02]"
                  : "border-[#E6E1F2] bg-white hover:border-[#D9CFF2] hover:shadow-md"
                  }`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                {activeSubject === subj.id && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 size={20} className="text-[#5E5574]" />
                  </div>
                )}
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl mb-4"
                  style={{ backgroundColor: subj.bgColor, color: subj.color }}
                >
                  {subj.icon}
                </div>
                <h3 className="text-xl font-bold text-[#3F3A52] mb-1">{subj.name}</h3>
                <p className="text-sm text-[#8C84A8] mb-3">
                  Years {subj.years[0]}–{subj.years[subj.years.length - 1]}
                </p>
                <p className="text-sm text-[#6B647F] leading-relaxed">{subj.tagline}</p>
              </button>
            ))}
          </div>

          {/* Year Level Pills */}
          <div
            className={`flex flex-wrap justify-center gap-3 transition-all duration-700 delay-200 ${subjectsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            {subject.years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`rounded-xl px-6 py-3 font-semibold transition-all ${activeYear === year
                  ? "text-white shadow-lg"
                  : "border border-[#E6E1F2] bg-white text-[#5E5574] hover:border-[#D9CFF2]"
                  }`}
                style={{
                  backgroundColor: activeYear === year ? subject.color : undefined,
                }}
              >
                Year {year}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SYLLABUS CONTENT ================= */}
      <section ref={syllabusAnim.ref} className="py-20 bg-white border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-5xl px-6">
          {/* Header */}
          <div
            className={`mb-12 transition-all duration-700 ${syllabusAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: subject.bgColor, color: subject.color }}
                >
                  {subject.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#8C84A8]">
                    {syllabus.stage} • NSW Syllabus
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#3F3A52]">
                    Year {activeYear} {subject.name}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={subject.syllabusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#8C84A8] hover:text-[#5E5574] transition-colors"
                >
                  NESA syllabus
                  <ExternalLink size={14} />
                </a>
                <Link
                  href={coursePageUrl}
                  className="group inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#4F4865]"
                >
                  Go to Course Page
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
            <p className="text-lg text-[#6B647F] leading-relaxed">{syllabus.overview}</p>
          </div>

          {/* Focus Areas */}
          <div
            className={`mb-12 transition-all duration-700 delay-100 ${syllabusAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <h3 className="text-xl font-bold text-[#3F3A52] mb-6 flex items-center gap-3">
              <Target size={22} style={{ color: subject.color }} />
              Focus Areas
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {syllabus.focusAreas.map((area, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-[#E6E1F2] bg-[#FAFAFA] p-4"
                >
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white text-sm font-bold"
                    style={{ backgroundColor: subject.color }}
                  >
                    {index + 1}
                  </div>
                  <span className="text-[#3F3A52]">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Syllabus Outcomes */}
          <div
            className={`mb-12 transition-all duration-700 delay-200 ${syllabusAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <h3 className="text-xl font-bold text-[#3F3A52] mb-6 flex items-center gap-3">
              <FileText size={22} style={{ color: subject.color }} />
              NSW Syllabus Outcomes
            </h3>
            <p className="text-[#6B647F] mb-6">
              Our Year {activeYear} {subject.name} program addresses the following{" "}
              <span className="font-medium text-[#3F3A52]">{syllabus.stage}</span>{" "}
              outcomes from the NSW Education Standards Authority (NESA).
            </p>

            <div className="space-y-4">
              {syllabus.strands.map((strand, strandIndex) => (
                <div
                  key={strandIndex}
                  className="rounded-2xl border border-[#E6E1F2] overflow-hidden"
                >
                  <button
                    onClick={() => toggleStrand(strandIndex)}
                    className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-[#FAFAFA]"
                    style={{ backgroundColor: expandedStrands[strandIndex] ? `${subject.color}08` : undefined }}
                  >
                    <h4 className="font-semibold text-lg" style={{ color: subject.color }}>
                      {strand.strand}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#8C84A8]">
                        {strand.outcomes.length} outcome{strand.outcomes.length !== 1 ? "s" : ""}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`text-[#8C84A8] transition-transform ${expandedStrands[strandIndex] ? "rotate-180" : ""
                          }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${expandedStrands[strandIndex] ? "max-h-[1000px]" : "max-h-0"
                      }`}
                  >
                    <div className="divide-y divide-[#E6E1F2] border-t border-[#E6E1F2]">
                      {strand.outcomes.map((outcome, outcomeIndex) => (
                        <div key={outcomeIndex} className="p-5">
                          <div className="flex items-start gap-4">
                            <code
                              className="shrink-0 rounded-lg px-3 py-1 text-xs font-mono font-medium"
                              style={{ backgroundColor: subject.bgColor, color: subject.color }}
                            >
                              {outcome.code}
                            </code>
                            <p className="text-[#3F3A52] leading-relaxed text-sm">
                              {outcome.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Skills */}
          <div
            className={`mb-12 transition-all duration-700 delay-300 ${syllabusAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <h3 className="text-xl font-bold text-[#3F3A52] mb-6 flex items-center gap-3">
              <Lightbulb size={22} style={{ color: subject.color }} />
              Key Skills Developed
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {syllabus.keySkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl border border-[#E6E1F2] bg-[#FAFAFA] p-4"
                >
                  <CheckCircle2 size={18} className="shrink-0" style={{ color: subject.color }} />
                  <span className="text-[#3F3A52] text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment Focus */}
          <div
            className={`transition-all duration-700 delay-400 ${syllabusAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <h3 className="text-xl font-bold text-[#3F3A52] mb-6 flex items-center gap-3">
              <Award size={22} style={{ color: subject.color }} />
              Assessment Focus
            </h3>
            <p className="text-[#6B647F] mb-4">
              Our tutoring prepares students for these assessment types typically encountered in Year {activeYear} {subject.name}:
            </p>
            <div className="flex flex-wrap gap-3">
              {syllabus.assessmentFocus.map((item, index) => (
                <span
                  key={index}
                  className="rounded-full px-5 py-2.5 text-sm font-medium"
                  style={{
                    backgroundColor: subject.bgColor,
                    color: subject.color,
                    border: `1px solid ${subject.borderColor}`,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= TEACHING PHILOSOPHY ================= */}
      <section ref={philosophyAnim.ref} className="py-20 bg-gradient-to-b from-[#F7F5FB] to-[#FAFAFA] border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-4xl px-6">
          <div
            className={`text-center mb-12 transition-all duration-700 ${philosophyAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#3F3A52]">
              How Our Courses Are Taught
            </h2>
            <p className="mt-4 text-lg text-[#6B647F]">
              Teaching that adapts to your child — not the other way around.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { title: "Teaching adapts to the student", description: "We shape our methods to match how your child thinks and learns, informed by their MindPrint cognitive profile." },
              { title: "MindPrint informs everything", description: "Pacing, structure, and task design are all calibrated to your child's unique cognitive strengths and challenges." },
              { title: "Confidence is built before acceleration", description: "We ensure solid foundations before moving forward. No rushing, no gaps, no unnecessary pressure." },
              { title: "Mastery is prioritised over speed", description: "Deep understanding leads to lasting results. We focus on comprehension, not just completion." },
            ].map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl border border-[#E6E1F2] bg-white p-6 transition-all duration-500 ${philosophyAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <h3 className="font-semibold text-[#3F3A52] mb-2">{item.title}</h3>
                <p className="text-[#6B647F] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* MindPrint callout */}
          <div
            className={`mt-10 rounded-3xl border border-[#E6E1F2] bg-white p-8 transition-all duration-700 delay-500 ${philosophyAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#5E5574]">
                <Brain size={32} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#3F3A52] mb-2">Powered by MindPrint</h3>
                <p className="text-[#6B647F] leading-relaxed">
                  Every lesson is tailored to your child&apos;s unique cognitive profile. MindPrint assessment
                  identifies how they learn best — so teaching adapts to them.
                </p>
              </div>
              <Link
                href="/mindprint"
                className="inline-flex items-center gap-2 rounded-xl border border-[#D9CFF2] bg-[#F7F5FB] px-6 py-3 text-sm font-semibold text-[#5E5574] transition-all hover:bg-white shrink-0"
              >
                Learn More
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT'S INCLUDED ================= */}
      <section ref={inclusionsAnim.ref} className="py-20 bg-white border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-6xl px-6">
          <div
            className={`text-center mb-12 transition-all duration-700 ${inclusionsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#3F3A52]">
              What&apos;s Included
            </h2>
            <p className="mt-4 text-lg text-[#6B647F]">
              Every Kite &amp; Key student receives a complete learning support system.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUSIONS.map((item, index) => (
              <div
                key={item.title}
                className={`rounded-2xl border border-[#E6E1F2] bg-[#FAFAFA] p-6 transition-all duration-500 hover:border-[#D9CFF2] hover:shadow-md ${inclusionsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7F5FB] text-[#5E5574] mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-[#3F3A52] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6B647F] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section ref={ctaAnim.ref} className="py-20 border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-3xl px-6">
          <div
            className={`rounded-3xl border border-[#E6E1F2] bg-gradient-to-b from-white to-[#F7F5FB] p-10 md:p-14 text-center shadow-sm transition-all duration-700 ${ctaAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="flex justify-center mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7F5FB] border border-[#E6E1F2]">
                <Rocket size={28} className="text-[#5E5574]" />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-[#3F3A52]">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-[#6B647F] max-w-lg mx-auto leading-relaxed">
              A free consultation helps us understand your child and recommend the right pathway.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/consultation"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#5E5574]/20 transition-all hover:bg-[#4F4865] hover:shadow-xl hover:-translate-y-0.5"
              >
                Book Free Consultation
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/mindprint"
                className="inline-flex items-center gap-2 rounded-xl border border-[#D9CFF2] bg-white px-8 py-4 text-base font-semibold text-[#5E5574] transition-all hover:border-[#5E5574]/30 hover:bg-[#F7F5FB]"
              >
                Learn About MindPrint
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-[#8C84A8]">
              {["Free 15-minute consultation", "No obligation", "Expert guidance"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#5E5574]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER NOTE ================= */}
      <section className="py-10 border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm text-[#8C84A8]">
            All courses are aligned with the{" "}
            <a
              href="https://curriculum.nsw.edu.au"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#5E5574] underline hover:text-[#4F4865]"
            >
              NSW Education Standards Authority (NESA)
            </a>{" "}
            syllabus and powered by{" "}
            <Link href="/mindprint" className="font-medium text-[#5E5574] underline hover:text-[#4F4865]">
              MindPrint™
            </Link>{" "}
            cognitive intelligence — ensuring every lesson is tailored to how your child thinks and learns.
          </p>
        </div>
      </section>
    </main>
  );
}