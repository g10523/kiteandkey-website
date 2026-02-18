// ============================================
// TYPE DEFINITIONS FOR KITE & KEY ACADEMY LMS
// ============================================

export type UserRole = 'student' | 'parent' | 'tutor' | 'admin';

export interface User {
  id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  isVerified?: boolean;
  mindPrintProfile?: MindPrintProfile;
}

export interface Student extends User {
  role: 'student';
  yearLevel: number;
  mindPrintProfile: MindPrintProfile;
  enrolledSubjects: string[];
}

export interface Parent extends User {
  role: 'parent';
  childrenIds: string[];
}

export interface Tutor extends User {
  role: 'tutor';
  subjects: string[];
  bio: string;
  rating: number;
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

export interface RegistrationToken {
  id: string;
  code: string;
  role: UserRole;
  createdAt: Date;
  expiresAt: Date;
  isUsed: boolean;
  usedBy?: string;
}

export interface MindPrintProfile {
  type: string;
  category: 'Strategic' | 'Narrative' | 'Procedural' | 'Creative';
  description: string;
  secondaryTraits: string[];
  frictionPoints: string[];
  strengths: string[];
  cognitiveScores: {
    conceptVsProcedural: number; // 0 (Procedural) to 100 (Conceptual)
    visualVsVerbal: number; // 0 (Verbal) to 100 (Visual)
    speedVsDepth: number; // 0 (Speed) to 100 (Depth)
    structureTolerance: number; // 0 (Flexible) to 100 (Structured)
    errorSensitivity: number; // 0 (Resilient) to 100 (Sensitive)
  };
  learningPreferences: {
    visualLearning: number;
    auditoryLearning: number;
    kinestheticLearning: number;
    readingWriting: number;
  };
  lessonAdaptations: {
    standardApproach: {
      explanation: string;
      reasoning: string;
      visuals: string;
      tone: string;
    };
    adaptedApproach: {
      explanation: string;
      reasoning: string;
      visuals: string;
      tone: string;
    };
    comparisonReasoning: string;
  };
  todaysAdaptation: {
    emphasize: string[];
    minimize: string[];
    pacing: string;
    checkIns: string[];
    misconceptionAlerts: string[];
  };
  feedbackInterpretation: {
    mistakeType: string;
    cognitiveRootCause: string;
    standardFeedback: string;
    mindPrintFeedback: string;
    correctionStrategy: string;
  };
  revisionStrategy: {
    bestSequence: string;
    sessionLength: string;
    recommendedTools: string[];
    examStrategy: string;
  };
  growthView: {
    stableTraits: string[];
    trainableTraits: string[];
    compoundingEffect: string;
    higherOrderOutcome: string;
  };
  recommendations: string[];
}

export interface Subject {
  id: string;
  name: string;
  yearLevel: number;
  description: string;
  icon: string;
  color: string;
  progress: number; // 0-100
  currentUnit: string;
  totalUnits: number;
  completedUnits: number;
  confidenceLevel: 'high' | 'medium' | 'low';
  units: Unit[];
}

export interface Unit {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  order: number;
  isLocked: boolean;
  progress: number;
  lessons: Lesson[];
  checkpoint?: Checkpoint;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  order: number;
  duration: number; // minutes
  isCompleted: boolean;
  isLocked: boolean;
  content: LessonContent;
  learningObjectives: string[];
  whyItMatters: string;
  quiz?: Quiz;
  isVisibleToStudent?: boolean; // Controlled by tutor/admin
  releaseDate?: Date; // When lesson becomes visible
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit?: number; // minutes, optional
  passingScore: number; // percentage
  attempts: QuizAttempt[];
  maxAttempts?: number; // optional limit
  isRequired: boolean;
  isVisibleToStudent?: boolean; // Controlled by tutor/admin
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  startedAt: Date;
  completedAt?: Date;
  score: number;
  answers: Record<string, string | number>;
  timeSpent: number; // seconds
  isPassed: boolean;
}

export interface ContentVisibility {
  id: string;
  contentType: 'lesson' | 'quiz' | 'unit' | 'assignment';
  contentId: string;
  studentId?: string; // If null, applies to all students
  isVisible: boolean;
  releaseDate?: Date;
  hideDate?: Date;
  setBy: string; // tutor or admin user ID
  setAt: Date;
  notes?: string;
}

export interface LessonContent {
  sections: LessonSection[];
}

export interface LessonSection {
  type: 'explanation' | 'example' | 'practice' | 'reflection';
  title: string;
  content: string;
  examples?: string[];
  questions?: Question[];
}

export interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'short-answer' | 'true-false';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Checkpoint {
  id: string;
  unitId: string;
  title: string;
  description: string;
  questions: Question[];
  passingScore: number; // percentage
  attempts: CheckpointAttempt[];
  isUnlocked: boolean;
}

export interface CheckpointAttempt {
  id: string;
  date: Date;
  score: number;
  answers: Record<string, string | number>;
  timeSpent: number; // seconds
}

export interface Assignment {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  dueDate: Date;
  submittedDate?: Date;
  status: 'not-started' | 'in-progress' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
  attachments?: string[];
}

export interface TutoringSession {
  id: string;
  subjectId: string;
  tutorName: string;
  date: Date;
  duration: number; // minutes
  type: 'individual' | 'small-group';
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
  location: string;
}

export interface Message {
  id: string;
  from: string;
  fromRole: 'tutor' | 'admin' | 'system';
  subject: string;
  body: string;
  date: Date;
  isRead: boolean;
  attachments?: string[];
}

export interface AnalyticsData {
  lessonsCompleted: number;
  totalLessons: number;
  averageAccuracy: number;
  timeSpentLearning: number; // hours
  streakDays: number;
  subjectBreakdown: {
    subjectId: string;
    subjectName: string;
    progress: number;
    accuracy: number;
    timeSpent: number;
  }[];
  weeklyActivity: {
    week: string;
    lessonsCompleted: number;
    timeSpent: number;
  }[];
  improvementTrend: {
    month: string;
    accuracy: number;
  }[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'revision-pack' | 'formula-sheet' | 'reading' | 'video';
  subjectId: string;
  description: string;
  url: string;
  uploadDate: Date;
  size?: string;
}

export type PageType =
  | 'dashboard'
  | 'subjects'
  | 'subject-detail'
  | 'lesson'
  | 'quiz'
  | 'practice'
  | 'assignments'
  | 'mindprint'
  | 'analytics'
  | 'messages'
  | 'resources'
  | 'schedule'
  | 'study-lab'
  | 'login'
  | 'register'
  | 'tokens'
  | 'assessments'
  | 'assessment-wm'
  | 'assessment-center'
  | 'admin-panel'
  | 'content-management';
