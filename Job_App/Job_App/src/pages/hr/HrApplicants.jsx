// src/pages/hr/HrApplicants.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/HrApplicants.css';
import ApplicantsImg from '../../assets/Applicants.jpg';

const HrApplicants = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(true);

  const PAGE_SIZE = 10;

  useEffect(() => {
    document.body.classList.add('jobs-body');
    return () => document.body.classList.remove('jobs-body');
  }, []);

  useEffect(() => {
    setLoading(true);

    const allMock = [
      {
        id: 1,
        name: 'Tony Stark',
        date: '2025-10-30',
        role: 'Azure Developer',
      },
      {
        id: 2,
        name: 'John Wick',
        date: '2025-11-07',
        role: 'SDE-1',
      },
      {
        id: 3,
        name: 'Clark Kent',
        date: '2025-07-11',
        role: 'Social Media Assistant',
      },
    ];

    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const slice = allMock.slice(start, end);

    setRows(slice);
    setHasNextPage(end < allMock.length);
    setLoading(false);
  }, [page]);

  const formatDate = (value) => {
    if (!value) return '';
    return new Date(value).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const handleNext = () => {
    if (hasNextPage) setPage((p) => p + 1);
  };

  return (
    <div className="hr-layout">
      {/* Sidebar (same pattern as dashboard) */}
      <aside className="hr-sidebar">
        <nav className="hr-nav">
          <Link to="/hr/dashboard" className="hr-nav-item">
            <i className="bi bi-grid-1x2" />
            <span>Dashboard</span>
          </Link>

          <Link to="/hr/applicants" className="hr-nav-item hr-nav-item-active">
            <i className="bi bi-people" />
            <span>Applicants</span>
          </Link>

          <Link to="/hr/jobs" className="hr-nav-item">
            <i className="bi bi-list-task" />
            <span>Job Listing</span>
          </Link>
        </nav>

        <div className="hra-illustration-wrap">
          <img
            src={ApplicantsImg}
            alt="Applicants illustration"
            className="hra-illustration"
          />
        </div>
      </aside>

      {/* Main column */}
      <div className="hra-main-wrap">
        <header className="hra-header">
          <h1 className="hra-title">Applicants</h1>
        </header>

        <main className="hra-main">
          <div className="hra-card">
            <table className="hra-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Applied Date</th>
                  <th>Job Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center' }}>
                      Loading applicants...
                    </td>
                  </tr>
                )}

                {!loading && rows.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center' }}>
                      No applicants found.
                    </td>
                  </tr>
                )}

                {!loading &&
                  rows.map((r) => (
                    <tr key={r.id}>
                      <td>{r.name}</td>
                      <td>{formatDate(r.date)}</td>
                      <td>{r.role}</td>
                      <td>
                        <button className="hra-see-btn">
                          See Application
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="hra-pagination">
              <button
                className="hra-page-arrow"
                onClick={handlePrev}
                disabled={page === 1}
              >
                {'<'}
              </button>
              <button className="hra-page-number active">{page}</button>
              <button
                className="hra-page-arrow"
                onClick={handleNext}
                disabled={!hasNextPage}
              >
                {'>'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HrApplicants;
