// src/pages/application/ApplicationJobs.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobsHeroImg from "../../assets/Jobs.jpg";
import "../../css/Jobs.css";
import { useJob } from "../../Contexts/JobContext";

const ApplicationJobs = () => {
  const navigate = useNavigate();
  const { getAllJobs } = useJob();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    document.body.classList.add("jobs-body");
    loadJobs();
    return () => document.body.classList.remove("jobs-body");
  }, []);

  const loadJobs = async () => {
    const data = await getAllJobs(); // already unwrapped in context
    setJobs(data || []);
  };

  const openJob = (jobId) => {
    navigate(`/application/jobs/${jobId}`);
  };

  return (
    <div className="jobs-page">
      {/* Top hero */}
      
      <div className="jobs-hero">
        <div className="jobs-hero-left">
          <h1 className="jobs-title">
            Find your <span>dream job</span>
          </h1>

          <div className="jobs-search-bar">
            <div className="jobs-search-item">
              <i className="bi bi-search jobs-search-icon" />
              <input
                className="jobs-search-input"
                placeholder="Job title or keyword"
              />
            </div>

            <div className="jobs-search-item">
              <i className="bi bi-geo-alt jobs-search-icon" />
              <select className="jobs-search-select">
                <option>Chennai, India</option>
                <option>Hyderabad, India</option>
                <option>Bangalore, India</option>
                <option>Remote</option>
              </select>
            </div>

            <button className="jobs-search-btn">Search</button>
          </div>
        </div>

        <div className="jobs-hero-right">
          <img
            src={JobsHeroImg}
            alt="Job search illustration"
            className="jobs-hero-image"
          />
        </div>
      </div>

      {/* Main layout */}
      <div className="jobs-layout">
        {/* Filters (UI only for now) */}
        <aside className="jobs-filters">
          <div className="jobs-filter-group">
            <div className="jobs-filter-header">
              <p className="jobs-filter-title">Type of Employment</p>
              <i className="bi bi-chevron-up" />
            </div>
            <label className="jobs-filter-option">
              <input type="checkbox" /> Full-time
            </label>
            <label className="jobs-filter-option">
              <input type="checkbox" /> Remote
            </label>
            <label className="jobs-filter-option">
              <input type="checkbox" /> Internship
            </label>
            <label className="jobs-filter-option">
              <input type="checkbox" /> Contract
            </label>
          </div>
        </aside>

        {/* Job cards */}
        <main className="jobs-results">
          <div className="jobs-results-header">
            <h2>All Jobs</h2>
          </div>

          {jobs.map((job) => (
            <div key={job.Jobs.id} className="job-card">
              <div>
                <h3 className="job-title">{job.Jobs.title}</h3>
                <p className="job-description">{job.Jobs.description}</p>
                <p className="job-location">{job.Jobs.location}</p>

                {!job.Jobs.is_active && (
                  <span className="job-tag">Closed</span>
                )}
              </div>

              <button
                className="job-apply-btn"
                disabled={!job.Jobs.is_active}
                onClick={() => openJob(job.Jobs.id)}
              >
                View
              </button>
            </div>
          ))}

          {jobs.length === 0 && (
            <p style={{ padding: "20px" }}>No jobs available</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default ApplicationJobs;
