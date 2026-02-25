import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    Calendar, ChevronLeft, ChevronRight, Loader2, Send,
    Check, X, AlertCircle, MapPin, User, Bell
} from 'lucide-react';
import apiClient from '../services/apiClient';

/* ─── Types ────────────────────────────────────────────── */
interface ScheduledClass {
    id: string;
    student_id: string;
    tutor_id: string;
    subject: string;
    day_of_week: number;
    start_time: string;
    end_time: string;
    location: string;
    color: string;
    student_first_name: string;
    student_last_name: string;
    student_username: string;
    tutor_first_name: string;
    tutor_last_name: string;
    tutor_username: string;
}

interface ChangeRequest {
    id: string;
    class_id: string;
    requested_by: string;
    proposed_day: number;
    proposed_start_time: string;
    proposed_end_time: string;
    reason: string | null;
    status: string;
    reviewed_by: string | null;
    reviewed_at: string | null;
    review_note: string | null;
    created_at: string;
    subject: string;
    current_day: number;
    current_start_time: string;
    current_end_time: string;
    student_first_name: string;
    student_last_name: string;
    requester_first_name: string;
    requester_last_name: string;
}

/* ─── Constants ────────────────────────────────────────── */
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM – 7 PM

function formatTime12(time24: string): string {
    const [h, m] = time24.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}

