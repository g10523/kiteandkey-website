import type { PageType } from '../types';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Flame, BookOpen, CheckCircle2, TrendingUp, Clock, Target, ArrowRight, Brain, BarChart3, Library, MessageSquare, RotateCw, ClipboardList, PartyPopper, Calculator, Microscope, Loader2 } from 'lucide-react';
import './Dashboard.css';

interface DashboardProps {
    onNavigate: (page: PageType, subjectId?: string, lessonId?: string) => void;
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

export default function Dashboard({ onNavigate }: DashboardProps) {
    const { user } = useAuth();
    const { subjects, assignments, sessions, analytics, isLoading } = useData();

    if (isLoading || !analytics || !user) {
        return (
            <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={48} color="#a78bfa" />
            </div>
        );
    }

    const upcomingSessions = sessions
        .filter(s => s.status === 'upcoming')
        .sort((a, b) => a.date.getTime() - b.date.getTime());

    const activeAssignments = assignments
        .filter(a => a.status !== 'graded')
        .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

    // Fallback if no subjects or lessons
    const currentLesson = subjects.length > 0 && subjects[0].units.length > 2 && subjects[0].units[2].lessons.length > 1
        ? subjects[0].units[2].lessons[1]
        : { title: 'No active lesson', description: 'Start a new unit to continue learning.', duration: 0, id: '' };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-AU', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
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
        <div className="dashboard">
            {/* Welcome Header */}
            <header className="page-header">
                <h1 className="page-title">Welcome back, {user.firstName}</h1>
                <p className="page-subtitle">
                    You're making great progress. Keep up the momentum!
                </p>
            </header>

            {/* Today's Focus Card */}
            <div className="focus-card">
                <div className="focus-header">
                    <div>
                        <h2 className="focus-title">Today's Focus</h2>
                        <p className="focus-subtitle">Continue where you left off</p>
                    </div>
                    <div className="focus-badge">
                        <Flame className="streak-icon" size={20} />
                        <span className="streak-text">{analytics.streakDays} day streak</span>
                    </div>
                </div>

                <div className="current-lesson-card">
                    <div className="lesson-subject-badge" style={{ background: 'rgba(167, 139, 250, 0.15)', color: '#c4b5fd' }}>
                        <BookOpen size={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} />
                        English
                    </div>
                    <h3 className="lesson-title">{currentLesson.title}</h3>
                    <p className="lesson-description">{currentLesson.description}</p>
                    <div className="lesson-meta">
                        <span className="lesson-duration">
                            <Clock size={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25rem' }} />
                            {currentLesson.duration} min
                        </span>
                        <span className="lesson-unit">Unit 3: Persuasive Writing & Rhetoric</span>
                    </div>
                    <button
                        className="btn-resume"
                        onClick={() => onNavigate('lesson', 'english-8', currentLesson.id)}
                    >
                        <span>Resume Lesson</span>
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            {/* MindPrint Assessment CTA */}
            <div className="glassmorphism" style={{
                borderRadius: '1.5rem',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(94, 85, 116, 0.1) 0%, rgba(217, 207, 242, 0.2) 100%)',
                marginBottom: '2rem',
                border: '1px solid rgba(217, 207, 242, 0.3)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h3 style={{
                            fontSize: '1.125rem',
                            fontWeight: 500,
                            color: '#5E5574',
                            marginBottom: '0.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <Brain size={24} color="#5E5574" />
                            Complete Your Cognitive Profile
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: 'rgba(94, 85, 116, 0.7)' }}>
                            8-minute assessment to personalize your learning path
                        </p>
                    </div>
                    <button
                        onClick={() => onNavigate('assessment-center')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: '#5E5574',
                            color: 'white',
                            borderRadius: '9999px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = '#4A445C';
                            e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = '#5E5574';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        <Brain size={20} />
                        Start Assessment
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
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
                    <div className="stat-icon" style={{ background: 'rgba(134, 239, 172, 0.15)', color: '#86efac' }}>
                        <TrendingUp size={24} />
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{analytics.averageAccuracy}%</div>
                        <div className="stat-label">Average Accuracy</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(147, 197, 253, 0.15)', color: '#93c5fd' }}>
                        <Clock size={24} />
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{analytics.timeSpentLearning}h</div>
                        <div className="stat-label">This Month</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(252, 211, 77, 0.15)', color: '#fcd34d' }}>
                        <Target size={24} />
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{Math.round((analytics.lessonsCompleted / analytics.totalLessons) * 100)}%</div>
                        <div className="stat-label">Overall Progress</div>
                    </div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="dashboard-grid">
                {/* Left Column */}
                <div className="dashboard-column">
                    {/* Subject Progress */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">Subject Progress</h2>
                            <button
                                className="btn-text"
                                onClick={() => onNavigate('subjects')}
                            >
                                View All →
                            </button>
                        </div>
                        <div className="subjects-list">
                            {subjects.map((subject) => {
                                const SubjectIcon = getIconComponent(subject.icon);
                                return (
                                    <div
                                        key={subject.id}
                                        className="subject-item"
                                        onClick={() => onNavigate('subject-detail', subject.id)}
                                        style={{ borderLeftColor: subject.color }}
                                    >
                                        <div className="subject-icon">
                                            <SubjectIcon size={20} />
                                        </div>
                                        <div className="subject-info">
                                            <div className="subject-name">{subject.name}</div>
                                            <div className="subject-current">{subject.currentUnit}</div>
                                        </div>
                                        <div className="subject-progress-container">
                                            <div className="subject-progress-text">{subject.progress}%</div>
                                            <div className="progress-bar-mini">
                                                <div
                                                    className="progress-fill-mini"
                                                    style={{ width: `${subject.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Upcoming Sessions */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">Upcoming Tutoring</h2>
                            <button
                                className="btn-text"
                                onClick={() => onNavigate('schedule')}
                            >
                                View Schedule →
                            </button>
                        </div>
                        <div className="sessions-list">
                            {upcomingSessions.length > 0 ? (
                                upcomingSessions.map((session) => {
                                    const subject = subjects.find(s => s.id === session.subjectId);
                                    const SessionIcon = subject ? getIconComponent(subject.icon) : BookOpen;
                                    return (
                                        <div key={session.id} className="session-item">
                                            <div className="session-icon" style={{ background: subject?.color + '20' }}>
                                                <SessionIcon size={20} />
                                            </div>
                                            <div className="session-info">
                                                <div className="session-subject">{subject?.name}</div>
                                                <div className="session-tutor">with {session.tutorName}</div>
                                                <div className="session-time">{formatDate(session.date)}</div>
                                            </div>
                                            <div className="session-type-badge">
                                                {session.type === 'individual' ? '1:1' : 'Group'}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="empty-state-small">
                                    <p>No upcoming sessions</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="dashboard-column">
                    {/* Assignments */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">Active Assignments</h2>
                            <button
                                className="btn-text"
                                onClick={() => onNavigate('assignments')}
                            >
                                View All →
                            </button>
                        </div>
                        <div className="assignments-list">
                            {activeAssignments.length > 0 ? (
                                activeAssignments.map((assignment) => {
                                    const subject = subjects.find(s => s.id === assignment.subjectId);
                                    const AssignmentIcon = subject ? getIconComponent(subject.icon) : BookOpen;
                                    const daysUntil = getDaysUntil(assignment.dueDate);
                                    const isUrgent = assignment.dueDate.getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000;

                                    return (
                                        <div key={assignment.id} className="assignment-item">
                                            <div className="assignment-header-row">
                                                <div className="assignment-subject-badge" style={{ background: subject?.color + '20', color: subject?.color }}>
                                                    <AssignmentIcon size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.375rem' }} />
                                                    {subject?.name}
                                                </div>
                                                <div className={`assignment-due ${isUrgent ? 'urgent' : ''}`}>
                                                    {daysUntil}
                                                </div>
                                            </div>
                                            <div className="assignment-title">{assignment.title}</div>
                                            <div className="assignment-status-badge status-${assignment.status}">
                                                {assignment.status === 'in-progress' ? (
                                                    <><RotateCw size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.375rem' }} /> In Progress</>
                                                ) : (
                                                    <><ClipboardList size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.375rem' }} /> Not Started</>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="empty-state-small">
                                    <p><PartyPopper size={20} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} />All caught up!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">Quick Actions</h2>
                        </div>
                        <div className="quick-actions-grid">
                            <button
                                className="quick-action-btn"
                                onClick={() => onNavigate('mindprint')}
                            >
                                <Brain className="quick-action-icon" size={32} />
                                <span className="quick-action-label">View MindPrint</span>
                            </button>
                            <button
                                className="quick-action-btn"
                                onClick={() => onNavigate('analytics')}
                            >
                                <BarChart3 className="quick-action-icon" size={32} />
                                <span className="quick-action-label">Progress Report</span>
                            </button>
                            <button
                                className="quick-action-btn"
                                onClick={() => onNavigate('resources')}
                            >
                                <Library className="quick-action-icon" size={32} />
                                <span className="quick-action-label">Study Resources</span>
                            </button>
                            <button
                                className="quick-action-btn"
                                onClick={() => onNavigate('messages')}
                            >
                                <MessageSquare className="quick-action-icon" size={32} />
                                <span className="quick-action-label">Messages</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
