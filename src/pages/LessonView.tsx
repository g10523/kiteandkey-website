import type { PageType } from '../types';
import { useData } from '../context/DataContext';
import { BookOpen, Calculator, Microscope, Clock, Lightbulb, Check, Loader2 } from 'lucide-react';

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

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-in-out', maxWidth: '900px' }}>
            <button
                onClick={() => onNavigate('subject-detail', subject.id)}
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#a78bfa',
                    cursor: 'pointer',
                    marginBottom: '1rem',
                    fontSize: '0.875rem'
                }}
            >
                ← Back to {subject.name}
            </button>

            <div style={{
                background: 'rgba(26, 26, 38, 0.4)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(167, 139, 250, 0.15)',
                borderRadius: '16px',
                padding: '2rem',
                marginBottom: '2rem'
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
                    marginBottom: '1rem'
                }}>
                    <SubjectIcon size={14} />
                    {subject.name} • Unit {unit.order}
                </div>

                <h1 style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#f8fafc',
                    marginBottom: '1rem'
                }}>
                    {lesson.title}
                </h1>

                <p style={{ color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    {lesson.description}
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <Clock size={16} />
                        {lesson.duration} minutes
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
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
                borderRadius: '16px',
                padding: '2rem',
                marginBottom: '2rem'
            }}>
                <h2 style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: '#f8fafc',
                    marginBottom: '1rem'
                }}>
                    Learning Objectives
                </h2>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {lesson.learningObjectives.map((objective: string, index: number) => (
                        <li key={index} style={{
                            display: 'flex',
                            gap: '1rem',
                            color: '#cbd5e1',
                            lineHeight: 1.6
                        }}>
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '24px',
                                height: '24px',
                                background: 'rgba(167, 139, 250, 0.2)',
                                color: '#a78bfa',
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

            {/* Lesson Content */}
            {lesson.content.sections.map((section: any, index: number) => (
                <div key={index} style={{
                    background: 'rgba(26, 26, 38, 0.4)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(167, 139, 250, 0.15)',
                    borderRadius: '16px',
                    padding: '2rem',
                    marginBottom: '2rem'
                }}>
                    <h3 style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: '#f8fafc',
                        marginBottom: '1rem'
                    }}>
                        {section.title}
                    </h3>
                    <p style={{ color: '#cbd5e1', lineHeight: 1.8, whiteSpace: 'pre-line', marginBottom: '1rem' }}>
                        {section.content}
                    </p>
                    {section.examples && section.examples.length > 0 && (
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 1.8 }}>
                            {section.examples.map((example: string, i: number) => (
                                <li key={i}>{example}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}

            {/* Why It Matters */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(147, 197, 253, 0.1) 0%, rgba(147, 197, 253, 0.05) 100%)',
                border: '1px solid rgba(147, 197, 253, 0.2)',
                borderRadius: '16px',
                padding: '2rem',
                marginBottom: '2rem'
            }}>
                <h3 style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '1.25rem',
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
                <p style={{ color: '#cbd5e1', lineHeight: 1.8 }}>
                    {lesson.whyItMatters}
                </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
                <button
                    onClick={() => onNavigate('subject-detail', subject.id)}
                    style={{
                        padding: '0.875rem 1.5rem',
                        background: 'rgba(26, 26, 38, 0.6)',
                        border: '1px solid rgba(167, 139, 250, 0.2)',
                        borderRadius: '12px',
                        color: '#cbd5e1',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    Back to Unit
                </button>
                <button
                    onClick={handleComplete}
                    style={{
                        padding: '0.875rem 2rem',
                        background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(167, 139, 250, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    Mark as Complete
                    <Check size={20} />
                </button>
            </div>
        </div>
    );
}