function getMonday(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

function addDays(date: Date, n: number): Date {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
}

/* ─── Component ────────────────────────────────────────── */
export default function Schedule() {
    const { user } = useAuth();
    const role = user?.role;

    const [classes, setClasses] = useState<ScheduledClass[]>([]);
    const [requests, setRequests] = useState<ChangeRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [weekStart, setWeekStart] = useState(getMonday(new Date()));

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState<ScheduledClass | null>(null);
    const [proposedDay, setProposedDay] = useState(0);
    const [proposedStart, setProposedStart] = useState('16:00');
    const [proposedEnd, setProposedEnd] = useState('17:00');
    const [reason, setReason] = useState('');
    const [submitting, setSubmitting] = useState(false);

    /* ─── Fetch data ── */
    const fetchData = useCallback(async () => {
        try {
            const [classRes, reqRes] = await Promise.all([
                apiClient.get('/schedule'),
                apiClient.get('/schedule/requests'),
            ]);
            setClasses(classRes.data);
            setRequests(reqRes.data);
        } catch (err) {
            console.error('Failed to load schedule:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    /* ─── Actions ── */
    const openRequestModal = (cls: ScheduledClass) => {
        setSelectedClass(cls);
        setProposedDay(cls.day_of_week);
        setProposedStart(cls.start_time.slice(0, 5));
        setProposedEnd(cls.end_time.slice(0, 5));
        setReason('');
        setModalOpen(true);
    };

    const submitRequest = async () => {
        if (!selectedClass) return;
        setSubmitting(true);
        try {
            await apiClient.post('/schedule/request', {
                class_id: selectedClass.id,
                proposed_day: proposedDay,
                proposed_start_time: proposedStart,
                proposed_end_time: proposedEnd,
                reason,
            });
            setModalOpen(false);
            await fetchData();
        } catch (err) {
            console.error('Failed to submit request:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const reviewRequest = async (requestId: string, status: 'approved' | 'rejected') => {
        try {
            await apiClient.put(`/schedule/requests/${requestId}/review`, { status });
            await fetchData();
        } catch (err) {
            console.error('Failed to review request:', err);
        }
    };

    const directUpdate = async (classId: string, updates: Partial<ScheduledClass>) => {
        try {
            await apiClient.put(`/schedule/${classId}`, updates);
            await fetchData();
        } catch (err) {
            console.error('Failed to update class:', err);
        }
    };

    /* ─── Derived values ── */
    const pendingRequests = requests.filter(r => r.status === 'pending');
    const isTutor = role === 'tutor';
    const isAdmin = role === 'admin';
    const canDirectEdit = isTutor || isAdmin;

    /* ─── Render helpers ── */
    const classesForDay = (dayIndex: number) =>
        classes.filter(c => c.day_of_week === dayIndex).sort((a, b) => a.start_time.localeCompare(b.start_time));

    const getTopOffset = (time: string) => {
        const [h, m] = time.split(':').map(Number);
        return ((h - 8) * 60 + m); // px from top (1px per minute)
    };

    const getDuration = (start: string, end: string) => {
        const [sh, sm] = start.split(':').map(Number);
        const [eh, em] = end.split(':').map(Number);
        return (eh * 60 + em) - (sh * 60 + sm);
    };

    const weekDates = DAYS.map((_, i) => addDays(weekStart, i));
    const today = new Date();
    const todayDayIndex = (today.getDay() + 6) % 7; // Convert Sun=0 to Mon=0

    if (loading) {
        return (
            <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={48} color="#a78bfa" />
            </div>
        );
    }

    return (
        <div style={{ animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            {/* ─── Header ── */}
            <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h1 className="page-title">Tutoring Schedule</h1>
                    <p className="page-subtitle">
                        {role === 'tutor'
                            ? 'Manage your students\' timetable. You can approve or reject change requests.'
                            : role === 'parent'
                                ? 'View your child\'s tutoring timetable. Request changes if needed.'
                                : 'Your weekly tutoring timetable. Request changes by clicking a class.'}
                    </p>
                </div>
            </header>

            {/* ─── Pending Requests Banner (Tutor) ── */}
            {canDirectEdit && pendingRequests.length > 0 && (
                <div style={{
                    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(251, 191, 36, 0.03))',
                    border: '1px solid rgba(251, 191, 36, 0.25)',
                    borderRadius: '20px',
                    padding: '1.25rem 1.5rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                }}>
                    <Bell size={20} color="#f59e0b" />
                    <span style={{ fontWeight: 600, color: '#92400e' }}>
                        {pendingRequests.length} pending schedule change request{pendingRequests.length > 1 ? 's' : ''}
                    </span>
                </div>
            )}

            {/* ─── Week Navigation ── */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
            }}>
                <button onClick={() => setWeekStart(addDays(weekStart, -7))} className="sched-nav-btn">
                    <ChevronLeft size={20} />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '260px', justifyContent: 'center' }}>
                    <Calendar size={18} color="#6B5B95" />
                    <span style={{ fontWeight: 600, fontSize: '1.05rem', color: '#1a1a1a' }}>
                        {weekDates[0].toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })} — {weekDates[6].toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                </div>
                <button onClick={() => setWeekStart(addDays(weekStart, 7))} className="sched-nav-btn">
                    <ChevronRight size={20} />
                </button>
                <button
                    onClick={() => setWeekStart(getMonday(new Date()))}
                    style={{
                        padding: '0.4rem 1rem',
                        borderRadius: '999px',
                        border: '1px solid rgba(107, 91, 149, 0.15)',
                        background: 'white',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#6B5B95',
                        cursor: 'pointer',
                    }}
                >
                    Today
                </button>
            </div>

            {/* ─── Calendar Grid ── */}
            <div className="sched-grid-wrapper">
                {/* Time column */}
                <div className="sched-time-col">
                    <div className="sched-day-header-cell" />
                    {HOURS.map(h => (
                        <div key={h} className="sched-time-label">
                            {h % 12 || 12} {h >= 12 ? 'PM' : 'AM'}
                        </div>
                    ))}
                </div>

                {/* Day columns */}
                {DAYS.map((day, dayIdx) => {
                    const isToday = dayIdx === todayDayIndex &&
                        weekDates[dayIdx].toDateString() === today.toDateString();
                    const dayClasses = classesForDay(dayIdx);

                    return (
                        <div key={day} className={`sched-day-col ${isToday ? 'sched-today' : ''}`}>
                            <div className={`sched-day-header-cell ${isToday ? 'today' : ''}`}>
                                <span className="sched-day-short">{DAYS_SHORT[dayIdx]}</span>
                                <span className={`sched-day-date ${isToday ? 'today' : ''}`}>
                                    {weekDates[dayIdx].getDate()}
                                </span>
                            </div>

                            <div className="sched-day-body">
                                {/* Hour lines */}
                                {HOURS.map(h => (
                                    <div key={h} className="sched-hour-line" style={{ top: `${(h - 8) * 60}px` }} />
                                ))}

                                {/* Class blocks */}
                                {dayClasses.map(cls => {
                                    const top = getTopOffset(cls.start_time);
                                    const height = getDuration(cls.start_time, cls.end_time);
                                    const hasPending = pendingRequests.some(r => r.class_id === cls.id);

                                    return (
                                        <div
                                            key={cls.id}
                                            className="sched-class-block"
                                            style={{
                                                top: `${top}px`,
                                                height: `${Math.max(height, 40)}px`,
                                                '--cls-color': cls.color,
                                                background: `${cls.color}18`,
                                                borderLeft: `3px solid ${cls.color}`,
                                            } as any}
                                            onClick={() => {
                                                if (canDirectEdit) {
                                                    openRequestModal(cls); // tutors can also use modal to adjust
                                                } else {
                                                    openRequestModal(cls);
                                                }
                                            }}
                                        >
                                            <div className="sched-class-subject" style={{ color: cls.color }}>
                                                {cls.subject}
                                                {hasPending && <AlertCircle size={12} style={{ marginLeft: '4px', color: '#f59e0b' }} />}
                                            </div>
                                            <div className="sched-class-time">
                                                {formatTime12(cls.start_time)} – {formatTime12(cls.end_time)}
                                            </div>
                                            <div className="sched-class-meta">
                                                <User size={10} />
                                                {role === 'tutor' || role === 'parent' || role === 'admin'
                                                    ? `${cls.student_first_name}`
                                                    : `${cls.tutor_first_name}`}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ─── Change Requests Panel ── */}
            {requests.length > 0 && (
                <div className="card" style={{ marginTop: '2rem' }}>
                    <div className="card-header">
                        <h2 className="card-title">Schedule Change Requests</h2>
                    </div>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {requests.map(r => (
                            <div key={r.id} className="sched-request-card" data-status={r.status}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                                        {r.subject} — {r.student_first_name} {r.student_last_name}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>
                                        <span style={{ textDecoration: 'line-through', opacity: 0.6 }}>
                                            {DAYS[r.current_day]} {formatTime12(r.current_start_time)}–{formatTime12(r.current_end_time)}
                                        </span>
                                        {' → '}
                                        <span style={{ fontWeight: 600, color: '#1a1a1a' }}>
                                            {DAYS[r.proposed_day]} {formatTime12(r.proposed_start_time)}–{formatTime12(r.proposed_end_time)}
                                        </span>
                                    </div>
                                    {r.reason && (
                                        <div style={{ fontSize: '0.8rem', color: '#888', fontStyle: 'italic' }}>
                                            "{r.reason}"
                                        </div>
                                    )}
                                    <div style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '0.25rem' }}>
                                        Requested by {r.requester_first_name} {r.requester_last_name} • {new Date(r.created_at).toLocaleDateString('en-AU')}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {r.status === 'pending' && canDirectEdit ? (
                                        <>
                                            <button
                                                className="sched-action-btn approve"
                                                onClick={() => reviewRequest(r.id, 'approved')}
                                            >
                                                <Check size={16} /> Approve
                                            </button>
                                            <button
                                                className="sched-action-btn reject"
                                                onClick={() => reviewRequest(r.id, 'rejected')}
                                            >
                                                <X size={16} /> Reject
                                            </button>
                                        </>
                                    ) : (
                                        <span className={`sched-status-badge ${r.status}`}>
                                            {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ─── Legend ── */}
            <div style={{
                display: 'flex',
                gap: '1.5rem',
                marginTop: '1.5rem',
                fontSize: '0.8rem',
                color: '#888',
                justifyContent: 'center',
                flexWrap: 'wrap',
            }}>
                {[...new Set(classes.map(c => c.subject))].map(subj => {
                    const c = classes.find(cl => cl.subject === subj);
                    return (
                        <div key={subj} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <div style={{ width: 10, height: 10, borderRadius: 3, background: c?.color || '#ccc' }} />
                            {subj}
                        </div>
                    );
                })}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MapPin size={12} /> Click a class to {canDirectEdit ? 'edit' : 'request a change'}
                </div>
            </div>

            {/* ─── Request / Edit Modal ── */}
            {modalOpen && selectedClass && (
                <div className="sched-modal-overlay" onClick={() => setModalOpen(false)}>
                    <div className="sched-modal" onClick={e => e.stopPropagation()}>
                        <h3 style={{ marginBottom: '0.5rem' }}>
                            {canDirectEdit ? 'Edit Class Time' : 'Request Schedule Change'}
                        </h3>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
                            <span style={{ fontWeight: 600, color: selectedClass.color }}>{selectedClass.subject}</span>
                            {' — '}
                            {role === 'tutor' ? `${selectedClass.student_first_name}` : `with ${selectedClass.tutor_first_name}`}
                        </p>

                        <div className="sched-modal-field">
                            <label>Day</label>
                            <select value={proposedDay} onChange={e => setProposedDay(Number(e.target.value))}>
                                {DAYS.map((d, i) => <option key={i} value={i}>{d}</option>)}
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="sched-modal-field">
                                <label>Start Time</label>
                                <input type="time" value={proposedStart} onChange={e => setProposedStart(e.target.value)} />
                            </div>
                            <div className="sched-modal-field">
                                <label>End Time</label>
                                <input type="time" value={proposedEnd} onChange={e => setProposedEnd(e.target.value)} />
                            </div>
                        </div>

                        {!canDirectEdit && (
                            <div className="sched-modal-field">
                                <label>Reason (optional)</label>
                                <textarea
                                    placeholder="e.g. I have football practice on that day"
                                    value={reason}
                                    onChange={e => setReason(e.target.value)}
                                    rows={2}
                                />
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                            <button className="sched-modal-cancel" onClick={() => setModalOpen(false)}>Cancel</button>
                            <button
                                className="sched-modal-submit"
                                disabled={submitting}
                                onClick={async () => {
                                    if (canDirectEdit) {
                                        await directUpdate(selectedClass.id, {
                                            day_of_week: proposedDay,
                                            start_time: proposedStart,
                                            end_time: proposedEnd,
                                        } as any);
                                        setModalOpen(false);
                                    } else {
                                        await submitRequest();
                                    }
                                }}
                            >
                                {submitting
                                    ? <Loader2 size={16} className="animate-spin" />
                                    : canDirectEdit
                                        ? <><Check size={16} /> Save Changes</>
                                        : <><Send size={16} /> Send Request</>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* ─── Navigation ── */
                .sched-nav-btn {
                    width: 36px; height: 36px; border-radius: 10px;
                    border: 1px solid rgba(107,91,149,0.12);
                    background: white; cursor: pointer; display: flex;
                    align-items: center; justify-content: center;
                    color: #6B5B95; transition: all 0.2s;
                }
                .sched-nav-btn:hover { background: #f5f3ff; border-color: #a78bfa; }

                /* ─── Grid ── */
                .sched-grid-wrapper {
                    display: grid;
                    grid-template-columns: 60px repeat(7, 1fr);
                    border: 1px solid rgba(0,0,0,0.06);
                    border-radius: 20px;
                    overflow: hidden;
                    background: white;
                    box-shadow: 0 4px 24px rgba(107,91,149,0.06);
                }
                .sched-time-col { display: flex; flex-direction: column; }
                .sched-day-col { border-left: 1px solid rgba(0,0,0,0.05); position: relative; }
                .sched-day-col.sched-today { background: rgba(167,139,250,0.03); }

                .sched-day-header-cell {
                    height: 56px; display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    border-bottom: 1px solid rgba(0,0,0,0.06);
                    background: #faf9fe;
                }
                .sched-day-header-cell.today { background: rgba(167,139,250,0.08); }
                .sched-day-short {
                    font-size: 0.7rem; text-transform: uppercase;
                    letter-spacing: 1px; color: #999; font-weight: 600;
                }
                .sched-day-date {
                    font-size: 1.05rem; font-weight: 700; color: #1a1a1a; line-height: 1.3;
                }
                .sched-day-date.today {
                    background: #6B5B95; color: white; width: 28px; height: 28px;
                    border-radius: 50%; display: flex; align-items: center;
                    justify-content: center; font-size: 0.85rem;
                }

                .sched-time-label {
                    height: 60px; display: flex; align-items: flex-start;
                    justify-content: flex-end; padding-right: 8px;
                    font-size: 0.65rem; color: #aaa; font-weight: 500;
                    padding-top: 2px;
                }

                .sched-day-body {
                    position: relative;
                    height: ${HOURS.length * 60}px;
                }
                .sched-hour-line {
                    position: absolute; left: 0; right: 0;
                    height: 1px; background: rgba(0,0,0,0.04);
                }

                /* ─── Class Block ── */
                .sched-class-block {
                    position: absolute; left: 4px; right: 4px;
                    border-radius: 10px; padding: 6px 8px;
                    cursor: pointer; transition: all 0.2s;
                    overflow: hidden; z-index: 2;
                }
                .sched-class-block:hover {
                    transform: scale(1.02);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                    z-index: 3;
                }
                .sched-class-subject {
                    font-weight: 700; font-size: 0.75rem;
                    display: flex; align-items: center;
                }
                .sched-class-time {
                    font-size: 0.65rem; color: #666; margin-top: 2px;
                }
                .sched-class-meta {
                    font-size: 0.6rem; color: #999; margin-top: 2px;
                    display: flex; align-items: center; gap: 3px;
                }

                /* ─── Request cards ── */
                .sched-request-card {
                    display: flex; align-items: center;
                    padding: 1rem 1.25rem; border-radius: 14px;
                    border: 1px solid rgba(0,0,0,0.06);
                    background: rgba(255,255,255,0.6);
                    transition: all 0.2s;
                }
                .sched-request-card:hover { background: rgba(255,255,255,0.9); }
                .sched-request-card[data-status="approved"] { border-left: 3px solid #34d399; }
                .sched-request-card[data-status="rejected"] { border-left: 3px solid #f87171; }
                .sched-request-card[data-status="pending"]  { border-left: 3px solid #fbbf24; }

                .sched-action-btn {
                    display: flex; align-items: center; gap: 0.3rem;
                    padding: 0.5rem 0.9rem; border-radius: 10px;
                    font-size: 0.8rem; font-weight: 600; cursor: pointer;
                    border: 1px solid transparent; transition: all 0.2s;
                }
                .sched-action-btn.approve {
                    background: rgba(52,211,153,0.1); color: #059669;
                    border-color: rgba(52,211,153,0.3);
                }
                .sched-action-btn.approve:hover { background: rgba(52,211,153,0.2); }
                .sched-action-btn.reject {
                    background: rgba(248,113,113,0.1); color: #dc2626;
                    border-color: rgba(248,113,113,0.3);
                }
                .sched-action-btn.reject:hover { background: rgba(248,113,113,0.2); }

                .sched-status-badge {
                    padding: 0.35rem 0.8rem; border-radius: 999px;
                    font-size: 0.75rem; font-weight: 600; text-transform: capitalize;
                }
                .sched-status-badge.approved { background: #ecfdf5; color: #059669; }
                .sched-status-badge.rejected { background: #fef2f2; color: #dc2626; }
                .sched-status-badge.pending  { background: #fffbeb; color: #d97706; }

                /* ─── Modal ── */
                .sched-modal-overlay {
                    position: fixed; inset: 0; z-index: 1000;
                    background: rgba(0,0,0,0.35); backdrop-filter: blur(4px);
                    display: flex; align-items: center; justify-content: center;
                    animation: fadeIn 0.2s;
                }
                .sched-modal {
                    background: white; border-radius: 24px;
                    padding: 2rem; width: 100%; max-width: 440px;
                    box-shadow: 0 24px 80px rgba(0,0,0,0.15);
                }
                .sched-modal h3 {
                    font-size: 1.3rem; font-weight: 700; color: #1a1a1a;
                }
                .sched-modal-field {
                    margin-bottom: 1rem;
                }
                .sched-modal-field label {
                    display: block; font-size: 0.8rem; font-weight: 600;
                    color: #666; margin-bottom: 0.35rem;
                }
                .sched-modal-field select,
                .sched-modal-field input,
                .sched-modal-field textarea {
                    width: 100%; padding: 0.7rem 0.9rem;
                    border: 1.5px solid rgba(107,91,149,0.12);
                    border-radius: 12px; font-size: 0.9rem;
                    background: #faf9fe; color: #1a1a1a;
                    transition: border-color 0.2s;
                }
                .sched-modal-field select:focus,
                .sched-modal-field input:focus,
                .sched-modal-field textarea:focus {
                    outline: none; border-color: #a78bfa;
                    box-shadow: 0 0 0 4px rgba(167,139,250,0.1);
                }
                .sched-modal-cancel {
                    padding: 0.65rem 1.25rem; border-radius: 12px;
                    border: 1px solid rgba(0,0,0,0.1); background: white;
                    font-size: 0.9rem; font-weight: 600; color: #666;
                    cursor: pointer; transition: all 0.2s;
                }
                .sched-modal-cancel:hover { background: #f5f5f5; }
                .sched-modal-submit {
                    padding: 0.65rem 1.5rem; border-radius: 12px;
                    border: none; background: #6B5B95; color: white;
                    font-size: 0.9rem; font-weight: 600; cursor: pointer;
                    display: flex; align-items: center; gap: 0.4rem;
                    transition: all 0.2s;
                }
                .sched-modal-submit:hover { background: #5a4a84; transform: translateY(-1px); }
                .sched-modal-submit:disabled { opacity: 0.6; cursor: not-allowed; }

                /* ─── Responsive ── */
                @media (max-width: 768px) {
                    .sched-grid-wrapper { grid-template-columns: 40px repeat(7, 1fr); }
                    .sched-day-short { font-size: 0.6rem; }
                    .sched-time-label { font-size: 0.55rem; padding-right: 4px; }
                    .sched-class-block { padding: 4px; }
                    .sched-class-subject { font-size: 0.65rem; }
                    .sched-class-time { display: none; }
                }
            `}</style>
        </div>
    );
}
