 // src/pages/hr/HrJobEdit.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../css/HrJobEdit.css';
import JobEditImg from '../../assets/JobEdit.jpg';

// For now reuse same mock jobs; later you will fetch by id
const mockJobDetail = {
  title: 'Social Media Assistant',
  description:
    "I'm a product designer - filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.\n\nFor 10 years, I've specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.",
  responsibilities:
    "I'm a product designer - filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.\n\nFor 10 years, I've specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.",
  skills: ['Communication', 'Analytics', 'Facebook Ads', 'Content Planning', 'Community Manager'],
  jobType: 'Full Time',
  locations: ['Chennai', 'Bengaluru'],
};

const JOB_TYPE_OPTIONS = ['Full Time', 'Part Time', 'Contract'];
const LOCATION_OPTIONS = ['Chennai', 'Bengaluru', 'Hyderabad', 'Remote'];

const HrJobEdit = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [jobType, setJobType] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    document.body.classList.add('jobs-body');
    return () => document.body.classList.remove('jobs-body');
  }, []);

  // Load mock job by id (later replace with fetch)
  useEffect(() => {
    // In future: fetch(`/api/jobs/${jobId}`)
    const data = mockJobDetail;
    setTitle(data.title);
    setDescription(data.description);
    setResponsibilities(data.responsibilities);
    setSkills(data.skills);
    setJobType(data.jobType);
    setLocations(data.locations);
  }, [jobId]);

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

  const toggleLocation = (loc) => {
    setLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const handleSaveChanges = () => {
    const payload = {
      id: Number(jobId),
      title,
      description,
      responsibilities,
      skills,
      jobType,
      locations,
    };
    console.log('Save Job', payload);
    alert('Changes saved locally. Connect API later.');
  };

  return (
    <div className="hr-layout">
      {/* Sidebar */}
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

        <div className="hrje-illustration-wrap">
          <img
            src={JobEditImg}
            alt="Job edit illustration"
            className="hrje-illustration"
          />
        </div>
      </aside>

      {/* Main */}
      <div className="hrje-main-wrap">
        <header className="hrje-header">
          <h1 className="hrje-title">Job Listing</h1>
        </header>

        <main className="hrje-main">
          {/* Title + Edit button */}
          <section className="hrje-card">
            <div className="hrje-card-header">
              <h2 className="hrje-job-title">{title}</h2>
              <button className="hrje-outline-btn">Edit Job Details</button>
            </div>
          </section>

          {/* Job Description */}
          <section className="hrje-card">
            <div className="hrje-card-header">
              <h3>Job Description</h3>
              <button className="hrje-icon-btn">
                <i className="bi bi-pencil-square" />
              </button>
            </div>
            <textarea
              className="hrje-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </section>

          {/* Summary & Responsibilities */}
          <section className="hrje-card">
            <div className="hrje-card-header">
              <h3>Summary & Responsibilities</h3>
              <button className="hrje-icon-btn">
                <i className="bi bi-pencil-square" />
              </button>
            </div>
            <textarea
              className="hrje-textarea"
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
            />
          </section>

          {/* Skills */}
          <section className="hrje-card">
            <div className="hrje-card-header">
              <h3>Skills</h3>
              <div className="hrje-header-actions">
                <button className="hrje-square-btn">+</button>
                <button className="hrje-icon-btn">
                  <i className="bi bi-pencil-square" />
                </button>
              </div>
            </div>

            <div className="hrje-skill-input-row">
              <input
                className="hrje-input"
                placeholder="Add new skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
              <button className="hrje-add-btn" onClick={handleAddSkill}>
                Add
              </button>
            </div>

            <div className="hrje-chip-row">
              {skills.map((s) => (
                <span key={s} className="hrje-chip">
                  {s}
                  <button
                    className="hrje-chip-remove"
                    onClick={() => handleRemoveSkill(s)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </section>

          {/* Job Type */}
          <section className="hrje-card">
            <div className="hrje-card-header">
              <h3>Job Type</h3>
              <div className="hrje-header-actions">
                <button className="hrje-square-btn">+</button>
                <button className="hrje-icon-btn">
                  <i className="bi bi-pencil-square" />
                </button>
              </div>
            </div>

            <p className="hrje-label">Select Job Type</p>
            <select
              className="hrje-select"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              {JOB_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </section>

          {/* Location */}
          <section className="hrje-card">
            <div className="hrje-card-header">
              <h3>Location</h3>
              <div className="hrje-header-actions">
                <button className="hrje-square-btn">+</button>
                <button className="hrje-icon-btn">
                  <i className="bi bi-pencil-square" />
                </button>
              </div>
            </div>

            <p className="hrje-label">Select Job Location</p>
            <select
              className="hrje-select"
              onChange={(e) => {
                if (!e.target.value) return;
                toggleLocation(e.target.value);
              }}
            >
              <option value="">Select Location</option>
              {LOCATION_OPTIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <div className="hrje-chip-row">
              {locations.map((loc) => (
                <span key={loc} className="hrje-chip">
                  {loc}
                  <button
                    className="hrje-chip-remove"
                    onClick={() => toggleLocation(loc)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </section>

          <div className="hrje-actions">
            <button
              className="hrje-primary-btn"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HrJobEdit;
