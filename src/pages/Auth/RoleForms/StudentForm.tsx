import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface StudentFormProps {
    onBack: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onBack }) => {
    const { register, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        yearLevel: '8',
        tokenCode: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            role: 'student',
            yearLevel: parseInt(formData.yearLevel)
        }, formData.tokenCode);
    };

    return (
        <div className="auth-form-container">
            <button className="back-button" onClick={onBack}>
                <ArrowLeft size={20} />
                Back to roles
            </button>

            <h2 className="form-title">Student Registration</h2>
            <p className="form-subtitle">Enter your details to join the academy.</p>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Joshua"
                            value={formData.firstName}
                            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Helvadjian"
                            value={formData.lastName}
                            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Year Level</label>
                    <select
                        value={formData.yearLevel}
                        onChange={e => setFormData({ ...formData, yearLevel: e.target.value })}
                    >
                        {[5, 6, 7, 8, 9, 10, 11, 12].map(year => (
                            <option key={year} value={year}>Year {year}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Registration Token</label>
                    <input
                        type="text"
                        required
                        placeholder="K&K-STUDENT-XXXX"
                        value={formData.tokenCode}
                        onChange={e => setFormData({ ...formData, tokenCode: e.target.value.toUpperCase() })}
                    />
                    <small style={{ color: '#666', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>
                        Required for secure access. For public beta testing, use <b>KITE-BETA-2026</b>.
                    </small>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>

                <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <>Create Account <ArrowRight size={20} /></>}
                </button>
            </form>
        </div>
    );
};

export default StudentForm;
