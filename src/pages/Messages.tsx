import { useData } from '../context/DataContext';
import { Search, Edit, Loader2 } from 'lucide-react';

export default function Messages() {
    const { messages, isLoading } = useData();

    if (isLoading) {
        return (
            <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={48} color="#a78bfa" />
            </div>
        );
    }
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-AU', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <div style={{ animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 className="page-title">Messages</h1>
                    <p className="page-subtitle">Secure communication with your tutors and academy administrators.</p>
                </div>
                <button className="btn-resume" style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}>
                    <Edit size={18} style={{ marginRight: '0.5rem' }} /> New Message
                </button>
            </header>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(255,255,255,0.3)' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            style={{
                                width: '100%',
                                padding: '0.6rem 1rem 0.6rem 2.5rem',
                                border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '12px',
                                background: 'white',
                                outline: 'none',
                                fontSize: '0.9rem'
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {messages.map((message) => (
                        <div key={message.id} style={{
                            padding: '1.5rem',
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                            background: message.isRead ? 'transparent' : 'rgba(107, 91, 149, 0.03)',
                            cursor: 'pointer',
                            display: 'flex',
                            gap: '1.25rem',
                            transition: 'background 0.2s ease',
                        }} className="message-row">
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: message.fromRole === 'tutor' ? 'var(--color-primary)' : '#9D8EC4',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                flexShrink: 0,
                                boxShadow: '0 4px 12px rgba(107, 91, 149, 0.2)'
                            }}>
                                {message.from.charAt(0)}
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{message.from}</span>
                                        <span style={{
                                            fontSize: '0.7rem',
                                            padding: '0.15rem 0.5rem',
                                            borderRadius: '999px',
                                            background: message.fromRole === 'tutor' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(107, 91, 149, 0.1)',
                                            color: message.fromRole === 'tutor' ? '#3b82f6' : 'var(--color-primary)',
                                            fontWeight: 600,
                                            textTransform: 'uppercase'
                                        }}>
                                            {message.fromRole}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: '#999' }}>{formatDate(message.date)}</span>
                                </div>
                                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#333', marginBottom: '0.5rem' }}>{message.subject}</div>
                                <p style={{
                                    color: '#666',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.5,
                                    margin: 0,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {message.body}
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {!message.isRead && (
                                    <div style={{ width: '10px', height: '10px', background: 'var(--color-primary)', borderRadius: '50%' }}></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .message-row:hover {
                    background: rgba(255,255,255,0.4) !important;
                }
            `}</style>
        </div>
    );
}
