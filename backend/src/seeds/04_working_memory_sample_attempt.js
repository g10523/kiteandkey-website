exports.seed = async function seed(knex) {
  const student = await knex('users').where({ role: 'student' }).first();
  if (!student) return;

  const existing = await knex('mindprint_attempts').where({ user_id: student.id, dimension: 'working_memory' }).first();
  if (existing) return;

  const [attempt] = await knex('mindprint_attempts')
    .insert({
      user_id: student.id,
      dimension: 'working_memory',
      attempt_type: 'baseline',
      status: 'completed',
      age_band: 'Y7_Y8',
      learning_characteristic: 2,
      started_at: knex.fn.now(),
      completed_at: knex.fn.now(),
      next_eligible_at: knex.raw("NOW() + interval '14 days'"),
      data_quality: 'high',
      data_quality_notes: { confidenceLabel: 'High confidence' },
      diagnostics_json: ['Backward span is currently weaker than forward span.'],
      meta_json: { seeded: true }
    })
    .returning('*');

  await knex('mindprint_scores').insert({
    attempt_id: attempt.id,
    score_0_to_100: 64,
    band: 'Secure',
    subscores_json: { span: 0.62, nback: 0.66, instruction: 0.61, mentalMath: 0.58 },
    trend_json: { arrow: 'up', deltaFromLast: 3, history: [58, 61, 64] },
    integrity_json: { level: 'high', confidenceLabel: 'High confidence' },
    diagnostics_json: ['Occasional intermediate-value loss in mental math hold.']
  });
};
