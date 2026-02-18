import type { PageType, User } from '../types';
import { FEATURE_FLAGS } from '../config/featureFlags';
import { Home, BookOpen, FileText, Calendar, Brain, BarChart3, MessageSquare, Library, ChevronLeft, ChevronRight, Beaker, LogOut, Ticket, Settings, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

interface SidebarProps {
    currentPage: PageType;
    onNavigate: (page: PageType) => void;
    user: User;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
}

export default function Sidebar({ currentPage, onNavigate, user, isCollapsed, onToggleCollapse }: SidebarProps) {
    const { logout } = useAuth();

    const getNavSections = () => {
        const sections = [
            {
                title: 'LEARNING',
                items: [
                    { id: 'dashboard' as PageType, label: 'Dashboard', Icon: Home, roles: ['student', 'parent', 'tutor', 'admin'] },
                    { id: 'subjects' as PageType, label: 'Courses', Icon: BookOpen, roles: ['student', 'tutor'] },
                    { id: 'assignments' as PageType, label: 'Assignments', Icon: FileText, roles: ['student'] },
                    { id: 'schedule' as PageType, label: 'Schedule', Icon: Calendar, roles: ['student', 'tutor'] },
                    { id: 'assessments' as PageType, label: 'Assessments', Icon: Brain, roles: ['tutor', 'admin'] },
                ].filter(item => item.roles.includes(user.role))
            },
            {
                title: 'PERSONAL',
                items: [
                    { id: 'mindprint' as PageType, label: 'MindPrint', Icon: Brain, roles: ['student', 'parent'] },
                    { id: 'study-lab' as PageType, label: 'Study Lab', Icon: Beaker, roles: ['student'] },
                    { id: 'analytics' as PageType, label: 'Progress', Icon: BarChart3, roles: ['student', 'parent', 'admin'] },
                    { id: 'messages' as PageType, label: 'Messages', Icon: MessageSquare, roles: ['student', 'parent', 'tutor', 'admin'] },
                    { id: 'resources' as PageType, label: 'Resources', Icon: Library, roles: ['student', 'tutor'] },
                ].filter(item => item.roles.includes(user.role))
            },
            {
                title: 'ACCOUNT',
                items: [
                    { id: 'admin-panel' as PageType, label: 'Admin Panel', Icon: Settings, roles: ['admin'] },
                    { id: 'tokens' as PageType, label: 'Registration Tokens', Icon: Ticket, roles: ['admin'] },
                    { id: 'settings' as PageType, label: 'Settings', Icon: Settings, roles: ['student', 'parent', 'tutor', 'admin'] },
                ].filter(item => item.roles.includes(user.role))
            }
        ];

        return sections.filter(section => section.items.length > 0);
    };

    const navSections = getNavSections();

    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-top">
                    <a href="#" className="logo" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}>
                        <img
                            src="/logo.jpg"
                            alt="Kite & Key Logo"
                            className="logo-icon"
                        />
                        {!isCollapsed && (
                            <div className="logo-text-wrapper">
                                <span className="logo-text">KITE & KEY</span>
                                <span className="logo-subtext">ACADEMY</span>
                            </div>
                        )}
                    </a>
                    <button
                        className="collapse-toggle"
                        onClick={onToggleCollapse}
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>
                </div>
            </div>

            <nav className="nav-menu">
                {navSections.map((section) => (
                    <div key={section.title} className="nav-section">
                        {!isCollapsed && <div className="nav-section-title">{section.title}</div>}
                        {section.items.map((item) => {
                            const Icon = item.Icon;
                            const config = FEATURE_FLAGS[item.id];
                            const isLocked = config?.status === 'locked' || config?.status === 'coming-soon';

                            return (
                                <button
                                    key={item.id}
                                    className={`nav-item ${currentPage === item.id ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
                                    onClick={() => !isLocked && onNavigate(item.id)}
                                    title={isCollapsed ? (isLocked ? `${item.label} (Coming Soon)` : item.label) : undefined}
                                    disabled={isLocked}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                                        <Icon className="nav-icon" size={20} />
                                        {!isCollapsed && <span>{item.label}</span>}
                                    </div>
                                    {isLocked && !isCollapsed && <Lock size={14} className="lock-icon" />}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="user-profile">
                    <div className="user-avatar" style={{ background: user.role === 'admin' ? '#ef4444' : user.role === 'tutor' ? '#60a5fa' : user.role === 'parent' ? '#f472b6' : '#a78bfa' }}>
                        {user.firstName[0]}{user.lastName ? user.lastName[0] : ''}
                    </div>
                    {!isCollapsed && (
                        <div className="user-info">
                            <div className="user-name">{user.firstName} {user.lastName}</div>
                            <div className="user-role" style={{ textTransform: 'capitalize' }}>
                                {user.role} {user.role === 'student' && (user as any).yearLevel ? `(Year ${(user as any).yearLevel})` : ''}
                            </div>
                        </div>
                    )}
                </div>
                <button
                    className="logout-button"
                    onClick={logout}
                    title={isCollapsed ? "Logout" : undefined}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        marginTop: '0.5rem',
                        transition: 'color 0.2s'
                    }}
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
}
