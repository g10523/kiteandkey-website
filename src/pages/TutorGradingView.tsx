import { useState, useEffect } from 'react';
import type { PageType } from '../types';
import apiClient from '../services/apiClient';
import {
    ArrowLeft, CheckCircle2, Clock, User, BookOpen,
    Loader2, AlertTriangle, Star, MessageSquare, Send, ChevronDown, ChevronUp
} from 'lucide-react';
import './TutorGradingView.css';

interface TutorGradingViewProps {
    courseId: string;
    lessonId: string;
    onNavigate: (page: PageType, subjectId?: string) => void;
}

interface QuizQuestion {
    section: string;
    sectionTitle?: string;
    type: 'multiple_choice' | 'short_answer' | 'extended_response';
    number: number;
    marks: number;
    question: string;
    options?: string[];
    correctIndex?: number;
    passage?: string;
    subQuestions?: { label: string; title: string; marks: number; question: string }[];
    isBonus?: boolean;
}

interface Submission {
    attempt_id: string;
    student_id: string;
    first_name: string;
    last_name: string;
    username: string;
    status: string;
    score: number;
    tutor_final_mark: number | null;
    tutor_comment: string | null;
    graded_at: string | null;
    completed_at: string;
    quiz_settings: { title: string; total_marks: number; bonus_marks?: number };
}

interface AttemptDetail {
    attempt_id?: string;
    id: string;
    student_id: string;
    first_name: string;
    last_name: string;
    answers_json: Record<string, any>;
    question_marks: Record<string, number> | null;
    tutor_final_mark: number | null;
    tutor_comment: string | null;
    score: number;
    quiz_questions: QuizQuestion[];
    quiz_settings: { title: string; total_marks: number; bonus_marks?: number };
    lesson_title: string;
}

