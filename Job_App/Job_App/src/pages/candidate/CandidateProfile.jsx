// src/pages/candidate/CandidateProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../../css/CandidateProfile.css";
import MyProfileImg from "../../assets/Myprofile.jpg";
import CandidateProfileForm from "./CandidateProfileForm";
import { useUser } from "../../Contexts/UserContext";

const CandidateProfile = () => {
  const navigate = useNavigate();
  const { getUserById, addUser, updateUser } = useUser();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔑 read cookie once
  const isNewUser = Cookies.get("is_new") === "true";

  useEffect(() => {
    document.body.classList.add("jobs-body");

    // only fetch profile if NOT new user
    if (!isNewUser) {
      loadProfile();
    }

    return () => document.body.classList.remove("jobs-body");
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getUserById();
      if (res) {
        setProfile(res.user);
      }
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  };

  const handleSaveProfile = async (data) => {
    setLoading(true);
    try {
      if (isNewUser) {
        // 🆕 FIRST TIME → ADD
        const res = await addUser(data);
        setProfile(res);
        

        // mark user as no longer new
        Cookies.set("is_new", "false");
      } else {
        // ✏️ EXISTING → UPDATE
        await updateUser({
          user_id: profile.id,
          ...data,
        });

        await loadProfile();
      }
    } catch (err) {
      console.error("Profile save failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cd-page">
      {/* Sidebar */}
      <aside className="cd-sidebar">
        <nav className="cd-nav">
          <button
            className="cd-nav-item"
            onClick={() => navigate("/candidate/applications")}
          >
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

          <button className="cd-nav-item cd-nav-item-active">
            <i className="bi bi-person" />
            <span>My Profile</span>
          </button>
        </nav>

        <div className="cd-sidebar-illustration">
          <img src={MyProfileImg} alt="Profile illustration" />
        </div>
      </aside>

      {/* Main */}
      <main className="cd-main">
        <header className="cd-header">
          <h1 className="cd-page-title">My Profile</h1>
        </header>

        {!isNewUser && profile && (
          <section className="cp-hero-card">
            <h2 className="cp-name">{profile.name}</h2>
            <p className="cp-role">{profile.domain}</p>
            <p className="cp-location">
              Experience: {profile.experience} year(s)
            </p>
          </section>
        )}

        <CandidateProfileForm
          profile={profile}
          onSubmit={handleSaveProfile}
          loading={loading}
        />
      </main>
    </div>
  );
};

export default CandidateProfile;
