import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JobSeeker from '../components/Jobs/JobSeeker';
import JobProvider from '../components/Jobs/JobProvider';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/jobseeker" element={<JobSeeker />} />
      <Route path="/jobprovider" element={<JobProvider />} />
    </Routes>
  );
};

export default AppRoutes;