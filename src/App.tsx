import { useState } from 'react';
import type { PageType } from './types';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import MindPrintBadge from './components/MindPrintBadge';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import SubjectDetail from './pages/SubjectDetail';
import LessonView from './pages/LessonView';
import Assignments from './pages/Assignments';
import MindPrint from './pages/MindPrint';
import Analytics from './pages/Analytics';
import Messages from './pages/Messages';
import Resources from './pages/Resources';
import Schedule from './pages/Schedule';
import StudyLab from './pages/StudyLab';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import TokenManagement from './pages/TokenManagement';
import { useAuth } from './context/AuthContext';
import { Loader2 } from 'lucide-react';
import { FEATURE_FLAGS } from './config/featureFlags';
import ComingSoon from './components/ComingSoon';

function App() {
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleNavigate = (page: PageType, subjectId?: string, lessonId?: string) => {
    setCurrentPage(page);
    if (subjectId) setSelectedSubjectId(subjectId);
    if (lessonId) setSelectedLessonId(lessonId);
  };

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
        <Loader2 className="animate-spin" size={48} color="#a78bfa" />
      </div>
    );
  }

  if (!user) {
    if (currentPage === 'register') {
      return <Register onNavigate={handleNavigate} />;
    }
    return <Login onNavigate={handleNavigate} />;
  }

  const renderPage = () => {
    const config = FEATURE_FLAGS[currentPage];

    // Global Feature Guard
    if (config && (config.status === 'locked' || config.status === 'coming-soon')) {
      // Check if user has special role to bypass (e.g. admin can see locked features)
      const canBypass = user.role === 'admin';

      if (!canBypass) {
        return <ComingSoon config={config} onBack={() => setCurrentPage('dashboard')} />;
      }
    }

    // Role-based Access Guard
    if (config?.allowedRoles && !config.allowedRoles.includes(user.role)) {
      return <ComingSoon
        config={{ status: 'locked', description: `Access to this module is restricted to ${config.allowedRoles.join(', ')} users only.` }}
        onBack={() => setCurrentPage('dashboard')}
      />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'subjects':
        return <Subjects onNavigate={handleNavigate} />;
      case 'subject-detail':
        return selectedSubjectId ? (
          <SubjectDetail subjectId={selectedSubjectId} onNavigate={handleNavigate} />
        ) : (
          <Subjects onNavigate={handleNavigate} />
        );
      case 'lesson':
        return selectedLessonId ? (
          <LessonView lessonId={selectedLessonId} onNavigate={handleNavigate} />
        ) : (
          <Dashboard onNavigate={handleNavigate} />
        );
      case 'assignments':
        return <Assignments onNavigate={handleNavigate} />;
      case 'mindprint':
        return <MindPrint />;
      case 'analytics':
        return <Analytics />;
      case 'messages':
        return <Messages />;
      case 'resources':
        return <Resources />;
      case 'schedule':
        return <Schedule />;
      case 'study-lab':
        return <StudyLab />;
      case 'tokens':
        return <TokenManagement />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  const sidebarWidth = isSidebarCollapsed ? 80 : 260;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        user={user}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      {user.role === 'student' && <MindPrintBadge />}
      <main style={{
        flex: 1,
        marginLeft: `${sidebarWidth}px`,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        transition: 'margin-left 250ms cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          padding: '2rem'
        }}>
          {renderPage()}
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
