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
            <div className="zen-circle" style={{ width: '400px', height: '400px', top: '-100px', left: '-100px' }}></div>
            <div className="zen-circle" style={{ width: '300px', height: '300px', bottom: '-50px', right: '-50px' }}></div>

            <div className="auth-logo-wrapper">
                <img src="/logo.png" alt="Kite & Key Academy" className="auth-logo" onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/logo.jpg';
                }} />
            </div>

            <div className="auth-container">
                <div className="auth-badge">Academy Portal</div>
                <h1 className="auth-title">
                    Clarity Precedes
                    <i>Confidence.</i>
                </h1>
                <p className="auth-subtitle">Sign in to your personal learning cockpit.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail size={18} className="input-icon" />
                            <input
                                type="email"
                                required
                                placeholder="name@email.com"
                                className="with-icon"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock size={18} className="input-icon" />
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className="with-icon"
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
                        {isLoading ? <Loader2 className="animate-spin" /> : <>Log Into Academy <ArrowRight size={20} /></>}
                    </button>
                </form>
            </div>

            <div className="auth-footer">
                Don't have an account? <button onClick={() => onNavigate('register')} className="auth-link-button">Enrol Now</button>
            </div>
        </div>
    );
};

export default Login;