export default function TutorGradingView({ courseId, lessonId, onNavigate }: TutorGradingViewProps) {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAttempt, setSelectedAttempt] = useState<AttemptDetail | null>(null);
    const [loadingAttempt, setLoadingAttempt] = useState(false);

    // Grading state
    const [questionMarks, setQuestionMarks] = useState<Record<string, number>>({});
    const [finalMark, setFinalMark] = useState<number | ''>('');
    const [comment, setComment] = useState('');
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    useEffect(() => {
        fetchSubmissions();
    }, [lessonId]);

    async function fetchSubmissions() {
        try {
            setLoading(true);
            const res = await apiClient.get(`/grading/lessons/${lessonId}/submissions`);
            setSubmissions(res.data.submissions);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to load submissions');
        } finally {
            setLoading(false);
        }
    }

    async function openAttempt(attemptId: string) {
        try {
            setLoadingAttempt(true);
            const res = await apiClient.get(`/grading/attempts/${attemptId}`);
            const detail = res.data.attempt;
            setSelectedAttempt(detail);

            // Pre-fill existing marks if already graded
            setQuestionMarks(detail.question_marks || {});
            setFinalMark(detail.tutor_final_mark ?? '');
            setComment(detail.tutor_comment || '');
            setSaveSuccess(false);

            // Expand all sections by default
            const sections: Record<string, boolean> = {};
            (detail.quiz_questions || []).forEach((q: QuizQuestion) => {
                sections[q.section] = true;
            });
            setExpandedSections(sections);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to load submission');
        } finally {
            setLoadingAttempt(false);
        }
    }

    async function saveGrades() {
        if (!selectedAttempt) return;
        if (finalMark === '' || finalMark === undefined) {
            alert('Please enter a final mark before saving.');
            return;
        }
        try {
            setSaving(true);
            const attemptId = selectedAttempt.id || selectedAttempt.attempt_id;
            await apiClient.post(`/grading/attempts/${attemptId}/grade`, {
                questionMarks,
                finalMark: Number(finalMark),
                comment,
            });
            setSaveSuccess(true);
            // Refresh list
            await fetchSubmissions();
            // Update selected attempt in place
            setSelectedAttempt(prev => prev ? {
                ...prev,
                question_marks: questionMarks,
                tutor_final_mark: Number(finalMark),
                tutor_comment: comment,
            } : prev);
        } catch (err: any) {
            alert(err.response?.data?.error || 'Failed to save grades');
        } finally {
            setSaving(false);
        }
    }

    const setQMark = (key: string, val: number) => {
        setQuestionMarks(prev => ({ ...prev, [key]: val }));
    };

    const getTotalFromQMarks = () =>
        Object.values(questionMarks).reduce((sum, v) => sum + (Number(v) || 0), 0);

    const toggleSection = (key: string) =>
        setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));

    // Group questions by section
    const sections = (selectedAttempt?.quiz_questions || []).reduce<
        { key: string; title: string; questions: QuizQuestion[] }[]
    >((acc, q) => {
        const existing = acc.find(s => s.key === q.section);
        if (existing) existing.questions.push(q);
        else acc.push({ key: q.section, title: q.sectionTitle || `Section ${q.section}`, questions: [q] });
        return acc;
    }, []);

    if (loading) {
        return (
            <div className="tgv-loading">
                <Loader2 className="animate-spin" size={40} />
                <p>Loading submissions…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="tgv-loading">
                <AlertTriangle size={40} color="#ef4444" />
                <p>{error}</p>
                <button className="tgv-back-btn" onClick={() => onNavigate('course-detail' as PageType, courseId)}>
                    ← Back to Course
                </button>
            </div>
        );
    }

    // ─── Grading Panel ───
    if (selectedAttempt) {
        const studentName = `${selectedAttempt.first_name} ${selectedAttempt.last_name}`;
        const answers = selectedAttempt.answers_json || {};
        const totalSettings = selectedAttempt.quiz_settings?.total_marks || 0;
        const totalFromQMarks = getTotalFromQMarks();

        return (
            <div className="tgv-grading-page">
                {/* Header */}
                <header className="tgv-grading-header">
                    <button className="tgv-back-btn" onClick={() => setSelectedAttempt(null)}>
                        <ArrowLeft size={16} /> Submissions
                    </button>
                    <div className="tgv-grading-meta">
                        <div className="tgv-student-badge">
                            <User size={16} />
                            <span>{studentName}</span>
                        </div>
                        <div className="tgv-lesson-badge">
                            <BookOpen size={16} />
                            <span>{selectedAttempt.lesson_title}</span>
                        </div>
                    </div>
                    <div className="tgv-score-badge">
                        Auto MC: <strong>{selectedAttempt.score}</strong> pts
                    </div>
                </header>

                <div className="tgv-grading-layout">
                    {/* Questions + Answers */}
                    <div className="tgv-questions-pane">
                        {sections.map(section => (
                            <div key={section.key} className="tgv-section">
                                <button
                                    className="tgv-section-header"
                                    onClick={() => toggleSection(section.key)}
                                >
                                    <span>Section {section.key} — {section.title}</span>
                                    {expandedSections[section.key]
                                        ? <ChevronUp size={16} />
                                        : <ChevronDown size={16} />
                                    }
                                </button>

                                {expandedSections[section.key] && section.questions.map(q => {
                                    const isMC = q.type === 'multiple_choice';
                                    const mcKey = `mc_${q.number}`;
                                    const textKey = `text_${q.number}`;
                                    const studentMCAnswer = answers[mcKey];
                                    const isCorrect = isMC && studentMCAnswer === q.correctIndex;
                                    const markKey = isMC ? mcKey : textKey;
                                    const currentMark = questionMarks[markKey] ?? '';

                                    return (
                                        <div key={q.number} className={`tgv-question-card ${isMC ? (isCorrect ? 'mc-correct' : 'mc-wrong') : ''}`}>
                                            <div className="tgv-q-header">
                                                <span className="tgv-q-num">Q{q.number}</span>
                                                <span className="tgv-q-type">{q.type.replace('_', ' ')}</span>
                                                <span className="tgv-q-maxmarks">/ {q.marks} marks</span>
                                                {q.isBonus && <span className="tgv-bonus-tag">BONUS</span>}
                                            </div>

                                            {q.passage && (
                                                <div
                                                    className="tgv-passage"
                                                    dangerouslySetInnerHTML={{ __html: q.passage }}
                                                />
                                            )}

                                            <div
                                                className="tgv-q-text"
                                                dangerouslySetInnerHTML={{ __html: q.question }}
                                            />

                                            {/* MC: show options + correct answer */}
                                            {isMC && q.options && (
                                                <div className="tgv-mc-options">
                                                    {q.options.map((opt, i) => (
                                                        <div
                                                            key={i}
                                                            className={`tgv-mc-opt
                                                                ${i === q.correctIndex ? 'correct-ans' : ''}
                                                                ${i === studentMCAnswer && i !== q.correctIndex ? 'wrong-ans' : ''}
                                                                ${i === studentMCAnswer && i === q.correctIndex ? 'student-correct' : ''}
                                                            `}
                                                        >
                                                            <span className="tgv-opt-letter">{String.fromCharCode(65 + i)}</span>
                                                            <span>{opt}</span>
                                                            {i === q.correctIndex && <span className="tgv-correct-label">✓ Correct</span>}
                                                            {i === studentMCAnswer && i !== q.correctIndex && <span className="tgv-wrong-label">Student's answer</span>}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Short / Extended text answers */}
                                            {!isMC && !q.subQuestions && (
                                                <div className="tgv-student-answer">
                                                    <label>Student's Answer:</label>
                                                    <div className="tgv-answer-box">
                                                        {answers[textKey] || <em className="tgv-no-answer">No answer provided</em>}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Extended with sub-questions */}
                                            {q.subQuestions && (
                                                <div className="tgv-sub-answers">
                                                    {q.subQuestions.map(sq => {
                                                        const sqKey = `text_${q.number}_${sq.label}`;
                                                        const sqMarkKey = sqKey;
                                                        const sqMark = questionMarks[sqMarkKey] ?? '';
                                                        return (
                                                            <div key={sq.label} className="tgv-sub-answer">
                                                                <div className="tgv-sub-header">
                                                                    <span className="tgv-sub-label">{sq.label})</span>
                                                                    <span className="tgv-sub-title">{sq.title}</span>
                                                                    <span className="tgv-sub-maxmarks">/ {sq.marks} marks</span>
                                                                </div>
                                                                <div
                                                                    className="tgv-sub-q-text"
                                                                    dangerouslySetInnerHTML={{ __html: sq.question }}
                                                                />
                                                                <div className="tgv-answer-box">
                                                                    {answers[sqKey] || <em className="tgv-no-answer">No answer provided</em>}
                                                                </div>
                                                                <div className="tgv-mark-row">
                                                                    <label>Mark for ({sq.label}):</label>
                                                                    <input
                                                                        type="number"
                                                                        min={0}
                                                                        max={sq.marks}
                                                                        value={sqMark}
                                                                        onChange={e => setQMark(sqMarkKey, Number(e.target.value))}
                                                                        className="tgv-mark-input"
                                                                        placeholder="0"
                                                                    />
                                                                    <span className="tgv-mark-max">/ {sq.marks}</span>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}

                                            {/* Per-question mark input (not for sub-questions) */}
                                            {!q.subQuestions && (
                                                <div className="tgv-mark-row">
                                                    <label>{isMC ? 'Auto-marked:' : 'Mark:'}</label>
                                                    {isMC ? (
                                                        <span className={`tgv-auto-mark ${isCorrect ? 'correct' : 'wrong'}`}>
                                                            {isCorrect ? q.marks : 0} / {q.marks}
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <input
                                                                type="number"
                                                                min={0}
                                                                max={q.marks}
                                                                value={currentMark}
                                                                onChange={e => setQMark(markKey, Number(e.target.value))}
                                                                className="tgv-mark-input"
                                                                placeholder="0"
                                                            />
                                                            <span className="tgv-mark-max">/ {q.marks}</span>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Grading Sidebar */}
                    <aside className="tgv-grading-sidebar">
                        <div className="tgv-sidebar-card">
                            <h3><Star size={16} /> Final Mark</h3>
                            <div className="tgv-final-mark-area">
                                <div className="tgv-running-total">
                                    Running total from marks: <strong>{totalFromQMarks}</strong>
                                </div>
                                <div className="tgv-final-mark-input-row">
                                    <input
                                        type="number"
                                        min={0}
                                        max={totalSettings + (selectedAttempt.quiz_settings?.bonus_marks || 0)}
                                        value={finalMark}
                                        onChange={e => setFinalMark(e.target.value === '' ? '' : Number(e.target.value))}
                                        className="tgv-final-input"
                                        placeholder="Enter final mark"
                                    />
                                    <span className="tgv-final-max">/ {totalSettings}</span>
                                </div>
                                <button
                                    className="tgv-auto-fill-btn"
                                    onClick={() => setFinalMark(totalFromQMarks)}
                                    type="button"
                                >
                                    Auto-fill from marks
                                </button>
                            </div>
                        </div>

                        <div className="tgv-sidebar-card">
                            <h3><MessageSquare size={16} /> Overall Comment</h3>
                            <textarea
                                className="tgv-comment-area"
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                placeholder="Write your feedback for the student here…"
                                rows={8}
                            />
                        </div>

                        <button
                            className={`tgv-save-btn ${saving ? 'loading' : ''} ${saveSuccess ? 'success' : ''}`}
                            onClick={saveGrades}
                            disabled={saving}
                        >
                            {saving
                                ? <><Loader2 className="animate-spin" size={16} /> Saving…</>
                                : saveSuccess
                                    ? <><CheckCircle2 size={16} /> Saved!</>
                                    : <><Send size={16} /> Save Grades</>
                            }
                        </button>
                    </aside>
                </div>
            </div>
        );
    }

    // ─── Submissions List ───
    return (
        <div className="tgv-page">
            <div className="tgv-header">
                <button className="tgv-back-btn" onClick={() => onNavigate('course-detail' as PageType, courseId)}>
                    <ArrowLeft size={16} /> Back to Course
                </button>
                <div className="tgv-header-text">
                    <h1>Quiz Submissions</h1>
                    <p>{submissions.length} student{submissions.length !== 1 ? 's' : ''} submitted</p>
                </div>
            </div>

            {submissions.length === 0 ? (
                <div className="tgv-empty">
                    <BookOpen size={48} />
                    <h2>No submissions yet</h2>
                    <p>Students haven't submitted this quiz yet.</p>
                </div>
            ) : (
                <div className="tgv-submissions-list">
                    {submissions.map(sub => {
                        const isGraded = sub.status === 'graded';
                        return (
                            <div key={sub.attempt_id} className={`tgv-submission-card ${isGraded ? 'graded' : 'pending'}`}>
                                <div className="tgv-sub-info">
                                    <div className="tgv-sub-student">
                                        <User size={18} />
                                        <div>
                                            <strong>{sub.first_name} {sub.last_name}</strong>
                                            <span className="tgv-sub-username">@{sub.username}</span>
                                        </div>
                                    </div>
                                    <div className="tgv-sub-meta">
                                        <span className={`tgv-status-badge ${isGraded ? 'graded' : 'submitted'}`}>
                                            {isGraded ? '✓ Graded' : '⏳ Awaiting Review'}
                                        </span>
                                        <span className="tgv-sub-time">
                                            <Clock size={14} />
                                            {new Date(sub.completed_at).toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short' })}
                                        </span>
                                    </div>
                                </div>
                                <div className="tgv-sub-scores">
                                    <div className="tgv-score-item">
                                        <span>MC Auto</span>
                                        <strong>{sub.score ?? 0}</strong>
                                    </div>
                                    {isGraded && (
                                        <div className="tgv-score-item final">
                                            <span>Final</span>
                                            <strong>{sub.tutor_final_mark} / {sub.quiz_settings?.total_marks}</strong>
                                        </div>
                                    )}
                                </div>
                                <button
                                    className="tgv-grade-btn"
                                    onClick={() => openAttempt(sub.attempt_id)}
                                    disabled={loadingAttempt}
                                >
                                    {loadingAttempt ? <Loader2 className="animate-spin" size={14} /> : null}
                                    {isGraded ? 'Review / Edit' : 'Grade Now'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
