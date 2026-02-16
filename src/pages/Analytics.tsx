import { useData } from '../context/DataContext';
import { BookOpen, Calculator, Microscope, Flame, TrendingUp, CheckCircle2, Clock, Loader2 } from 'lucide-react';

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

export default function Analytics() {
    const { analytics, subjects, isLoading } = useData();

    if (isLoading || !analytics) {
        return (
            <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={48} color="#a78bfa" />
            </div>
        );
    }

    return (
        <div style={{ animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <header className="page-header">
                <h1 className="page-title">Progress & Analytics</h1>
                <p className="page-subtitle">Track your learning journey and celebrate your achievements</p>
            </header>

            {/* Key Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(167, 139, 250, 0.15)', color: '#a78bfa' }}>
                        <CheckCircle2 size={24} />
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{analytics.lessonsCompleted}</div>
                        <div className="stat-label">Lessons Completed</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(134, 239, 172, 0.15)', color: '#10b981' }}>
                        <TrendingUp size={24} />
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{analytics.averageAccuracy}%</div>
                        <div className="stat-label">Average Accuracy</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(147, 197, 253, 0.15)', color: '#3b82f6' }}>
                        <Clock size={24} />
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{analytics.timeSpentLearning}h</div>
                        <div className="stat-label">Time This Month</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(252, 211, 77, 0.15)', color: '#f59e0b' }}>
                        <Flame size={24} />
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{analytics.streakDays}</div>
                        <div className="stat-label">Day Streak</div>
                    </div>
                </div>
            </div>

            {/* Subject Breakdown Card */}
            <div className="card" style={{ marginBottom: '2rem' }}>
                <div className="card-header">
                    <h2 className="card-title">Subject Performance</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {analytics.subjectBreakdown.map((subj) => {
                        const subject = subjects.find(s => s.name === subj.subjectName);
                        const SubjectIcon = subject ? getIconComponent(subject.icon) : BookOpen;
                        return (
                            <div key={subj.subjectId} className="subject-item" style={{ cursor: 'default', transform: 'none' }}>
                                <div className="subject-icon" style={{ background: subject?.color + '15', color: subject?.color, padding: '10px', borderRadius: '12px' }}>
                                    <SubjectIcon size={24} />
                                </div>
                                <div className="subject-info" style={{ marginLeft: '1rem' }}>
                                    <div className="subject-name">{subj.subjectName}</div>
                                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.25rem' }}>
                                        <span style={{ fontSize: '0.8rem', color: '#666' }}>Accuracy: <b style={{ color: '#10b981' }}>{subj.accuracy}%</b></span>
                                        <span style={{ fontSize: '0.8rem', color: '#666' }}>Time: <b style={{ color: '#3b82f6' }}>{subj.timeSpent}h</b></span>
                                    </div>
                                </div>
                                <div className="subject-progress-container" style={{ minWidth: '150px' }}>
                                    <div className="subject-progress-text">{subj.progress}%</div>
                                    <div className="progress-bar-mini" style={{ width: '100%' }}>
                                        <div
                                            className="progress-fill-mini"
                                            style={{ width: `${subj.progress}%`, background: subject?.color }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Improvement Trend Bar Chart */}
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Improvement Trend</h2>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'flex-end',
                    height: '240px',
                    padding: '1rem 0'
                }}>
                    {analytics.improvementTrend.map((data, index) => (
                        <div key={index} style={{ textAlign: 'center', flex: 1, position: 'relative' }}>
                            <div style={{
                                width: '40px',
                                height: `${data.accuracy * 1.8}px`,
                                margin: '0 auto',
                                background: 'linear-gradient(180deg, var(--color-glass-purple) 0%, var(--color-primary) 100%)',
                                borderRadius: '8px 8px 0 0',
                                position: 'relative',
                                transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: '0 4px 12px rgba(107, 91, 149, 0.15)'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-25px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    color: 'var(--color-primary)'
                                }}>
                                    {data.accuracy}%
                                </div>
                            </div>
                            <div style={{
                                marginTop: '1rem',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: '#666',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                {data.month}
                            </div>
                        </div>
                    ))}
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
