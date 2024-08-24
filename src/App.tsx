import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Timer from './components/Timer';
import TaskInput from './components/TaskInput';
import Analytics from './components/Analytics';
import useProductivityData from './hooks/useProductivityData';

const App: React.FC = () => {
  const [currentTask, setCurrentTask] = useState<{ task: string; category: string } | null>(null);
  const { sessions, addSession, currentStreak } = useProductivityData();

  const handleTaskStart = (task: string, category: string) => {
    setCurrentTask({ task, category });
  };

  const handleTimerComplete = (duration: number) => {
    if (currentTask) {
      addSession({
        task: currentTask.task,
        category: currentTask.category,
        duration,
      });
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 py-8'>
      <div className='max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Pomodoro Timer</h1>
        <TaskInput onTaskStart={handleTaskStart} />
        {currentTask && (
          <div className='mb-4 text-center'>
            <p className='font-semibold'>Current Task: {currentTask.task}</p>
            <p className='text-gray-600'>Category: {currentTask.category}</p>
          </div>
        )}
        <Timer onComplete={handleTimerComplete} />
        <Analytics sessions={sessions} currentStreak={currentStreak} />
        <ToastContainer limit={1} />
      </div>
    </div>
  );
};

export default App;
