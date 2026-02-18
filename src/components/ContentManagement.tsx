import { useState } from 'react';
import { Eye, EyeOff, Calendar, Lock, Unlock, Save, Search, Filter } from 'lucide-react';
import type { Lesson, Quiz, ContentVisibility } from '../types';

interface ContentManagementProps {
    subjects: any[];
    currentUser: {
        id: string;
        role: 'tutor' | 'admin';
        name: string;
    };
}

export default function ContentManagement({ subjects, currentUser }: ContentManagementProps) {
    const [selectedSubject, setSelectedSubject] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'visible' | 'hidden'>('all');
    const [contentVisibility, setContentVisibility] = useState<Map<string, boolean>>(new Map());
    const [releaseDates, setReleaseDates] = useState<Map<string, string>>(new Map());

    // Get all lessons from selected subject
    const getLessons = () => {
        if (!selectedSubject) return [];
        const subject = subjects.find(s => s.id === selectedSubject);
        if (!subject) return [];

        const lessons: any[] = [];
        subject.units?.forEach((unit: any) => {
            unit.lessons?.forEach((lesson: any) => {
                lessons.push({
                    ...lesson,
                    unitTitle: unit.title,
                    subjectName: subject.name
                });
            });
        });
        return lessons;
    };

    const lessons = getLessons();

    // Filter lessons based on search and filter
    const filteredLessons = lessons.filter(lesson => {
        const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lesson.unitTitle.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (filterType === 'visible') return lesson.isVisibleToStudent !== false;
        if (filterType === 'hidden') return lesson.isVisibleToStudent === false;
        return true;
    });

    const toggleVisibility = (lessonId: string, currentVisibility: boolean) => {
        const newVisibility = new Map(contentVisibility);
        newVisibility.set(lessonId, !currentVisibility);
        setContentVisibility(newVisibility);
    };

    const toggleQuizVisibility = (quizId: string, currentVisibility: boolean) => {
        const newVisibility = new Map(contentVisibility);
        newVisibility.set(quizId, !currentVisibility);
        setContentVisibility(newVisibility);
    };

    const setReleaseDate = (contentId: string, date: string) => {
        const newDates = new Map(releaseDates);
        newDates.set(contentId, date);
        setReleaseDates(newDates);
    };

    const saveChanges = () => {
        // In a real app, this would send to backend
        console.log('Saving visibility changes:', {
            visibility: Object.fromEntries(contentVisibility),
            releaseDates: Object.fromEntries(releaseDates),
            setBy: currentUser.id,
            setAt: new Date()
        });
        alert('Content visibility settings saved successfully!');
    };

    return (
        <div className="content-management-page">
            <header className="page-header mb-8">
                <h1 className="page-title">Content Management</h1>
                <p className="page-subtitle">
                    Control what students see and when they can access lessons and quizzes
                </p>
            </header>

            {/* Controls Bar */}
            <div className="controls-bar" style={{
                background: 'var(--glass-bg-white)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-xl)',
                marginBottom: 'var(--spacing-2xl)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--spacing-lg)'
            }}>
                {/* Subject Selector */}
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Subject
                    </label>
                    <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                        <option value="">Select a subject...</option>
                        {subjects.map(subject => (
                            <option key={subject.id} value={subject.id}>
                                {subject.name} (Year {subject.yearLevel})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Search */}
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Search Lessons
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by lesson or unit..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Filter */}
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Filter by Status
                    </label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterType('all')}
                            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${filterType === 'all'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterType('visible')}
                            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${filterType === 'visible'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Visible
                        </button>
                        <button
                            onClick={() => setFilterType('hidden')}
                            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${filterType === 'hidden'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Hidden
                        </button>
                    </div>
                </div>
            </div>

            {/* Lessons List */}
            {!selectedSubject ? (
                <div className="text-center py-12 text-gray-500">
                    <Filter size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Select a subject to manage content visibility</p>
                </div>
            ) : filteredLessons.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <Search size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No lessons found matching your criteria</p>
                </div>
            ) : (
                <div className="lessons-grid" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                    {filteredLessons.map((lesson) => {
                        const isVisible = contentVisibility.get(lesson.id) ?? lesson.isVisibleToStudent ?? true;
                        const quizVisible = lesson.quiz
                            ? (contentVisibility.get(lesson.quiz.id) ?? lesson.quiz.isVisibleToStudent ?? true)
                            : false;
                        const releaseDate = releaseDates.get(lesson.id) || '';

                        return (
                            <div
                                key={lesson.id}
                                className="lesson-card"
                                style={{
                                    background: 'var(--color-bg-card)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: 'var(--radius-xl)',
                                    padding: 'var(--spacing-xl)',
                                    transition: 'all var(--transition-base)'
                                }}
                            >
                                {/* Lesson Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                                                {lesson.unitTitle}
                                            </span>
                                            {isVisible ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                    <Eye size={12} /> Visible
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                                                    <EyeOff size={12} /> Hidden
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                                    {/* Lesson Visibility */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-2">
                                            Lesson Visibility
                                        </label>
                                        <button
                                            onClick={() => toggleVisibility(lesson.id, isVisible)}
                                            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isVisible
                                                    ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                                                    : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                                                }`}
                                        >
                                            {isVisible ? (
                                                <>
                                                    <Unlock size={16} />
                                                    <span>Visible to Students</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Lock size={16} />
                                                    <span>Hidden from Students</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Release Date */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-2">
                                            Release Date (Optional)
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                            <input
                                                type="date"
                                                value={releaseDate}
                                                onChange={(e) => setReleaseDate(lesson.id, e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Quiz Controls */}
                                {lesson.quiz && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-900">
                                                    📝 {lesson.quiz.title}
                                                </h4>
                                                <p className="text-xs text-gray-600 mt-1">
                                                    {lesson.quiz.questions.length} questions • {lesson.quiz.timeLimit} min • {lesson.quiz.passingScore}% to pass
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => toggleQuizVisibility(lesson.quiz.id, quizVisible)}
                                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${quizVisible
                                                        ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                                                        : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                                                    }`}
                                            >
                                                {quizVisible ? (
                                                    <>
                                                        <Eye size={14} />
                                                        <span>Quiz Visible</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <EyeOff size={14} />
                                                        <span>Quiz Hidden</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Save Button */}
            {selectedSubject && filteredLessons.length > 0 && (
                <div className="fixed bottom-8 right-8">
                    <button
                        onClick={saveChanges}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-semibold shadow-lg hover:bg-purple-700 transition transform hover:scale-105"
                    >
                        <Save size={20} />
                        <span>Save Changes</span>
                    </button>
                </div>
            )}
        </div>
    );
}
