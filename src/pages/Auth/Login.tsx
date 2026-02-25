import React, { useState } from 'react';
import type { PageType } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, Loader2, User, Lock } from 'lucide-react';
import './Auth.css';

interface LoginProps {
    onNavigate: (page: PageType) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
    const { login, isLoading } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login(username, password);
        } catch (err: any) {
            setError(err.message || 'Login failed');
        }
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

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <div className="input-wrapper">
                            <User size={18} className="input-icon" />
                            <input
                                type="text"
                                required
                                placeholder="Enter your username"
                                className="with-icon"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                autoComplete="username"
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
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </div>
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
