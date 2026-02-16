import { Sparkles, Zap, BrainCircuit, PlayCircle } from 'lucide-react';

export default function StudyLab() {
    return (
        <div style={{ animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <header className="page-header">
                <h1 className="page-title">Study Lab</h1>
                <p className="page-subtitle">
                    Interactive practice tools and cutting-edge cognitive exercises to boost your learning efficiency.
                </p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem',
                marginTop: '1rem'
            }}>
                <div className="card" style={{ padding: '2.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-20px',
                        width: '120px',
                        height: '120px',
                        background: 'var(--glass-bg-purple)',
                        borderRadius: '50%',
                        filter: 'blur(30px)',
                        opacity: 0.5
                    }}></div>

                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, var(--color-glass-lavender), var(--color-glass-purple))',
                        color: 'white',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 8px 16px rgba(107, 91, 149, 0.2)'
                    }}>
                        <BrainCircuit size={40} />
                    </div>

                    <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>
                        Cognitive Sandbox
                    </h3>
                    <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '2rem' }}>
                        Practice complex concepts in a low-stakes environment. Our AI-driven sandbox generates custom problems based on your MindPrint profile.
                    </p>

                    <div className="badge-pill-purple" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Sparkles size={14} /> Coming Soon
                    </div>
                </div>

                <div className="card" style={{ padding: '2.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.4)' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: '#3b82f6',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem'
                    }}>
                        <Zap size={40} />
                    </div>

                    <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>
                        Drill Mode
                    </h3>
                    <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '2rem' }}>
                        High-frequency recall training. Rapid-fire questions designed to build long-term memory and fluency in key subjects.
                    </p>

                    <div style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '999px',
                        background: 'rgba(0,0,0,0.05)',
                        color: '#888',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        display: 'inline-block'
                    }}>
                        Under Development
                    </div>
                </div>
            </div>

            <div className="card" style={{ marginTop: '2.5rem', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2rem 3rem' }}>
                <div style={{ maxWidth: '60%' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Want a sneak peek?</h2>
                    <p style={{ opacity: 0.9 }}>Join our beta testing group to try out the Study Lab tools before they launch to everyone.</p>
                </div>
                <button style={{
                    padding: '1rem 2rem',
                    borderRadius: '16px',
                    background: 'white',
                    color: 'var(--color-primary)',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    <PlayCircle size={20} /> Request Access
                </button>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
