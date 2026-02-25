function getAgeBandFromYear(yearLevel) {
  if (!yearLevel || yearLevel <= 6) return 'Y5_Y6';
  if (yearLevel <= 8) return 'Y7_Y8';
  return 'Y9_Y10';
}

function addDays(dateLike, days) {
  const date = new Date(dateLike);
  date.setDate(date.getDate() + days);
  return date;
}

function getNextEligibleAt(completedAt) {
  return addDays(completedAt, 14);
}

function checkEligibility(lastCompletedAttempt, now = new Date()) {
  if (!lastCompletedAttempt) {
    return { eligible: true, reason: 'baseline_available', daysRemaining: 0, nextEligibleAt: now.toISOString() };
  }

  const nextEligible = new Date(lastCompletedAttempt.next_eligible_at || getNextEligibleAt(lastCompletedAttempt.completed_at));
  if (now >= nextEligible) {
    return { eligible: true, reason: 'checkin_open', daysRemaining: 0, nextEligibleAt: nextEligible.toISOString() };
  }

  const ms = nextEligible.getTime() - now.getTime();
  const daysRemaining = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return {
    eligible: false,
    reason: 'checkin_locked',
    daysRemaining,
    nextEligibleAt: nextEligible.toISOString()
  };
}

module.exports = {
  getAgeBandFromYear,
  getNextEligibleAt,
  checkEligibility
};
