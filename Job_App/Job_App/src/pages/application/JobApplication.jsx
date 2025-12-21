// src/pages/application/JobApplication.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/JobApplication.css";
import ApplicationImg from "../../assets/Application.jpg";
import { useApplication } from "../../Contexts/ApplicationContext";

const JobApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { applyJob } = useApplication();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    currentTitle: "",
    linkedin: "",
    portfolio: "",
    additionalInfo: "",
  });

  useEffect(() => {
    document.body.classList.add("jobs-body");
    return () => document.body.classList.remove("jobs-body");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data={
      name:form.fullName,
      linkedin_url:form.linkedin,
      addtional_info:form.additionalInfo,
      current_job_title:form.currentTitle,
      mobile_number:form.phone,
      profile_url:form.portfolio,
      job_id:jobId
    }
    await applyJob(data);

    navigate(`/application/jobs/${jobId}/apply/success`);
  };

  return (
    <div className="ja-page">
      <header className="ja-header">
        <div>
          <h1 className="ja-job-title">Apply for Job</h1>
        </div>
        <h2 className="ja-header-title">Submit your application</h2>
      </header>

      <form className="ja-form" onSubmit={handleSubmit}>
        {/* Left column */}
        <div className="ja-form-left">
          <div className="ja-field">
            <label className="ja-label">Full name</label>
            <input
              name="fullName"
              className="ja-input"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="ja-field">
            <label className="ja-label">Phone number</label>
            <input
              name="phone"
              className="ja-input"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="ja-field">
            <label className="ja-label">Current job title</label>
            <input
              name="currentTitle"
              className="ja-input"
              value={form.currentTitle}
              onChange={handleChange}
            />
          </div>

          <div className="ja-field">
            <label className="ja-label">LinkedIn URL</label>
            <input
              name="linkedin"
              className="ja-input"
              value={form.linkedin}
              onChange={handleChange}
            />
          </div>

          <div className="ja-field">
            <label className="ja-label">Portfolio URL</label>
            <input
              name="portfolio"
              className="ja-input"
              value={form.portfolio}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Right column */}
        <div className="ja-form-right">
          <div className="ja-field">
            <label className="ja-label">Additional information</label>
            <textarea
              name="additionalInfo"
              className="ja-textarea"
              maxLength={500}
              value={form.additionalInfo}
              onChange={handleChange}
            />
            <div className="ja-textarea-footer">
              <span>Maximum 500 characters</span>
              <span>{form.additionalInfo.length} / 500</span>
            </div>
          </div>

          <button type="submit" className="ja-submit-btn">
            Submit Application
          </button>

          <div className="ja-illustration-wrap">
            <img
              src={ApplicationImg}
              alt="Job application"
              className="ja-illustration"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobApplication;
