import type { PageType } from '../types';
import { useData } from '../context/DataContext';
import { BookOpen, Calculator, Microscope, RotateCw, ClipboardList, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface AssignmentsProps {
    onNavigate: (page: PageType) => void;
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

export default function Assignments({ onNavigate: _onNavigate }: AssignmentsProps) {
    const { assignments, subjects, isLoading } = useData();

    if (isLoading) {
        return (
            <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={48} color="#a78bfa" />
            </div>
        );
    }

    const activeAssignments = assignments.filter(a => a.status !== 'graded');
    const completedAssignments = assignments.filter(a => a.status === 'graded');

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-AU', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        }).format(date);
    };

    const getDaysUntil = (date: Date) => {
        const days = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        if (days === 0) return 'Today';
        if (days === 1) return 'Tomorrow';
        if (days < 0) return 'Overdue';
        return `${days} days`;
    };

    return (
        <div style={{ animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <header className="page-header">
                <h1 className="page-title">Assignments</h1>
                <p className="page-subtitle">Manage your coursework and tracking your learning progress.</p>
            </header>

            {/* Active Assignments Section */}
            <div className="card" style={{ marginBottom: '2.5rem' }}>
                <div className="card-header">
                    <h2 className="card-title">Active Tasks ({activeAssignments.length})</h2>
                </div>
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                    {activeAssignments.map((assignment) => {
                        const subject = subjects.find(s => s.id === assignment.subjectId);
                        const SubjectIcon = subject ? getIconComponent(subject.icon) : BookOpen;
                        const daysUntil = getDaysUntil(assignment.dueDate);
                        const isUrgent = assignment.dueDate.getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000;

                        return (
                            <div key={assignment.id} className="assignment-item" style={{
                                background: 'white',
                                padding: '1.5rem',
                                borderLeft: `4px solid ${subject?.color || 'var(--color-primary)'}`,
                                borderRadius: '16px'
                            }}>
                                <div className="assignment-header-row">
                                    <div className="assignment-subject-badge" style={{ background: subject?.color + '15', color: subject?.color }}>
                                        <SubjectIcon size={14} style={{ marginRight: '0.4rem' }} />
                                        {subject?.name}
                                    </div>
                                    <div className={`assignment-due ${isUrgent ? 'urgent' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        {isUrgent && <AlertCircle size={14} />}
                                        Due {daysUntil}
                                    </div>
                                </div>
                                <h3 className="assignment-title" style={{ fontSize: '1.2rem', margin: '0.75rem 0' }}>{assignment.title}</h3>
                                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>{assignment.description}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#888' }}>Deadline: {formatDate(assignment.dueDate)}</div>
                                    <div className="assignment-status-badge" style={{
                                        background: assignment.status === 'in-progress' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(107, 91, 149, 0.1)',
                                        color: assignment.status === 'in-progress' ? '#3b82f6' : '#6b5b95'
                                    }}>
                                        {assignment.status === 'in-progress' ? <RotateCw size={14} style={{ marginRight: '0.4rem' }} /> : <ClipboardList size={14} style={{ marginRight: '0.4rem' }} />}
                                        {assignment.status === 'in-progress' ? 'In Progress' : 'To Do'}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Completed Section using regular grid for mini cards */}
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Completed & Graded</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                    {completedAssignments.map((assignment) => {
                        const subject = subjects.find(s => s.id === assignment.subjectId);
                        return (
                            <div key={assignment.id} style={{
                                background: 'rgba(255, 255, 255, 0.5)',
                                padding: '1.25rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(0,0,0,0.05)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: subject?.color, textTransform: 'uppercase', marginBottom: '0.25rem' }}>{subject?.name}</div>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1a1a1a' }}>{assignment.title}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>{assignment.grade}%</div>
                                    <div style={{ fontSize: '0.7rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                        <CheckCircle2 size={12} /> Graded
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .assignment-due.urgent { color: #ef4444; font-weight: 700; }
            `}</style>
        </div>
    );
}
