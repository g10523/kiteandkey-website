import { useData } from '../context/DataContext';
import { BookOpen, Calculator, Microscope, BookText, Video, FileText, Ruler, Download, ExternalLink, Loader2 } from 'lucide-react';

// Helper function to render subject icon from string name
const getSubjectIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
        BookOpen,
        Calculator,
        Microscope,
    };
    const IconComponent = iconMap[iconName];
    return IconComponent || BookOpen;
};

export default function Resources() {
    const { resources, subjects, isLoading } = useData();

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
            year: 'numeric'
        }).format(date);
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'revision-pack': return BookOpen;
            case 'formula-sheet': return Ruler;
            case 'reading': return BookText;
            case 'video': return Video;
            default: return FileText;
        }
    };

    return (
        <div style={{ animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <header className="page-header">
                <h1 className="page-title">Resource Library</h1>
                <p className="page-subtitle">Access your study guides, revision packs, and interactive video content.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem' }}>
                {resources.map((resource) => {
                    const subject = subjects.find(s => s.id === resource.subjectId);
                    const TypeIcon = getTypeIcon(resource.type);
                    const SubjectIcon = subject ? getSubjectIconComponent(subject.icon) : BookOpen;

                    return (
                        <div key={resource.id} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    background: 'rgba(167, 139, 250, 0.1)',
                                    color: 'var(--color-primary)',
                                    borderRadius: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <TypeIcon size={28} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div className="badge-pill-purple" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>
                                            <SubjectIcon size={12} />
                                            {subject?.name}
                                        </div>
                                        <span style={{ fontSize: '0.75rem', color: '#999' }}>{resource.size}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '0.5rem', color: '#1a1a1a' }}>{resource.title}</h3>
                                </div>
                            </div>

                            <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                                {resource.description}
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                <div style={{ fontSize: '0.8rem', color: '#888' }}>
                                    Shared: {formatDate(resource.uploadDate)}
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <ExternalLink size={14} /> View
                                    </button>
                                    <button className="btn-resume" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <Download size={14} /> Get
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
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
