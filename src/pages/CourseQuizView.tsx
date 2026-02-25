import { useState, useEffect, useCallback, useRef } from 'react';
import type { PageType } from '../types';
import apiClient from '../services/apiClient';
import {
    Clock, ArrowLeft, CheckCircle2, Circle, ChevronRight,
    AlertTriangle, Send, BookOpen, Loader2, Timer
} from 'lucide-react';
import './CourseQuizView.css';

interface CourseQuizViewProps {
    courseId: string;
    lessonId: string;
    onNavigate: (page: PageType, subjectId?: string) => void;
}

interface QuizQuestion {
    section: string;
    sectionTitle?: string;
    sectionInstructions?: string;
    type: 'multiple_choice' | 'short_answer' | 'extended_response';
    number: number;
    marks: number;
    question: string;
    options?: string[];
    correctIndex?: number;
    passage?: string;
    subQuestions?: {
        label: string;
        title: string;
        marks: number;
        question: string;
    }[];
    isBonus?: boolean;
}

interface QuizSettings {
    title: string;
    time_limit_minutes: number;
    total_marks: number;
    bonus_marks?: number;
    instructions: string;
}

export default function CourseQuizView({ courseId, lessonId, onNavigate }: CourseQuizViewProps) {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [settings, setSettings] = useState<QuizSettings | null>(null);
    const [lessonTitle, setLessonTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Quiz state
    const [started, setStarted] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Fetch quiz data
    useEffect(() => {
        async function fetchQuiz() {
            try {
                setLoading(true);
                const res = await apiClient.get(`/courses/${courseId}`);
                const course = res.data;
                let foundLesson: any = null;
                for (const term of course.terms) {
                    for (const lesson of term.lessons) {
                        if (lesson.id === lessonId) {
                            foundLesson = lesson;
                            break;
                        }
                    }
                    if (foundLesson) break;
                }
                if (!foundLesson) throw new Error('Lesson not found');

                setLessonTitle(foundLesson.title);
                setQuestions(JSON.parse(
                    typeof foundLesson.quizQuestions === 'string'
                        ? foundLesson.quizQuestions
                        : JSON.stringify(foundLesson.quizQuestions || [])
                ));
                const qs = typeof foundLesson.quizSettings === 'string'
                    ? JSON.parse(foundLesson.quizSettings)
                    : foundLesson.quizSettings;
                setSettings(qs);
                setTimeLeft((qs?.time_limit_minutes || 30) * 60);
            } catch (err: any) {
                setError(err.message || 'Failed to load quiz');
            } finally {
                setLoading(false);
            }
        }
        fetchQuiz();
    }, [courseId, lessonId]);

    // Timer
    useEffect(() => {
        if (!started || submitted) return;
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [started, submitted]);

    // Auto-submit when time runs out
    useEffect(() => {
        if (started && !submitted && timeLeft === 0) {
            handleSubmit();
        }
    }, [timeLeft, started, submitted]);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec.toString().padStart(2, '0')}`;
    };

    const handleMCAnswer = (qNum: number, optIdx: number) => {
        if (submitted) return;
        setAnswers(prev => ({ ...prev, [`mc_${qNum}`]: optIdx }));
    };

    const handleTextAnswer = (key: string, value: string) => {
        if (submitted) return;
        setAnswers(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = useCallback(() => {
        setSubmitted(true);
        if (timerRef.current) clearInterval(timerRef.current);
    }, []);

    const getScore = () => {
        let score = 0;
        let total = 0;
        questions.forEach(q => {
            if (q.type === 'multiple_choice' && q.correctIndex !== undefined) {
                total += q.marks;
                if (answers[`mc_${q.number}`] === q.correctIndex) {
                    score += q.marks;
                }
            }
        });
        return { score, total };
    };

    // Group questions by section
    const sections = questions.reduce<{ key: string; title: string; instructions?: string; questions: QuizQuestion[] }[]>(
        (acc, q) => {
            const existing = acc.find(s => s.key === q.section);
            if (existing) {
                existing.questions.push(q);
            } else {
                acc.push({
                    key: q.section,
                    title: q.sectionTitle || `Section ${q.section}`,
                    instructions: q.sectionInstructions,
                    questions: [q],
                });
            }
            return acc;
        }, []
    );

    if (loading) {
        return (
            <div className="quiz-page-loading">
                <Loader2 className="animate-spin" size={48} />
                <p>Loading quiz...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="quiz-page-loading">
                <AlertTriangle size={48} color="#ef4444" />
                <p>{error}</p>
                <button className="quiz-back-btn" onClick={() => onNavigate('course-detail' as PageType, courseId)}>
                    ← Back to Course
                </button>
            </div>
        );
    }

    // ─── Start Screen ───
    if (!started) {
        return (
            <div className="quiz-page">
                <div className="quiz-start-screen">
                    <div className="quiz-start-icon">
                        <BookOpen size={48} />
                    </div>
                    <h1>{settings?.title || 'Quiz'}</h1>
                    <p className="quiz-start-lesson">{lessonTitle}</p>

                    <div className="quiz-start-info">
                        <div className="quiz-info-card">
                            <Timer size={20} />
                            <div>
                                <span className="info-label">Time Limit</span>
                                <span className="info-value">{settings?.time_limit_minutes || 30} minutes</span>
                            </div>
                        </div>
                        <div className="quiz-info-card">
                            <CheckCircle2 size={20} />
                            <div>
                                <span className="info-label">Total Marks</span>
                                <span className="info-value">
                                    {settings?.total_marks || 35}
                                    {settings?.bonus_marks ? ` + ${settings.bonus_marks} bonus` : ''}
                                </span>
                            </div>
                        </div>
                        <div className="quiz-info-card">
                            <BookOpen size={20} />
                            <div>
                                <span className="info-label">Questions</span>
                                <span className="info-value">{questions.length} questions</span>
                            </div>
                        </div>
                    </div>

                    <p className="quiz-start-instructions">{settings?.instructions}</p>

                    <div className="quiz-start-actions">
                        <button
                            className="quiz-start-btn-main"
                            onClick={() => setStarted(true)}
                        >
                            Begin Quiz
                        </button>
                        <button
                            className="quiz-start-btn-back"
                            onClick={() => onNavigate('course-detail' as PageType, courseId)}
                        >
                            <ArrowLeft size={16} /> Back to Course
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ─── Results Screen ───
    if (submitted) {
        const { score, total } = getScore();
        const pct = total > 0 ? Math.round((score / total) * 100) : 0;

        return (
            <div className="quiz-page">
                <div className="quiz-results">
                    <div className={`quiz-results-badge ${pct >= 80 ? 'excellent' : pct >= 60 ? 'good' : 'needs-work'}`}>
                        <CheckCircle2 size={48} />
                    </div>
                    <h1>Quiz Complete!</h1>
                    <p className="quiz-results-subtitle">{settings?.title}</p>

                    <div className="quiz-results-score">
                        <div className="score-circle">
                            <span className="score-number">{score}</span>
                            <span className="score-divider">/</span>
                            <span className="score-total">{total}</span>
                        </div>
                        <p className="score-pct">{pct}% — Multiple Choice</p>
                        <p className="score-note">
                            Short answer and extended response questions will be reviewed by your tutor.
                        </p>
                    </div>

                    {/* Show MC answers */}
                    <div className="quiz-results-review">
                        <h3>Multiple Choice Review</h3>
                        {questions.filter(q => q.type === 'multiple_choice').map(q => {
                            const selected = answers[`mc_${q.number}`];
                            const correct = q.correctIndex;
                            const isCorrect = selected === correct;

                            return (
                                <div key={q.number} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                                    <div className="review-header">
                                        <span className="review-num">Q{q.number}</span>
                                        {isCorrect
                                            ? <CheckCircle2 size={16} color="#10b981" />
                                            : <Circle size={16} color="#ef4444" />
                                        }
                                    </div>
                                    <p className="review-question" dangerouslySetInnerHTML={{ __html: q.question }} />
                                    {q.options?.map((opt, i) => (
                                        <div
                                            key={i}
                                            className={`review-option ${i === correct ? 'is-correct' : ''} ${i === selected && i !== correct ? 'is-wrong' : ''}`}
                                        >
                                            <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>

                    <div className="quiz-results-actions">
                        <button
                            className="quiz-start-btn-main"
                            onClick={() => onNavigate('course-detail' as PageType, courseId)}
                        >
                            Back to Course
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ─── Active Quiz ───
    const timeWarning = timeLeft <= 300; // 5 min warning
    const timeCritical = timeLeft <= 60;

    return (
        <div className="quiz-page">
            {/* Top Bar */}
            <header className="quiz-topbar">
                <div className="quiz-topbar-left">
                    <BookOpen size={20} />
                    <span className="quiz-topbar-title">{settings?.title}</span>
                </div>
                <div className={`quiz-topbar-timer ${timeWarning ? 'warning' : ''} ${timeCritical ? 'critical' : ''}`}>
                    <Clock size={16} />
                    {formatTime(timeLeft)}
                </div>
            </header>

            {/* Navigation sidebar */}
            <div className="quiz-layout">
                <nav className="quiz-nav">
                    <h4>Questions</h4>
                    {sections.map(section => (
                        <div key={section.key} className="quiz-nav-section">
                            <span className="quiz-nav-section-title">{section.title}</span>
                            <div className="quiz-nav-dots">
                                {section.questions.map((q) => {
                                    const flatIdx = questions.indexOf(q);
                                    const answered = q.type === 'multiple_choice'
                                        ? answers[`mc_${q.number}`] !== undefined
                                        : answers[`text_${q.number}`]?.trim();
                                    return (
                                        <button
                                            key={q.number}
                                            className={`quiz-nav-dot ${activeQuestion === flatIdx ? 'active' : ''} ${answered ? 'answered' : ''}`}
                                            onClick={() => setActiveQuestion(flatIdx)}
                                        >
                                            {q.number}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                    <button className="quiz-submit-btn" onClick={handleSubmit}>
                        <Send size={16} /> Submit Quiz
                    </button>
                </nav>

                {/* Question Area */}
                <main className="quiz-main">
                    {questions.map((q, idx) => {
                        if (idx !== activeQuestion) return null;

                        const isFirstInSection = idx === 0 || questions[idx - 1]?.section !== q.section;

                        return (
                            <div key={q.number} className="quiz-question-card">
                                {/* Section header if first in section */}
                                {isFirstInSection && (
                                    <div className="quiz-section-header">
                                        <span className="section-badge">Section {q.section}</span>
                                        <h2>{sections.find(s => s.key === q.section)?.title}</h2>
                                        {q.sectionInstructions && (
                                            <p className="section-instructions">{q.sectionInstructions}</p>
                                        )}
                                    </div>
                                )}

                                <div className="quiz-question-header">
                                    <span className="q-number">Question {q.number}</span>
                                    <span className="q-marks">
                                        {q.marks} {q.marks === 1 ? 'mark' : 'marks'}
                                        {q.isBonus && <span className="bonus-tag">BONUS</span>}
                                    </span>
                                </div>

                                {/* Passage for extended response */}
                                {q.passage && (
                                    <div className="quiz-passage" dangerouslySetInnerHTML={{ __html: q.passage }} />
                                )}

                                <div className="quiz-question-text" dangerouslySetInnerHTML={{ __html: q.question }} />

                                {/* MC options */}
                                {q.type === 'multiple_choice' && q.options && (
                                    <div className="quiz-mc-options">
                                        {q.options.map((opt, i) => (
                                            <button
                                                key={i}
                                                className={`quiz-mc-option ${answers[`mc_${q.number}`] === i ? 'selected' : ''}`}
                                                onClick={() => handleMCAnswer(q.number, i)}
                                            >
                                                <span className="mc-letter">{String.fromCharCode(65 + i)}</span>
                                                <span className="mc-text">{opt}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Short answer */}
                                {q.type === 'short_answer' && !q.subQuestions && (
                                    <textarea
                                        className="quiz-textarea"
                                        placeholder="Type your answer here..."
                                        value={answers[`text_${q.number}`] || ''}
                                        onChange={e => handleTextAnswer(`text_${q.number}`, e.target.value)}
                                        rows={8}
                                    />
                                )}

                                {/* Extended response with sub-questions */}
                                {q.subQuestions && (
                                    <div className="quiz-sub-questions">
                                        {q.subQuestions.map(sq => (
                                            <div key={sq.label} className="quiz-sub-question">
                                                <div className="sub-q-header">
                                                    <span className="sub-q-label">{sq.label})</span>
                                                    <span className="sub-q-title">{sq.title}</span>
                                                    <span className="sub-q-marks">{sq.marks} marks</span>
                                                </div>
                                                <p className="sub-q-text" dangerouslySetInnerHTML={{ __html: sq.question }} />
                                                <textarea
                                                    className="quiz-textarea"
                                                    placeholder={`Answer for part ${sq.label}...`}
                                                    value={answers[`text_${q.number}_${sq.label}`] || ''}
                                                    onChange={e => handleTextAnswer(`text_${q.number}_${sq.label}`, e.target.value)}
                                                    rows={6}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Extended response without sub-questions (e.g. bonus) */}
                                {q.type === 'extended_response' && !q.subQuestions && (
                                    <textarea
                                        className="quiz-textarea"
                                        placeholder="Type your answer here..."
                                        value={answers[`text_${q.number}`] || ''}
                                        onChange={e => handleTextAnswer(`text_${q.number}`, e.target.value)}
                                        rows={10}
                                    />
                                )}

                                {/* Navigation */}
                                <div className="quiz-question-nav">
                                    {idx > 0 && (
                                        <button className="q-nav-btn" onClick={() => setActiveQuestion(idx - 1)}>
                                            ← Previous
                                        </button>
                                    )}
                                    <div style={{ flex: 1 }} />
                                    {idx < questions.length - 1 ? (
                                        <button className="q-nav-btn primary" onClick={() => setActiveQuestion(idx + 1)}>
                                            Next <ChevronRight size={16} />
                                        </button>
                                    ) : (
                                        <button className="q-nav-btn submit" onClick={handleSubmit}>
                                            <Send size={16} /> Submit Quiz
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </main>
            </div>
        </div>
    );
}
