import React, { useState } from 'react';

interface SettingsProps {
  pomodoroTime: number;
  breakTime: number;
  onSave: (newPomodoroTime: number, newBreakTime: number) => void;
}

const Settings: React.FC<SettingsProps> = ({ pomodoroTime, breakTime, onSave }) => {
  const [newPomodoroTime, setNewPomodoroTime] = useState(pomodoroTime);
  const [newBreakTime, setNewBreakTime] = useState(breakTime);

  const handleSave = () => {
    onSave(newPomodoroTime, newBreakTime);
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Settings</h2>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='pomodoroTime'>
          Pomodoro Duration (minutes):
        </label>
        <input
          id='pomodoroTime'
          type='number'
          value={newPomodoroTime / 60}
          onChange={(e) => setNewPomodoroTime(Number(e.target.value) * 60)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='breakTime'>
          Break Duration (minutes):
        </label>
        <input
          id='breakTime'
          type='number'
          value={newBreakTime / 60}
          onChange={(e) => setNewBreakTime(Number(e.target.value) * 60)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <button
        onClick={handleSave}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      >
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
