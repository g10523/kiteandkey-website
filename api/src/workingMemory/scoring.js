const { SCORE_WEIGHTS, BANDS, TASK_TYPES } = require('./constants');

function safeRate(correct, total) {
  if (!total) return 0;
  return Math.max(0, Math.min(1, correct / total));
}

function mean(values) {
  if (!values.length) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function computeSubscores(responses) {
  const groups = {
    span: responses.filter((r) => [TASK_TYPES.SPAN_FORWARD, TASK_TYPES.SPAN_BACKWARD].includes(r.task_type)),
    nback: responses.filter((r) => r.task_type === TASK_TYPES.N_BACK),
    instruction: responses.filter((r) => r.task_type === TASK_TYPES.INSTRUCTION),
    mentalMath: responses.filter((r) => r.task_type === TASK_TYPES.MENTAL_MATH_HOLD)
  };

  const scoreGroup = (rows) => {
    const correct = rows.filter((r) => r.correct).length;
    const base = safeRate(correct, rows.length);

    // Speed contributes lightly: cap at +0.08 and never punishes careful pace.
    const rt = rows.map((r) => r.time_ms || 0).filter(Boolean);
    const avgRt = mean(rt);
    const speedBoost = avgRt > 0 && avgRt < 1800 ? 0.08 : avgRt > 0 && avgRt < 2600 ? 0.04 : 0;

    return Math.max(0, Math.min(1, base + speedBoost));
  };

  return {
    span: scoreGroup(groups.span),
    nback: scoreGroup(groups.nback),
    instruction: scoreGroup(groups.instruction),
    mentalMath: scoreGroup(groups.mentalMath),
    counts: {
      span: groups.span.length,
      nback: groups.nback.length,
      instruction: groups.instruction.length,
      mentalMath: groups.mentalMath.length
    }
  };
}

function normalizeForAgeBand(rawScore, ageBand) {
  const offset = {
    Y5_Y6: 3,
    Y7_Y8: 0,
    Y9_Y10: -2
  }[ageBand] || 0;

  return Math.max(0, Math.min(100, Math.round(rawScore + offset)));
}

function computeBand(score) {
  const band = BANDS.find((b) => score >= b.min && score <= b.max) || BANDS[0];
  return band.label;
}

function computeDataQuality(responses) {
  const total = responses.length;
  if (!total) {
    return {
      level: 'low',
      confidenceLabel: 'Low confidence',
      tutorNotes: ['No response data captured.'],
      metrics: { tooFastRate: 1, omissionRate: 1, attentionPassRate: 0 }
    };
  }

  const tooFast = responses.filter((r) => (r.time_ms || 0) > 0 && r.time_ms < 250).length;
  const omissions = responses.filter((r) => r.omission_error).length;
  const attentionChecks = responses.filter((r) => typeof r.attention_check_passed === 'boolean');
  const passedAttention = attentionChecks.filter((r) => r.attention_check_passed).length;
  const correctnessRate = responses.filter((r) => r.correct).length / total;

  const tooFastRate = tooFast / total;
  const omissionRate = omissions / total;
  const attentionPassRate = attentionChecks.length ? passedAttention / attentionChecks.length : 1;

  const riskScore = (tooFastRate * 0.5) + (omissionRate * 0.25) + ((1 - attentionPassRate) * 0.25);

  let level = 'high';
  if (riskScore > 0.4 || correctnessRate < 0.2) level = 'low';
  else if (riskScore > 0.22) level = 'medium';

  const tutorNotes = [];
  if (tooFastRate > 0.2) tutorNotes.push('High proportion of responses were faster than plausible processing windows.');
  if (omissionRate > 0.2) tutorNotes.push('Frequent omissions suggest overload or disengagement.');
  if (attentionPassRate < 0.7) tutorNotes.push('Attention check performance indicates reduced test integrity.');
  if (tutorNotes.length === 0) tutorNotes.push('Response consistency and pacing look appropriate.');

  return {
    level,
    confidenceLabel: level === 'high' ? 'High confidence' : level === 'medium' ? 'Medium confidence' : 'Low confidence',
    tutorNotes,
    metrics: {
      tooFastRate: Number(tooFastRate.toFixed(2)),
      omissionRate: Number(omissionRate.toFixed(2)),
      attentionPassRate: Number(attentionPassRate.toFixed(2))
    }
  };
}

function deriveDiagnostics(responses) {
  const byTask = (taskType) => responses.filter((r) => r.task_type === taskType);
  const spanForward = byTask(TASK_TYPES.SPAN_FORWARD);
  const spanBackward = byTask(TASK_TYPES.SPAN_BACKWARD);
  const instruction = byTask(TASK_TYPES.INSTRUCTION);
  const mentalMath = byTask(TASK_TYPES.MENTAL_MATH_HOLD);

  const diagnostics = [];

  const sfRate = safeRate(spanForward.filter((r) => r.correct).length, spanForward.length);
  const sbRate = safeRate(spanBackward.filter((r) => r.correct).length, spanBackward.length);
  if (sbRate + 0.15 < sfRate) diagnostics.push('Backward span is currently weaker than forward span; manipulation load is the key growth edge.');

  const instructionOmissions = instruction.filter((r) => r.omission_error).length;
  if (instruction.length && instructionOmissions / instruction.length >= 0.3) diagnostics.push('Steps are being dropped when sequence length increases or interruptions occur.');

  const mathErrors = mentalMath.filter((r) => !r.correct).length;
  if (mentalMath.length && mathErrors / mentalMath.length >= 0.4) diagnostics.push('Intermediate values are being lost during multi-operation mental arithmetic.');

  const distractionPattern = responses.filter((r) => (r.response_payload && r.response_payload.distractionTriggered) || false).length;
  if (distractionPattern > 0) diagnostics.push('Performance dips when interference appears; environmental noise management will help.');

  if (!diagnostics.length) diagnostics.push('Working memory profile looks balanced; next step is building stamina under mild time pressure.');
  return diagnostics;
}

function computeScore100(subscores, ageBand) {
  const raw = (
    (subscores.span * SCORE_WEIGHTS.SPAN * 100) +
    (subscores.nback * SCORE_WEIGHTS.NBACK * 100) +
    (subscores.instruction * SCORE_WEIGHTS.INSTRUCTION * 100) +
    (subscores.mentalMath * SCORE_WEIGHTS.MATH_HOLD * 100)
  );

  const normalized = normalizeForAgeBand(raw, ageBand);
  return Math.round(normalized);
}

function trendArrow(current, previousScores) {
  if (!previousScores.length) return 'flat';
  const avgPrev = mean(previousScores);
  const delta = current - avgPrev;
  if (delta >= 3) return 'up';
  if (delta <= -3) return 'down';
  return 'flat';
}

function computeTrend(currentScore, timelineScores) {
  const lastThree = timelineScores.slice(-3);
  const arrow = trendArrow(currentScore, lastThree);
  const deltaFromLast = timelineScores.length ? currentScore - timelineScores[timelineScores.length - 1] : 0;

  return {
    arrow,
    deltaFromLast,
    history: [...lastThree, currentScore],
    summary: arrow === 'up'
      ? 'Momentum is positive over recent check-ins.'
      : arrow === 'down'
        ? 'Recent results are softer; use the fortnight plan before the next check-in.'
        : 'Performance is steady across recent check-ins.'
  };
}

module.exports = {
  computeSubscores,
  computeScore100,
  computeBand,
  computeDataQuality,
  deriveDiagnostics,
  computeTrend
};
