// src/pages/application/JobDescription.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/JobDescription.css";
import { useJob } from "../../Contexts/JobContext";

const JobDescription = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { getJobById } = useJob();

  const [job, setJob] = useState(null);

  useEffect(() => {
    document.body.classList.add("jobs-body");
    loadJob();
    return () => document.body.classList.remove("jobs-body");
  }, []);

  const loadJob = async () => {
    const res = await getJobById(jobId);
    setJob(res);
  };

  const goToApply = () => {
    navigate(`/application/jobs/${job.id}/apply`);
  };

  if (!job) return null;

  return (
    <div className="jd-page">
      {/* Top card */}
      <section className="jd-header-card">
        <div>
          <h1 className="jd-title">{job.title}</h1>
          <p className="jd-meta">{job.location}</p>
        </div>

        {job.is_active && (
          <div className="jd-header-actions">
            <button className="jd-apply-btn" onClick={goToApply}>
              Apply
            </button>
          </div>
        )}
      </section>

      {/* Main layout */}
      <div className="jd-layout">
        <section className="jd-main">
          <h2 className="jd-section-title">Description</h2>
          <p className="jd-paragraph">{job.description}</p>

          <h2 className="jd-section-title">Job Details</h2>
          <p className="jd-line">
            <b>Location:</b> {job.location}
          </p>
          <p className="jd-line">
            <b>Posted by:</b> {job.email}
          </p>
          <p className="jd-line">
            <b>Posted on:</b>{" "}
            {new Date(job.created_at).toLocaleDateString()}
          </p>
        </section>
      </div>
    </div>
  );
};

export default JobDescription;
