import { useState, useEffect, useCallback } from 'react';
import type { PageType } from '../types';
import { useAuth } from '../context/AuthContext';
import apiClient from '../services/apiClient';
import {
    BookOpen, Calculator, FlaskConical, Lock, Unlock, Check, ChevronDown,
    ChevronRight, Clock, FileText, HelpCircle, AlertCircle,
    Calendar, Settings2, CheckSquare, Square, Timer, Loader2, Target
} from 'lucide-react';
import './CourseDetail.css';

interface CourseDetailProps {
    courseId: string;
    onNavigate: (page: PageType, subjectId?: string, lessonId?: string) => void;
}

// ─── Types matching API response ────

interface LessonData {
    id: string;
    number: number;
    title: string;
    isAccessible: boolean;
    hasNotes: boolean;
    hasHomework: boolean;
    hasQuiz: boolean;
    quizSettings: {
        available_from: string | null;
        available_until: string | null;
        due_date: string | null;
        time_limit_minutes: number;
    };
    contentNotes: {
        objectives?: string[];
        html?: string;
    };
    homeworkContent: {
        instructions?: string;
        html?: string;
    };
    quizQuestions: any[];
    homeworkCompleted: boolean;
    quizScore: number | null;
}

interface TermData {
    id: string;
    number: number;
    title: string;
    isLocked: boolean;
    lessons: LessonData[];
}

interface CourseData {
    id: string;
    name: string;
    subject_type: string;
    color: string;
    icon: string;
    year_level: number;
    description: string;
    terms: TermData[];
}

const ICON_MAP: Record<string, typeof BookOpen> = {
    BookOpen,
    Calculator,
    FlaskConical,
};

