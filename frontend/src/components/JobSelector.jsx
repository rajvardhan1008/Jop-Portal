import React from 'react';
import {useNavigate } from 'react-router-dom';

const JobSelector = () => {

  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-zinc-900 text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-lg p-6 flex flex-col gap-6 bg-zinc-800 rounded-2xl shadow-lg items-center">
        <div
          onClick = {() => navigate('/job-seeker/signup')}
          to="/job-seeker/signup"
          className="w-64 h-16 bg-indigo-600 hover:bg-indigo-500 text-xl font-semibold text-white rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          👨‍💼 Job Seeker
        </div>
        <div
          onClick={() => navigate('job-provider/signup')}
          to="/job-provider/signup"
          className="w-64 h-16 bg-green-600 hover:bg-green-500 text-xl font-semibold text-white rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          🏢 Job Provider
        </div>
      </div>

    </div>
  );
};

export default JobSelector;
