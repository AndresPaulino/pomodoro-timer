import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ProductivitySession } from '../hooks/useProductivityData';

interface AnalyticsProps {
  sessions: ProductivitySession[];
  currentStreak: number;
}

const Analytics: React.FC<AnalyticsProps> = ({ sessions, currentStreak }) => {
  const categorySummary = sessions.reduce((acc, session) => {
    acc[session.category] = (acc[session.category] || 0) + session.duration;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categorySummary).map(([category, duration]) => ({
    category,
    duration: Math.round(duration / 60), // Convert to minutes
  }));

  return (
    <div className='mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Productivity Analytics</h2>
      <div className='mb-4 p-4 bg-blue-100 rounded-lg'>
        <p className='text-xl font-semibold'>
          Current Streak: {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
        </p>
      </div>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey='category' />
          <YAxis label={{ value: 'Duration (minutes)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey='duration' fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
      <div className='mt-4'>
        <h3 className='text-xl font-semibold mb-2'>Recent Sessions</h3>
        <ul className='space-y-2'>
          {sessions
            .slice(-5)
            .reverse()
            .map((session) => (
              <li key={session.id} className='bg-gray-100 p-2 rounded'>
                <span className='font-medium'>{session.task}</span> -<span className='text-gray-600'> {session.category}</span> -
                <span className='text-gray-600'>{Math.round(session.duration / 60)} minutes</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Analytics;
