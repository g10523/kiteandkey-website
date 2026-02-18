import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { Brain, LayoutGrid, BarChart3 } from 'lucide-react';
import type { MindPrintProfile } from '../types/mindprint';
import type { CognitiveDimensionId } from '../types/mindprint';
import type { StoredAssessment } from '../services/mindprintStore';
import {
    getStoredProfile,
    getAssessedDimensions,
    getPendingDimensions,
    buildProfileFromResults
} from '../services/mindprintStore';
import { OnboardingWelcome } from '../components/mindprint/OnboardingWelcome';
import { AssessmentHub } from '../components/mindprint/AssessmentHub';
import { AssessmentRunner } from '../components/mindprint/AssessmentRunner';
import { CognitiveRadar } from '../components/mindprint/CognitiveRadar';
import { ArchetypeCard } from '../components/mindprint/ArchetypeCard';
import { CompositeScores } from '../components/mindprint/CompositeScores';
import { DimensionalDeepDive } from '../components/mindprint/DimensionalDeepDive';
import './MindPrint.css';

type ViewMode = 'onboarding' | 'hub' | 'assessing' | 'profile';

const MindPrint: React.FC = () => {
    const { user } = useAuth();
    const studentId = user?.id || 'default-student';

    // Core state
    const [viewMode, setViewMode] = useState<ViewMode>('onboarding');
    const [profile, setProfile] = useState<MindPrintProfile | null>(null);
    const [assessedMap, setAssessedMap] = useState<Map<CognitiveDimensionId, StoredAssessment>>(new Map());
    const [pendingDims, setPendingDims] = useState<CognitiveDimensionId[]>([]);
    const [activeDimension, setActiveDimension] = useState<CognitiveDimensionId | null>(null);

    // Tab for profile view
    const [profileTab, setProfileTab] = useState<'overview' | 'dimensions'>('overview');

    // Load stored results on mount
    useEffect(() => {
        refreshState();
    }, [studentId]);

    const refreshState = useCallback(() => {
        const stored = getStoredProfile(studentId);
        const assessed = getAssessedDimensions(studentId);
        const pending = getPendingDimensions(studentId);

        // Build assessed map
        const map = new Map<CognitiveDimensionId, StoredAssessment>();
        if (stored) {
            stored.assessments.forEach(a => map.set(a.dimension, a));
        }

        setAssessedMap(map);
        setPendingDims(pending);

        if (assessed.length === 0) {
            setViewMode('onboarding');
            setProfile(null);
        } else {
            const built = buildProfileFromResults(studentId);
            setProfile(built);
            // If we have 3+ assessments, default to profile view; otherwise hub
            setViewMode(assessed.length >= 3 ? 'profile' : 'hub');
        }
    }, [studentId]);

    // Start an assessment
    const handleStartAssessment = useCallback((dim: CognitiveDimensionId) => {
        setActiveDimension(dim);
        setViewMode('assessing');
    }, []);

    // Assessment completed
    const handleAssessmentComplete = useCallback((_result: StoredAssessment) => {
        setActiveDimension(null);
        refreshState();
    }, [refreshState]);

    // Cancel assessment
    const handleCancelAssessment = useCallback(() => {
        setActiveDimension(null);
        refreshState();
    }, [refreshState]);

    // ─── RENDER ───

    return (
        <div className="mp-page">
            {/* Page Header */}
            <header className="mp-header">
                <div className="mp-header-left">
                    <div className="mp-header-icon">
                        <Brain size={24} />
                    </div>
                    <div>
                        <h1 className="mp-title">MindPrint</h1>
                        <p className="mp-subtitle">
                            {viewMode === 'onboarding' && 'Your cognitive learning profile'}
                            {viewMode === 'hub' && `${assessedMap.size} of 8 dimensions assessed`}
                            {viewMode === 'assessing' && 'Assessment in progress'}
                            {viewMode === 'profile' && `${user?.firstName || 'Student'}'s cognitive architecture`}
                        </p>
                    </div>
                </div>

                {/* Nav tabs (only show when relevant) */}
                {assessedMap.size > 0 && viewMode !== 'assessing' && (
                    <div className="mp-nav">
                        <button
                            className={`mp-nav-btn ${viewMode === 'hub' ? 'active' : ''}`}
                            onClick={() => setViewMode('hub')}
                        >
                            <LayoutGrid size={14} />
                            Assessments
                        </button>
                        {profile && (
                            <button
                                className={`mp-nav-btn ${viewMode === 'profile' ? 'active' : ''}`}
                                onClick={() => setViewMode('profile')}
                            >
                                <BarChart3 size={14} />
                                Profile
                            </button>
                        )}
                    </div>
                )}
            </header>

            {/* ─── ONBOARDING ─── */}
            {viewMode === 'onboarding' && (
                <OnboardingWelcome
                    onStartAssessments={() => setViewMode('hub')}
                />
            )}

            {/* ─── ASSESSMENT HUB ─── */}
            {viewMode === 'hub' && (
                <AssessmentHub
                    assessedDimensions={assessedMap}
                    pendingDimensions={pendingDims}
                    onStartAssessment={handleStartAssessment}
                />
            )}

            {/* ─── ACTIVE ASSESSMENT ─── */}
            {viewMode === 'assessing' && activeDimension && (
                <AssessmentRunner
                    studentId={studentId}
                    dimension={activeDimension}
                    onComplete={handleAssessmentComplete}
                    onCancel={handleCancelAssessment}
                />
            )}

            {/* ─── PROFILE VIEW ─── */}
            {viewMode === 'profile' && profile && (
                <div>
                    {/* Profile sub-tabs */}
                    <div style={{
                        display: 'flex', gap: 'var(--spacing-md)',
                        marginBottom: 'var(--spacing-xl)'
                    }}>
                        <button
                            className={`mp-nav-btn ${profileTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setProfileTab('overview')}
                        >
                            Overview
                        </button>
                        <button
                            className={`mp-nav-btn ${profileTab === 'dimensions' ? 'active' : ''}`}
                            onClick={() => setProfileTab('dimensions')}
                        >
                            Dimension Deep-Dive
                        </button>
                    </div>

                    {profileTab === 'overview' && (
                        <>
                            {/* Top row: Radar + Archetype */}
                            <div className="mp-top-grid">
                                <div className="mp-top-radar">
                                    <CognitiveRadar profile={profile} studentId={studentId} />
                                </div>
                                <div className="mp-top-archetype">
                                    <ArchetypeCard profile={profile} />
                                </div>
                            </div>

                            {/* Composite Scores */}
                            <div style={{ marginTop: 'var(--spacing-xl)' }}>
                                <CompositeScores scores={profile.compositeScores} />
                            </div>

                            {/* Incomplete notice */}
                            {pendingDims.length > 0 && (
                                <div className="mp-glass" style={{
                                    marginTop: 'var(--spacing-xl)',
                                    padding: 'var(--spacing-lg)',
                                    display: 'flex', alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderLeft: '3px solid var(--mp-amber)'
                                }}>
                                    <div>
                                        <h4 style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: 14, fontWeight: 500,
                                            color: 'var(--color-text-primary)',
                                            marginBottom: 4
                                        }}>
                                            Profile Incomplete
                                        </h4>
                                        <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>
                                            {pendingDims.length} dimension{pendingDims.length !== 1 ? 's' : ''} remaining.
                                            Complete all assessments for your full archetype and composite scores.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setViewMode('hub')}
                                        style={{
                                            padding: '8px 20px',
                                            background: 'var(--mp-deep-lavender)',
                                            color: '#fff', border: 'none',
                                            borderRadius: 'var(--radius-full)',
                                            fontFamily: 'var(--font-primary)',
                                            fontSize: 12, fontWeight: 600,
                                            cursor: 'pointer', whiteSpace: 'nowrap'
                                        }}
                                    >
                                        Continue Assessments
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {profileTab === 'dimensions' && (
                        <DimensionalDeepDive dimensions={profile.dimensions} />
                    )}
                </div>
            )}
        </div>
    );
};

export default MindPrint;
