import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/HrDashboard.css';
import HrDashboardImg from '../../assets/HrDashboard.jpg';

const HrDashboard = () => {
  const [stats, setStats] = useState({
    jobPostings: 0,
    candidates: 0,
    applications: 0,
  });
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('jobs-body');
    return () => document.body.classList.remove('jobs-body');
  }, []);

  useEffect(() => {
    const mockStats = {
      jobPostings: 3,
      candidates: 8,
      applications: 13,
    };

    const mockJobs = [
      {
        id: 1,
        title: 'Social Media Assistant',
        location: 'Hyderabad, India',
        badge: 'Remote',
        tag: 'Marketing',
      },
      {
        id: 2,
        title: 'SDE-1',
        location: 'Chennai, India',
        badge: 'Full-Time',
        tag: 'Software Engineer',
      },
      {
        id: 3,
        title: 'Azure Developer',
        location: 'Bangalore, India',
        badge: 'Internship',
        tag: 'Software Engineer',
      },
    ];

    const mockApplicants = [
      {
        id: 1,
        name: 'Tony Stark',
        date: '2025-10-30',
        job: 'Azure Developer',
      },
      {
        id: 2,
        name: 'John Wick',
        date: '2025-11-07',
        job: 'SDE-1',
      },
      {
        id: 3,
        name: 'Clark Kent',
        date: '2025-07-11',
        job: 'Social Media Assistant',
      },
    ];

    setStats(mockStats);
    setJobs(mockJobs);
    setApplicants(mockApplicants);
    setLoading(false);
  }, []);

  const formatDate = (value) => {
    if (!value) return '';
    return new Date(value).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="hr-layout">
        <div className="hr-main-wrap">
          <main className="hr-main">
            <div className="loading-spinner">Loading dashboard...</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="hr-layout">
      {/* Sidebar with illustration at bottom */}
      <aside className="hr-sidebar">
        <nav className="hr-nav">
          <Link to="/hr/dashboard" className="hr-nav-item hr-nav-item-active">
            <i className="bi bi-grid-1x2" />
            <span>Dashboard</span>
          </Link>

          <Link to="/hr/applicants" className="hr-nav-item">
            <i className="bi bi-people" />
            <span>Applicants</span>
          </Link>

          <Link to="/hr/jobs" className="hr-nav-item">
            <i className="bi bi-list-task" />
            <span>Job Listing</span>
          </Link>
        </nav>

        <div className="hr-illustration-wrap">
          <img
            src={HrDashboardImg}
            alt="HR dashboard illustration"
            className="hr-illustration"
          />
        </div>
      </aside>

      {/* Main column */}
      <div className="hr-main-wrap">
        <main className="hr-main">
          <header className="hr-main-header">
            <h1 className="hr-main-title">Dashboard</h1>

            <button
              className="hr-post-btn"
              onClick={() => navigate('/hr/jobs/new')}
            >
              + Post a job
            </button>
          </header>

          {/* Stat cards (clickable) */}
          <section className="hr-stats">
            <div
              className="hr-stat-card hr-stat-jobs"
              onClick={() => navigate('/hr/jobs')}
            >
              <div>
                <p className="hr-stat-number">{stats.jobPostings}</p>
                <p className="hr-stat-label">Job Postings</p>
              </div>
              <span className="hr-stat-arrow">›</span>
            </div>

            <div
              className="hr-stat-card hr-stat-candidates"
              onClick={() => navigate('/hr/applicants')}
            >
              <div>
                <p className="hr-stat-number">{stats.candidates}</p>
                <p className="hr-stat-label">Candidates</p>
              </div>
              <span className="hr-stat-arrow">›</span>
            </div>

            <div
              className="hr-stat-card hr-stat-applications"
              onClick={() => navigate('/hr/applicants')}
            >
              <div>
                <p className="hr-stat-number">{stats.applications}</p>
                <p className="hr-stat-label">Applications</p>
              </div>
              <span className="hr-stat-arrow">›</span>
            </div>
          </section>

          {/* Job Listing preview */}
          <section className="hr-section">
            <div className="hr-section-header">
              <h2>Job Listing</h2>
              <button
                className="hr-link-button"
                onClick={() => navigate('/hr/jobs')}
              >
                View All →
              </button>
            </div>

            <div className="hr-job-cards">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="hr-job-card"
                  onClick={() => navigate(`/hr/jobs/${job.id}/edit`)}
                >
                  <span className="hr-job-badge">
                    {job.badge || 'Full-Time'}
                  </span>
                  <p className="hr-job-title">{job.title}</p>
                  <p className="hr-job-location">{job.location}</p>
                  <span className="hr-job-tag">{job.tag}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Applicants preview */}
          <section className="hr-section">
            <div className="hr-section-header">
              <h2>Applicants</h2>
              <button
                className="hr-link-button"
                onClick={() => navigate('/hr/applicants')}
              >
                View All →
              </button>
            </div>

            <div className="hr-applicants-list">
              {applicants.map((app) => (
                <div key={app.id} className="hr-applicant-row">
                  <div className="hr-applicant-name">{app.name}</div>
                  <div className="hr-applicant-date">
                    {formatDate(app.date)}
                  </div>
                  <div className="hr-applicant-job">{app.job}</div>
                  <button
                    className="hr-see-application"
                    onClick={() => navigate('/hr/applicants')}
                  >
                    See Application
                  </button>
                  <button className="hr-more-btn">
                    <i className="bi bi-three-dots" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HrDashboard;
