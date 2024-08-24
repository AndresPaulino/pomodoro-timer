import React, { useState } from 'react';

interface TaskInputProps {
  onTaskStart: (task: string, category: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onTaskStart }) => {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('Work');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      onTaskStart(task, category);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <div className='flex flex-col space-y-2'>
        <input
          type='text'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder='What are you working on?'
          className='p-2 border rounded'
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className='p-2 border rounded'>
          <option value='Work'>Work</option>
          <option value='Study'>Study</option>
          <option value='Personal'>Personal</option>
        </select>
        <button type='submit' className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
          Start Task
        </button>
      </div>
    </form>
  );
};

export default TaskInput;
