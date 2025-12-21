// ApplicationSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThanksImg from '../../assets/Thanks.jpg'; // adjust extension if needed
import '../../css/ApplicationSuccess.css';

const ApplicationSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('jobs-body');
    return () => document.body.classList.remove('jobs-body');
  }, []);

  const goToDashboard = () => {
    navigate('/candidate/applications');
  };

  return (
    <div className="as-page">
      <div className="as-card">
        <h1 className="as-title">Thank you for applying</h1>

        <p className="as-subtitle">
          Your application has been submitted successfully!
        </p>

        <p className="as-text">
          You can continue exploring roles or check your applications dashboard
          to see status updates.
        </p>

        <button className="as-btn-primary" onClick={goToDashboard}>
          Go to Dashboard
        </button>

        <div className="as-illustration-wrap">
          <img src={ThanksImg} alt="Thank you illustration" className="as-illustration" />
        </div>
      </div>
    </div>
  );
};

export default ApplicationSuccess;
