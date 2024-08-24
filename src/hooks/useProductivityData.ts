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
  addSession: (session: Omit<ProductivitySession, 'id' | 'date'>) => void;
  removeSession: (id: string) => void;
}

const useProductivityData = (): ProductivityData => {
  const [sessions, setSessions] = useState<ProductivitySession[]>([]);

  useEffect(() => {
    const storedSessions = localStorage.getItem('productivitySessions');
    if (storedSessions) {
      setSessions(JSON.parse(storedSessions, (key, value) => (key === 'date' ? new Date(value) : value)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('productivitySessions', JSON.stringify(sessions));
  }, [sessions]);

  const addSession = (session: Omit<ProductivitySession, 'id' | 'date'>): void => {
    setSessions((prevSessions) => [
      ...prevSessions,
      {
        ...session,
        id: Date.now().toString(),
        date: new Date(),
      },
    ]);
  };

  const removeSession = (id: string): void => {
    setSessions((prevSessions) => prevSessions.filter((session) => session.id !== id));
  };

  const totalTime = sessions.reduce((sum, session) => sum + session.duration, 0);

  return { sessions, totalTime, addSession, removeSession };
};

export default useProductivityData;
