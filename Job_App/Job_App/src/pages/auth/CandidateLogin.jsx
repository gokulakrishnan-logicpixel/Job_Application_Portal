import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import "../../css/Auth.css";
import AuthWave from "../../assets/Login.jpg";

const CandidateLogin = () => {
  const navigate = useNavigate();
  const { addAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addAuth({ email, password });
      navigate("/candidate/profile");
    } catch (err) {
      console.error("Login failed", err);
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

          <h2 className="auth-title">Welcome Back</h2>

          <form onSubmit={handleSubmit}>
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
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="auth-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CandidateLogin;