export default function CourseDetail({ courseId, onNavigate }: CourseDetailProps) {
    const { user } = useAuth();
    const [course, setCourse] = useState<CourseData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTerm, setActiveTerm] = useState(1);
    const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<'notes' | 'homework' | 'quiz'>('notes');

    // Tutor-specific state
    const [lessonAccess, setLessonAccess] = useState<Record<string, boolean>>({});

    // ─── Fetch course data from API ───
    const fetchCourse = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await apiClient.get(`/courses/${courseId}`);
            const data = res.data;
            setCourse(data);

            // Default to first unlocked term
            const firstUnlocked = data.terms.find((t: TermData) => !t.isLocked);
            if (firstUnlocked) setActiveTerm(firstUnlocked.number);

            // Build access map
            const accessMap: Record<string, boolean> = {};
            data.terms.forEach((term: TermData) => {
                term.lessons.forEach((lesson: LessonData) => {
                    accessMap[lesson.id] = lesson.isAccessible;
                });
            });
            setLessonAccess(accessMap);
        } catch (err: any) {
            console.error('Failed to load course:', err);
            setError(err.response?.data?.error || 'Failed to load course');
        } finally {
            setLoading(false);
        }
    }, [courseId]);

    useEffect(() => { fetchCourse(); }, [fetchCourse]);

    // ─── Toggle lesson access (tutor/admin) ───
    const toggleAccess = useCallback(async (lessonId: string) => {
        const newState = !lessonAccess[lessonId];
        setLessonAccess(prev => ({ ...prev, [lessonId]: newState }));
        try {
            await apiClient.put(`/courses/${courseId}/lessons/${lessonId}/access`, {
                isAccessible: newState,
            });
        } catch {
            // Revert on failure
            setLessonAccess(prev => ({ ...prev, [lessonId]: !newState }));
        }
    }, [lessonAccess, courseId]);

    // ─── Toggle homework (student) ───
    const toggleHomework = useCallback(async (lessonId: string, currentState: boolean) => {
        try {
            await apiClient.put(`/courses/${courseId}/lessons/${lessonId}/homework`, {
                completed: !currentState,
            });
            // Refetch course to get updated state
            fetchCourse();
        } catch {
            console.error('Failed to update homework');
        }
    }, [courseId, fetchCourse]);

    // ─── Loading state ───
    if (loading) {
        return (
            <div className="course-detail-empty">
                <Loader2 className="animate-spin" size={48} color="#a78bfa" />
                <p style={{ marginTop: 16 }}>Loading course...</p>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="course-detail-empty">
                <AlertCircle size={48} color="#ef4444" />
                <p style={{ marginTop: 12 }}>{error || 'Course not found'}</p>
                <button className="btn-outline" onClick={() => onNavigate('courses' as PageType)}>
                    ← Back to Courses
                </button>
            </div>
        );
    }

    const currentTerm = course.terms.find(t => t.number === activeTerm);
    const CourseIcon = ICON_MAP[course.icon] || BookOpen;
    const color = course.color || '#7c3aed';
    const isTutor = user?.role === 'tutor';
    const isAdmin = user?.role === 'admin';
    const isStudent = user?.role === 'student';
    const isParent = user?.role === 'parent';

    const getQuizStatus = (lesson: LessonData) => {
        const now = new Date();
        const settings = lesson.quizSettings || {};
        const { available_from, available_until } = settings;

        if (available_from && new Date(available_from) > now) {
            return { status: 'locked', label: `Opens ${new Date(available_from).toLocaleDateString()}` };
        }
        if (available_until && new Date(available_until) < now) {
            return { status: 'closed', label: 'Closed' };
        }
        if (lesson.quizScore !== null) {
            return { status: 'completed', label: `Score: ${lesson.quizScore}%` };
        }
        return { status: 'available', label: 'Start Quiz' };
    };

    return (
        <div className="course-detail-page">
            {/* Breadcrumb */}
            <div className="course-detail-breadcrumb">
                <button onClick={() => onNavigate('courses' as PageType)}>My Courses</button>
                <ChevronRight size={14} />
                <span>{course.name}</span>
            </div>

            {/* Header */}
            <header className="course-detail-header">
                <div className="course-detail-header-left">
                    <div className="course-detail-icon" style={{ background: color + '18' }}>
                        <CourseIcon size={28} color={color} />
                    </div>
                    <div>
                        <h1 className="course-detail-title">{course.name}</h1>
                        <p className="course-detail-subtitle">
                            Year {course.year_level} NSW Curriculum
                        </p>
                    </div>
                </div>
                {(isTutor || isAdmin) && (
                    <div className="course-detail-tutor-badge">
                        <Settings2 size={14} />
                        {isTutor ? 'Tutor Controls Active' : 'Admin View'}
                    </div>
                )}
            </header>

            {/* Term Tabs */}
            <div className="course-detail-tabs">
                {course.terms.map(term => (
                    <button
                        key={term.id}
                        className={`course-detail-tab ${activeTerm === term.number ? 'active' : ''} ${term.isLocked ? 'locked' : ''}`}
                        onClick={() => !term.isLocked && setActiveTerm(term.number)}
                        disabled={term.isLocked}
                        style={activeTerm === term.number ? { borderColor: color, color } : {}}
                    >
                        {term.isLocked && <Lock size={12} />}
                        {term.title}
                        {term.isLocked && <span className="tab-lock-label">Coming Soon</span>}
                    </button>
                ))}
            </div>

            {/* Lessons Accordion */}
            <div className="course-detail-lessons">
                {currentTerm?.lessons.map(lesson => {
                    const isExpanded = expandedLesson === lesson.id;
                    const accessible = lessonAccess[lesson.id] ?? lesson.isAccessible;
                    const quiz = getQuizStatus(lesson);
                    const canExpand = accessible || isTutor || isAdmin;
                    const objectives = lesson.contentNotes?.objectives || [];

                    return (
                        <div
                            key={lesson.id}
                            className={`lesson-accordion ${isExpanded ? 'expanded' : ''} ${!accessible && isStudent ? 'locked' : ''}`}
                        >
                            {/* Collapsed header */}
                            <button
                                className="lesson-accordion-header"
                                onClick={() => canExpand && setExpandedLesson(isExpanded ? null : lesson.id)}
                                disabled={!canExpand}
                            >
                                <div className="lesson-accordion-left">
                                    <div
                                        className="lesson-number"
                                        style={{
                                            background: accessible ? color + '15' : 'rgba(0,0,0,0.04)',
                                            color: accessible ? color : '#999',
                                        }}
                                    >
                                        {lesson.number}
                                    </div>
                                    <div>
                                        <div className="lesson-accordion-title">
                                            {lesson.title}
                                        </div>
                                        <div className="lesson-accordion-meta">
                                            {lesson.hasNotes && <span><FileText size={12} /> Notes</span>}
                                            {lesson.hasHomework && <span><HelpCircle size={12} /> Homework</span>}
                                            {lesson.hasQuiz && <span><Timer size={12} /> Quiz</span>}
                                        </div>
                                    </div>
                                </div>

                                <div className="lesson-accordion-right">
                                    {/* Tutor access toggle */}
                                    {(isTutor || isAdmin) && (
                                        <button
                                            className={`access-toggle ${accessible ? 'granted' : ''}`}
                                            onClick={(e) => { e.stopPropagation(); toggleAccess(lesson.id); }}
                                            title={accessible ? 'Revoke Access' : 'Grant Access'}
                                        >
                                            {accessible ? <Unlock size={14} /> : <Lock size={14} />}
                                            {accessible ? 'Accessible' : 'Locked'}
                                        </button>
                                    )}

                                    {/* Status indicators */}
                                    {!accessible && (isStudent || isParent) && (
                                        <span className="lesson-locked-badge">
                                            <Lock size={12} /> Locked
                                        </span>
                                    )}
                                    {accessible && lesson.homeworkCompleted && (
                                        <span className="lesson-done-badge">
                                            <Check size={12} /> Done
                                        </span>
                                    )}

                                    <ChevronDown
                                        size={18}
                                        className={`accordion-chevron ${isExpanded ? 'rotated' : ''}`}
                                    />
                                </div>
                            </button>

                            {/* Expanded content */}
                            {isExpanded && (
                                <div className="lesson-accordion-body">
                                    {/* Section tabs */}
                                    <div className="lesson-section-tabs">
                                        <button
                                            className={`section-tab ${activeSection === 'notes' ? 'active' : ''}`}
                                            onClick={() => setActiveSection('notes')}
                                            style={activeSection === 'notes' ? { borderColor: color, color } : {}}
                                        >
                                            <FileText size={14} /> Lesson Notes
                                        </button>
                                        <button
                                            className={`section-tab ${activeSection === 'homework' ? 'active' : ''}`}
                                            onClick={() => setActiveSection('homework')}
                                            style={activeSection === 'homework' ? { borderColor: color, color } : {}}
                                        >
                                            <HelpCircle size={14} /> Homework
                                        </button>
                                        {lesson.hasQuiz && (
                                            <button
                                                className={`section-tab ${activeSection === 'quiz' ? 'active' : ''}`}
                                                onClick={() => setActiveSection('quiz')}
                                                style={activeSection === 'quiz' ? { borderColor: color, color } : {}}
                                            >
                                                <Timer size={14} /> Quiz
                                                {quiz.status === 'locked' && <Lock size={10} />}
                                            </button>
                                        )}
                                    </div>

                                    {/* Notes */}
                                    {activeSection === 'notes' && (
                                        <div className="lesson-content-section">
                                            <div className="lesson-notes">
                                                <h3 className="notes-heading">
                                                    Lesson {lesson.number}: {lesson.title}
                                                </h3>
                                                {lesson.contentNotes?.html ? (
                                                    <div dangerouslySetInnerHTML={{ __html: lesson.contentNotes.html }} />
                                                ) : (
                                                    <>
                                                        <p className="notes-placeholder">
                                                            Lesson content for <strong>{lesson.title}</strong> will be displayed here.
                                                        </p>
                                                        {objectives.length > 0 && (
                                                            <div className="notes-objectives">
                                                                <h4><Target size={16} /> Learning Objectives</h4>
                                                                <ul>
                                                                    {objectives.map((obj, i) => (
                                                                        <li key={i}>{obj}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Homework */}
                                    {activeSection === 'homework' && (
                                        <div className="lesson-content-section">
                                            <div className="homework-section">
                                                <div className="homework-notice">
                                                    <AlertCircle size={16} />
                                                    <span>Complete these questions in your <strong>Homework Book</strong>. Tick the checkbox below once done.</span>
                                                </div>

                                                {lesson.homeworkContent?.html ? (
                                                    <div dangerouslySetInnerHTML={{ __html: lesson.homeworkContent.html }} />
                                                ) : (
                                                    <div className="homework-questions">
                                                        <h4>Instructions</h4>
                                                        <p>{lesson.homeworkContent?.instructions || 'Complete the practice questions in your homework book.'}</p>
                                                    </div>
                                                )}

                                                {isStudent && (
                                                    <button
                                                        className={`homework-checkbox ${lesson.homeworkCompleted ? 'checked' : ''}`}
                                                        onClick={(e) => { e.stopPropagation(); toggleHomework(lesson.id, lesson.homeworkCompleted); }}
                                                    >
                                                        {lesson.homeworkCompleted ? <CheckSquare size={18} /> : <Square size={18} />}
                                                        {lesson.homeworkCompleted ? 'Completed in Homework Book' : 'Mark as completed'}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Quiz */}
                                    {activeSection === 'quiz' && lesson.hasQuiz && (
                                        <div className="lesson-content-section">
                                            <div className="quiz-section">
                                                {/* Tutor quiz controls */}
                                                {(isTutor || isAdmin) && (
                                                    <div className="quiz-tutor-controls">
                                                        <h4><Settings2 size={14} /> Quiz Access Settings</h4>
                                                        <div className="quiz-settings-grid">
                                                            <div className="quiz-setting">
                                                                <label>Available From</label>
                                                                <input type="datetime-local" />
                                                            </div>
                                                            <div className="quiz-setting">
                                                                <label>Available Until</label>
                                                                <input type="datetime-local" />
                                                            </div>
                                                            <div className="quiz-setting">
                                                                <label>Due Date</label>
                                                                <input type="datetime-local" />
                                                            </div>
                                                            <div className="quiz-setting">
                                                                <label>Time Limit</label>
                                                                <div className="quiz-setting-static">
                                                                    <Clock size={14} /> 30 min class standard
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button className="quiz-save-btn" style={{ background: color }}>
                                                            Save Access Settings
                                                        </button>
                                                        <div className="quiz-status-indicator">
                                                            <span className={`status-dot ${accessible ? 'active' : 'inactive'}`} />
                                                            Students {accessible ? 'can' : 'cannot'} currently access this quiz
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Student/Parent quiz view */}
                                                {(isStudent || isParent) && (
                                                    <div className="quiz-student-view">
                                                        <div className="quiz-info-grid">
                                                            <div className="quiz-info-item">
                                                                <Timer size={20} />
                                                                <div>
                                                                    <span className="qi-label">Time Limit</span>
                                                                    <span className="qi-value">30 minutes</span>
                                                                </div>
                                                            </div>
                                                            <div className="quiz-info-item">
                                                                <Calendar size={20} />
                                                                <div>
                                                                    <span className="qi-label">Due Date</span>
                                                                    <span className="qi-value">
                                                                        {lesson.quizSettings.due_date
                                                                            ? new Date(lesson.quizSettings.due_date).toLocaleDateString()
                                                                            : 'Not set'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="quiz-info-item">
                                                                <HelpCircle size={20} />
                                                                <div>
                                                                    <span className="qi-label">Questions</span>
                                                                    <span className="qi-value">10 questions</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {quiz.status === 'available' && isStudent && (
                                                            <button
                                                                className="quiz-start-btn"
                                                                style={{ background: color }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    onNavigate('course-quiz' as PageType, course.id, lesson.id);
                                                                }}
                                                            >
                                                                Start Quiz
                                                            </button>
                                                        )}

                                                        {quiz.status === 'locked' && (
                                                            <div className="quiz-locked-msg">
                                                                <Lock size={16} /> {quiz.label}
                                                            </div>
                                                        )}

                                                        {quiz.status === 'closed' && (
                                                            <div className="quiz-closed-msg">
                                                                <AlertCircle size={16} /> This quiz window has closed.
                                                            </div>
                                                        )}

                                                        {quiz.status === 'completed' && (
                                                            <div className="quiz-completed-msg">
                                                                <Check size={16} /> {quiz.label}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
