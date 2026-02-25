const { LEARNING_CHARACTERISTICS } = require('./constants');

function getCharacteristic(characteristicId) {
  return LEARNING_CHARACTERISTICS[characteristicId] || {
    name: 'Adaptive Learner',
    style: ['balanced'],
    tutorHint: 'Begin with clear structure, then flex to student response patterns.'
  };
}

function bandTone(band) {
  switch (band) {
    case 'Developing':
      return 'Working memory is currently developing. Small daily reps will compound quickly.';
    case 'Emerging':
      return 'A solid foundation is forming. Consistent routines will convert this into stable performance.';
    case 'Secure':
      return 'Working memory is secure for most learning tasks. Next step is handling complexity under distraction.';
    case 'Strong':
      return 'Working memory is a clear strength. Focus now on endurance and transfer to harder academic tasks.';
    case 'Exceptional':
      return 'Working memory is exceptional right now. Keep challenge and novelty high to continue growth.';
    default:
      return 'Working memory is progressing; focus on consistency and transfer.';
  }
}

function generateWorkingMemoryReport({ score, band, subscores, diagnostics, trend, characteristicId, dataQuality, studentName = 'Student' }) {
  const characteristic = getCharacteristic(characteristicId);

  const studentSummary = {
    title: `${studentName}'s Working Memory Check-In`,
    plainLanguage: 'Working memory is your brain\'s notepad for holding and using information in the moment.',
    score,
    band,
    trend,
    headline: bandTone(band),
    strengthsBasedFraming: `You tend to learn best when instruction matches your ${characteristic.name} style. Try this approach first, then adjust if needed.`,
    frictionPatterns: diagnostics,
    whatHelpsTutoring: [
      'Break directions into 2-3 actionable chunks and pause for recall.',
      characteristic.style.includes('diagram') ? 'Use visual chunk boxes for each step.' : 'Use quick verbal rehearsal after each step.',
      'Prompt retrieval before giving hints: “What are the next two steps?”'
    ],
    whatHelpsHome: [
      'Use 10-minute focused blocks with one short reset.',
      'Practice “hold and transform” tasks: remember -> manipulate -> respond.',
      'End each session with one reflection: “What strategy helped most today?”'
    ],
    whatToAvoid: [
      'Overloading with long uninterrupted instructions.',
      'Speed-only pressure that encourages guessing.',
      'Repeating the same drill format without variation.'
    ],
    nextStep: 'What to do next: complete 4 targeted micro-drill days this week, then retake at the next eligible check-in.'
  };

  const parentSummary = {
    reassurance: 'This profile is not a fixed label. It is a snapshot used to guide supportive teaching choices.',
    score,
    band,
    trend,
    homeTactics: [
      'Ask your child to repeat instructions in their own words before starting homework.',
      'Use short, calm study blocks (10-15 minutes) with visible checklists.',
      'Celebrate strategy use (“You paused and chunked that well”), not just correctness.'
    ],
    nextStep: 'What to do next: follow the 14-day plan and review progress after the next check-in.'
  };

  const tutorSummary = {
    score,
    band,
    trend,
    dataQuality,
    deliveryPlaybook: [
      characteristic.tutorHint,
      'Use explicit interference control: short silence + visual anchor before multi-step tasks.',
      'Run one teach-back checkpoint every 3-4 minutes to verify held information.',
      'Adjust load by one variable at a time (steps, speed, interference) to isolate friction.'
    ],
    technicalNotes: {
      subscores,
      diagnostics,
      styleSignals: characteristic.style
    },
    nextStep: 'What to do next: run the first 3 training sessions, then re-evaluate subskill drift.'
  };

  return {
    student: studentSummary,
    parent: parentSummary,
    tutor: tutorSummary
  };
}

function createDrill(weakestSubskill, dayType, characteristic) {
  const drillLibrary = {
    span: 'Sequence ladder recall (forward/backward alternation)',
    nback: 'Visual or numeric n-back with controlled pacing',
    instruction: 'Multi-step instruction execution with one distractor',
    mentalMath: 'Hold-and-transform arithmetic chain'
  };

  const baseDrill = drillLibrary[weakestSubskill] || drillLibrary.span;
  const variant = characteristic.style.includes('challenge-rounds') || characteristic.style.includes('short-sprints')
    ? 'challenge round'
    : characteristic.style.includes('checklist')
      ? 'checklist-guided round'
      : characteristic.style.includes('diagram')
        ? 'visual scaffold round'
        : 'standard round';

  if (dayType === 'mixed') {
    return [`${baseDrill} (${variant})`, 'Mixed transfer drill (two subskills in sequence)'];
  }

  if (dayType === 'fun') {
    return ['Game-style memory challenge', 'Choice-based mastery mission'];
  }

  return [
    `${baseDrill} (${variant})`,
    `${baseDrill} with mild interference`
  ];
}

function generateWMTrainingPlan({ scoreBand, weakestSubskill, characteristicId, timePerDay = 12 }) {
  const characteristic = getCharacteristic(characteristicId);
  const dayTemplates = ['targeted', 'targeted', 'mixed', 'targeted', 'targeted', 'mixed', 'fun'];
  const days = [];
  const today = new Date();

  for (let i = 0; i < 14; i += 1) {
    const template = dayTemplates[i % 7];
    const dayDate = new Date(today);
    dayDate.setDate(today.getDate() + i);

    const isRest = template === 'fun';
    const [drill1, drill2] = createDrill(weakestSubskill, template, characteristic);

    days.push({
      day: i + 1,
      date: dayDate.toISOString().slice(0, 10),
      type: template,
      durationMinutes: isRest ? 6 : timePerDay,
      warmup: isRest ? 'Memory game warm-up (30s)' : 'Rapid focus warm-up (45s)',
      drills: isRest ? [drill1] : [drill1, drill2],
      reflectionPrompt: 'What strategy helped you keep information in mind today?',
      masteryRule: scoreBand === 'Developing' || scoreBand === 'Emerging'
        ? 'Level up after 2 consecutive accurate sessions.'
        : 'Level up after one high-accuracy session with stable pacing.',
      completed: false
    });
  }

  return {
    title: '14-Day Working Memory Growth Plan',
    schedule: '4 targeted + 2 mixed + 1 fun challenge each week',
    personalization: `Plan starts with ${characteristic.name}-aligned delivery.`,
    streakRule: 'Complete 4 sessions in a week to keep streak active.',
    days
  };
}

module.exports = {
  generateWorkingMemoryReport,
  generateWMTrainingPlan
};
