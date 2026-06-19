import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 import axios from "axios";
import Layout from "../components/Layout";
import QRCode from "react-qr-code";
function MyForms() {
  // FORMS STATE
  const [forms, setForms] = useState([]);
  const [search, setSearch] = useState("");
const [showQR, setShowQR] = useState(null);
  // LOAD FORMS


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

    console.log("API Response:", res.data);

    setForms(
      Array.isArray(res.data)
        ? res.data
        : res.data.forms || []
    );
  } catch (err) {
    console.error(err);
  }
};

  // DELETE FORM
  const deleteForm = (id) => {
    const confirmDelete = window.confirm("Delete this form?");
    if (!confirmDelete) return;

    const updatedForms = forms.filter((form) => form._id !== id);
    setForms(updatedForms);
    localStorage.setItem("forms", JSON.stringify(updatedForms));
  };

  // SHARE FORM LINK
const copyLink = (id) => {
  const url = `${window.location.origin}/form/${id}`;

  navigator.clipboard.writeText(url);

  alert("Form link copied successfully!");
};

  // SEARCH FILTER
 const filteredForms = Array.isArray(forms)
  ? forms.filter((form) =>
      form.title?.toLowerCase().includes(search.toLowerCase())
    )
  : [];
  console.log("forms =", forms);
  console.log("filteredForms =", filteredForms);

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        .mf-root {
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
          .mf-root { padding: 2.5rem; }
        }

        .mf-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.28;
          animation: mf-drift 14s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .mf-orb-1 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, #6c3de8, #3b1fa3);
          top: -180px; left: -140px;
        }
        .mf-orb-2 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, #06b6d4, #0e7490);
          bottom: -160px; right: -120px;
          animation-delay: -5s;
        }
        @keyframes mf-drift {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(30px, 24px) scale(1.06); }
        }

        .mf-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .mf-content { position: relative; z-index: 10; }

        /* HEADER */
        .mf-header {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          justify-content: space-between;
          margin-bottom: 2.25rem;
        }
        @media (min-width: 768px) {
          .mf-header { flex-direction: row; align-items: center; }
        }
        .mf-eyebrow {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #67e8f9;
          margin: 0 0 0.5rem;
        }
        .mf-title {
          font-size: 2.6rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin: 0 0 0.6rem;
          background: linear-gradient(135deg, #fff 40%, #67e8f9 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @media (min-width: 768px) {
          .mf-title { font-size: 3rem; }
        }
        .mf-subtitle {
          color: rgba(255,255,255,0.45);
          font-size: 1.05rem;
          margin: 0;
        }

        .mf-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.92rem;
          text-decoration: none;
          color: #fff;
          background: linear-gradient(135deg, #7c3aed, #c026d3);
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
          transition: transform 0.15s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .mf-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 26px rgba(124, 58, 237, 0.5);
        }

        /* SEARCH */
        .mf-search-wrap {
          margin-bottom: 2.25rem;
          max-width: 440px;
        }
        .mf-search-inner { position: relative; }
        .mf-search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.3);
          display: flex;
          pointer-events: none;
        }
        .mf-search-input {
          width: 100%;
          box-sizing: border-box;
          padding: 0.85rem 1rem 0.85rem 2.9rem;
          border-radius: 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .mf-search-input::placeholder { color: rgba(255,255,255,0.25); }
        .mf-search-input:focus {
          border-color: rgba(6, 182, 212, 0.6);
          background: rgba(6, 182, 212, 0.06);
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.15);
        }

        /* EMPTY STATE */
        .mf-empty {
          background: rgba(255,255,255,0.035);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 4rem 1.5rem;
          text-align: center;
          box-shadow: 0 24px 60px rgba(0,0,0,0.35);
        }
        .mf-empty-icon {
          width: 68px; height: 68px;
          margin: 0 auto 1.5rem;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(124,58,237,0.18), rgba(6,182,212,0.18));
          display: flex; align-items: center; justify-content: center;
          color: #a5f3fc;
        }
        .mf-empty h2 { font-size: 1.8rem; font-weight: 700; margin: 0 0 0.6rem; }
        .mf-empty p { color: rgba(255,255,255,0.4); margin: 0 0 1.75rem; font-size: 1rem; }

        /* FORMS GRID */
        .mf-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .mf-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1280px) {
          .mf-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .mf-card {
          position: relative;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 22px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
          overflow: hidden;
        }
        .mf-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #7c3aed, #06b6d4);
          opacity: 0.7;
        }
        .mf-card:hover {
          transform: translateY(-4px);
          border-color: rgba(103, 232, 249, 0.35);
          box-shadow: 0 16px 36px rgba(6, 182, 212, 0.16);
        }

        .mf-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.1rem;
        }
        .mf-card-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0 0 0.35rem;
          color: #fff;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .mf-card-id {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.32);
          margin: 0;
        }
        .mf-card-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          flex-shrink: 0;
          background: linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.2));
          display: flex; align-items: center; justify-content: center;
          color: #c4b5fd;
        }

        .mf-card-desc {
          color: rgba(255,255,255,0.45);
          font-size: 0.92rem;
          line-height: 1.6;
          margin: 0 0 1.4rem;
          min-height: 64px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

        .mf-badges { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 1.4rem; }
        .mf-badge {
          padding: 0.4rem 0.85rem;
          border-radius: 10px;
          font-size: 0.78rem;
          font-weight: 600;
        }
        .mf-badge-fields {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.65);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .mf-badge-active {
          background: rgba(34, 197, 94, 0.14);
          color: #86efac;
          border: 1px solid rgba(34, 197, 94, 0.25);
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }
        .mf-badge-active .dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 6px #4ade80;
        }

        /* CARD ACTIONS */
       .mf-card-actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  margin-top: auto;
}
        .mf-action {
          text-align: center;
          padding: 0.65rem;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.85rem;
          text-decoration: none;
          border: 1px solid transparent;
          cursor: pointer;
          transition: transform 0.15s, opacity 0.2s, background 0.2s;
          font-family: 'Inter', sans-serif;
        }
        .mf-action:hover { transform: translateY(-1px); }
        .mf-action-open {
          background: linear-gradient(135deg, #7c3aed, #a78bfa);
          color: #fff;
        }
        .mf-action-responses {
          background: rgba(6, 182, 212, 0.14);
          color: #67e8f9;
          border-color: rgba(6, 182, 212, 0.3);
        }
        .mf-action-edit {
          background: rgba(234, 179, 8, 0.14);
          color: #fde047;
          border-color: rgba(234, 179, 8, 0.3);
        }
        .mf-action-delete {
          background: rgba(239, 68, 68, 0.12);
          color: #fca5a5;
          border-color: rgba(239, 68, 68, 0.28);
        }
        .mf-action-delete:hover { background: rgba(239, 68, 68, 0.22); }

        .mf-action-share {
  background: rgba(168, 85, 247, 0.14);
  color: #d8b4fe;
  border-color: rgba(168, 85, 247, 0.3);
}

.mf-action-share:hover {
  background: rgba(168, 85, 247, 0.22);
}

.mf-action-qr {
  background: rgba(16, 185, 129, 0.14);
  color: #6ee7b7;
  border-color: rgba(16, 185, 129, 0.3);
}

.mf-action-qr:hover {
  background: rgba(16, 185, 129, 0.22);
}

.mf-qr-box {
  margin-top: 1rem;
  background: white;
  padding: 12px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
}
      `}</style>

      <div className="mf-root">
        <div className="mf-orb mf-orb-1" />
        <div className="mf-orb mf-orb-2" />
        <div className="mf-grid-overlay" />

        <div className="mf-content">
          {/* HEADER */}
          <div className="mf-header">
            <div>
              <p className="mf-eyebrow">Form library</p>
              <h1 className="mf-title">My Forms</h1>
              <p className="mf-subtitle">Manage all your created forms easily</p>
            </div>

            <Link to="/create-form" className="mf-btn-primary">
              + Create New Form
            </Link>
          </div>

          {/* SEARCH */}
          <div className="mf-search-wrap">
            <div className="mf-search-inner">
              <span className="mf-search-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search forms..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mf-search-input"
              />
            </div>
          </div>

          {/* EMPTY STATE */}
          {filteredForms.length === 0 ? (
            <div className="mf-empty">
              <div className="mf-empty-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="13" x2="15" y2="13" />
                  <line x1="9" y1="17" x2="13" y2="17" />
                </svg>
              </div>
              <h2>No forms found</h2>
              <p>Create your first amazing form now.</p>
              <Link to="/create-form" className="mf-btn-primary">
                Create Form
              </Link>
            </div>
          ) : (
            /* FORMS GRID */
            <div className="mf-grid">
              {filteredForms.map((form) => (
                <div key={form._id} className="mf-card">
                  {/* TOP */}
                  <div className="mf-card-top">
                    <div style={{ minWidth: 0 }}>
                      <h2 className="mf-card-title">{form.title || "Untitled Form"}</h2>
                      <p className="mf-card-id">ID: {form._id}</p>
                    </div>
                    <div className="mf-card-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="9" y1="13" x2="15" y2="13" />
                        <line x1="9" y1="17" x2="13" y2="17" />
                      </svg>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="mf-card-desc">
                    {form.description || "No description available"}
                  </p>

                  {/* STATS */}
                  <div className="mf-badges">
                    <span className="mf-badge mf-badge-fields">
                      Fields: {form.fields.length}
                    </span>
                    <span className="mf-badge mf-badge-active">
                      <span className="dot" /> Active
                    </span>
                  </div>

                  {/* BUTTONS */}
                <div className="mf-card-actions">
                  {showQR === form._id && (
  <div className="mf-qr-box">
    <QRCode
      value={`${window.location.origin}/form/${form._id}`}
      size={120}
    />
  </div>
)}
  <Link
    to={`/form/${form._id}`}
    className="mf-action mf-action-open"
  >
    Open
  </Link>

  <Link
    to={`/responses/${form._id}`}
    className="mf-action mf-action-responses"
  >
    Responses
  </Link>

  <Link
    to={`/edit-form/${form._id}`}
    className="mf-action mf-action-edit"
  >
    Edit
  </Link>

  <button
    onClick={() => copyLink(form._id)}
    className="mf-action mf-action-share"
  >
    Share
  </button>

  <button
  onClick={() =>
    setShowQR(
      showQR === form._id ? null : form._id
    )
  }
  className="mf-action mf-action-qr"
>
  QR
</button>

  <button
    onClick={() => deleteForm(form._id)}
    className="mf-action mf-action-delete"
  >
    Delete
  </button>
</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default MyForms;