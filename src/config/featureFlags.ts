import type { PageType } from '../types';

export type FeatureStatus = 'ready' | 'beta' | 'locked' | 'coming-soon';

export interface FeatureConfig {
    status: FeatureStatus;
    label?: string;
    description?: string;
    allowedRoles?: string[];
}

export const FEATURE_FLAGS: Record<PageType, FeatureConfig> = {
    'dashboard': { status: 'ready' },
    'subjects': { status: 'ready' },
    'subject-detail': { status: 'ready' },
    'lesson': { status: 'ready' },

    // Core differentiator - keep ready
    'mindprint': { status: 'ready' },

    // Features to be released gradually
    'assignments': {
        status: 'coming-soon',
        description: 'The assignment portal is undergoing maintenance to support direct Google Drive integration.'
    },
    'analytics': {
        status: 'coming-soon',
        description: 'Predictive growth modeling and visual progress tracking will be available in the next update.'
    },
    'messages': {
        status: 'coming-soon',
        description: 'The Secure Communication Vault is currently in final security auditing.'
    },
    'resources': {
        status: 'coming-soon',
        description: 'Our digital library of 10,000+ revision materials is being cataloged.'
    },
    'schedule': {
        status: 'coming-soon',
        description: 'Real-time tutoring availability and rescheduling tools are launching soon.'
    },
    'practice': {
        status: 'coming-soon',
        description: 'Adaptive drill sets and AI-powered practice sessions are being calibrated.'
    },
    'study-lab': {
        status: 'coming-soon',
        description: 'The Cognitive Sandbox is currently in private beta testing.'
    },

    'tokens': { status: 'ready', allowedRoles: ['admin'] },

    // Auth routes
    'login': { status: 'ready' },
    'register': { status: 'ready' },
};
