import React from 'react';
import { ShieldCheck, Mail, LogOut, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PendingVerification: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f8f7fc 0%, #f0eef8 100%)',
            padding: '2rem'
        }}>
            <div style={{
                maxWidth: '500px',
                width: '100%',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '3rem',
                textAlign: 'center',
                boxShadow: '0 20px 50px rgba(107, 91, 149, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'rgba(167, 139, 250, 0.1)',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)',
                    margin: '0 auto 2rem'
                }}>
                    <Clock size={40} />
                </div>

                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>
                    Account Pending
                </h1>

                <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Hi <b>{user?.firstName}</b>, your account has been created via the public beta channel.
                    To maintain the quality of the academy, an administrator must manually verify your enrollment before you can access the curriculum.
                </p>

                <div style={{
                    background: 'rgba(167, 139, 250, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    marginBottom: '2rem',
                    textAlign: 'left'
                }}>
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <ShieldCheck size={20} color="#a78bfa" />
                        <span style={{ fontSize: '0.9rem', color: '#444' }}>Our team is reviewing your application.</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <Mail size={20} color="#a78bfa" />
                        <span style={{ fontSize: '0.9rem', color: '#444' }}>We will email <b>{user?.email}</b> once approved.</span>
                    </div>
                </div>

                <button
                    onClick={logout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: 'none',
                        background: '#1a1a1a',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    <LogOut size={18} /> Sign Out
                </button>
            </div>
        </div>
    );
};

export default PendingVerification;
