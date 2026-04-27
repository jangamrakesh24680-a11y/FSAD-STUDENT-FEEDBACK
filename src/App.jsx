import React, { useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { UserCircle, LayoutDashboard, ClipboardList, BarChart3, LogOut } from 'lucide-react';
import './App.css';

import { AuthContext } from './context/AuthContext';
import AdminDashboard from './components/Admin/Dashboard';
import FormBuilder from './components/Admin/FormBuilder';
import StudentFeedback from './components/Student/FeedbackForm';
import StudentResults from './components/Student/ResultsView';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  const activeTab = location.pathname.split('/').pop() || 'dashboard';

  return (
    <div className="app-layout">
      <nav className="glass sidebar">
        <div className="sidebar-header">
          <h2 className="gradient-text">EduFeedback</h2>
        </div>

        <div className="sidebar-links">
          {(user.role === 'admin' || user.role === 'ADMIN') && (
            <>
              <button
                className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => navigate('/admin/dashboard')}
              >
                <LayoutDashboard size={20} /> Dashboard
              </button>
              <button
                className={`nav-link ${activeTab === 'forms' ? 'active' : ''}`}
                onClick={() => navigate('/admin/forms')}
              >
                <ClipboardList size={20} /> Form Builder
              </button>
            </>
          )}

          {(user.role === 'student' || user.role === 'STUDENT') && (
            <>
              <button
                className={`nav-link ${activeTab === 'feedback' ? 'active' : ''}`}
                onClick={() => navigate('/student/feedback')}
              >
                <ClipboardList size={20} /> My Feedback
              </button>
              <button
                className={`nav-link ${activeTab === 'results' ? 'active' : ''}`}
                onClick={() => navigate('/student/results')}
              >
                <BarChart3 size={20} /> View Results
              </button>
            </>
          )}
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <UserCircle size={24} />
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      <main className="content-area">
        <header className="content-header glass">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1')}</h1>
          <div className="header-actions">
            <div className="badge">{user.role.toUpperCase()}</div>
          </div>
        </header>

        <section className="main-view animate-fade-in">
          <Routes>
            {(user.role === 'admin' || user.role === 'ADMIN') && (
              <>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/forms" element={<FormBuilder />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
              </>
            )}
            {(user.role === 'student' || user.role === 'STUDENT') && (
              <>
                <Route path="/student/feedback" element={<StudentFeedback />} />
                <Route path="/student/results" element={<StudentResults />} />
                <Route path="*" element={<Navigate to="/student/feedback" replace />} />
              </>
            )}
          </Routes>
        </section>
      </main>

      <style>{`
        .user-details { display: flex; flex-direction: column; }
        .user-name { font-weight: 600; font-size: 0.9rem; }
        .user-role { font-size: 0.75rem; color: var(--text-muted); text-transform: capitalize; }
      `}</style>
    </div>
  );
}

export default App;
