import { useAuth } from '../context/AuthContext';
import type { Student } from '../types';
import {
    Brain,
    Zap,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    BookOpen,
    Clock,
    GitMerge,
    Sparkles,
    Loader2
} from 'lucide-react';
import './MindPrint.css';

export default function MindPrint() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={48} color="#a78bfa" />
            </div>
        );
    }

    if (!user || user.role !== 'student') {
        return <div className="card">Unauthorized access. Only students can view MindPrint profiles.</div>;
    }

    const student = user as Student;
    const profile = student.mindPrintProfile;

    return (
        <div className="mindprint-page">
            <header className="page-header">
                <h1 className="page-title">MindPrint Cognitive Signature</h1>
                <p className="page-subtitle">
                    A personalized operating layer that actively shapes how {student.firstName} receives, processes, and retains information.
                </p>
                <div className="engagement-badge">
                    <Sparkles size={14} />
                    <span>Active Profile • Updated Jan 2026</span>
                </div>
            </header>

            {/* 2. MindPrint Core Signature */}
            <section className="signature-grid">
                <div className="signature-card">
                    <div className="profile-type-header">
                        <span className="profile-eyebrow">Primary Cognitive Architecture</span>
                        <h2 className="profile-name">{profile.type}</h2>
                        <div className="profile-desc">
                            {profile.description}
                        </div>
                        <div className="traits-flex">
                            {profile.secondaryTraits?.map(trait => (
                                <span key={trait} className="trait-pill">{trait}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="signature-card">
                    <div className="profile-type-header">
                        <span className="profile-eyebrow">Cognitive Dimensions</span>
                    </div>
                    <div className="cognitive-bars">
                        <div className="cog-bar-group">
                            <div className="cog-labels">
                                <span>Procedural</span>
                                <span>Conceptual</span>
                            </div>
                            <div className="cog-track">
                                <div className="cog-fill" style={{ width: `${profile.cognitiveScores?.conceptVsProcedural || 50}%` }}></div>
                            </div>
                        </div>
                        <div className="cog-bar-group">
                            <div className="cog-labels">
                                <span>Verbal Processing</span>
                                <span>Visual Processing</span>
                            </div>
                            <div className="cog-track">
                                <div className="cog-fill" style={{ width: `${profile.cognitiveScores?.visualVsVerbal || 50}%` }}></div>
                            </div>
                        </div>
                        <div className="cog-bar-group">
                            <div className="cog-labels">
                                <span>Speed Bias</span>
                                <span>Depth Bias</span>
                            </div>
                            <div className="cog-track">
                                <div className="cog-fill" style={{ width: `${profile.cognitiveScores?.speedVsDepth || 50}%` }}></div>
                            </div>
                        </div>
                        <div className="cog-bar-group">
                            <div className="cog-labels">
                                <span>Structure Need</span>
                                <span>Flexibility</span>
                            </div>
                            <div className="cog-track">
                                <div className="cog-fill" style={{ width: `${100 - (profile.cognitiveScores?.structureTolerance || 50)}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. How This Changes Lessons (Comparison) */}
            <section>
                <div className="comparison-header">
                    <h2 className="section-title">Instructional Adaptation</h2>
                    <p className="page-subtitle text-center mx-auto">Real-time adjustments to lesson delivery based on the {profile.type} profile.</p>
                </div>

                <div className="comparison-container">
                    {/* Measurement: Standard */}
                    <div className="compare-card compare-std">
                        <div className="compare-title">
                            <BookOpen size={16} />
                            <span>Standard Instructional Feed</span>
                        </div>
                        <div className="example-box">
                            "To solve a linear equation, first subtract the constant from both sides, then divide by the coefficient. Repeat this process for all problems."
                        </div>
                        <div className="compare-details">
                            <div className="detail-row">
                                <span className="detail-label">Focus</span>
                                <span className="detail-value">Mechanical Execution</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Sequencing</span>
                                <span className="detail-value">Step 1 → Step 2 → Step 3</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Outcome</span>
                                <span className="detail-value">Procedural Compliance</span>
                            </div>
                        </div>
                    </div>

                    {/* Measurement: Adapted */}
                    <div className="compare-card compare-adapted">
                        <div className="compare-title adapted">
                            <Brain size={16} />
                            <span>Adapted for {student.firstName}</span>
                        </div>
                        <div className="contrast-badge">Pattern-First Optimization</div>
                        <div className="example-box">
                            "Think of the equation as a balanced scale. We need to find the unknown weight (x) by systematically removing the known weights while keeping the scale level."
                        </div>
                        <div className="compare-details">
                            <div className="detail-row">
                                <span className="detail-label">Focus</span>
                                <span className="detail-value">System Logic & "Why"</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Sequencing</span>
                                <span className="detail-value">Global Concept → Specific Steps</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Outcome</span>
                                <span className="detail-value">Deep Transferable Understanding</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Live Lesson Adaptation Panel */}
            <section className="adaptation-panel">
                <div className="panel-header">
                    <div>
                        <h3 className="section-title text-xl mb-1">Live Lesson Protocols</h3>
                        <p className="page-subtitle text-sm">Current strategies active for Year 8 Term 1</p>
                    </div>
                    <Zap size={24} className="text-purple-500" />
                </div>

                <div className="grid-quarters">
                    <div className="quarter-cell cell-emplace">
                        <h4>Emphasize</h4>
                        <ul>
                            {profile.todaysAdaptation?.emphasize.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="quarter-cell cell-minimize">
                        <h4>Minimize</h4>
                        <ul>
                            {profile.todaysAdaptation?.minimize.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="quarter-cell cell-pacing">
                        <h4>Pacing Adjustment</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {profile.todaysAdaptation?.pacing}
                        </p>
                    </div>
                    <div className="quarter-cell cell-checkin">
                        <h4>Misconception Radar</h4>
                        <ul>
                            {profile.todaysAdaptation?.misconceptionAlerts.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* 5. Feedback Interpretation */}
            <section className="feedback-section">
                <div className="feedback-visual">
                    <GitMerge size={64} strokeWidth={1.5} />
                </div>
                <div className="feedback-content">
                    <h3>Assessment Translation</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        We reframe generic feedback to target cognitive root causes rather than just surface-level errors.
                    </p>

                    <div className="feedback-comparison">
                        <div className="fb-card fb-standard">
                            <div className="font-semibold mb-2 flex items-center gap-2">
                                <AlertCircle size={14} /> Standard Feedback
                            </div>
                            "{profile.feedbackInterpretation?.standardFeedback}"
                        </div>
                        <div className="fb-card fb-mindprint">
                            <div className="font-semibold mb-2 flex items-center gap-2">
                                <CheckCircle2 size={14} /> MindPrint Translation
                            </div>
                            "{profile.feedbackInterpretation?.mindPrintFeedback}"
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Revision Strategy */}
            <section className="signature-card mb-12">
                <div className="card-header border-none mb-6">
                    <h2 className="section-title text-xl">Strategic Revision Sequence</h2>
                </div>

                <div className="revision-flow">
                    <div className="flow-node">
                        <div className="node-circle">1</div>
                        <span className="node-label">Concept Map</span>
                    </div>
                    <ArrowRight className="text-gray-300" />
                    <div className="flow-node">
                        <div className="node-circle">2</div>
                        <span className="node-label">Deep Mechanics</span>
                    </div>
                    <ArrowRight className="text-gray-300" />
                    <div className="flow-node">
                        <div className="node-circle">3</div>
                        <span className="node-label">Teaching Back</span>
                    </div>
                    <ArrowRight className="text-gray-300" />
                    <div className="flow-node">
                        <div className="node-circle">4</div>
                        <span className="node-label">Mixed Practice</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mt-8">
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-500 mb-3">
                            Ideal Session
                        </h4>
                        <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg text-purple-800 text-sm">
                            <Clock size={16} />
                            {profile.revisionStrategy?.sessionLength}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-500 mb-3">
                            Exam Strategy
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {profile.revisionStrategy?.examStrategy}
                        </p>
                    </div>
                </div>
            </section>

            {/* 7. Long Term Growth */}
            <section className="growth-section">
                <h2 className="growth-title">Cognitive Evolution Trajectory</h2>

                <div className="growth-grid">
                    <div className="growth-col">
                        <h4>Stable Traits</h4>
                        <ul className="text-sm space-y-2 text-gray-600">
                            {profile.growthView?.stableTraits.map((trait, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                    {trait}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="growth-col">
                        <h4>Trainable Skills</h4>
                        <ul className="text-sm space-y-2 text-gray-600">
                            {profile.growthView?.trainableTraits.map((trait, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                    {trait}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="compounding-box">
                        <h3 className="text-xl font-light mb-4">The Compounding Effect</h3>
                        <p className="compounding-text">
                            "{profile.growthView?.compoundingEffect}"
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
