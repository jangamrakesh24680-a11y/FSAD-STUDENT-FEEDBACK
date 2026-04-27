import React, { useState, useContext } from 'react';
import { User, Lock, UserPlus, Mail, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        password: '',
        role: 'student'
    });
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const user = await register(formData.fullName, formData.email, formData.password, formData.role);
            if (user.role === 'ADMIN' || user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/student/feedback');
            }
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Create Account</h1>
                    <p>Join the EduFeedback community</p>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="input-wrapper">
                            <User className="input-icon" size={20} />
                            <input
                                type="text"
                                className="auth-input"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                className="auth-input"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={20} />
                            <input
                                type="password"
                                className="auth-input"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="role-selector">
                        <button
                            type="button"
                            className={`role-btn ${formData.role === 'student' ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, role: 'student' })}
                        >
                            Student
                        </button>
                        <button
                            type="button"
                            className={`role-btn ${formData.role === 'admin' ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, role: 'admin' })}
                        >
                            Admin
                        </button>
                    </div>

                    <button type="submit" className="btn-primary">
                        <UserPlus size={20} /> Register
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? 
                        <a href="#" className="auth-link" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
                            Login here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
