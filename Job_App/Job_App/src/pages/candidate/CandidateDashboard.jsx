// // src/pages/candidate/CandidateDashboard.jsx
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../../css/CandidateDashboard.css";
// import CandidateDashboardImg from "../../assets/CandidateDashboard.jpg";
// import { useJob } from "../../Contexts/JobContext";
// import { useApplication } from "../../Contexts/ApplicationContext";

// const statusMap = {
//   WAITING: { label: "In Review", className: "status-review" },
//   SHORTLISTED: { label: "Shortlisted", className: "status-shortlisted" },
//   ACCEPTED: { label: "Accepted", className: "status-shortlisted" },
//   REJECTED: { label: "Declined", className: "status-declined" },
// };

// const CandidateDashboard = () => {
//   const navigate = useNavigate();
//   const { getAllJobs } = useJob();
//   const { getMyApplications } = useApplication();

//   const [jobs, setJobs] = useState([]);
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     document.body.classList.add("jobs-body");
//     loadDashboardData();
//     return () => document.body.classList.remove("jobs-body");
//   }, []);

//   const loadDashboardData = async () => {
//     const jobsRes = await getAllJobs();
//     setJobs(jobsRes.slice(0, 3)); // show only top 3 jobs

//     const appRes = await getMyApplications();
//     setApplications(appRes);
//   };

//   const openJob = (id) => {
//     navigate(`/application/jobs/${id}`);
//   };

//   return (
//     <div className="cd-page">
//       {/* Sidebar */}
//       <aside className="cd-sidebar">
//         <nav className="cd-nav">

//           <button
//             className="cd-nav-item"
//             onClick={() => navigate("/candidate/applications")}
//           >
//             <i className="bi bi-file-earmark-text" />
//             <span>My Applications</span>
//           </button>

//           <button
//             className="cd-nav-item"
//             onClick={() => navigate("/application/jobs")}
//           >
//             <i className="bi bi-briefcase" />
//             <span>Find Jobs</span>
//           </button>

//           <button className="cd-nav-item">
//             <i className="bi bi-person" />
//             <span>My Profile</span>
//           </button>
//         </nav>

//         <div className="cd-sidebar-illustration">
//           <img src={CandidateDashboardImg} alt="Candidate dashboard" />
//         </div>
//       </aside>

//       {/* Main */}
//       <main className="cd-main">
//         <header className="cd-header">
//           <h1 className="cd-welcome">Welcome back 👋</h1>
//         </header>

//         {/* Job List */}
//         <section className="cd-section">
//           <div className="cd-section-header">
//             <h2 className="cd-section-title">Job List</h2>
//             <button
//               className="cd-link-button"
//               onClick={() => navigate("/application/jobs")}
//             >
//               View All <span className="cd-arrow">→</span>
//             </button>
//           </div>

//           <div className="cd-job-cards">
//             {jobs.map((job) => (
//               <button
//                 key={job.id}
//                 className="cd-job-card"
//                 onClick={() => openJob(job.id)}
//               >
//                 <span className="cd-job-chip-top">
//                   {job.is_active ? "Open" : "Closed"}
//                 </span>
//                 <h3 className="cd-job-title">{job.title}</h3>
//                 <p className="cd-job-location">{job.location}</p>
//                 <span className="cd-job-chip-bottom">Apply Now</span>
//               </button>
//             ))}
//           </div>
//         </section>

//         {/* Applications */}
//         <section className="cd-section cd-section-history">
//           <div className="cd-section-header">
//             <h2 className="cd-section-title">
//               Recent Applications History
//             </h2>
//           </div>

//           <div className="cd-history-list">
//             {applications.map((item) => {
//               const app = item.JobApplications;
//               const statusInfo =
//                 statusMap[app.status] || statusMap.WAITING;

//               return (
//                 <div key={app.id} className="cd-history-row">
//                   <div className="cd-history-main">
//                     <h3 className="cd-history-title">{item.title}</h3>
//                     <p className="cd-history-location">
//                       {item.location}
//                     </p>
//                   </div>

//                   <div className="cd-history-meta">
//                     <div className="cd-history-date">
//                       <span className="cd-history-label">
//                         Date Applied
//                       </span>
//                       <span className="cd-history-value">
//                         {new Date(app.applied_at).toLocaleDateString()}
//                       </span>
//                     </div>

//                     <span
//                       className={`cd-status-pill ${statusInfo.className}`}
//                     >
//                       {statusInfo.label}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {applications.length === 0 && (
//             <p style={{ padding: "16px" }}>
//               No applications submitted yet
//             </p>
//           )}

//           <div className="cd-history-footer">
//             <Link to="/candidate/applications" className="cd-link-button">
//               View all applications history{" "}
//               <span className="cd-arrow">→</span>
//             </Link>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default CandidateDashboard;
