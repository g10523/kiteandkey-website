const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');
const { buildAttemptItems, evaluateResponse } = require('../workingMemory/itemBank');
const { getAgeBandFromYear, getNextEligibleAt, checkEligibility } = require('../workingMemory/scheduler');
const {
  computeSubscores,
  computeScore100,
  computeBand,
  computeDataQuality,
  deriveDiagnostics,
  computeTrend
} = require('../workingMemory/scoring');
const { generateWorkingMemoryReport, generateWMTrainingPlan } = require('../workingMemory/reporting');

async function getStudentContext(studentId) {
  const user = await db('users').where({ id: studentId }).first();
  if (!user) return null;

  return {
    id: user.id,
    firstName: user.first_name,
    yearLevel: user.grade_level || 8,
    learningCharacteristic: user.learning_characteristic || null
  };
}

async function canAccessStudent(reqUser, studentId) {
  if (reqUser.role === 'admin') return true;
  if (reqUser.role === 'student') return reqUser.id === studentId;

  if (reqUser.role === 'parent') {
    const profile = await db('parent_profiles').where({ user_id: reqUser.id }).first();
    return Array.isArray(profile?.child_ids) && profile.child_ids.includes(studentId);
  }

  if (reqUser.role === 'tutor') {
    const profile = await db('tutor_profiles').where({ user_id: reqUser.id }).first();
    return Array.isArray(profile?.assigned_student_ids) && profile.assigned_student_ids.includes(studentId);
  }

  return false;
}

async function getLastCompletedAttempt(studentId) {
  return db('mindprint_attempts')
    .where({ user_id: studentId, dimension: 'working_memory', status: 'completed' })
    .orderBy('completed_at', 'desc')
    .first();
}

