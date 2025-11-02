import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import axios from 'axios';

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    axios.get('https://reddit-research-tool.onrender.com/analytics')
      .then(res => setAnalytics(res.data))
      .catch(err => console.error('Error loading analytics:', err));
  }, []);

  if (!analytics) return <p className="text-center mt-10 text-gray-500">Loading analytics...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📊 Reddit Research Dashboard</h1>

      {/* Top Subreddits */}
      <div className="bg-white p-4 rounded-2xl shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-3">Top Subreddits</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.topSubreddits}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Authors */}
      <div className="bg-white p-4 rounded-2xl shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-3">Top Authors</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.topAuthors}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalScore" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Keywords */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-3">Top Keywords</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.topKeywords}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
