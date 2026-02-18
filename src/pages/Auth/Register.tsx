import React, { useState } from 'react';
import type { PageType, UserRole } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Users, ShieldCheck, BookOpen, ArrowRight } from 'lucide-react';
import StudentForm from './RoleForms/StudentForm';
import ParentForm from './RoleForms/ParentForm';
import TutorForm from './RoleForms/TutorForm';
import AdminForm from './RoleForms/AdminForm';
import './Auth.css';

interface RegisterProps {
    onNavigate: (page: PageType) => void;
}

const Register: React.FC<RegisterProps> = ({ onNavigate }) => {
    const [step, setStep] = useState(1);
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const { register: _register } = useAuth();

    const roles: { role: UserRole; title: string; description: string; icon: any; color: string }[] = [
        {
            role: 'student',
            title: 'Student',
            description: 'Access your lessons, track progress, and learn with AI-adapted materials.',
            icon: GraduationCap,
            color: '#a78bfa'
        },
        {
            role: 'parent',
            title: 'Parent',
            description: 'Monitor your children\'s growth, manage schedules, and stay connected.',
            icon: Users,
            color: '#f472b6'
        },
        {
            role: 'tutor',
            title: 'Tutor',
            description: 'Manage your students, deliver personalized lessons, and track outcomes.',
            icon: BookOpen,
            color: '#60a5fa'
        },
        {
            role: 'admin',
            title: 'Admin',
            description: 'Oversee the entire academy, manage users, and analyze system-wide data.',
            icon: ShieldCheck,
            color: '#34d399'
        }
    ];

    const handleRoleSelect = (role: UserRole) => {
        setSelectedRole(role);
        setStep(2);
    };

    const renderRoleSelection = () => (
        <div className="auth-selection-container">
            <h1 className="auth-title">Create your Account</h1>
            <p className="auth-subtitle">Welcome to Kite & Key Academy. Select your role to get started.</p>

            <div className="role-grid">
                {roles.map((item) => (
                    <div
                        key={item.role}
                        className={`role-card ${selectedRole === item.role ? 'selected' : ''}`}
                        onClick={() => handleRoleSelect(item.role)}
                        style={{ '--role-color': item.color } as any}
                    >
                        <div className="role-icon-wrapper">
                            <item.icon size={32} />
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <div className="role-card-action">
                            <span>Select Account Type</span>
                            <ArrowRight size={16} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderForm = () => {
        switch (selectedRole) {
            case 'student': return <StudentForm onBack={() => setStep(1)} />;
            case 'parent': return <ParentForm onBack={() => setStep(1)} />;
            case 'tutor': return <TutorForm onBack={() => setStep(1)} />;
            case 'admin': return <AdminForm onBack={() => setStep(1)} />;
            default: return null;
        }
    };

    return (
        <div className="auth-page">
            <div className={`auth-container ${step === 1 ? 'wide' : ''}`}>
                {step === 1 ? renderRoleSelection() : renderForm()}
            </div>

            <div className="auth-footer">
                Already have an account? <button onClick={() => onNavigate('login')} className="auth-link-button">Sign in</button>
            </div>
        </div>
    );
};

export default Register;
