import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Info } from 'lucide-react';
import api from '../../utils/api';

const StudentResults = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await api.get('/student/forms');
                // Mock aggregated data for now since we don't have a complex endpoint
                const aggregated = res.data.map(f => ({
                    id: f.id,
                    title: f.title,
                    totalResponses: 15, // Mock number
                    pieData: [
                        { name: 'Rating 5', value: 8 },
                        { name: 'Rating 4', value: 4 },
                        { name: 'Rating 3', value: 3 }
                    ]
                }));
                setResults(aggregated);
            } catch (err) {
                console.error("Failed to fetch results", err);
            }
        };
        fetchResults();
    }, []);

    const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#22c55e'];

    return (
        <div className="results-container">
            <div className="glass-card mb-2">
                <div className="flex items-center gap-1">
                    <Info size={20} className="text-primary" />
                    <p>These results represent the aggregated feedback from your fellow students to help you make informed decisions about your courses.</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2rem">
                {results.length === 0 ? (
                    <div className="glass-card col-span-2 text-center py-4">
                        <p className="text-muted">No aggregated results available yet. Be the first to provide feedback!</p>
                    </div>
                ) : (
                    results.map(res => (
                        <div key={res.id} className="glass-card">
                            <h4>{res.title}</h4>
                            <p className="text-muted small mb-1">{res.totalResponses} Students Participated</p>

                            <div style={{ height: '250px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={res.pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {res.pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                        />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <style>{`
        .mb-2 { margin-bottom: 2rem; }
        .mb-1 { margin-bottom: 1rem; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .gap-1 { gap: 1rem; }
        .text-primary { color: var(--primary); }
        .grid { display: grid; }
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .gap-2rem { gap: 2rem; }
        .col-span-2 { grid-column: span 2 / span 2; }
        .text-center { text-align: center; }
        .py-4 { padding: 4rem 0; }
        .text-muted { color: var(--text-muted); }
        .small { font-size: 0.85rem; }
      `}</style>
        </div>
    );
};

export default StudentResults;
