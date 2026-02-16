import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface TutorFormProps {
    onBack: () => void;
}

const TutorForm: React.FC<TutorFormProps> = ({ onBack }) => {
    const { register, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        bio: '',
        subjects: '',
        tokenCode: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            bio: formData.bio,
            role: 'tutor',
            subjects: formData.subjects.split(',').map(s => s.trim()),
            rating: 5.0
        }, formData.tokenCode);
    };

    return (
        <div className="auth-form-container">
            <button className="back-button" onClick={onBack}>
                <ArrowLeft size={20} />
                Back to roles
            </button>

            <h2 className="form-title">Tutor Registration</h2>
            <p className="form-subtitle">Join our community of expert educators.</p>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Philo"
                            value={formData.firstName}
                            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Daoud"
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
                        placeholder="philo@academy.edu"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Subjects (comma separated)</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. Mathematics, Science, English"
                        value={formData.subjects}
                        onChange={e => setFormData({ ...formData, subjects: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Short Bio</label>
                    <textarea
                        rows={3}
                        required
                        placeholder="Tell us about your teaching experience..."
                        value={formData.bio}
                        onChange={e => setFormData({ ...formData, bio: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Registration Token</label>
                    <input
                        type="text"
                        required
                        placeholder="K&K-TUTOR-XXXX"
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
                    {isLoading ? <Loader2 className="animate-spin" /> : <>Register as Tutor <ArrowRight size={20} /></>}
                </button>
            </form>
        </div>
    );
};

export default TutorForm;
