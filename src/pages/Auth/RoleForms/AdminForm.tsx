import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Loader2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface AdminFormProps {
    onBack: () => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ onBack }) => {
    const { register, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        inviteCode: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            role: 'admin',
            permissions: ['all']
        }, formData.inviteCode);
    };

    return (
        <div className="auth-form-container">
            <button className="back-button" onClick={onBack}>
                <ArrowLeft size={20} />
                Back to roles
            </button>

            <h2 className="form-title">Admin Registration</h2>
            <p className="form-subtitle">Restricted to academy staff only.</p>

            <div style={{
                background: '#fff7ed',
                border: '1px solid #ffedd5',
                padding: '1rem',
                borderRadius: '12px',
                marginBottom: '2rem',
                display: 'flex',
                gap: '0.75rem',
                color: '#9a3412',
                fontSize: '0.9rem'
            }}>
                <ShieldAlert size={20} />
                <span>Admin accounts require an authorized staff invite code to be activated.</span>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            required
                            placeholder="Staff First Name"
                            value={formData.firstName}
                            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            required
                            placeholder="Staff Last Name"
                            value={formData.lastName}
                            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Work Email</label>
                    <input
                        type="email"
                        required
                        placeholder="staff@kiteandkey.edu.au"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Authorized Invite Code</label>
                    <input
                        type="text"
                        required
                        placeholder="Enter Staff Code"
                        value={formData.inviteCode}
                        onChange={e => setFormData({ ...formData, inviteCode: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Security Password</label>
                    <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>

                <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <>Create Admin Account <ArrowRight size={20} /></>}
                </button>
            </form>
        </div>
    );
};

export default AdminForm;
