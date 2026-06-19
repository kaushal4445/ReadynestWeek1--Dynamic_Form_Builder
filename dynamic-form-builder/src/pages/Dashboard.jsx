import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const [loading, setLoading] = useState(true);

function Dashboard() {

  const navigate = useNavigate();
  // GET FORMS
const [forms, setForms] = useState([]);

  // GET RESPONSES
  const responses = JSON.parse(localStorage.getItem("responses")) || [];

  // TOTAL VIEWS
  const totalViews = forms.length * 35;

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");

  window.location.href = "/";
};
 

  useEffect(() => {
  fetchForms();
}, []);

const fetchForms = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://form-builder-backend-bdv0.onrender.com/api/forms",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setForms(
      Array.isArray(res.data)
        ? res.data
        : res.data.forms || []
    );
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

console.log("Dashboard Forms State:", forms);
const user = JSON.parse(localStorage.getItem("user"));

const userName = user?.name || "User";
  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        .dash-root {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: #0a0a1a;
          padding: 1.5rem;
          border-radius: 1.5rem;
          color: #fff;
        }
        @media (min-width: 768px) {
          .dash-root { padding: 2.5rem; }
        }

        .dash-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.28;
          animation: dash-drift 14s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .dash-orb-1 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, #6c3de8, #3b1fa3);
          top: -180px; left: -140px;
        }
        .dash-orb-2 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, #06b6d4, #0e7490);
          bottom: -160px; right: -120px;
          animation-delay: -5s;
        }
        @keyframes dash-drift {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(30px, 24px) scale(1.06); }
        }

        .dash-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .dash-content { position: relative; z-index: 10; }

        /* HEADER */
        .dash-header {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          justify-content: space-between;
          margin-bottom: 3rem;
        }
        @media (min-width: 1024px) {
          .dash-header { flex-direction: row; align-items: center; }
        }
        .dash-eyebrow {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #a78bfa;
          margin: 0 0 0.5rem;
        }
        .dash-title {
          font-size: 2.6rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin: 0 0 0.6rem;
          background: linear-gradient(135deg, #fff 40%, #c4b5fd 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @media (min-width: 768px) {
          .dash-title { font-size: 3.2rem; }
        }
        .dash-subtitle {
          color: rgba(255,255,255,0.45);
          font-size: 1.05rem;
          margin: 0;
        }

        /* ACTION BUTTONS */
        .dash-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .dash-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.4rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          border: 1px solid transparent;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.2s, background 0.2s, border-color 0.2s;
        }
        .dash-btn:hover { transform: translateY(-2px); }
        .dash-btn-primary {
          background: linear-gradient(135deg, #7c3aed, #c026d3);
          color: #fff;
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
        }
        .dash-btn-primary:hover { box-shadow: 0 8px 26px rgba(124, 58, 237, 0.5); }
        .dash-btn-secondary {
          background: rgba(6, 182, 212, 0.12);
          color: #67e8f9;
          border-color: rgba(6, 182, 212, 0.3);
        }
        .dash-btn-secondary:hover { background: rgba(6, 182, 212, 0.2); }
        .dash-btn-ghost {
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.7);
          border-color: rgba(255,255,255,0.1);
        }
        .dash-btn-ghost:hover {
          background: rgba(239, 68, 68, 0.12);
          color: #fca5a5;
          border-color: rgba(239, 68, 68, 0.3);
        }

        /* STATS */
        .dash-stats {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        @media (min-width: 768px) {
          .dash-stats { grid-template-columns: repeat(3, 1fr); }
        }
        .stat-card {
          position: relative;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 1.75rem;
          overflow: hidden;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .stat-card:hover { transform: translateY(-4px); }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--stat-color);
          opacity: 0.8;
        }
        .stat-card.stat-violet { --stat-color: linear-gradient(90deg, #7c3aed, #a78bfa); }
        .stat-card.stat-violet:hover { border-color: rgba(167, 139, 250, 0.4); box-shadow: 0 12px 32px rgba(124, 58, 237, 0.18); }
        .stat-card.stat-cyan { --stat-color: linear-gradient(90deg, #06b6d4, #67e8f9); }
        .stat-card.stat-cyan:hover { border-color: rgba(103, 232, 249, 0.4); box-shadow: 0 12px 32px rgba(6, 182, 212, 0.18); }
        .stat-card.stat-pink { --stat-color: linear-gradient(90deg, #db2777, #f472b6); }
        .stat-card.stat-pink:hover { border-color: rgba(244, 114, 182, 0.4); box-shadow: 0 12px 32px rgba(219, 39, 119, 0.18); }

        .stat-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255,255,255,0.45);
          font-size: 0.85rem;
          font-weight: 500;
          margin: 0 0 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .stat-icon {
          width: 30px; height: 30px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-violet .stat-icon { background: rgba(124, 58, 237, 0.15); color: #a78bfa; }
        .stat-cyan .stat-icon { background: rgba(6, 182, 212, 0.15); color: #67e8f9; }
        .stat-pink .stat-icon { background: rgba(219, 39, 119, 0.15); color: #f472b6; }

        .stat-value {
          font-size: 2.75rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .stat-violet .stat-value { color: #c4b5fd; }
        .stat-cyan .stat-value { color: #67e8f9; }
        .stat-pink .stat-value { color: #f472b6; }

        /* PANEL */
        .dash-panel {
          background: rgba(255,255,255,0.035);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 24px 60px rgba(0,0,0,0.35);
        }
        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.75rem;
        }
        .panel-title { font-size: 1.5rem; font-weight: 700; margin: 0; letter-spacing: -0.01em; }
        .panel-link {
          color: #67e8f9;
          font-weight: 600;
          font-size: 0.88rem;
          text-decoration: none;
          transition: color 0.15s;
        }
        .panel-link:hover { color: #a5f3fc; }

        /* EMPTY STATE */
        .empty-state { text-align: center; padding: 4rem 1rem; }
        .empty-icon {
          width: 64px; height: 64px;
          margin: 0 auto 1.5rem;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(124,58,237,0.18), rgba(192,38,211,0.18));
          display: flex; align-items: center; justify-content: center;
          color: #c4b5fd;
        }
        .empty-state h2 { font-size: 1.7rem; font-weight: 700; margin: 0 0 0.6rem; }
        .empty-state p { color: rgba(255,255,255,0.4); margin: 0 0 1.75rem; font-size: 1rem; }

        /* FORM ROW */
        .form-list { display: flex; flex-direction: column; gap: 1rem; }
        .form-row {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          justify-content: space-between;
          transition: border-color 0.25s, background 0.25s, transform 0.2s;
        }
        @media (min-width: 1024px) {
          .form-row { flex-direction: row; align-items: center; }
        }
        .form-row:hover {
          border-color: rgba(167, 139, 250, 0.35);
          background: rgba(255,255,255,0.05);
        }
        .form-info { max-width: 640px; }
        .form-title { font-weight: 700; font-size: 1.2rem; margin: 0 0 0.4rem; color: #fff; }
        .form-desc {
          color: rgba(255,255,255,0.4);
          margin: 0 0 0.5rem;
          font-size: 0.92rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .form-meta { color: rgba(255,255,255,0.3); font-size: 0.8rem; margin: 0; }
        .form-row-actions { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .form-btn {
          padding: 0.6rem 1.1rem;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.85rem;
          text-decoration: none;
          transition: transform 0.15s, opacity 0.2s;
        }
        .form-btn:hover { transform: translateY(-1px); }
        .form-btn-open {
          background: linear-gradient(135deg, #7c3aed, #a78bfa);
          color: #fff;
        }
        .form-btn-responses {
          background: rgba(6, 182, 212, 0.14);
          color: #67e8f9;
          border: 1px solid rgba(6, 182, 212, 0.3);
        }
          .welcome-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
}

.welcome-wave {
  font-size: 42px;
  animation: wave 2s infinite;
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  15% { transform: rotate(14deg); }
  30% { transform: rotate(-8deg); }
  45% { transform: rotate(14deg); }
  60% { transform: rotate(-4deg); }
  75% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
}

.welcome-text {
  font-size: 18px;
  color: rgba(255,255,255,0.65);
  margin: 0;
  font-weight: 500;
}

.welcome-name {
  margin: 0;
  font-size: 42px;
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(
    90deg,
    #06b6d4,
    #8b5cf6,
    #ec4899
  );
  background-size: 300% 300%;
  animation: gradientMove 6s ease infinite;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
      `}</style>

      <div className="dash-root">
        <div className="dash-orb dash-orb-1" />
        <div className="dash-orb dash-orb-2" />
        <div className="dash-grid-overlay" />

        <div className="dash-content">
          {/* HEADER */}
          <div className="dash-header">
           <div>
  <p className="dash-eyebrow">Workspace overview</p>

  <div className="welcome-wrap">
    <span className="welcome-wave">👋</span>

    <div>
      <h2 className="welcome-text">
        Hello,
      </h2>

      <h1 className="welcome-name">
        {userName}
      </h1>
    </div>
  </div>

  <p className="dash-subtitle">
    Welcome back! Manage your forms and responses.
  </p>
</div>

          <div className="flex gap-4">

  <Link
    to="/create-form"
    className="bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-xl font-bold"
  >
    + Create Form
  </Link>

  <Link
    to="/analytics"
    className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold"
  >
    Analytics
  </Link>

  <Link
    to="/pricing"
    className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
  >
    ⭐ Upgrade to Premium
  </Link>

              <button onClick={handleLogout} className="dash-btn dash-btn-ghost">
                Logout
              </button>
            </div>
          </div>

          {/* STATS */}
          <div className="dash-stats">
            <div className="stat-card stat-violet">
              <p className="stat-label">
                <span className="stat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </span>
                Total Forms
              </p>
              <p className="stat-value">{forms.length}</p>
            </div>

            <div className="stat-card stat-cyan">
              <p className="stat-label">
                <span className="stat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </span>
                Responses
              </p>
              <p className="stat-value">{responses.length}</p>
            </div>

            <div className="stat-card stat-pink">
              <p className="stat-label">
                <span className="stat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
                Views
              </p>
              <p className="stat-value">{totalViews}</p>
            </div>
          </div>

          {/* RECENT FORMS */}
          <div className="dash-panel">
            <div className="panel-header">
              <h2 className="panel-title">Recent Forms</h2>
              <Link to="/my-forms" className="panel-link">View All</Link>
            </div>

            {  loading ? (
  <div className="text-center py-10">
    <h2>Loading Forms...</h2>
  </div>
) :  forms.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="11" x2="12" y2="17" />
                    <line x1="9" y1="14" x2="15" y2="14" />
                  </svg>
                </div>
                <h2>No forms yet</h2>
                <p>Create your first form to start collecting responses.</p>
                <Link to="/create-form" className="dash-btn dash-btn-primary">
                  Create Form
                </Link>
              </div>
            ) : (
              <div className="form-list">
                {forms.slice(-5).reverse().map((form) => (
                  <div key={form._id} className="form-row">
                    <div className="form-info">
                      <h3 className="form-title">{form.title || "Untitled Form"}</h3>
                      <p className="form-desc">{form.description || "No description"}</p>
                      <p className="form-meta">Fields: {form.fields.length}</p>
                    </div>

                    <div className="form-row-actions">
                      <Link to={`/form/${form._id}`} className="form-btn form-btn-open">
                        Open
                      </Link>
                      <Link to={`/responses/${form._id}`} className="form-btn form-btn-responses">
                        Responses
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;