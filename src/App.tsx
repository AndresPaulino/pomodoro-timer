import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Timer from './components/Timer';
import TaskInput from './components/TaskInput';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import useProductivityData from './hooks/useProductivityData';

const App: React.FC = () => {
  const [currentTask, setCurrentTask] = useState<{ task: string; category: string } | null>(null);
  const { sessions, dailyStats, addSession, currentStreak, updateStreak } = useProductivityData();
  const [showSettings, setShowSettings] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(() => {
    const saved = localStorage.getItem('pomodoroTime');
    return saved ? parseInt(saved, 10) : 1500; // 25 minutes default
  });
  const [breakTime, setBreakTime] = useState(() => {
    const saved = localStorage.getItem('breakTime');
    return saved ? parseInt(saved, 10) : 300; // 5 minutes default
  });

  useEffect(() => {
    localStorage.setItem('pomodoroTime', pomodoroTime.toString());
    localStorage.setItem('breakTime', breakTime.toString());
  }, [pomodoroTime, breakTime]);

  const handleTaskStart = (task: string, category: string) => {
    setCurrentTask({ task, category });
    updateStreak(); // Update streak when a new task is started
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

  const handleSettingsSave = (newPomodoroTime: number, newBreakTime: number) => {
    setPomodoroTime(newPomodoroTime);
    setBreakTime(newBreakTime);
    setShowSettings(false);
  };

  return (
    <div className='min-h-screen bg-gray-100 py-8'>
      <div className='max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold'>Pomodoro Timer</h1>
          <button onClick={() => setShowSettings(!showSettings)} className='bg-gray-200 hover:bg-gray-300 rounded-full p-2'>
            ⚙️
          </button>
        </div>
        {showSettings ? (
          <Settings pomodoroTime={pomodoroTime} breakTime={breakTime} onSave={handleSettingsSave} />
        ) : (
          <>
            <TaskInput onTaskStart={handleTaskStart} />
            {currentTask && (
              <div className='mb-4 text-center'>
                <p className='font-semibold'>Current Task: {currentTask.task}</p>
                <p className='text-gray-600'>Category: {currentTask.category}</p>
              </div>
            )}
            <Timer pomodoroTime={pomodoroTime} breakTime={breakTime} onComplete={handleTimerComplete} />
            <Analytics sessions={sessions} dailyStats={dailyStats} currentStreak={currentStreak} />
          </>
        )}
        <ToastContainer limit={1} />
      </div>
    </div>
  );
};

export default App;
