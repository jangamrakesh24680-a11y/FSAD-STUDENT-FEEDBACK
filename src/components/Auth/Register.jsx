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
        <div className="login-container animate-fade-in">
            <div className="glass-card login-card">
                <h2 className="gradient-text mb-2">Create Account</h2>
                <p className="text-muted mb-2">Join the EduFeedback community</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-field mb-1">
                        <User size={18} className="field-icon" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-field mb-1">
                        <Mail size={18} className="field-icon" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-field mb-1">
                        <Lock size={18} className="field-icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <div className="role-toggle mb-2">
                        <label className={`role-option ${formData.role === 'student' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="role"
                                value="student"
                                checked={formData.role === 'student'}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            />
                            Student
                        </label>
                        <label className={`role-option ${formData.role === 'admin' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="role"
                                value="admin"
                                checked={formData.role === 'admin'}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            />
                            Admin
                        </label>
                    </div>

                    {error && <p className="text-error mb-1">{error}</p>}

                    <button type="submit" className="btn btn-primary w-full">
                        <UserPlus size={18} className="mr-1" /> Register
                    </button>
                </form>

                <p className="mt-2 small text-muted">
                    Already have an account? <span className="link-text" onClick={() => navigate('/login')}>Login here</span>
                </p>
            </div>

            <style>{`
        .login-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; width: 100%; }
        .login-card { width: 100%; max-width: 400px; padding: 3rem; text-align: center; }
        .role-toggle {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.25rem;
          margin-top: 1rem;
        }
        .role-option {
          flex: 1;
          padding: 0.75rem;
          cursor: pointer;
          border-radius: 10px;
          transition: var(--transition);
          font-weight: 600;
          color: var(--text-muted);
          text-align: center;
        }
        .role-option.active {
          background: var(--primary);
          color: white;
        }
        .role-option input { display: none; }
      `}</style>
        </div>
    );
};

export default Register;
