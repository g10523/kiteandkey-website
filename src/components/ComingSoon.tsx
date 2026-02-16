import React from 'react';
import { Sparkles, Timer, Rocket, ArrowLeft, ShieldAlert } from 'lucide-react';
import type { FeatureConfig } from '../config/featureFlags';

interface ComingSoonProps {
    config?: FeatureConfig;
    onBack?: () => void;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ config, onBack }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            padding: '2rem',
            animation: 'fadeIn 0.6s ease-out'
        }}>
            <div style={{
                width: '100px',
                height: '100px',
                background: 'rgba(167, 139, 250, 0.1)',
                borderRadius: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                marginBottom: '2rem',
                position: 'relative'
            }}>
                {config?.status === 'locked' ? <ShieldAlert size={48} /> : <Timer size={48} />}
                <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    background: 'var(--color-secondary)',
                    color: 'white',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    BETA
                </div>
            </div>

            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>
                {config?.status === 'locked' ? 'Restricted Access' : 'Coming Soon to Kite & Key'}
            </h1>

            <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                {config?.description || "This module is currently being calibrated by our cognitive scientists to ensure the highest quality learning experience. You'll be notified as soon as it goes live."}
            </p>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {onBack && (
                    <button
                        onClick={onBack}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(0,0,0,0.1)',
                            background: 'white',
                            color: '#666',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        <ArrowLeft size={18} /> Go Back
                    </button>
                )}
                <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.75rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'var(--color-primary)',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(167, 139, 250, 0.3)'
                }}>
                    <Rocket size={18} /> Join the Waitlist
                </button>
            </div>

            <div style={{ marginTop: '4rem', display: 'flex', gap: '2rem', opacity: 0.5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <Sparkles size={14} /> AI-Powered
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <ShieldAlert size={14} /> Cognitive Security
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default ComingSoon;
