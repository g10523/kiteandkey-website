// ============================================
// COURSE ACCESS CONTROL STORE
// Admin-driven course assignment + tutor-student pairing
// Persisted entirely in localStorage
// ============================================

const STORE_KEY = 'lms_course_access';

/* ─── Types ─── */

export interface TutorStudentPairing {
    id: string;
    tutorId: string;
    tutorName: string;
    studentId: string;
    studentName: string;
    assignedCourseIds: string[];   // courses the tutor covers for this student
    createdAt: string;
}

export interface UserCourseAccess {
    userId: string;
    userName: string;
    userRole: 'student' | 'tutor';
    courseIds: string[];            // course IDs this user can view
}

export interface CourseAccessStore {
    /** Which courses each user can see */
    userAccess: UserCourseAccess[];
    /** Tutor ↔ student pairings (with scoped courses) */
    pairings: TutorStudentPairing[];
    /** All registered user summaries (lightweight) for admin to pick from */
    registeredUsers: RegisteredUserSummary[];
}

export interface RegisteredUserSummary {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    yearLevel?: number;
}

/* ─── Default State ─── */

const defaultStore: CourseAccessStore = {
    userAccess: [],
    pairings: [],
    registeredUsers: [],
};

/* ─── Read / Write ─── */

function load(): CourseAccessStore {
    try {
        const raw = localStorage.getItem(STORE_KEY);
        if (raw) return JSON.parse(raw);
    } catch { /* ignore */ }
    return { ...defaultStore };
}

function save(store: CourseAccessStore) {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

/* ─── Public API ─── */

// ── User registry (so admin has a pick-list) ──

export function registerUser(user: RegisteredUserSummary) {
    const store = load();
    const idx = store.registeredUsers.findIndex(u => u.id === user.id);
    if (idx >= 0) {
        store.registeredUsers[idx] = user;
    } else {
        store.registeredUsers.push(user);
    }
    save(store);
}

export function getRegisteredUsers(): RegisteredUserSummary[] {
    return load().registeredUsers;
}

// ── Course access ──

export function getUserCourseIds(userId: string): string[] {
    const store = load();
    const entry = store.userAccess.find(u => u.userId === userId);
    return entry?.courseIds || [];
}

export function setUserCourseAccess(
    userId: string,
    userName: string,
    userRole: 'student' | 'tutor',
    courseIds: string[]
) {
    const store = load();
    const idx = store.userAccess.findIndex(u => u.userId === userId);
    const entry: UserCourseAccess = { userId, userName, userRole, courseIds };
    if (idx >= 0) {
        store.userAccess[idx] = entry;
    } else {
        store.userAccess.push(entry);
    }
    save(store);
}

export function getAllUserAccess(): UserCourseAccess[] {
    return load().userAccess;
}

// ── Tutor-student pairing ──

export function createPairing(pairing: Omit<TutorStudentPairing, 'id' | 'createdAt'>): TutorStudentPairing {
    const store = load();
    const newPairing: TutorStudentPairing = {
        ...pairing,
        id: `pair-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        createdAt: new Date().toISOString(),
    };
    store.pairings.push(newPairing);
    save(store);
    return newPairing;
}

export function getPairings(): TutorStudentPairing[] {
    return load().pairings;
}

export function getPairingsForTutor(tutorId: string): TutorStudentPairing[] {
    return load().pairings.filter(p => p.tutorId === tutorId);
}

export function getPairingsForStudent(studentId: string): TutorStudentPairing[] {
    return load().pairings.filter(p => p.studentId === studentId);
}

export function updatePairingCourses(pairingId: string, courseIds: string[]) {
    const store = load();
    const idx = store.pairings.findIndex(p => p.id === pairingId);
    if (idx >= 0) {
        store.pairings[idx].assignedCourseIds = courseIds;
        save(store);
    }
}

export function deletePairing(pairingId: string) {
    const store = load();
    store.pairings = store.pairings.filter(p => p.id !== pairingId);
    save(store);
}

// ── Convenience ──

export function getAccessibleCourseIds(userId: string, userRole: string): string[] | null {
    // Admin sees everything → return null means "no filter"
    if (userRole === 'admin') return null;

    const store = load();
    const entry = store.userAccess.find(u => u.userId === userId);
    return entry?.courseIds || [];
}

export function resetStore() {
    localStorage.removeItem(STORE_KEY);
}
