import React, { useState } from 'react';
import type { PageType } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, Loader2, Mail, Lock } from 'lucide-react';
import './Auth.css';

interface LoginProps {
    onNavigate: (page: PageType) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
    const { login, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'student' as any
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(formData.email, formData.role);
    };

    return (
        <div className="auth-page">
            <div className="auth-container" style={{ maxWidth: '450px' }}>
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">Sign in to continue to Lite & Key Academy.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                            <input
                                type="email"
                                required
                                placeholder="name@email.com"
                                style={{ paddingLeft: '40px' }}
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                style={{ paddingLeft: '40px' }}
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Sign in as</label>
                        <select
                            value={formData.role}
                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="student">Student</option>
                            <option value="parent">Parent</option>
                            <option value="tutor">Tutor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button type="submit" className="submit-button" disabled={isLoading}>
                        {isLoading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
                    </button>
                </form>
            </div>

            <div className="auth-footer">
                Don't have an account? <button onClick={() => onNavigate('register')} className="auth-link-button">Create one for free</button>
            </div>
        </div>
    );
};

export default Login;
