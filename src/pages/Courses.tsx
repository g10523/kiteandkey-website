import { useState, useEffect } from 'react';
import type { PageType } from '../types';
import { useAuth } from '../context/AuthContext';
import apiClient from '../services/apiClient';
import {
    BookOpen, Calculator, FlaskConical, Flame, Zap,
    GraduationCap, Loader2
} from 'lucide-react';
import './Courses.css';

interface CoursesProps {
    onNavigate: (page: PageType, subjectId?: string) => void;
}

interface CourseFromAPI {
    id: string;
    name: string;
    description: string;
    subject_type: string;
    year_level: number;
    icon: string;
    color: string;
    is_active: boolean;
}

const ICON_MAP: Record<string, typeof BookOpen> = {
    BookOpen,
    Calculator,
    FlaskConical,
};

const SUBJECT_STYLE: Record<string, {
    bgGradient: string;
    accentLight: string;
}> = {
    english: {
        bgGradient: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%)',
        accentLight: 'rgba(124, 58, 237, 0.12)',
    },
    mathematics: {
        bgGradient: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(59, 130, 246, 0.04) 100%)',
        accentLight: 'rgba(37, 99, 235, 0.12)',
    },
    science: {
        bgGradient: 'linear-gradient(135deg, rgba(5, 150, 105, 0.08) 0%, rgba(16, 185, 129, 0.04) 100%)',
        accentLight: 'rgba(5, 150, 105, 0.12)',
    },
};

export default function Courses({ onNavigate }: CoursesProps) {
    const { user } = useAuth();
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [courses, setCourses] = useState<CourseFromAPI[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const res = await apiClient.get('/courses');
                setCourses(res.data);
            } catch (err) {
                console.error('Failed to fetch courses:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchCourses();
    }, []);

    if (!user || loading) {
        return (
            <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={48} color="#a78bfa" />
            </div>
        );
    }

    const yearLevel = user.role === 'student' ? ((user as any).yearLevel || 10) : 10;

    const getStatusBadge = (status: 'strong' | 'building' | 'new') => {
        switch (status) {
            case 'strong':
                return {
                    label: 'STRONG',
                    bg: 'rgba(16, 185, 129, 0.1)',
                    color: '#059669',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    Icon: Flame,
                };
            case 'building':
                return {
                    label: 'BUILDING',
                    bg: 'rgba(59, 130, 246, 0.1)',
                    color: '#2563eb',
                    border: '1px solid rgba(59, 130, 246, 0.25)',
                    Icon: Zap,
                };
            case 'new':
                return {
                    label: 'NEW',
                    bg: 'rgba(124, 58, 237, 0.1)',
                    color: '#7c3aed',
                    border: '1px solid rgba(124, 58, 237, 0.25)',
                    Icon: GraduationCap,
                };
        }
    };

    return (
        <div className="courses-page">
            {/* Header */}
            <header className="courses-header">
                <div>
                    <h1 className="courses-title">My Courses</h1>
                    <p className="courses-subtitle">
                        Year {yearLevel} NSW Curriculum • Tracking your growth and mastering concepts.
                    </p>
                </div>
                {user.role === 'student' && user.mindPrintProfile && (
                    <div className="courses-badge">
                        <GraduationCap size={14} />
                        {user.mindPrintProfile.type}
                    </div>
                )}
            </header>

            {/* Course Grid */}
            <div className="courses-grid">
                {courses.map((course) => {
                    const style = SUBJECT_STYLE[course.subject_type] || SUBJECT_STYLE.english;
                    const badge = getStatusBadge('building');
                    const CourseIcon = ICON_MAP[course.icon] || BookOpen;
                    const isHovered = hoveredId === course.id;
                    const courseColor = course.color || '#7c3aed';
                    // Derive focus from description
                    const focusText = course.description?.split('.').slice(1).join('.').trim() || course.description || '';

                    return (
                        <div
                            key={course.id}
                            className={`course-card ${isHovered ? 'hovered' : ''}`}
                            onClick={() => onNavigate('course-detail' as PageType, course.id)}
                            onMouseEnter={() => setHoveredId(course.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Accent top bar */}
                            <div
                                className="course-card-accent"
                                style={{ background: courseColor }}
                            />

                            {/* Header: Icon + Badge */}
                            <div className="course-card-header">
                                <div
                                    className="course-card-icon-wrap"
                                    style={{ background: style.accentLight }}
                                >
                                    <CourseIcon size={26} color={courseColor} strokeWidth={2} />
                                </div>
                                <div
                                    className="course-card-status-badge"
                                    style={{
                                        background: badge.bg,
                                        color: badge.color,
                                        border: badge.border,
                                    }}
                                >
                                    <badge.Icon size={12} />
                                    {badge.label}
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="course-card-title">{course.name}</h2>
                            <p className="course-card-subtitle">
                                NSW Curriculum – Year {course.year_level} {course.name}
                            </p>

                            {/* Current Focus */}
                            <div className="course-card-focus">
                                <span className="course-card-focus-label">CURRENT FOCUS</span>
                                <span className="course-card-focus-value">{focusText}</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="course-card-progress">
                                <div className="course-card-progress-header">
                                    <span className="course-card-progress-label">Learning Progress</span>
                                    <span
                                        className="course-card-progress-value"
                                        style={{ color: courseColor }}
                                    >
                                        —
                                    </span>
                                </div>
                                <div className="course-card-bar-track">
                                    <div
                                        className="course-card-bar-fill"
                                        style={{
                                            width: '0%',
                                            background: `linear-gradient(90deg, ${courseColor}, ${courseColor}cc)`,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="course-card-stats">
                                <div className="course-card-stat">
                                    <span className="course-card-stat-value">4</span>
                                    <span className="course-card-stat-label">Terms</span>
                                </div>
                                <div className="course-card-stat">
                                    <span className="course-card-stat-value">40</span>
                                    <span className="course-card-stat-label">Lessons</span>
                                </div>
                                <div className="course-card-stat">
                                    <span className="course-card-stat-value" style={{ color: courseColor }}>
                                        Y{course.year_level}
                                    </span>
                                    <span className="course-card-stat-label">Year</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
