const TASK_TYPES = {
  SPAN_FORWARD: 'SPAN_FORWARD',
  SPAN_BACKWARD: 'SPAN_BACKWARD',
  N_BACK: 'N_BACK',
  INSTRUCTION: 'INSTRUCTION',
  MENTAL_MATH_HOLD: 'MENTAL_MATH_HOLD'
};

const SCORE_WEIGHTS = {
  SPAN: 0.35,
  NBACK: 0.35,
  INSTRUCTION: 0.2,
  MATH_HOLD: 0.1
};

const BANDS = [
  { min: 0, max: 30, label: 'Developing' },
  { min: 31, max: 50, label: 'Emerging' },
  { min: 51, max: 70, label: 'Secure' },
  { min: 71, max: 85, label: 'Strong' },
  { min: 86, max: 100, label: 'Exceptional' }
];

const LEARNING_CHARACTERISTICS = {
  1: { name: 'Conceptual Explorer', style: ['why-first', 'contextualization'], tutorHint: 'Explain mechanism before repetition.' },
  2: { name: 'Structured Analyst', style: ['checklist', 'step-by-step'], tutorHint: 'Chunk instructions and verify each step.' },
  3: { name: 'Visual Synthesizer', style: ['diagram', 'visual-cues'], tutorHint: 'Use boxes/arrows for memory scaffolding.' },
  4: { name: 'Verbal Integrator', style: ['teach-back', 'discussion'], tutorHint: 'Use oral rehearsal and explanation prompts.' },
  5: { name: 'Strategic Planner', style: ['goal-dashboard', 'efficiency-metrics'], tutorHint: 'Set measurable session goals.' },
  6: { name: 'Pattern-Driven Thinker', style: ['rule-discovery', 'sequence-patterns'], tutorHint: 'Highlight recurring structures.' },
  7: { name: 'Reflective Deep Learner', style: ['slow-paced', 'reflection'], tutorHint: 'Reduce task count and deepen debrief.' },
  8: { name: 'Rapid Processor', style: ['short-sprints', 'novelty'], tutorHint: 'Use challenge rounds and anti-rush checks.' },
  9: { name: 'Methodical Builder', style: ['progressive-load', 'consistency'], tutorHint: 'Increase difficulty only after stable mastery.' },
  10: { name: 'Creative Connector', style: ['cross-domain', 'analogy'], tutorHint: 'Bridge drills to real-world contexts.' },
  11: { name: 'Kinesthetic Engager', style: ['movement-cues', 'tap-drag'], tutorHint: 'Use embodied prompts and active response modes.' },
  12: { name: 'Auditory Absorber', style: ['audio-replay', 'verbal-loop'], tutorHint: 'Favor spoken prompts and rhythmic rehearsal.' },
  13: { name: 'Systematic Organiser', style: ['frameworks', 'routines'], tutorHint: 'Provide templates and repeatable workflow.' },
  14: { name: 'Intuitive Leaper', style: ['validation-step', 'proof-check'], tutorHint: 'Require quick reasoning checks after intuitive jumps.' },
  15: { name: 'Collaborative Processor', style: ['peer-dialogue', 'shared-solving'], tutorHint: 'Add paired explanation and co-regulation prompts.' }
};

module.exports = {
  TASK_TYPES,
  SCORE_WEIGHTS,
  BANDS,
  LEARNING_CHARACTERISTICS
};
