import React, { useState, useContext } from 'react';
import { User, Lock, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const user = await login(email, password);
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
                <h2 className="gradient-text mb-2">Welcome Back</h2>
                <p className="text-muted mb-2">Sign in to your EduFeedback account</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-field mb-1">
                        <User size={18} className="field-icon" />
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-field mb-2">
                        <Lock size={18} className="field-icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-error mb-1">{error}</p>}

                    <button type="submit" className="btn btn-primary w-full">
                        <LogIn size={18} className="mr-1" /> Login
                    </button>
                </form>

                <p className="mt-2 small text-muted">
                    Don't have an account? <span className="link-text" onClick={() => navigate('/register')}>Register here</span>
                </p>
            </div>

            <style>{`
        .login-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; width: 100%; }
        .login-card { width: 100%; max-width: 400px; padding: 3rem; text-align: center; }
        .auth-form { margin-top: 2rem; }
        .input-field {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0 1rem;
          transition: var(--transition);
        }
        .input-field:focus-within { border-color: var(--primary); background: rgba(255, 255, 255, 0.1); }
        .field-icon { color: var(--text-muted); margin-right: 0.75rem; }
        .input-field input {
          width: 100%;
          padding: 0.85rem 0;
          background: transparent;
          border: none;
          color: white;
          outline: none;
        }
        .link-text { color: var(--primary); cursor: pointer; font-weight: 600; text-decoration: underline; }
        .link-text:hover { color: var(--secondary); }
      `}</style>
        </div>
    );
};

export default Login;
