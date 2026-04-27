import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, ClipboardCheck, TrendingUp, Award, BookOpen } from 'lucide-react';
import api from '../../utils/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalFeedback: 0, totalForms: 0, totalCourses: 0, avgRating: 4.5 });
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await api.get('/admin/analytics');
                setStats({
                    totalFeedback: res.data.totalResponses || 0,
                    totalForms: res.data.totalForms || 0,
                    totalCourses: res.data.totalCourses || 0,
                    avgRating: 4.5 // Simulated average for now
                });

                // Mock chart data for now since we don't have a complex endpoint yet
                setChartData([
                    { name: 'CS101', rating: 4.2 },
                    { name: 'MATH201', rating: 3.8 },
                    { name: 'PHY102', rating: 4.6 }
                ]);
            } catch (err) {
                console.error("Failed to fetch analytics", err);
            }
        };
        fetchAnalytics();
    }, []);

    const COLORS = ['#6366f1', '#ec4899', '#8b5cf6', '#3b82f6'];

    return (
        <div className="dashboard-container">
            <div className="stats-grid">
                <div className="glass-card stat-item">
                    <div className="stat-icon primary"><Users /></div>
                    <div className="stat-info">
                        <p className="text-muted">Total Responses</p>
                        <h2>{stats.totalFeedback}</h2>
                    </div>
                </div>
                <div className="glass-card stat-item">
                    <div className="stat-icon secondary"><ClipboardCheck /></div>
                    <div className="stat-info">
                        <p className="text-muted">Active Forms</p>
                        <h2>{stats.totalForms}</h2>
                    </div>
                </div>
                <div className="glass-card stat-item">
                    <div className="stat-icon accent"><BookOpen /></div>
                    <div className="stat-info">
                        <p className="text-muted">Total Courses</p>
                        <h2>{stats.totalCourses}</h2>
                    </div>
                </div>
                <div className="glass-card stat-item">
                    <div className="stat-icon success"><Award /></div>
                    <div className="stat-info">
                        <p className="text-muted">Avg. Satisfaction</p>
                        <h2>{stats.avgRating}/5.0</h2>
                    </div>
                </div>
            </div>

            <div className="glass-card chart-section mt-2rem">
                <h3>Performance Analysis by Course</h3>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                            <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 5]} />
                            <Tooltip
                                contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="rating" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <style>{`
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
        .stat-item { display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem; }
        .stat-icon { padding: 1rem; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .stat-icon.primary { background: rgba(99, 102, 241, 0.1); color: var(--primary); }
        .stat-icon.secondary { background: rgba(236, 72, 153, 0.1); color: var(--secondary); }
        .stat-icon.accent { background: rgba(139, 92, 246, 0.1); color: var(--accent); }
        .stat-icon.success { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
        .chart-section { padding: 2rem; }
        .chart-container { margin-top: 2rem; }
      `}</style>
        </div>
    );
};

export default AdminDashboard;
