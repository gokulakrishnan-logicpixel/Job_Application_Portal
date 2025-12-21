// src/pages/candidate/CandidateProfileForm.jsx
import React, { useState, useEffect } from "react";

const CandidateProfileForm = ({ profile, onSubmit, loading }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    mobile_no: "",
    dob: "",
    experience: "",
    domain: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        user_id:profile.user_id || "",
        name: profile.name || "",
        description: profile.description || "",
        mobile_no: profile.mobile_no || "",
        dob: profile.dob || "",
        experience: profile.experience || "",
        domain: profile.domain || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="cp-card" onSubmit={submit}>
      <h3 className="cp-card-title">Edit Profile</h3>

      <div className="cp-field">
        <label className="cp-label">Full Name</label>
        <input
          name="name"
          className="cp-input"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="cp-field">
        <label className="cp-label">About</label>
        <textarea
          name="description"
          className="cp-textarea"
          rows={4}
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="cp-field">
        <label className="cp-label">Mobile Number</label>
        <input
          name="mobile_no"
          className="cp-input"
          value={form.mobile_no}
          onChange={handleChange}
          required
        />
      </div>

      <div className="cp-field">
        <label className="cp-label">Date of Birth</label>
        <input
          type="date"
          name="dob"
          className="cp-input"
          value={form.dob}
          onChange={handleChange}
        />
      </div>

      <div className="cp-field">
        <label className="cp-label">Experience (Years)</label>
        <input
          type="number"
          name="experience"
          className="cp-input"
          min={0}
          value={form.experience}
          onChange={handleChange}
        />
      </div>

      <div className="cp-field">
        <label className="cp-label">Domain</label>
        <input
          name="domain"
          className="cp-input"
          value={form.domain}
          onChange={handleChange}
          placeholder="Backend, Frontend, DevOps"
        />
      </div>

      <div className="cp-actions">
        <button className="cp-primary-btn" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
};

export default CandidateProfileForm;
