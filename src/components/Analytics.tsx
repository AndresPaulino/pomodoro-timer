import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ProductivitySession } from '../hooks/useProductivityData';

interface AnalyticsProps {
  sessions: ProductivitySession[];
  dailyStats: { date: string; totalTime: number }[];
  currentStreak: number;
}

type TimeRange = 'daily' | 'weekly' | 'monthly';

const Analytics: React.FC<AnalyticsProps> = ({ sessions, dailyStats, currentStreak }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');

  const chartData = useMemo(() => {
    const now = new Date();
    const timeRanges = {
      daily: 7,
      weekly: 4,
      monthly: 12,
    };

    const data = new Array(timeRanges[timeRange])
      .fill(0)
      .map((_, index) => {
        const date = new Date(now);
        date.setDate(date.getDate() - index * (timeRange === 'daily' ? 1 : 7));
        const dateStr = date.toISOString().split('T')[0];

        if (timeRange === 'daily') {
          const stat = dailyStats.find((s) => s.date === dateStr);
          return { date: dateStr, totalTime: stat ? Math.round(stat.totalTime / 60) : 0 };
        } else {
          const weekStart = new Date(date);
          weekStart.setDate(weekStart.getDate() - weekStart.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekEnd.getDate() + 6);

          const totalTime = dailyStats.reduce((sum, stat) => {
            const statDate = new Date(stat.date);
            if (statDate >= weekStart && statDate <= weekEnd) {
              return sum + stat.totalTime;
            }
            return sum;
          }, 0);

          return { date: dateStr, totalTime: Math.round(totalTime / 60) };
        }
      })
      .reverse();

    return data;
  }, [dailyStats, timeRange]);

  return (
    <div className='mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Productivity Analytics</h2>
      <div className='mb-4 p-4 bg-blue-100 rounded-lg'>
        <p className='text-xl font-semibold'>
          Current Streak: {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
        </p>
      </div>
      <div className='mb-4'>
        <select value={timeRange} onChange={(e) => setTimeRange(e.target.value as TimeRange)} className='p-2 border rounded'>
          <option value='daily'>Daily</option>
          <option value='weekly'>Weekly</option>
          <option value='monthly'>Monthly</option>
        </select>
      </div>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey='date' />
          <YAxis label={{ value: 'Total Time (minutes)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='totalTime' stroke='#8884d8' />
        </LineChart>
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
