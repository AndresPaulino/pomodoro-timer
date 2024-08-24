import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Timer from './components/Timer';

const App: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-200 flex items-center justify-center'>
      <div className='max-w-md w-full'>
        <Timer initialTime={1500} />
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;
