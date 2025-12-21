// src/pages/hr/HrJobList.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/HrJobList.css';
import { NetWorkCalls } from '../../Networks/network';

const mockJobs = [
  {
    id: 1,
    role: 'Social Media Assistant',
    status: 'Live',
    datePosted: '2020-05-20',
    dueDate: '2020-05-24',
    jobType: 'Fulltime',
  },
  {
    id: 2,
    role: 'Social Media Assistant',
    status: 'Closed',
    datePosted: '2020-05-20',
    dueDate: '2020-05-24',
    jobType: 'Fulltime',
  },
  {
    id: 3,
    role: 'Social Media Assistant',
    status: 'Live',
    datePosted: '2020-05-20',
    dueDate: '2020-05-24',
    jobType: 'Fulltime',
  },
];

const HrJobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('jobs-body');
    return () => document.body.classList.remove('jobs-body');
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await NetWorkCalls({
          endpoint: 'jobs/',
          method: 'GET',
          baseBackendUrl: "http://localhost:8001",
          ignoreCookie: true
        });

        // Map backend data to frontend model
        const mappedJobs = data.map(job => ({
          id: job.id,
          role: job.title,
          status: job.is_active ? 'Live' : 'Closed',
          datePosted: new Date().toISOString(), // Mock as current date if backend doesn't send
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Mock +7 days
          jobType: Array.isArray(job.employment_types) ? job.employment_types.join(', ') : (job.employment_types || 'Full-Time')
        }));

        setJobs(mappedJobs);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      }
    };
    fetchJobs();
  }, []);

  const formatDate = (value) =>
    new Date(value).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const handleEdit = (jobId) => {
    navigate(`/hr/jobs/${jobId}/edit`);
  };

  return (
    <div className="hr-layout">
      <aside className="hr-sidebar">
        <nav className="hr-nav">
          <Link to="/hr/dashboard" className="hr-nav-item">
            <i className="bi bi-grid-1x2" />
            <span>Dashboard</span>
          </Link>
          <Link to="/hr/applicants" className="hr-nav-item">
            <i className="bi bi-people" />
            <span>All Applicants</span>
          </Link>
          <Link to="/hr/jobs" className="hr-nav-item hr-nav-item-active">
            <i className="bi bi-list-task" />
            <span>Job Listing</span>
          </Link>
        </nav>
      </aside>

      <div className="hrjl-main-wrap">
        <header className="hrjl-header">
          <h1 className="hrjl-title">Job Listing</h1>
        </header>

        <main className="hrjl-main">
          <table className="hrjl-table">
            <thead>
              <tr>
                <th>Roles</th>
                <th>Status</th>
                <th>Date Posted</th>
                <th>Due Date</th>
                <th>Job Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.role}</td>
                  <td>
                    <span
                      className={
                        job.status === 'Live'
                          ? 'hrjl-status-badge live'
                          : 'hrjl-status-badge closed'
                      }
                    >
                      {job.status}
                    </span>
                  </td>
                  <td>{formatDate(job.datePosted)}</td>
                  <td>{formatDate(job.dueDate)}</td>
                  <td>
                    <span className="hrjl-jobtype-pill">{job.jobType}</span>
                  </td>
                  <td>
                    <button
                      className="hrjl-edit-btn"
                      onClick={() => handleEdit(job.id)}
                    >
                      Edit Job
                    </button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center' }}>
                    No jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default HrJobList;