async function getStatus(req, res) {
  try {
    const { studentId } = req.params;
    const allowed = await canAccessStudent(req.user, studentId);
    if (!allowed) return res.status(403).json({ error: 'Access denied' });

    const student = await getStudentContext(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const lastCompleted = await getLastCompletedAttempt(studentId);
    const eligibility = checkEligibility(lastCompleted);

    const timeline = await db('mindprint_scores as s')
      .join('mindprint_attempts as a', 's.attempt_id', 'a.id')
      .where({ 'a.user_id': studentId, 'a.dimension': 'working_memory' })
      .orderBy('a.completed_at', 'asc')
      .select('s.score_0_to_100', 's.band', 'a.completed_at');

    res.json({
      student: {
        id: student.id,
        firstName: student.firstName,
        yearLevel: student.yearLevel,
        learningCharacteristic: student.learningCharacteristic
      },
      eligibility,
      baselineCompleted: !!lastCompleted,
      lastCompletedAt: lastCompleted?.completed_at || null,
      timeline: timeline.map((row) => ({
        score: row.score_0_to_100,
        band: row.band,
        date: row.completed_at
      }))
    });
  } catch (error) {
    console.error('workingMemory status error:', error);
    res.status(500).json({ error: 'Failed to fetch working memory status' });
  }
}

async function startAttempt(req, res) {
  try {
    const { studentId, attemptType = 'checkin' } = req.body;
    const allowed = await canAccessStudent(req.user, studentId);
    if (!allowed && req.user.role !== 'admin' && req.user.role !== 'tutor') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const student = await getStudentContext(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const lastCompleted = await getLastCompletedAttempt(studentId);
    const eligibility = checkEligibility(lastCompleted);
    const isBaseline = !lastCompleted || attemptType === 'baseline';

    if (!isBaseline && !eligibility.eligible) {
      return res.status(409).json({
        error: 'Check-in not yet available',
        nextEligibleAt: eligibility.nextEligibleAt,
        daysRemaining: eligibility.daysRemaining
      });
    }

    const ageBand = getAgeBandFromYear(student.yearLevel);
    const items = await buildAttemptItems(ageBand, isBaseline ? 'baseline' : 'checkin');
    const attemptId = uuidv4();

    await db('mindprint_attempts').insert({
      id: attemptId,
      user_id: studentId,
      dimension: 'working_memory',
      attempt_type: isBaseline ? 'baseline' : 'checkin',
      status: 'in_progress',
      age_band: ageBand,
      learning_characteristic: student.learningCharacteristic,
      started_at: new Date(),
      created_by: req.user.id,
      meta_json: {
        selectedItems: items,
        antiCheat: {
          practiceRequired: true,
          minResponseMs: 250
        }
      }
    });

    const practiceItems = items.slice(0, 2);

    res.status(201).json({
      attemptId,
      attemptType: isBaseline ? 'baseline' : 'checkin',
      ageBand,
      estimatedMinutes: isBaseline ? 14 : 8,
      practiceItems,
      items
    });
  } catch (error) {
    console.error('workingMemory start error:', error);
    res.status(500).json({ error: 'Failed to start working memory attempt' });
  }
}

async function submitResponse(req, res) {
  try {
    const { attemptId } = req.params;
    const { itemId, response, timeMs, practice = false } = req.body;

    const attempt = await db('mindprint_attempts').where({ id: attemptId }).first();
    if (!attempt) return res.status(404).json({ error: 'Attempt not found' });

    const allowed = await canAccessStudent(req.user, attempt.user_id);
    if (!allowed && !['admin', 'tutor'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (attempt.status !== 'in_progress') {
      return res.status(400).json({ error: 'Attempt is not active' });
    }

    const items = attempt.meta_json?.selectedItems || [];
    const item = items.find((it) => it.id === itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const judged = evaluateResponse(item, response);

    if (!practice) {
      await db('mindprint_item_responses').insert({
        attempt_id: attemptId,
        item_id: item.id,
        task_type: item.taskType,
        presented_payload: item.prompt,
        response_payload: response,
        correct: judged.correct,
        time_ms: timeMs,
        omission_error: judged.omissionError,
        commission_error: judged.commissionError,
        attention_check_passed: item.ui?.attentionCheck ? judged.correct : null
      });
    }

    const countRow = await db('mindprint_item_responses').where({ attempt_id: attemptId }).count('* as count').first();
    const completedItems = Number(countRow?.count || 0);

    res.json({
      correct: judged.correct,
      progress: {
        completed: completedItems,
        total: items.length
      }
    });
  } catch (error) {
    console.error('workingMemory submit error:', error);
    res.status(500).json({ error: 'Failed to submit response' });
  }
}

async function completeAttempt(req, res) {
  try {
    const { attemptId } = req.params;
    const attempt = await db('mindprint_attempts').where({ id: attemptId }).first();
    if (!attempt) return res.status(404).json({ error: 'Attempt not found' });

    const allowed = await canAccessStudent(req.user, attempt.user_id);
    if (!allowed && !['admin', 'tutor'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const responses = await db('mindprint_item_responses').where({ attempt_id: attemptId });
    if (!responses.length) {
      return res.status(400).json({ error: 'No scored responses captured' });
    }

    const subscores = computeSubscores(responses);
    const score = computeScore100(subscores, attempt.age_band);
    const band = computeBand(score);
    const quality = computeDataQuality(responses);
    const diagnostics = deriveDiagnostics(responses);

    const priorScoresRows = await db('mindprint_scores as s')
      .join('mindprint_attempts as a', 's.attempt_id', 'a.id')
      .where({ 'a.user_id': attempt.user_id, 'a.dimension': 'working_memory' })
      .orderBy('a.completed_at', 'asc')
      .select('s.score_0_to_100');

    const priorScores = priorScoresRows.map((row) => row.score_0_to_100);
    const trend = computeTrend(score, priorScores);

    const student = await getStudentContext(attempt.user_id);
    const report = generateWorkingMemoryReport({
      score,
      band,
      subscores,
      diagnostics,
      trend,
      characteristicId: attempt.learning_characteristic || student?.learningCharacteristic,
      dataQuality: quality,
      studentName: student?.firstName || 'Student'
    });

    const weakestSubskill = Object.entries({
      span: subscores.span,
      nback: subscores.nback,
      instruction: subscores.instruction,
      mentalMath: subscores.mentalMath
    }).sort((a, b) => a[1] - b[1])[0][0];

    const trainingPlan = generateWMTrainingPlan({
      scoreBand: band,
      weakestSubskill,
      characteristicId: attempt.learning_characteristic || student?.learningCharacteristic,
      timePerDay: 12
    });

    const completedAt = new Date();
    const nextEligibleAt = getNextEligibleAt(completedAt);

    await db.transaction(async (trx) => {
      await trx('mindprint_attempts').where({ id: attemptId }).update({
        status: 'completed',
        completed_at: completedAt,
        next_eligible_at: nextEligibleAt,
        data_quality: quality.level,
        data_quality_notes: quality,
        diagnostics_json: diagnostics
      });

      await trx('mindprint_scores').insert({
        attempt_id: attemptId,
        score_0_to_100: score,
        band,
        subscores_json: {
          span: Number(subscores.span.toFixed(2)),
          nback: Number(subscores.nback.toFixed(2)),
          instruction: Number(subscores.instruction.toFixed(2)),
          mentalMath: Number(subscores.mentalMath.toFixed(2))
        },
        trend_json: trend,
        integrity_json: quality,
        diagnostics_json: diagnostics
      });

      await trx('mindprint_recommendations').insert([
        { attempt_id: attemptId, audience: 'student', content_json: report.student },
        { attempt_id: attemptId, audience: 'parent', content_json: report.parent },
        { attempt_id: attemptId, audience: 'tutor', content_json: report.tutor }
      ]);

      await trx('mindprint_training_plans').insert({
        attempt_id: attemptId,
        plan_json: trainingPlan,
        schedule_json: {
          cadence: 'fortnight',
          minutesPerDay: 10,
          daysPerWeek: 6
        },
        completion_json: {
          completedDays: [],
          streak: 0,
          updatedAt: completedAt.toISOString()
        },
        starts_on: completedAt.toISOString().slice(0, 10),
        ends_on: nextEligibleAt.toISOString().slice(0, 10)
      });
    });

    res.json({
      attemptId,
      score,
      band,
      trend,
      dataQuality: quality,
      diagnostics,
      report,
      trainingPlan,
      nextEligibleAt
    });
  } catch (error) {
    console.error('workingMemory complete error:', error);
    res.status(500).json({ error: 'Failed to complete working memory attempt' });
  }
}

async function getReport(req, res) {
  try {
    const { attemptId } = req.params;
    const attempt = await db('mindprint_attempts').where({ id: attemptId }).first();
    if (!attempt) return res.status(404).json({ error: 'Attempt not found' });

    const allowed = await canAccessStudent(req.user, attempt.user_id);
    if (!allowed && !['admin', 'tutor'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const score = await db('mindprint_scores').where({ attempt_id: attemptId }).first();
    const recommendations = await db('mindprint_recommendations').where({ attempt_id: attemptId });
    const trainingPlan = await db('mindprint_training_plans').where({ attempt_id: attemptId }).first();

    const recommendationMap = recommendations.reduce((acc, row) => {
      acc[row.audience] = row.content_json;
      return acc;
    }, {});

    res.json({
      attempt,
      score,
      recommendations: recommendationMap,
      trainingPlan
    });
  } catch (error) {
    console.error('workingMemory report error:', error);
    res.status(500).json({ error: 'Failed to fetch report' });
  }
}

async function getTimeline(req, res) {
  try {
    const { studentId } = req.params;
    const allowed = await canAccessStudent(req.user, studentId);
    if (!allowed && !['admin', 'tutor'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const rows = await db('mindprint_scores as s')
      .join('mindprint_attempts as a', 's.attempt_id', 'a.id')
      .where({ 'a.user_id': studentId, 'a.dimension': 'working_memory' })
      .orderBy('a.completed_at', 'asc')
      .select(
        'a.id as attempt_id',
        'a.attempt_type',
        'a.completed_at',
        'a.data_quality',
        's.score_0_to_100',
        's.band',
        's.subscores_json',
        's.trend_json'
      );

    res.json({
      timeline: rows.map((row) => ({
        attemptId: row.attempt_id,
        type: row.attempt_type,
        date: row.completed_at,
        score: row.score_0_to_100,
        band: row.band,
        dataQuality: row.data_quality,
        subscores: row.subscores_json,
        trend: row.trend_json
      }))
    });
  } catch (error) {
    console.error('workingMemory timeline error:', error);
    res.status(500).json({ error: 'Failed to fetch timeline' });
  }
}

async function unlockEarly(req, res) {
  try {
    if (!['admin', 'tutor'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Only tutors and admins can unlock early check-ins' });
    }

    const { studentId } = req.params;
    const { reason = 'Tutor override' } = req.body || {};

    const latest = await db('mindprint_attempts')
      .where({ user_id: studentId, dimension: 'working_memory' })
      .orderBy('started_at', 'desc')
      .first();

    if (!latest) return res.status(404).json({ error: 'No working memory attempts found' });

    await db('mindprint_attempts').where({ id: latest.id }).update({
      next_eligible_at: new Date(),
      meta_json: {
        ...(latest.meta_json || {}),
        override: {
          by: req.user.id,
          role: req.user.role,
          reason,
          at: new Date().toISOString()
        }
      }
    });

    res.json({ success: true, message: 'Next check-in unlocked' });
  } catch (error) {
    console.error('workingMemory unlock error:', error);
    res.status(500).json({ error: 'Failed to unlock check-in' });
  }
}

module.exports = {
  getStatus,
  startAttempt,
  submitResponse,
  completeAttempt,
  getReport,
  getTimeline,
  unlockEarly
};
