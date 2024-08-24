import { useState, useEffect } from 'react';

export interface ProductivitySession {
  id: string;
  date: Date;
  duration: number;
  category: string;
  task: string;
}

export interface ProductivityData {
  sessions: ProductivitySession[];
  totalTime: number;
  currentStreak: number;
  addSession: (session: Omit<ProductivitySession, 'id' | 'date'>) => void;
  removeSession: (id: string) => void;
}

const useProductivityData = (): ProductivityData => {
  const [sessions, setSessions] = useState<ProductivitySession[]>([]);
  const [currentStreak, setCurrentStreak] = useState<number>(0);

  useEffect(() => {
    const storedSessions = localStorage.getItem('productivitySessions');
    const storedStreak = localStorage.getItem('currentStreak');
    if (storedSessions) {
      setSessions(JSON.parse(storedSessions, (key, value) => (key === 'date' ? new Date(value) : value)));
    }
    if (storedStreak) {
      setCurrentStreak(parseInt(storedStreak, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('productivitySessions', JSON.stringify(sessions));
    localStorage.setItem('currentStreak', currentStreak.toString());
  }, [sessions, currentStreak]);

  const addSession = (session: Omit<ProductivitySession, 'id' | 'date'>): void => {
    const newSession = {
      ...session,
      id: Date.now().toString(),
      date: new Date(),
    };
    setSessions((prevSessions) => [...prevSessions, newSession]);

    // Update streak
    const lastSession = sessions[sessions.length - 1];
    const oneDayInMs = 24 * 60 * 60 * 1000;
    if (lastSession && new Date(newSession.date).getTime() - new Date(lastSession.date).getTime() <= oneDayInMs) {
      setCurrentStreak((prevStreak) => prevStreak + 1);
    } else {
      setCurrentStreak(1);
    }
  };

  const removeSession = (id: string): void => {
    setSessions((prevSessions) => prevSessions.filter((session) => session.id !== id));
  };

  const totalTime = sessions.reduce((sum, session) => sum + session.duration, 0);

  return { sessions, totalTime, currentStreak, addSession, removeSession };
};

export default useProductivityData;
