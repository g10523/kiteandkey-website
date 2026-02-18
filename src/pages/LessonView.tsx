import type { PageType } from '../types';
import { useData } from '../context/DataContext';
import { BookOpen, Calculator, Microscope, Clock, Lightbulb, Check, Loader2, Brain, Zap, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Helper function to render icon from string name
const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
        BookOpen,
        Calculator,
        Microscope,
    };
    const IconComponent = iconMap[iconName];
    return IconComponent || BookOpen;
};

interface LessonViewProps {
    lessonId: string;
    onNavigate: (page: PageType, subjectId?: string) => void;
}

export default function LessonView({ lessonId, onNavigate }: LessonViewProps) {
    const { subjects, isLoading, updateSubjectProgress } = useData();
    const { user } = useAuth();

    if (isLoading) {
        return (
            <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={48} color="#a78bfa" />
            </div>
        );
    }

    // Find the lesson across all subjects
    let lesson: any = null;
    let subject: any = null;
    let unit: any = null;

    for (const subj of subjects) {
        for (const u of subj.units) {
            const foundLesson = u.lessons.find(l => l.id === lessonId);
            if (foundLesson) {
                lesson = foundLesson;
                subject = subj;
                unit = u;
                break;
            }
        }
        if (lesson) break;
    }

    if (!lesson || !subject || !unit) {
        return <div>Lesson not found</div>;
    }

    const handleComplete = async () => {
        if (subject) {
            const newProgress = Math.min(100, subject.progress + 5);
            await updateSubjectProgress(subject.id, newProgress);
            onNavigate('subject-detail', subject.id);
        }
    };

    const SubjectIcon = getIconComponent(subject.icon);
    const hasMindPrint = !!user?.mindPrintProfile;

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-in-out', maxWidth: '900px', paddingBottom: '4rem' }}>
            <button
                onClick={() => onNavigate('subject-detail', subject.id)}
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#a78bfa',
                    cursor: 'pointer',
                    marginBottom: '1rem',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
            >
                ← Back to {subject.name}
            </button>

            {hasMindPrint && (
                <div className="glassmorphism" style={{
                    padding: '1rem 1.5rem',
                    borderRadius: '1.25rem',
                    background: 'linear-gradient(135deg, rgba(94, 85, 116, 0.4) 0%, rgba(167, 139, 250, 0.2) 100%)',
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(167, 139, 250, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ background: 'white', padding: '0.4rem', borderRadius: '0.75rem' }}>
                            <Brain size={20} color="#5E5574" />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>MindPrint Adaptation Active</div>
                            <div style={{ fontSize: '0.875rem', color: '#f1f5f9' }}>Tailored for your <strong>{user?.mindPrintProfile?.type || 'Developing Profile'}</strong></div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <div className="badge-pill-purple" style={{ fontSize: '0.7rem', opacity: 0.8 }}>Chunking Enabled</div>
                        <div className="badge-pill-purple" style={{ fontSize: '0.7rem', opacity: 0.8 }}>Visual Scaffolding</div>
                    </div>
                </div>
            )}

            <div style={{
                background: 'rgba(26, 26, 38, 0.4)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(167, 139, 250, 0.15)',
                borderRadius: '24px',
                padding: '2.5rem',
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.375rem 0.75rem',
                    background: 'rgba(167, 139, 250, 0.15)',
                    color: '#c4b5fd',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    marginBottom: '1.25rem'
                }}>
                    <SubjectIcon size={14} />
                    {subject.name} • Unit {unit.order}
                </div>

                <h1 style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    color: '#f8fafc',
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em'
                }}>
                    {lesson.title}
                </h1>

                <p style={{ color: '#cbd5e1', marginBottom: '2rem', lineHeight: 1.6, fontSize: '1.125rem' }}>
                    {lesson.description}
                </p>

                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', color: '#94a3b8' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem 0.8rem', borderRadius: '0.75rem' }}>
                        <Clock size={16} />
                        {lesson.duration} mins
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem 0.8rem', borderRadius: '0.75rem' }}>
                        <BookOpen size={16} />
                        {unit.title}
                    </span>
                </div>
            </div>

            {/* Learning Objectives */}
            <div style={{
                background: 'rgba(26, 26, 38, 0.4)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(167, 139, 250, 0.15)',
                borderRadius: '24px',
                padding: '2.5rem',
                marginBottom: '2rem'
            }}>
                <h2 style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: '#f8fafc',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    <Zap size={24} color="#fcd34d" />
                    Learning Objectives
                </h2>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {lesson.learningObjectives.map((objective: string, index: number) => (
                        <li key={index} style={{
                            display: 'flex',
                            gap: '1.25rem',
                            color: '#cbd5e1',
                            lineHeight: 1.6,
                            background: 'rgba(255,255,255,0.03)',
                            padding: '1rem',
                            borderRadius: '1rem',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '28px',
                                height: '28px',
                                background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
                                color: 'white',
                                borderRadius: '50%',
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                flexShrink: 0
                            }}>
                                {index + 1}
                            </span>
                            {objective}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Lesson Content - Adapted */}
            {lesson.content.sections.map((section: any, index: number) => (
                <div key={index} style={{
                    background: 'rgba(26, 26, 38, 0.4)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(167, 139, 250, 0.15)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    marginBottom: '2rem',
                    position: 'relative'
                }}>
                    {hasMindPrint && index === 0 && (
                        <div style={{
                            position: 'absolute',
                            top: '2.5rem',
                            right: '2.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.4rem 0.8rem',
                            background: 'rgba(16, 185, 129, 0.1)',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            borderRadius: '0.75rem',
                            color: '#10B981',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            textTransform: 'uppercase'
                        }}>
                            <Sparkles size={12} />
                            Conceptual Chunking Applied
                        </div>
                    )}

                    <h3 style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: '#f8fafc',
                        marginBottom: '1.25rem'
                    }}>
                        {section.title}
                    </h3>

                    {/* Adaptation explanation for specific sections */}
                    {hasMindPrint && index === 1 && (
                        <div style={{
                            padding: '1rem',
                            background: 'rgba(167, 139, 250, 0.05)',
                            borderRadius: '1rem',
                            marginBottom: '1.5rem',
                            borderLeft: '4px solid #a78bfa',
                            fontSize: '0.875rem',
                            color: '#c4b5fd',
                            display: 'flex',
                            gap: '0.75rem',
                            alignItems: 'center'
                        }}>
                            <Brain size={18} />
                            <em>"To support your working memory, we've broken this complex process into 4 mini-steps."</em>
                        </div>
                    )}

                    <p style={{ color: '#cbd5e1', lineHeight: 1.8, whiteSpace: 'pre-line', marginBottom: '1.5rem', fontSize: '1.125rem' }}>
                        {section.content}
                    </p>

                    {section.examples && section.examples.length > 0 && (
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ color: '#f8fafc', fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase', opacity: 0.6 }}>Practice Examples</div>
                            <ul style={{ listStyle: 'none', paddingLeft: '0', color: '#cbd5e1', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {section.examples.map((example: string, i: number) => (
                                    <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                        <div style={{ marginTop: '0.5rem', width: '6px', height: '6px', borderRadius: '50%', background: '#a78bfa', flexShrink: 0 }}></div>
                                        {example}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}

            {/* Why It Matters */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(147, 197, 253, 0.1) 0%, rgba(147, 197, 253, 0.05) 100%)',
                border: '1px solid rgba(147, 197, 253, 0.2)',
                borderRadius: '24px',
                padding: '2.5rem',
                marginBottom: '3rem'
            }}>
                <h3 style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: '#f8fafc',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <Lightbulb size={24} style={{ color: '#fcd34d' }} />
                    Why This Matters
                </h3>
                <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '1.125rem' }}>
                    {lesson.whyItMatters}
                </p>
            </div>

            {/* Quiz Section */}
            {lesson.quiz && lesson.quiz.isVisibleToStudent !== false && (
                <div style={{
                    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)',
                    border: '2px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    marginBottom: '3rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <div>
                            <h3 style={{
                                fontFamily: 'Outfit, sans-serif',
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                color: '#f8fafc',
                                marginBottom: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                📝 {lesson.quiz.title}
                            </h3>
                            <p style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>
                                {lesson.quiz.description}
                            </p>
                        </div>
                        {lesson.quiz.isRequired && (
                            <span style={{
                                padding: '0.5rem 1rem',
                                background: 'rgba(239, 68, 68, 0.2)',
                                border: '1px solid rgba(239, 68, 68, 0.4)',
                                borderRadius: '999px',
                                color: '#fca5a5',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                textTransform: 'uppercase'
                            }}>
                                Required
                            </span>
                        )}
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1.5rem'
                    }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '1rem',
                            borderRadius: '1rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Questions</div>
                            <div style={{ color: '#f8fafc', fontSize: '1.5rem', fontWeight: 700 }}>{lesson.quiz.questions.length}</div>
                        </div>
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '1rem',
                            borderRadius: '1rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Time Limit</div>
                            <div style={{ color: '#f8fafc', fontSize: '1.5rem', fontWeight: 700 }}>
                                {lesson.quiz.timeLimit ? `${lesson.quiz.timeLimit} min` : 'No limit'}
                            </div>
                        </div>
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '1rem',
                            borderRadius: '1rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Passing Score</div>
                            <div style={{ color: '#f8fafc', fontSize: '1.5rem', fontWeight: 700 }}>{lesson.quiz.passingScore}%</div>
                        </div>
                        {lesson.quiz.attempts && lesson.quiz.attempts.length > 0 && (
                            <div style={{
                                background: 'rgba(16, 185, 129, 0.1)',
                                padding: '1rem',
                                borderRadius: '1rem',
                                textAlign: 'center',
                                border: '1px solid rgba(16, 185, 129, 0.2)'
                            }}>
                                <div style={{ color: '#10B981', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Best Score</div>
                                <div style={{ color: '#10B981', fontSize: '1.5rem', fontWeight: 700 }}>
                                    {Math.max(...lesson.quiz.attempts.map((a: any) => a.score))}%
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => onNavigate('quiz', lesson.id)}
                        style={{
                            width: '100%',
                            padding: '1rem 2rem',
                            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                            border: 'none',
                            borderRadius: '16px',
                            color: '#1a1a26',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '1.125rem',
                            transition: 'all 0.2s',
                            boxShadow: '0 8px 24px rgba(251, 191, 36, 0.4)'
                        }}
                    >
                        {lesson.quiz.attempts && lesson.quiz.attempts.length > 0 ? 'Retake Quiz' : 'Start Quiz'}
                    </button>
                </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                    onClick={() => onNavigate('subject-detail', subject.id)}
                    style={{
                        padding: '1rem 2rem',
                        background: 'rgba(26, 26, 38, 0.6)',
                        border: '1px solid rgba(167, 139, 250, 0.2)',
                        borderRadius: '16px',
                        color: '#cbd5e1',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    Back to Unit
                </button>
                <button
                    onClick={handleComplete}
                    style={{
                        padding: '1rem 3rem',
                        background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
                        border: 'none',
                        borderRadius: '16px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 8px 24px rgba(167, 139, 250, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '1.125rem',
                        transition: 'all 0.2s'
                    }}
                >
                    Complete Lesson
                    <Check size={24} />
                </button>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .badge-pill-purple {
                    background: rgba(167, 139, 250, 0.2);
                    color: #c4b5fd;
                    padding: 0.25rem 0.75rem;
                    border-radius: 999px;
                    font-weight: 600;
                    border: 1px solid rgba(167, 139, 250, 0.3);
                }
            `}</style>
        </div>
    );
}

