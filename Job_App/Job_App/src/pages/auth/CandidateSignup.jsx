import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import "../../css/Auth.css";
import AuthWave from "../../assets/Signup.jpg";

const CandidateSignup = () => {
  const navigate = useNavigate();
  const { addAuth } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addAuth({ email, password });

      // New user → onboarding / jobs
      navigate("/candidate/profile");
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <img src={AuthWave} alt="Background" className="auth-illustration" />
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-tabs">
            <button className="auth-tab auth-tab-active">Job Seeker</button>
            <Link to="/hr/login" className="auth-tab">
              Company
            </Link>
          </div>

          <h2 className="auth-title">Get more opportunities</h2>

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label">Full name</label>
              <input
                className="auth-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Email Address</label>
              <input
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input
                type="password"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-button">
              Continue
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CandidateSignup;
