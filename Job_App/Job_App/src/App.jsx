import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './Components/navbar';
import Hero from './Components/Hero';
import Footer from './Components/Footer';
import CandidateLogin from './pages/auth/CandidateLogin';
import CandidateSignup from './pages/auth/CandidateSignup';
import ApplicationJobs from './pages/application/ApplicationJobs';
import JobDescription from './pages/application/JobDescription';
import JobApplication from './pages/application/JobApplication';
import ApplicationSuccess from './pages/application/ApplicationSuccess';
import HrLogin from './pages/auth/HrLogin';
import HrDashboard from './pages/hr/HrDashboard';
import HrApplicants from './pages/hr/HrApplicants';
import HrJobList from './pages/hr/HrJobList';
import HrJobPost from './pages/hr/HrJobPost';
import HrJobEdit from './pages/hr/HrJobEdit';
import CandidateApplication from './pages/candidate/CandidateApplication';
import CandidateProfile from './pages/candidate/CandidateProfile';

import './css/App.css';

const App = () => {
  const location = useLocation();

  const inCandidateArea = location.pathname.startsWith('/candidate/');
  const inHrArea = location.pathname.startsWith('/hr/');

  const hideFooter = inCandidateArea || inHrArea;
  const showAuthButtons = location.pathname === '/';

  // NEW: manage body classes for footer + background
  useEffect(() => {
    if (hideFooter) {
      document.body.classList.add('no-footer');
    } else {
      document.body.classList.remove('no-footer');
    }
  }, [hideFooter]);

  return (
    <>
      <Navbar showAuthButtons={showAuthButtons} />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<CandidateLogin />} />
        {/* <Route path="/signup" element={<CandidateSignup />} /> */}

        <Route path="/application/jobs" element={<ApplicationJobs />} />
        <Route path="/application/jobs/:jobId" element={<JobDescription />} />
        <Route path="/application/jobs/:jobId/apply" element={<JobApplication />} />
        <Route path="/application/jobs/:jobId/apply/success"element={<ApplicationSuccess />}/>
        {/* <Route path="/candidate/dashboard" element={<CandidateDashboard />} /> */}
        <Route path="/hr/login" element={<HrLogin />} />
        <Route path="/hr/dashboard" element={<HrDashboard />} />
        <Route path="/hr/applicants" element={<HrApplicants />} />
        <Route path="/hr/jobs/" element={<HrJobList />} />
        <Route path="/hr/jobs/new" element={<HrJobPost />} />
        <Route path="/hr/jobs/:jobId/edit" element={<HrJobEdit />} />
        <Route path="/candidate/applications" element={<CandidateApplication />} />
        <Route path="/candidate/profile" element={<CandidateProfile />} />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
};

export default App;
