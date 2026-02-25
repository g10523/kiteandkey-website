import type { PageType } from '../types';

export type FeatureStatus = 'ready' | 'beta' | 'locked' | 'coming-soon';

export interface FeatureConfig {
    status: FeatureStatus;
    label?: string;
    description?: string;
    allowedRoles?: string[];
}

export const FEATURE_FLAGS: Record<PageType, FeatureConfig> = {
    'dashboard': { status: 'locked', allowedRoles: [] },
    'subjects': { status: 'ready' },
    'subject-detail': { status: 'ready' },
    'lesson': { status: 'ready' },
    'quiz': { status: 'ready' },
    'assessments': { status: 'ready' },

    // Personal section — all locked for now
    'mindprint': {
        status: 'locked',
        description: 'MindPrint cognitive profiling will be available soon.'
    },

    // Features to be released gradually
    'assignments': {
        status: 'coming-soon',
        description: 'The assignment portal is undergoing maintenance to support direct Google Drive integration.'
    },
    'analytics': {
        status: 'locked',
        description: 'Predictive growth modeling and visual progress tracking coming soon.'
    },
    'messages': {
        status: 'locked',
        description: 'The Secure Communication Vault is currently in final security auditing.'
    },
    'resources': {
        status: 'locked',
        description: 'Our digital library of 10,000+ revision materials is being cataloged.'
    },
    'schedule': {
        status: 'ready',
        description: 'Synchronised weekly timetable with change-request workflow.',
        allowedRoles: ['student', 'tutor', 'parent', 'admin']
    },
    'practice': {
        status: 'locked',
        description: 'Adaptive drill sets and AI-powered practice sessions are being calibrated.'
    },
    'study-lab': {
        status: 'locked',
        description: 'The Cognitive Sandbox will be available soon.'
    },

    'tokens': { status: 'ready', allowedRoles: ['admin'] },
    'admin-panel': { status: 'ready', allowedRoles: ['admin'] },
    'content-management': { status: 'ready', allowedRoles: ['admin', 'tutor'] },

    'assessment-wm': { status: 'ready' },
    'assessment-center': { status: 'ready' },
    'mindprint-working-memory': {
        status: 'locked',
        allowedRoles: ['student', 'parent', 'tutor', 'admin'],
        description: 'Working Memory assessment module coming soon.'
    },

    // Auth routes
    'login': { status: 'ready' },
    'register': { status: 'ready' },

    // Course module
    'courses': { status: 'ready', allowedRoles: ['student', 'tutor', 'parent', 'admin'] },
    'course-detail': { status: 'ready', allowedRoles: ['student', 'tutor', 'parent', 'admin'] },
    'course-quiz': { status: 'ready', allowedRoles: ['student', 'tutor', 'parent', 'admin'] },
};
