// src/pages/candidate/CandidateApplication.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/CandidateDashboard.css";
import ApplicationTrackerImg from "../../assets/Applicationtracker.jpg";
import { useApplication } from "../../Contexts/ApplicationContext";

const statusMap = {
  WAITING: { label: "In Review", className: "status-review" },
  SHORTLISTED: { label: "Shortlisted", className: "status-shortlisted" },
  ACCEPTED: { label: "Accepted", className: "status-shortlisted" },
  REJECTED: { label: "Declined", className: "status-declined" },
};

const CandidateApplication = () => {
  const navigate = useNavigate();
  const { getMyApplications } = useApplication();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    document.body.classList.add("jobs-body");
    loadApplications();
    return () => document.body.classList.remove("jobs-body");
  }, []);

  const loadApplications = async () => {
    const res = await getMyApplications();
    setApplications(res || []);
  };

  return (
    <div className="cd-page">
      {/* Sidebar */}
      <aside className="cd-sidebar">
        <nav className="cd-nav">

          <button className="cd-nav-item cd-nav-item-active">
            <i className="bi bi-file-earmark-text" />
            <span>My Applications</span>
          </button>

          <button
            className="cd-nav-item"
            onClick={() => navigate("/application/jobs")}
          >
            <i className="bi bi-briefcase" />
            <span>Find Jobs</span>
          </button>

          <button
            className="cd-nav-item"
            onClick={() => navigate("/candidate/profile")}
          >
            <i className="bi bi-person" />
            <span>My Profile</span>
          </button>
        </nav>

        <div className="cd-sidebar-illustration">
          <img
            src={ApplicationTrackerImg}
            alt="Application tracker illustration"
          />
        </div>
      </aside>

      {/* Main */}
      <main className="cd-main">
        <header className="cd-header">
          <h1 className="cd-welcome">My Applications</h1>
        </header>

        <section className="cd-section cd-section-history">
          <div className="cd-section-header">
            <h2 className="cd-section-title">
              Applications History
            </h2>
          </div>

          <div className="cd-history-list">
            {applications.map((item) => {
              const app = item.JobApplications;
              const status =
                statusMap[app.status] || statusMap.WAITING;

              return (
                <div key={app.id} className="cd-history-row">
                  <div className="cd-history-main">
                    <h3 className="cd-history-title">{item.title}</h3>
                    <p className="cd-history-location">
                      {item.location}
                    </p>
                  </div>

                  <div className="cd-history-meta">
                    <div className="cd-history-date">
                      <span className="cd-history-label">
                        Date Applied
                      </span>
                      <span className="cd-history-value">
                        {new Date(app.applied_at).toLocaleDateString()}
                      </span>
                    </div>

                    <span
                      className={`cd-status-pill ${status.className}`}
                    >
                      {status.label}
                    </span>

                    <button
                      className="cd-more-btn"
                      title="View job"
                      onClick={() =>
                        navigate(`/application/jobs/${app.job_id}`)
                      }
                    >
                      <i className="bi bi-three-dots" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {applications.length === 0 && (
            <p style={{ padding: "16px" }}>
              You haven’t applied to any jobs yet.
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default CandidateApplication;
