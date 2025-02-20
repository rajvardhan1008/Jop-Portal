import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JobSelector from './components/JobSelector';
import JobSeekerSignup from './components/Forms/JobSeekerSigup';
import JobProviderSignup from './components/Forms/JobProviderSignup'
import AllJobs from './components/Jobs/AllJobs';
import AllSeekers from './components/Seeker/AllSeekers';
import CreateJob from './components/Forms/CreateJob';
import ProviderJobs from './components/Provider/ProviderJobs';
import History from './components/Seeker/History';
import SeekerProfile from './components/Seeker/SeekerProfile';
import ProviderProfile from './components/Provider/ProviderProfile';
import SeekerHome from './components/Seeker/SeekerHome';
import ProviderHome from './components/Provider/ProviderHome';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<JobSelector />} />

      <Route path="/job-seeker/signup" element={<JobSeekerSignup />} />

      <Route path="/job-seeker/home" element={<SeekerHome />} />

      <Route path="/job-seeker/alljobs" element = {<AllJobs></AllJobs>} ></Route>

      <Route path="/job-provider/signup" element={<JobProviderSignup></JobProviderSignup>} ></Route>

      <Route path="/job-provider/home" element={<ProviderHome />} />

      <Route path="/job-provider/createjob" element={<CreateJob></CreateJob>} ></Route>

      <Route path="/job-provider/jobs"  element = {<ProviderJobs></ProviderJobs>}></Route>

      <Route path="/job-seeker/allseekers" element = {<AllSeekers></AllSeekers>} ></Route>

      <Route path="/job-seeker/history" element = {<History></History>} ></Route>

      <Route path="/job-seeker/profile" element = {<SeekerProfile></SeekerProfile>} ></Route>

      <Route path="/job-provider/profile" element = {<ProviderProfile></ProviderProfile>} ></Route>    

    </Routes>
  );
};

export default App;
