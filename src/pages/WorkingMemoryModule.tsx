import { useEffect, useMemo, useState } from 'react';
import { Activity, CalendarClock, Lock, PlayCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { workingMemoryApiService } from '../services/workingMemoryApiService';
import type { WmReportPayload, WmStartAttemptResponse, WmStatus, WmTimelinePoint } from '../types/workingMemory';
import { ScoreRing } from '../components/workingMemory/ScoreRing';
import { SectionAccordion } from '../components/workingMemory/SectionAccordion';
import { InsightCallout } from '../components/workingMemory/InsightCallout';
import { TrainingDayCard } from '../components/workingMemory/TrainingDayCard';
import { TimelineChart } from '../components/workingMemory/TimelineChart';
import { TakeCheckInWizard } from '../components/workingMemory/TakeCheckInWizard';
import './WorkingMemoryModule.css';

type Tab = 'overview' | 'report' | 'training' | 'timeline' | 'checkin';

export default function WorkingMemoryModule() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [status, setStatus] = useState<WmStatus | null>(null);
  const [timeline, setTimeline] = useState<WmTimelinePoint[]>([]);
  const [report, setReport] = useState<WmReportPayload | null>(null);
  const [attempt, setAttempt] = useState<WmStartAttemptResponse | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState(user?.id || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isTutorView = user?.role === 'tutor' || user?.role === 'admin';
  const targetStudentId = isTutorView ? selectedStudentId : (user?.id || '');

  const latest = useMemo(() => timeline[timeline.length - 1], [timeline]);

  const loadAll = async () => {
    if (!targetStudentId) return;
    setLoading(true);
    setError(null);

    try {
      const [statusData, timelineData] = await Promise.all([
        workingMemoryApiService.getStatus(targetStudentId),
        workingMemoryApiService.getTimeline(targetStudentId)
      ]);

      setStatus(statusData);
      setTimeline(timelineData || []);

      const mostRecentAttempt = timelineData?.[timelineData.length - 1]?.attemptId;
      if (mostRecentAttempt) {
        const reportData = await workingMemoryApiService.getReport(mostRecentAttempt);
        setReport(reportData);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load Working Memory module.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, [targetStudentId]);

  const startCheckIn = async () => {
    if (!status) return;
    try {
      const attemptType = status.baselineCompleted ? 'checkin' : 'baseline';
      const data = await workingMemoryApiService.startAttempt(targetStudentId, attemptType);
      setAttempt(data);
      setActiveTab('checkin');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Unable to start check-in right now.');
    }
  };

  const completeCheckIn = async () => {
    if (!attempt) return;
    const completed = await workingMemoryApiService.completeAttempt(attempt.attemptId);
    setAttempt(null);
    setReport(await workingMemoryApiService.getReport(completed.attemptId));
    await loadAll();
    setActiveTab('report');
  };

  const toggleTrainingDay = (dayNum: number) => {
    if (!report?.trainingPlan?.plan_json?.days) return;
    const plan = report.trainingPlan.plan_json;
    plan.days = plan.days.map((day) => (day.day === dayNum ? { ...day, completed: !day.completed } : day));
    setReport({ ...report });
  };

  if (loading) {
    return <div className="wm-shell"><div className="wm-glass">Loading Working Memory module…</div></div>;
  }

  return (
    <div className="wm-shell">
      <header className="wm-header wm-glass">
        <div>
          <p className="wm-breadcrumb">MindPrint → Working Memory</p>
          <h1>Working Memory</h1>
          <p className="wm-sub">Holding and manipulating information in mind for multi-step learning.</p>
        </div>

        {isTutorView && (
          <div className="wm-student-selector">
            <label htmlFor="studentId">Student ID</label>
            <input id="studentId" value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)} />
          </div>
        )}
      </header>

      {error && <div className="wm-error">{error}</div>}

      <nav className="wm-tabs">
        {(['overview', 'report', 'training', 'timeline', 'checkin'] as Tab[]).map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'checkin' ? 'Take Check-In' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {activeTab === 'overview' && (
        <section className="wm-grid">
          <article className="wm-glass wm-score-card">
            <ScoreRing
              score={latest?.score || 0}
              band={latest?.band || 'No score yet'}
              trend={latest?.trend?.arrow || 'flat'}
              delta={latest?.trend?.deltaFromLast || 0}
            />
            <div className="wm-focus-card">
              <h4>This Fortnight's Focus</h4>
              <p>{report?.recommendations?.student?.headline || 'Start your baseline check-in to unlock a personalized focus.'}</p>
              <p className="wm-next">What to do next: complete your next check-in and follow 4 targeted drill days this week.</p>
            </div>
          </article>

          <article className="wm-glass wm-overview-right">
            <div className="wm-stat-row">
              <span><CalendarClock size={14} /> Next check-in</span>
              <strong>{status?.eligibility?.eligible ? 'Available now' : `${status?.eligibility.daysRemaining} day(s)`}</strong>
            </div>
            <div className="wm-stat-row">
              <span><Activity size={14} /> Baseline</span>
              <strong>{status?.baselineCompleted ? 'Completed' : 'Pending'}</strong>
            </div>
            <div className="wm-stat-row">
              <span><ShieldCheck size={14} /> Data quality</span>
              <strong>{report?.score?.integrity_json?.confidenceLabel || '—'}</strong>
            </div>

            <button className="wm-primary" disabled={!status?.eligibility?.eligible} onClick={startCheckIn}>
              <PlayCircle size={16} /> {status?.baselineCompleted ? 'Take Fortnight Check-In' : 'Take Baseline'}
            </button>
            {!status?.eligibility?.eligible && (
              <p className="wm-muted"><Lock size={12} /> Next check-in available in {status?.eligibility.daysRemaining} day(s).</p>
            )}

            {isTutorView && (
              <button className="wm-secondary" onClick={() => workingMemoryApiService.unlock(targetStudentId, 'Tutor pedagogical override').then(loadAll)}>
                Tutor/Admin Override: Unlock Early
              </button>
            )}
          </article>
        </section>
      )}

      {activeTab === 'report' && (
        <section className="wm-stack">
          <SectionAccordion title="Student Summary" subtitle="Plain-language, growth-oriented" defaultOpen>
            <p>{report?.recommendations?.student?.plainLanguage}</p>
            <InsightCallout title="Friction patterns" points={report?.recommendations?.student?.frictionPatterns || []} />
            <InsightCallout title="What helps in tutoring" points={report?.recommendations?.student?.whatHelpsTutoring || []} />
            <InsightCallout title="What helps at home" points={report?.recommendations?.student?.whatHelpsHome || []} />
            <p className="wm-next">{report?.recommendations?.student?.nextStep}</p>
          </SectionAccordion>

          <SectionAccordion title="Parent Summary" subtitle="Reassuring + practical">
            <p>{report?.recommendations?.parent?.reassurance}</p>
            <InsightCallout title="Parent tips" points={report?.recommendations?.parent?.homeTactics || []} />
            <p className="wm-next">{report?.recommendations?.parent?.nextStep}</p>
          </SectionAccordion>

          {isTutorView && (
            <SectionAccordion title="Tutor Console" subtitle="Pedagogy guidance + integrity indicators">
              <p><strong>Data quality:</strong> {report?.score?.integrity_json?.confidenceLabel}</p>
              <InsightCallout title="Delivery playbook" points={report?.recommendations?.tutor?.deliveryPlaybook || []} />
              <InsightCallout title="Integrity notes" points={report?.score?.integrity_json?.tutorNotes || ['No additional notes']} />
              <p className="wm-next">{report?.recommendations?.tutor?.nextStep}</p>
            </SectionAccordion>
          )}
        </section>
      )}

      {activeTab === 'training' && (
        <section className="wm-stack">
          <div className="wm-glass">
            <h3>{report?.trainingPlan?.plan_json?.title || '14-Day plan'}</h3>
            <p>{report?.trainingPlan?.plan_json?.schedule}</p>
            <p className="wm-muted">{report?.trainingPlan?.plan_json?.personalization}</p>
          </div>

          {(report?.trainingPlan?.plan_json?.days || []).map((day) => (
            <TrainingDayCard key={day.day} day={day} onToggle={toggleTrainingDay} />
          ))}
        </section>
      )}

      {activeTab === 'timeline' && (
        <section className="wm-stack">
          <div className="wm-glass">
            <h3>Timeline & trend</h3>
            <p className="wm-muted">Simple fortnight trend across retakes. Focus on direction, not perfection.</p>
            <TimelineChart points={timeline} />
            <p className="wm-next">What to do next: keep a consistent schedule and compare changes over 3 check-ins.</p>
          </div>
        </section>
      )}

      {activeTab === 'checkin' && (
        <section className="wm-stack">
          {!attempt ? (
            <div className="wm-glass">
              <h3>Ready to begin</h3>
              <p>This check-in includes short tasks across span, n-back, instruction following, and mental math hold.</p>
              <button className="wm-primary" onClick={startCheckIn}>Start now</button>
            </div>
          ) : (
            <TakeCheckInWizard
              attemptId={attempt.attemptId}
              items={attempt.items}
              onSubmit={async ({ itemId, response, timeMs }) => {
                await workingMemoryApiService.submitResponse(attempt.attemptId, itemId, response, timeMs);
              }}
              onComplete={completeCheckIn}
            />
          )}
        </section>
      )}
    </div>
  );
}
