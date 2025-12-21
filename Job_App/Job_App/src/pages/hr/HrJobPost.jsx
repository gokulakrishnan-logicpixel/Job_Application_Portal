import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/HrJobPost.css';
import { NetWorkCalls } from '../../Networks/network';
import JobPostImg from '../../assets/JobPost.jpg';

const EMPLOYMENT_OPTIONS = ['Full-Time', 'Part-Time', 'Remote', 'Internship'];
const LOCATION_OPTIONS = ['Hyderabad, India', 'Chennai, India', 'Bangalore, India'];

const DESCRIPTION_LIMIT = 500;
const RESPONSIBILITIES_LIMIT = 500;

const HrJobPost = () => {
  const [step, setStep] = useState(1);

  // Step 1 – Job Information
  const [jobTitle, setJobTitle] = useState('');
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [location, setLocation] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState(['Graphic Design', 'Communication', 'Illustrator']);

  // Step 2 – Job Description
  const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('jobs-body');
    return () => document.body.classList.remove('jobs-body');
  }, []);

  const toggleEmploymentType = (type) => {
    setEmploymentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    if (!skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
    }
    setSkillInput('');
  };

  const handleRemoveSkill = (skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleNext = () => {
    if (!jobTitle.trim()) {
      alert('Please enter Job Title');
      return;
    }
    if (employmentTypes.length === 0) {
      alert('Please select at least one type of employment');
      return;
    }
    if (!location) {
      alert('Please select job location');
      return;
    }
    setStep(2);
  };

  const handleBackToStep1 = () => setStep(1);

  const buildPayload = () => ({
    title: jobTitle,
    employment_types: employmentTypes,
    location,
    skills,
    description,
    responsibilities,
  });

  const handleSaveDraft = () => {
    console.log('Save draft: ', buildPayload());
    alert('Draft saved locally (connect API later).');
  };

  const handleSubmit = async () => {
    const payload = buildPayload();
    console.log('Submit job: ', payload);

    try {
      await NetWorkCalls({
        endpoint: 'jobs/',
        method: "POST",
        data: payload,
        baseBackendUrl: "http://localhost:8001", // Direct to Job Service
        ignoreCookie: true
      });
      alert('Job posted successfully!');
      navigate('/hr/jobs');
    } catch (error) {
      console.error("Failed to post job", error);
      alert('Failed to post job. Please try again.');
    }
  };

  return (
    <div className="hr-layout">
      {/* Sidebar (same base styling) */}
      <aside className="hr-sidebar">
        <nav className="hr-nav">
          <Link to="/hr/dashboard" className="hr-nav-item">
            <i className="bi bi-grid-1x2" />
            <span>Dashboard</span>
          </Link>

          <Link to="/hr/applicants" className="hr-nav-item">
            <i className="bi bi-people" />
            <span>Applicants</span>
          </Link>

          <Link to="/hr/jobs" className="hr-nav-item hr-nav-item-active">
            <i className="bi bi-list-task" />
            <span>Job Listing</span>
          </Link>
        </nav>

        <div className="hrjp-illustration-wrap">
          <img
            src={JobPostImg}
            alt="Job posting illustration"
            className="hrjp-illustration"
          />
        </div>
      </aside>

      {/* Main column */}
      <div className="hrjp-main-wrap">
        <header className="hrjp-header">
          <button
            className="hrjp-back-btn"
            onClick={() => navigate('/hr/dashboard')}
          >
            Back to Dashboard
          </button>
          <h1 className="hrjp-title">Job Posting</h1>
        </header>

        {/* Stepper */}
        <div className="hrjp-stepper">
          <div className={`hrjp-step ${step === 1 ? 'active' : ''}`}>
            <span className="hrjp-step-icon">1</span>
            <div className="hrjp-step-text">
              <div className="hrjp-step-label">Step 1/2</div>
              <div className="hrjp-step-title">Job Information</div>
            </div>
          </div>
          <div className={`hrjp-step ${step === 2 ? 'active' : ''}`}>
            <span className="hrjp-step-icon">2</span>
            <div className="hrjp-step-text">
              <div className="hrjp-step-label">Step 2/2</div>
              <div className="hrjp-step-title">Job Description</div>
            </div>
          </div>
        </div>

        <main className="hrjp-main">
          {step === 1 && (
            <section className="hrjp-section">
              {/* Job Title */}
              <div className="hrjp-row">
                <div className="hrjp-col-label">
                  <label className="hrjp-label">Job Title</label>
                  <p className="hrjp-helper">
                    Job titles must be describe one position
                  </p>
                </div>
                <div className="hrjp-col-field">
                  <input
                    className="hrjp-input"
                    placeholder="e.g. Software Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                  <p className="hrjp-hint">At least 80 characters</p>
                </div>
              </div>

              {/* Type of Employment */}
              <div className="hrjp-row">
                <div className="hrjp-col-label">
                  <label className="hrjp-label">Type of Employment</label>
                  <p className="hrjp-helper">
                    You can select multiple type of employment
                  </p>
                </div>
                <div className="hrjp-col-field hrjp-employment-grid">
                  {EMPLOYMENT_OPTIONS.map((opt) => (
                    <label key={opt} className="hrjp-checkbox">
                      <input
                        type="checkbox"
                        checked={employmentTypes.includes(opt)}
                        onChange={() => toggleEmploymentType(opt)}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="hrjp-row">
                <div className="hrjp-col-label">
                  <label className="hrjp-label">Location</label>
                  <p className="hrjp-helper">
                    You can select multiple job Location
                  </p>
                </div>
                <div className="hrjp-col-field">
                  <label className="hrjp-label">Select Job Location</label>
                  <select
                    className="hrjp-select"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">Select Job Location</option>
                    {LOCATION_OPTIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Required Skills */}
              <div className="hrjp-row">
                <div className="hrjp-col-label">
                  <label className="hrjp-label">Required Skills</label>
                  <p className="hrjp-helper">
                    Add required skills for the job
                  </p>
                </div>
                <div className="hrjp-col-field">
                  <div className="hrjp-skill-input-row">
                    <button
                      type="button"
                      className="hrjp-add-skill-btn"
                      onClick={handleAddSkill}
                    >
                      + Add Skills
                    </button>
                    <input
                      className="hrjp-input"
                      placeholder="Type a skill and press Add"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                  </div>

                  <div className="hrjp-skill-chips">
                    {skills.map((skill) => (
                      <span key={skill} className="hrjp-skill-chip">
                        {skill}
                        <button
                          type="button"
                          className="hrjp-skill-remove"
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hrjp-actions-right">
                <button className="hrjp-next-btn" onClick={handleNext}>
                  Next Step
                </button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="hrjp-section">
              <h2 className="hrjp-subtitle">Basic Information</h2>

              {/* Job Description */}
              <div className="hrjp-block">
                <div className="hrjp-block-label">
                  <label className="hrjp-label">Job Descriptions</label>
                  <p className="hrjp-helper">
                    Job titles must be describe one position
                  </p>
                </div>
                <div className="hrjp-block-editor">
                  <textarea
                    className="hrjp-textarea"
                    placeholder="Enter job description"
                    value={description}
                    onChange={(e) =>
                      setDescription(
                        e.target.value.slice(0, DESCRIPTION_LIMIT)
                      )
                    }
                  />
                  <div className="hrjp-toolbar">
                    <span>B</span>
                    <span>I</span>
                    <span>•</span>
                    <span>1.</span>
                    <span>🔗</span>
                  </div>
                  <div className="hrjp-counter">
                    {description.length} / {DESCRIPTION_LIMIT}
                  </div>
                </div>
              </div>

              {/* Summary & Responsibilities */}
              <div className="hrjp-block">
                <div className="hrjp-block-label">
                  <label className="hrjp-label">Summary & Responsibilities</label>
                  <p className="hrjp-helper">
                    Outline the core responsibilities of the position
                  </p>
                </div>
                <div className="hrjp-block-editor">
                  <textarea
                    className="hrjp-textarea"
                    placeholder="Enter job responsibilities"
                    value={responsibilities}
                    onChange={(e) =>
                      setResponsibilities(
                        e.target.value.slice(0, RESPONSIBILITIES_LIMIT)
                      )
                    }
                  />
                  <div className="hrjp-toolbar">
                    <span>B</span>
                    <span>I</span>
                    <span>•</span>
                    <span>1.</span>
                    <span>🔗</span>
                  </div>
                  <div className="hrjp-counter">
                    {responsibilities.length} / {RESPONSIBILITIES_LIMIT}
                  </div>
                </div>
              </div>

              <div className="hrjp-actions">
                <button
                  className="hrjp-secondary-btn"
                  onClick={handleBackToStep1}
                >
                  Back
                </button>
                <div className="hrjp-actions-right">
                  <button
                    type="button"
                    className="hrjp-secondary-btn"
                    onClick={handleSaveDraft}
                  >
                    Save changes
                  </button>
                  <button
                    type="button"
                    className="hrjp-primary-btn"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default HrJobPost;
