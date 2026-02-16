import type { PageType } from '../types';
import { useData } from '../context/DataContext';
import { BookOpen, Check, Lock, Loader2 } from 'lucide-react';

interface SubjectDetailProps {
    subjectId: string;
    onNavigate: (page: PageType, subjectId?: string, lessonId?: string) => void;
}

export default function SubjectDetail({ subjectId, onNavigate }: SubjectDetailProps) {
    const { subjects, isLoading } = useData();
    const subject = subjects.find(s => s.id === subjectId);

    if (isLoading) {
        return (
            <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={48} color="#a78bfa" />
            </div>
        );
    }

    if (!subject) {
        return <div className="card">Subject not found</div>;
    }

    return (
        <div style={{ animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <button
                        onClick={() => onNavigate('subjects')}
                        className="btn-text"
                        style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: 0, marginBottom: '0.75rem' }}
                    >
                        ← Back to My Courses
                    </button>
                    <h1 className="page-title">
                        {subject.name}
                    </h1>
                    <p className="page-subtitle">{subject.description}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div className="stat-number" style={{ color: subject.color }}>{subject.progress}%</div>
                    <div className="stat-label">Course Progress</div>
                </div>
            </header>

            <div style={{ display: 'grid', gap: '2rem' }}>
                {subject.units.map((unit) => (
                    <div
                        key={unit.id}
                        className="card"
                        style={{ padding: '2rem' }}
                    >
                        <div style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>
                                Unit {unit.order}: {unit.title}
                            </h3>
                            <p style={{ color: '#666', lineHeight: 1.6 }}>{unit.description}</p>
                        </div>

                        {unit.lessons.length > 0 && (
                            <div style={{ display: 'grid', gap: '0.75rem' }}>
                                {unit.lessons.map((lesson) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => onNavigate('lesson', subjectId, lesson.id)}
                                        className="subject-item"
                                        style={{
                                            padding: '1.25rem',
                                            cursor: lesson.isLocked ? 'not-allowed' : 'pointer',
                                            opacity: lesson.isLocked ? 0.5 : 1,
                                            transform: 'none'
                                        }}
                                        disabled={lesson.isLocked}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '10px',
                                                background: lesson.isCompleted ? '#ecfdf5' : '#f8fafc',
                                                color: lesson.isCompleted ? '#10b981' : '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                {lesson.isCompleted ? <Check size={20} /> : <BookOpen size={20} />}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600, color: '#1a1a1a' }}>{lesson.title}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#888' }}>{lesson.duration} minutes of learning</div>
                                            </div>
                                        </div>
                                        {lesson.isLocked ? (
                                            <div style={{ color: '#999' }}><Lock size={18} /></div>
                                        ) : (
                                            <div className="btn-resume" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                                                {lesson.isCompleted ? 'Review' : 'Start'}
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
