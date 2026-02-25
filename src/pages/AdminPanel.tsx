import { useState, useEffect } from 'react';
import { Users, BookOpen, Link2, Plus, Trash2, Save } from 'lucide-react';
import {
    getRegisteredUsers,
    getAllUserAccess,
    setUserCourseAccess,
    getPairings,
    createPairing,
    deletePairing,
    type RegisteredUserSummary,
    type UserCourseAccess,
    type TutorStudentPairing
} from '../services/courseStore';
import { useData } from '../context/DataContext';
import './AdminPanel.css';

export default function AdminPanel() {
    const { subjects } = useData();
    const [users, setUsers] = useState<RegisteredUserSummary[]>([]);
    const [userAccess, setUserAccessState] = useState<UserCourseAccess[]>([]);
    const [pairings, setPairings] = useState<TutorStudentPairing[]>([]);
    const [activeTab, setActiveTab] = useState<'courses' | 'pairings'>('courses');

    // Course assignment state
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

    // Pairing state
    const [selectedTutor, setSelectedTutor] = useState<string>('');
    const [selectedStudent, setSelectedStudent] = useState<string>('');
    const [pairingCourses, setPairingCourses] = useState<string[]>([]);

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = () => {
        setUsers(getRegisteredUsers());
        setUserAccessState(getAllUserAccess());
        setPairings(getPairings());
    };

    const handleAssignCourses = () => {
        if (!selectedUser) {
            alert('Please select a user');
            return;
        }
        const user = users.find(u => u.id === selectedUser);
        if (!user) return;

        setUserCourseAccess(
            user.id,
            `${user.firstName} ${user.lastName}`,
            user.role as 'student' | 'tutor',
            selectedCourses
        );

        alert(`Courses assigned to ${user.firstName} ${user.lastName}`);
        setSelectedUser('');
        setSelectedCourses([]);
        refreshData();
    };

    const handleCreatePairing = () => {
        if (!selectedTutor || !selectedStudent) {
            alert('Please select both a tutor and a student');
            return;
        }

        const tutor = users.find(u => u.id === selectedTutor);
        const student = users.find(u => u.id === selectedStudent);
        if (!tutor || !student) return;

        createPairing({
            tutorId: tutor.id,
            tutorName: `${tutor.firstName} ${tutor.lastName}`,
            studentId: student.id,
            studentName: `${student.firstName} ${student.lastName}`,
            assignedCourseIds: pairingCourses
        });

        alert(`Paired ${tutor.firstName} with ${student.firstName}`);
        setSelectedTutor('');
        setSelectedStudent('');
        setPairingCourses([]);
        refreshData();
    };

    const handleDeletePairing = (pairingId: string) => {
        if (confirm('Delete this pairing?')) {
            deletePairing(pairingId);
            refreshData();
        }
    };

    const students = users.filter(u => u.role === 'student');
    const tutors = users.filter(u => u.role === 'tutor');

    return (
        <div className="admin-panel">
            <header className="page-header">
                <h1 className="page-title">Admin Panel</h1>
                <p className="page-subtitle">
                    Manage course access and tutor-student pairings
                </p>
            </header>

            {/* Tabs */}
            <div className="admin-tabs">
                <button
                    className={`admin-tab ${activeTab === 'courses' ? 'active' : ''}`}
                    onClick={() => setActiveTab('courses')}
                >
                    <BookOpen size={18} />
                    Course Access
                </button>
                <button
                    className={`admin-tab ${activeTab === 'pairings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pairings')}
                >
                    <Link2 size={18} />
                    Tutor-Student Pairings
                </button>
            </div>

            {/* Course Access Tab */}
            {activeTab === 'courses' && (
                <div className="admin-content">
                    <div className="admin-grid">
                        {/* Assign Courses Card */}
                        <div className="card admin-card">
                            <h2 className="admin-card-title">
                                <BookOpen size={20} />
                                Assign Courses
                            </h2>

                            <div className="form-group">
                                <label>Select User</label>
                                <select
                                    value={selectedUser}
                                    onChange={(e) => {
                                        setSelectedUser(e.target.value);
                                        const existing = userAccess.find(ua => ua.userId === e.target.value);
                                        setSelectedCourses(existing?.courseIds || []);
                                    }}
                                    className="admin-select"
                                >
                                    <option value="">-- Choose a user --</option>
                                    {users.filter(u => u.role !== 'admin').map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.firstName} {user.lastName} ({user.role})
                                            {user.yearLevel ? ` - Year ${user.yearLevel}` : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Select Courses</label>
                                <div className="course-checkboxes">
                                    {subjects.map(subject => (
                                        <label key={subject.id} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={selectedCourses.includes(subject.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedCourses([...selectedCourses, subject.id]);
                                                    } else {
                                                        setSelectedCourses(selectedCourses.filter(id => id !== subject.id));
                                                    }
                                                }}
                                            />
                                            <span>{subject.name} (Year {subject.yearLevel})</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="btn-primary"
                                onClick={handleAssignCourses}
                                disabled={!selectedUser || selectedCourses.length === 0}
                            >
                                <Save size={18} />
                                Assign Courses
                            </button>
                        </div>

                        {/* Current Access Card */}
                        <div className="card admin-card">
                            <h2 className="admin-card-title">
                                <Users size={20} />
                                Current Course Access
                            </h2>

                            <div className="access-list">
                                {userAccess.length === 0 && (
                                    <p className="empty-state">No course assignments yet</p>
                                )}
                                {userAccess.map(ua => (
                                    <div key={ua.userId} className="access-item">
                                        <div className="access-user">
                                            <div className="user-avatar-small">
                                                {ua.userName.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="access-user-name">{ua.userName}</div>
                                                <div className="access-user-role">{ua.userRole}</div>
                                            </div>
                                        </div>
                                        <div className="access-courses">
                                            {ua.courseIds.map(cid => {
                                                const course = subjects.find(s => s.id === cid);
                                                return course ? (
                                                    <span key={cid} className="course-badge">
                                                        {course.name}
                                                    </span>
                                                ) : null;
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Pairings Tab */}
            {activeTab === 'pairings' && (
                <div className="admin-content">
                    <div className="admin-grid">
                        {/* Create Pairing Card */}
                        <div className="card admin-card">
                            <h2 className="admin-card-title">
                                <Plus size={20} />
                                Create Pairing
                            </h2>

                            <div className="form-group">
                                <label>Select Tutor</label>
                                <select
                                    value={selectedTutor}
                                    onChange={(e) => setSelectedTutor(e.target.value)}
                                    className="admin-select"
                                >
                                    <option value="">-- Choose a tutor --</option>
                                    {tutors.map(tutor => (
                                        <option key={tutor.id} value={tutor.id}>
                                            {tutor.firstName} {tutor.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Select Student</label>
                                <select
                                    value={selectedStudent}
                                    onChange={(e) => setSelectedStudent(e.target.value)}
                                    className="admin-select"
                                >
                                    <option value="">-- Choose a student --</option>
                                    {students.map(student => (
                                        <option key={student.id} value={student.id}>
                                            {student.firstName} {student.lastName}
                                            {student.yearLevel ? ` (Year ${student.yearLevel})` : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Courses for This Pairing</label>
                                <div className="course-checkboxes">
                                    {subjects.map(subject => (
                                        <label key={subject.id} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={pairingCourses.includes(subject.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setPairingCourses([...pairingCourses, subject.id]);
                                                    } else {
                                                        setPairingCourses(pairingCourses.filter(id => id !== subject.id));
                                                    }
                                                }}
                                            />
                                            <span>{subject.name} (Year {subject.yearLevel})</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="btn-primary"
                                onClick={handleCreatePairing}
                                disabled={!selectedTutor || !selectedStudent}
                            >
                                <Link2 size={18} />
                                Create Pairing
                            </button>
                        </div>

                        {/* Current Pairings Card */}
                        <div className="card admin-card">
                            <h2 className="admin-card-title">
                                <Link2 size={20} />
                                Active Pairings
                            </h2>

                            <div className="pairings-list">
                                {pairings.length === 0 && (
                                    <p className="empty-state">No pairings yet</p>
                                )}
                                {pairings.map(pairing => (
                                    <div key={pairing.id} className="pairing-item">
                                        <div className="pairing-header">
                                            <div className="pairing-users">
                                                <span className="pairing-tutor">{pairing.tutorName}</span>
                                                <span className="pairing-arrow">→</span>
                                                <span className="pairing-student">{pairing.studentName}</span>
                                            </div>
                                            <button
                                                className="btn-icon-danger"
                                                onClick={() => handleDeletePairing(pairing.id)}
                                                title="Delete pairing"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="pairing-courses">
                                            {pairing.assignedCourseIds.length === 0 ? (
                                                <span className="no-courses">No courses assigned</span>
                                            ) : (
                                                pairing.assignedCourseIds.map(cid => {
                                                    const course = subjects.find(s => s.id === cid);
                                                    return course ? (
                                                        <span key={cid} className="course-badge">
                                                            {course.name}
                                                        </span>
                                                    ) : null;
                                                })
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
