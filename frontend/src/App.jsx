import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JobSelector from './components/JobSelector';
import JobSeekerSignup from './components/Forms/JobSeekerSigup';
import JobProviderSignup from './components/Forms/JobProviderSignup'
import AllJobs from './components/Jobs/AllJobs';
import AllSeekers from './components/Seeker/AllSeekers';
import CreateJob from './components/Forms/CreateJob';
import ProviderJobs from './components/Provider/ProviderJobs';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<JobSelector />} />

      <Route path="/job-seeker/signup" element={<JobSeekerSignup />} />

      <Route path="job-seeker/alljobs" element = {<AllJobs></AllJobs>} ></Route>

      <Route path="job-provider/signup" element={<JobProviderSignup></JobProviderSignup>} ></Route>

      <Route path="/job-provider/createjob" element={<CreateJob></CreateJob>} ></Route>

      <Route path="job-provider/jobs"  element = {<ProviderJobs></ProviderJobs>}></Route>

      <Route path="job-seeker/allseekers" element = {<AllSeekers></AllSeekers>} ></Route>

    </Routes>
  );
};

export default App;
