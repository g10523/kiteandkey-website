import type { PageType } from '../types';
import { useData } from '../context/DataContext';
import { BookOpen, Calculator, Microscope, Flame, Zap, Loader2 } from 'lucide-react';
import './Subjects.css';

interface SubjectsProps {
    onNavigate: (page: PageType, subjectId?: string) => void;
}

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

export default function Subjects({ onNavigate }: SubjectsProps) {
    const { subjects, isLoading } = useData();

    if (isLoading) {
        return (
            <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={48} color="#a78bfa" />
            </div>
        );
    }

    return (
        <div style={{ animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <header className="page-header">
                <h1 className="page-title">My Courses</h1>
                <p className="page-subtitle">
                    Year 8 NSW Curriculum • Tracking your growth and mastering concepts.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                {subjects.map((subject) => {
                    const SubjectIcon = getIconComponent(subject.icon);
                    return (
                        <div
                            key={subject.id}
                            className="card"
                            onClick={() => onNavigate('subject-detail', subject.id)}
                            style={{ cursor: 'pointer', padding: '1.75rem', position: 'relative' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    background: subject.color + '15',
                                    color: subject.color,
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <SubjectIcon size={28} />
                                </div>
                                <div style={{
                                    padding: '0.25rem 0.6rem',
                                    borderRadius: '999px',
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    background: subject.confidenceLevel === 'high' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                                    color: subject.confidenceLevel === 'high' ? '#10b981' : '#3b82f6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem'
                                }}>
                                    {subject.confidenceLevel === 'high' ? <Flame size={12} /> : <Zap size={12} />}
                                    {subject.confidenceLevel === 'high' ? 'Strong' : 'Building'}
                                </div>
                            </div>

                            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>{subject.name}</h2>
                            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>{subject.description}</p>

                            <div style={{ background: 'rgba(0,0,0,0.02)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                                <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.4rem' }}>Current Focus</div>
                                <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '0.95rem' }}>{subject.currentUnit}</div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                    <span style={{ fontWeight: 600, color: '#666' }}>Learning Progress</span>
                                    <span style={{ fontWeight: 800, color: subject.color }}>{subject.progress}%</span>
                                </div>
                                <div className="progress-bar-mini" style={{ width: '100%', height: '8px' }}>
                                    <div
                                        className="progress-fill-mini"
                                        style={{
                                            width: `${subject.progress}%`,
                                            background: subject.color,
                                            height: '100%'
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.25rem' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: 800, color: '#1a1a1a' }}>{subject.completedUnits}/{subject.totalUnits}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase' }}>Units</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: 800, color: '#1a1a1a' }}>{Math.round(subject.progress / 10)}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase' }}>Lessons</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: 800, color: '#1a1a1a' }}>{subject.confidenceLevel === 'high' ? 'A' : 'B+'}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase' }}>Grade</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
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
