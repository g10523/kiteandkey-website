export type WmTaskType = 'SPAN_FORWARD' | 'SPAN_BACKWARD' | 'N_BACK' | 'INSTRUCTION' | 'MENTAL_MATH_HOLD';

export interface WmItem {
  id: string;
  taskType: WmTaskType;
  ageBand: 'Y5_Y6' | 'Y7_Y8' | 'Y9_Y10';
  difficulty: number;
  prompt: Record<string, any>;
  correctAnswer: any;
  scoring: { maxPoints: number; speedWeight: number };
  ui?: Record<string, any>;
}

export interface WmEligibility {
  eligible: boolean;
  reason: string;
  daysRemaining: number;
  nextEligibleAt: string;
}

export interface WmStatus {
  student: {
    id: string;
    firstName: string;
    yearLevel: number;
    learningCharacteristic?: number | null;
  };
  eligibility: WmEligibility;
  baselineCompleted: boolean;
  lastCompletedAt: string | null;
  timeline: Array<{ score: number; band: string; date: string }>;
}

export interface WmStartAttemptResponse {
  attemptId: string;
  attemptType: 'baseline' | 'checkin';
  ageBand: 'Y5_Y6' | 'Y7_Y8' | 'Y9_Y10';
  estimatedMinutes: number;
  practiceItems: WmItem[];
  items: WmItem[];
}

export interface WmReportPayload {
  attempt: any;
  score: {
    score_0_to_100: number;
    band: string;
    subscores_json: {
      span: number;
      nback: number;
      instruction: number;
      mentalMath: number;
    };
    trend_json: {
      arrow: 'up' | 'down' | 'flat';
      deltaFromLast: number;
      history: number[];
      summary: string;
    };
    integrity_json: {
      level: 'high' | 'medium' | 'low';
      confidenceLabel: string;
      tutorNotes?: string[];
      metrics?: Record<string, number>;
    };
    diagnostics_json: string[];
  } | null;
  recommendations: {
    student?: any;
    parent?: any;
    tutor?: any;
  };
  trainingPlan: {
    plan_json: {
      title: string;
      schedule: string;
      personalization: string;
      streakRule: string;
      days: Array<{
        day: number;
        date: string;
        type: string;
        durationMinutes: number;
        warmup: string;
        drills: string[];
        reflectionPrompt: string;
        masteryRule: string;
        completed: boolean;
      }>;
    };
    completion_json: {
      completedDays: number[];
      streak: number;
      updatedAt: string;
    };
  } | null;
}

export interface WmTimelinePoint {
  attemptId: string;
  type: 'baseline' | 'checkin';
  date: string;
  score: number;
  band: string;
  dataQuality: 'high' | 'medium' | 'low';
  subscores: {
    span: number;
    nback: number;
    instruction: number;
    mentalMath: number;
  };
  trend: {
    arrow: 'up' | 'down' | 'flat';
    deltaFromLast: number;
    history: number[];
    summary: string;
  };
}
