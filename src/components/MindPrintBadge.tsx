import { Brain } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function MindPrintBadge() {
    const { user, isLoading } = useAuth();
    const { studentProfile } = useData();

    if (isLoading || !user || user.role !== 'student') {
        return null;
    }

    if (!studentProfile) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '2rem',
            right: '2rem',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '9999px',
            boxShadow: '0 8px 32px rgba(107, 91, 149, 0.1)',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--color-primary)',
            transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(107, 91, 149, 0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(107, 91, 149, 0.1)';
            }}
        >
            <Brain size={18} />
            <span>MindPrint Active</span>
        </div>
    );
}
