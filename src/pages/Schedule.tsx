import { useData } from '../context/DataContext';
import { BookOpen, Calculator, Microscope, Calendar, Clock, MapPin, Check, Plus, Loader2 } from 'lucide-react';

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

export default function Schedule() {
    const { sessions, subjects, isLoading } = useData();

    if (isLoading) {
        return (
            <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={48} color="#a78bfa" />
            </div>
        );
    }

    const upcomingSessions = sessions
        .filter(s => s.status === 'upcoming')
        .sort((a, b) => a.date.getTime() - b.date.getTime());

    const pastSessions = sessions
        .filter(s => s.status === 'completed')
        .sort((a, b) => b.date.getTime() - a.date.getTime());

    const formatDateTime = (date: Date) => {
        return new Intl.DateTimeFormat('en-AU', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <div style={{ animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 className="page-title">Tutoring Schedule</h1>
                    <p className="page-subtitle">Manage your upcoming sessions and view your learning history.</p>
                </div>
                <button className="btn-resume" style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}>
                    <Plus size={18} style={{ marginRight: '0.5rem' }} /> Book Session
                </button>
            </header>

            {/* Upcoming Sessions Section */}
            <div className="card" style={{ marginBottom: '2.5rem' }}>
                <div className="card-header">
                    <h2 className="card-title">Coming Up Next</h2>
                </div>
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                    {upcomingSessions.length > 0 ? (
                        upcomingSessions.map((session) => {
                            const subject = subjects.find(s => s.id === session.subjectId);
                            const SubjectIcon = subject ? getIconComponent(subject.icon) : BookOpen;

                            return (
                                <div key={session.id} className="subject-item" style={{ cursor: 'default', transform: 'none', padding: '1.5rem' }}>
                                    <div className="subject-icon" style={{
                                        width: '64px',
                                        height: '64px',
                                        background: subject?.color + '15',
                                        color: subject?.color,
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <SubjectIcon size={32} />
                                    </div>
                                    <div className="subject-info" style={{ marginLeft: '1.5rem' }}>
                                        <div className="subject-name" style={{ fontSize: '1.1rem' }}>{subject?.name}</div>
                                        <div style={{ color: '#666', marginBottom: '0.5rem' }}>Individual session with <b>{session.tutorName}</b></div>
                                        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: '#888' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <Calendar size={14} /> {formatDateTime(session.date)}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <Clock size={14} /> {session.duration} mins
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <MapPin size={14} /> {session.location}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: 'auto' }}>
                                        <button className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Reschedule</button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="empty-state-small">No upcoming sessions.</div>
                    )}
                </div>
            </div>

            {/* Past Sessions Grid */}
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Past Learning History</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.25rem' }}>
                    {pastSessions.map((session) => {
                        const subject = subjects.find(s => s.id === session.subjectId);

                        return (
                            <div key={session.id} style={{
                                background: 'rgba(255, 255, 255, 0.5)',
                                padding: '1.25rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(0,0,0,0.05)',
                                display: 'flex',
                                gap: '1rem',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: '#ecfdf5',
                                    color: '#059669',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Check size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, color: '#1a1a1a' }}>{subject?.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{session.tutorName} • {formatDateTime(session.date)}</div>
                                </div>
                                <button className="btn-text" style={{ fontSize: '0.8rem' }}>View Notes</button>
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
            `}</style>
        </div>
    );
}
