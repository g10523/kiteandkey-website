import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, Copy, Check, Ticket, Calendar, XCircle, ShieldCheck } from 'lucide-react';
import type { UserRole } from '../types';

const TokenManagement: React.FC = () => {
    const { tokens, generateToken, deleteToken, isLoading } = useAuth();
    const [selectedRole, setSelectedRole] = useState<UserRole>('student');
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleGenerate = async () => {
        await generateToken(selectedRole);
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div style={{ animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <header className="page-header">
                <h1 className="page-title">Registration Tokens</h1>
                <p className="page-subtitle">Manage access to the academy by generating secure, role-specific invite codes.</p>
            </header>

            <section className="card" style={{ marginBottom: '2.5rem' }}>
                <div className="card-header">
                    <h3 className="card-title">Generate New Token</h3>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                            style={{
                                padding: '0.8rem 1rem',
                                borderRadius: '14px',
                                border: '1px solid rgba(0,0,0,0.1)',
                                width: '100%',
                                background: 'white',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="student">Student</option>
                            <option value="tutor">Tutor</option>
                            <option value="parent">Parent</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>
                    <button
                        className="btn-resume"
                        onClick={handleGenerate}
                        disabled={isLoading}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.8rem 1.5rem' }}
                    >
                        {isLoading ? <Plus className="animate-spin" size={20} /> : <Plus size={20} />}
                        Generate
                    </button>
                </div>
            </section>

            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Active & Used Tokens</h3>
                </div>
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                    {tokens.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem', color: '#999', background: 'rgba(0,0,0,0.02)', borderRadius: '16px' }}>
                            <Ticket size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                            <p>No tokens generated yet.</p>
                        </div>
                    ) : (
                        tokens.map((token) => (
                            <div key={token.id} className="subject-item" style={{
                                cursor: 'default',
                                transform: 'none',
                                opacity: token.isUsed ? 0.6 : 1,
                                padding: '1.25rem 1.5rem'
                            }}>
                                <div className="subject-icon" style={{
                                    width: '48px',
                                    height: '48px',
                                    background: token.isUsed ? '#f1f5f9' : 'var(--glass-bg-purple)',
                                    color: token.isUsed ? '#94a3b8' : 'var(--color-primary)',
                                    borderRadius: '12px'
                                }}>
                                    {token.role === 'admin' ? <ShieldCheck size={24} /> : <Ticket size={24} />}
                                </div>
                                <div className="subject-info" style={{ marginLeft: '1.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <code style={{
                                            fontSize: '1.2rem',
                                            fontWeight: 800,
                                            color: '#1a1a1a',
                                            letterSpacing: '0.05em'
                                        }}>{token.code}</code>
                                        <div style={{
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '999px',
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            background: token.role === 'student' ? '#eff6ff' : token.role === 'admin' ? '#fef2f2' : '#ecfdf5',
                                            color: token.role === 'student' ? '#2563eb' : token.role === 'admin' ? '#dc2626' : '#059669'
                                        }}>
                                            {token.role}
                                        </div>
                                        {token.isUsed && (
                                            <span style={{ fontSize: '0.7rem', color: '#666', background: '#eee', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>USED</span>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8rem', color: '#888', marginTop: '0.25rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} /> Created: {token.createdAt.toLocaleDateString()}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><XCircle size={14} /> Expires: {token.expiresAt.toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.6rem' }}>
                                    {!token.isUsed && (
                                        <button
                                            onClick={() => copyToClipboard(token.code, token.id)}
                                            className="btn-icon"
                                            style={{
                                                padding: '0.75rem',
                                                borderRadius: '12px',
                                                background: copiedId === token.id ? '#ecfdf5' : '#f8fafc',
                                                border: '1px solid rgba(0,0,0,0.05)',
                                                color: copiedId === token.id ? '#10b981' : '#64748b'
                                            }}
                                            title="Copy Code"
                                        >
                                            {copiedId === token.id ? <Check size={18} /> : <Copy size={18} />}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteToken(token.id)}
                                        className="btn-icon"
                                        style={{
                                            padding: '0.75rem',
                                            borderRadius: '12px',
                                            background: '#fef2f2',
                                            border: '1px solid rgba(0,0,0,0.05)',
                                            color: '#ef4444'
                                        }}
                                        title="Delete Token"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default TokenManagement;
