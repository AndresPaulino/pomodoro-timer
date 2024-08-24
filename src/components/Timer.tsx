import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

interface TimerProps {
  pomodoroTime: number;
  breakTime: number;
  onComplete: (duration: number) => void;
}

type TimerState = 'pomodoro' | 'break' | 'idle';

const Timer: React.FC<TimerProps> = ({ pomodoroTime, breakTime, onComplete }) => {
  const [time, setTime] = useState<number>(pomodoroTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [timerState, setTimerState] = useState<TimerState>('idle');

  const resetTimer = useCallback((duration: number) => {
    setTime(duration);
    setElapsedTime(0);
    setIsActive(false);
  }, []);

  const startPomodoro = useCallback(() => {
    resetTimer(pomodoroTime);
    setTimerState('pomodoro');
    setIsActive(true);
  }, [pomodoroTime, resetTimer]);

  const startBreak = useCallback(() => {
    resetTimer(breakTime);
    setTimerState('break');
    setIsActive(true);
  }, [breakTime, resetTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        setElapsedTime((prevElapsed) => prevElapsed + 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      if (interval) clearInterval(interval);
      if (timerState === 'pomodoro') {
        toast.success('Pomodoro completed! Time for a break.');
        onComplete(elapsedTime);
      } else if (timerState === 'break') {
        toast.info('Break time over. Ready for another Pomodoro?');
      }
      setIsActive(false);
      setTimerState('idle');
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, onComplete, elapsedTime, timerState]);

  const toggleTimer = (): void => {
    setIsActive(!isActive);
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='text-center p-6 bg-gray-100 rounded-lg shadow-md'>
      <h1 className={`text-6xl font-bold mb-4 ${timerState === 'break' ? 'text-green-500' : 'text-gray-800'}`}>
        {formatTime(time)}
      </h1>
      <div className='space-x-4'>
        {timerState === 'idle' && (
          <button className='px-4 py-2 rounded-md text-white font-semibold bg-blue-500 hover:bg-blue-600' onClick={startPomodoro}>
            Start Pomodoro
          </button>
        )}
        {timerState === 'pomodoro' && isActive && (
          <button className='px-4 py-2 rounded-md text-white font-semibold bg-red-500 hover:bg-red-600' onClick={toggleTimer}>
            Pause
          </button>
        )}
        {timerState === 'pomodoro' && !isActive && time !== pomodoroTime && (
          <button className='px-4 py-2 rounded-md text-white font-semibold bg-green-500 hover:bg-green-600' onClick={toggleTimer}>
            Resume
          </button>
        )}
        {timerState === 'idle' && time === 0 && (
          <button className='px-4 py-2 rounded-md text-white font-semibold bg-green-500 hover:bg-green-600' onClick={startBreak}>
            Start Break
          </button>
        )}
        {timerState === 'break' && (
          <button
            className='px-4 py-2 rounded-md text-white font-semibold bg-yellow-500 hover:bg-yellow-600'
            onClick={toggleTimer}
          >
            {isActive ? 'Pause Break' : 'Resume Break'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;
