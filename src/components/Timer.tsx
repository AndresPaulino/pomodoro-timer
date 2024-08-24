import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface TimerProps {
  initialTime: number;
  onComplete: (duration: number) => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onComplete }) => {
  const [time, setTime] = useState<number>(initialTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        setElapsedTime((prevElapsed) => prevElapsed + 1);
      }, 1000);
    } else if (time === 0) {
      if (interval) clearInterval(interval);
      toast.success('Pomodoro session completed!');
      onComplete(elapsedTime);
      setElapsedTime(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, onComplete, elapsedTime]);

  const toggleTimer = (): void => {
    setIsActive(!isActive);
  };

  const resetTimer = (): void => {
    setTime(initialTime);
    setIsActive(false);
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='text-center p-6 bg-gray-100 rounded-lg shadow-md'>
      <h1 className='text-6xl font-bold mb-4 text-gray-800'>{formatTime(time)}</h1>
      <div className='space-x-4'>
        <button
          className={`px-4 py-2 rounded-md text-white font-semibold ${
            isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          }`}
          onClick={toggleTimer}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className='px-4 py-2 rounded-md text-white font-semibold bg-blue-500 hover:bg-blue-600' onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
