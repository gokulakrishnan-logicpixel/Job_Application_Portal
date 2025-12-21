import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";  
import "../../css/Auth.css";
import HrLoginImg from "../../assets/hrlogin.jpg";
import { useAuth } from "../../Contexts/AuthContext";
 
const HrLogin = () => {
  const navigate = useNavigate();
  const { addAuth } = useAuth();
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  useEffect(() => {
    document.body.classList.remove("jobs-body");
  }, []);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const res = await addAuth({ email, password });
      navigate("/hr/dashboard");
    } catch (err) {
      console.error("HR Login failed", err);
    }
  };
 
  return (
    <div className="auth-page">
      <div className="auth-left">
        <img src={HrLoginImg} alt="Secure HR login" className="auth-illustration" />
      </div>
 
      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-tabs mb-4">
            {/* Using Link instead of button */}
            <Link to="/login
            " className="auth-tab">
              Job Seeker
            </Link>
 
            <button className="auth-tab auth-tab-active">Company</button>
          </div>
 
          <h2 className="auth-title mb-4">Welcome Back</h2>
 
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="auth-label">Email Address</label>
              <input
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
 
            <div className="mb-3">
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
        </div>
      </div>
    </div>
  );
};
 
export default HrLogin;