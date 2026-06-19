import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
      }

      setLoading(true);

      const API_URL =
  "https://form-builder-backend-bdv0.onrender.com";

const res = await axios.post(
  `${API_URL}/api/auth/register`,
  {
    name,
    email,
    password,
  }
);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Signup Successful");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSignup();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@600;700;800&display=swap');

        * { box-sizing: border-box; }

        @keyframes su-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes su-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes su-float {
          0%, 100% { transform: translateY(0) rotate(-1.5deg); }
          50%      { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes su-pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.45); }
          70%  { box-shadow: 0 0 0 10px rgba(124, 58, 237, 0); }
          100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
        }
        @keyframes su-gradient-sweep {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes su-shine {
          0%   { transform: translateX(-120%) skewX(-12deg); }
          100% { transform: translateX(220%) skewX(-12deg); }
        }

        .su-anim-1 { opacity: 0; animation: su-fade-up 0.7s ease-out 0.05s forwards; }
        .su-anim-2 { opacity: 0; animation: su-fade-up 0.7s ease-out 0.18s forwards; }
        .su-anim-3 { opacity: 0; animation: su-fade-up 0.7s ease-out 0.3s forwards; }
        .su-anim-4 { opacity: 0; animation: su-fade-up 0.7s ease-out 0.42s forwards; }
        .su-anim-5 { opacity: 0; animation: su-fade-up 0.7s ease-out 0.54s forwards; }

        .su-root {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr;
          background: #0a0a1a;
          color: #fff;
        }
        @media (min-width: 1024px) {
          .su-root { grid-template-columns: 1.1fr 1fr; }
        }

        /* ===== LEFT: BRAND / PITCH PANEL ===== */
        .su-hero {
          position: relative;
          overflow: hidden;
          display: none;
          flex-direction: column;
          justify-content: space-between;
          padding: 3rem;
          background: radial-gradient(circle at 30% 20%, #1e1240 0%, #0a0a1a 60%);
        }
        @media (min-width: 1024px) {
          .su-hero { display: flex; }
        }

        .su-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.4;
          animation: su-drift 16s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .su-orb-1 { width: 460px; height: 460px; background: radial-gradient(circle, #7c3aed, transparent 70%); top: -120px; left: -100px; }
        .su-orb-2 { width: 380px; height: 380px; background: radial-gradient(circle, #06b6d4, transparent 70%); bottom: -100px; right: -80px; animation-delay: -6s; }
        @keyframes su-drift {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(25px, 20px) scale(1.08); }
        }

        .su-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 44px 44px;
          pointer-events: none;
        }

        .su-hero-content { position: relative; z-index: 10; }

        .su-brand-row {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          margin-bottom: 4rem;
        }
        .su-brand-mark {
          width: 40px; height: 40px;
          border-radius: 11px;
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 22px rgba(124, 58, 237, 0.45);
          flex-shrink: 0;
          animation: su-pulse-ring 2.6s ease-out infinite;
        }
        .su-brand-name {
          font-family: 'Lexend', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .su-hero-heading {
          font-family: 'Lexend', sans-serif;
          font-size: 2.6rem;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 1.1rem;
          max-width: 480px;
        }
        .su-hero-heading .accent {
          background: linear-gradient(120deg, #c4b5fd, #67e8f9, #c4b5fd);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: su-gradient-sweep 5s ease-in-out infinite;
        }
        .su-hero-sub {
          color: rgba(255,255,255,0.5);
          font-size: 1.05rem;
          line-height: 1.6;
          max-width: 440px;
          margin: 0 0 2.75rem;
        }

        .su-feature-list {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .su-feature {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .su-feature-icon {
          width: 38px; height: 38px;
          border-radius: 11px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .su-feature-icon svg { color: #a78bfa; }
        .su-feature-text { font-size: 0.92rem; color: rgba(255,255,255,0.7); }
        .su-feature-text strong { color: #fff; font-weight: 600; }

        .su-hero-footer {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .su-avatars {
          display: flex;
        }
        .su-avatar {
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 2px solid #0a0a1a;
          margin-left: -8px;
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
        }
        .su-avatar:first-child { margin-left: 0; }
        .su-hero-footer-text { font-size: 0.84rem; color: rgba(255,255,255,0.45); }
        .su-hero-footer-text strong { color: rgba(255,255,255,0.75); }

        /* FLOATING MOCKUP CARD */
        .su-mockup {
          position: absolute;
          top: 14%;
          right: 6%;
          width: 220px;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          padding: 1rem;
          box-shadow: 0 24px 50px rgba(0,0,0,0.35);
          animation: su-float 6s ease-in-out infinite;
          z-index: 5;
        }
        .su-mockup-dot-row { display: flex; gap: 5px; margin-bottom: 0.7rem; }
        .su-mockup-dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.18); }
        .su-mockup-dot:nth-child(1) { background: #f87171; }
        .su-mockup-dot:nth-child(2) { background: #fbbf24; }
        .su-mockup-dot:nth-child(3) { background: #4ade80; }
        .su-mockup-bar { height: 8px; border-radius: 5px; background: rgba(255,255,255,0.1); margin-bottom: 0.55rem; }
        .su-mockup-bar.w-80 { width: 80%; }
        .su-mockup-bar.w-60 { width: 60%; }
        .su-mockup-bar.w-100 { width: 100%; }
        .su-mockup-input {
          height: 26px;
          border-radius: 7px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 0.6rem;
        }
        .su-mockup-check {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.62rem;
          font-weight: 700;
          color: #4ade80;
          background: rgba(74, 222, 128, 0.12);
          padding: 0.3rem 0.55rem;
          border-radius: 7px;
        }

        .su-mockup-2 {
          position: absolute;
          bottom: 18%;
          left: 4%;
          width: 150px;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          padding: 0.85rem;
          box-shadow: 0 20px 44px rgba(0,0,0,0.3);
          animation: su-float 7.5s ease-in-out infinite;
          animation-delay: -2.5s;
          z-index: 5;
        }
        .su-mockup-2-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.45rem; }
        .su-mockup-2-row:last-child { margin-bottom: 0; }
        .su-mockup-2-icon {
          width: 20px; height: 20px;
          border-radius: 6px;
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          flex-shrink: 0;
        }
        .su-mockup-2-text { font-size: 0.66rem; color: rgba(255,255,255,0.55); font-weight: 600; }

        /* ===== RIGHT: FORM PANEL ===== */
        .su-form-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          position: relative;
        }
        @media (min-width: 1024px) {
          .su-form-panel { padding: 3rem; }
        }

        /* mobile-only background touch, since hero is hidden below 1024px */
        .su-form-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 80% 0%, rgba(124, 58, 237, 0.12), transparent 50%);
          pointer-events: none;
        }
        @media (min-width: 1024px) {
          .su-form-panel::before { display: none; }
        }

        .su-form-card {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 420px;
          animation: su-fade-up 0.6s ease-out 0.1s both;
        }

        .su-mobile-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 2rem;
        }
        @media (min-width: 1024px) {
          .su-mobile-brand { display: none; }
        }
        .su-mobile-brand-mark {
          width: 34px; height: 34px;
          border-radius: 10px;
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .su-mobile-brand-name {
          font-family: 'Lexend', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
        }

        .su-form-title {
          font-family: 'Lexend', sans-serif;
          font-size: 1.9rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 0 0.5rem;
        }
        .su-form-sub {
          color: rgba(255,255,255,0.45);
          font-size: 0.95rem;
          margin: 0 0 2rem;
        }

        .su-field { margin-bottom: 1.1rem; }
        .su-field label {
          display: block;
          font-size: 0.78rem;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          margin-bottom: 0.45rem;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
        .su-field-inner { position: relative; }
        .su-field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.3);
          pointer-events: none;
          display: flex;
          transition: color 0.2s;
        }
        .su-field-inner:focus-within .su-field-icon {
          color: #a78bfa;
        }
        .su-field input {
          width: 100%;
          padding: 0.78rem 1rem 0.78rem 2.75rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: #fff;
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .su-field input::placeholder { color: rgba(255,255,255,0.25); }
        .su-field input:focus {
          border-color: rgba(124, 58, 237, 0.7);
          background: rgba(124, 58, 237, 0.08);
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.18);
        }

        .su-hint {
          font-size: 0.76rem;
          color: rgba(255,255,255,0.3);
          margin: 0.4rem 0 0;
        }

        .su-btn-signup {
          width: 100%;
          padding: 0.85rem;
          margin-top: 0.6rem;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
          color: #fff;
          font-size: 0.95rem;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.01em;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.45);
          position: relative;
          overflow: hidden;
        }
        .su-btn-signup::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 40%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: translateX(-120%) skewX(-12deg);
        }
        .su-btn-signup:hover:not(:disabled)::after {
          animation: su-shine 1s ease-out;
        }
        .su-btn-signup:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(124, 58, 237, 0.55);
        }
        .su-btn-signup:disabled { opacity: 0.7; cursor: default; }

        .su-spinner {
          display: inline-block;
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: su-spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 0.5rem;
        }
        @keyframes su-spin { to { transform: rotate(360deg); } }

        .su-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 1.5rem 0;
        }
        .su-divider span { flex: 1; height: 1px; background: rgba(255,255,255,0.08); }
        .su-divider p { font-size: 0.78rem; color: rgba(255,255,255,0.3); margin: 0; }

        .su-btn-google {
          width: 100%;
          padding: 0.72rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.75);
          font-size: 0.88rem;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          gap: 0.6rem;
          transition: background 0.2s, border-color 0.2s;
        }
        .su-btn-google:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.18); }

        .su-footer-text {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.4);
        }
        .su-footer-text a { color: #a78bfa; text-decoration: none; font-weight: 600; }
        .su-footer-text a:hover { color: #c4b5fd; }

        .su-terms {
          margin-top: 1.25rem;
          text-align: center;
          font-size: 0.74rem;
          color: rgba(255,255,255,0.28);
          line-height: 1.5;
        }
        .su-terms a { color: rgba(255,255,255,0.45); text-decoration: underline; }
      `}</style>

      <div className="su-root">
        {/* ===== LEFT HERO / PITCH PANEL ===== */}
        <div className="su-hero">
          <div className="su-orb su-orb-1" />
          <div className="su-orb su-orb-2" />
          <div className="su-grid-overlay" />

          <div className="su-hero-content">
            <div className="su-brand-row su-anim-1">
              <div className="su-brand-mark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <span className="su-brand-name">Dynamic Form Builder</span>
            </div>

            <h1 className="su-hero-heading su-anim-2">
              Build forms that <span className="accent">think on their feet.</span>
            </h1>
            <p className="su-hero-sub su-anim-3">
              Create custom forms in minutes, collect responses in real time, and turn raw answers into insight — no code required.
            </p>

            <div className="su-feature-list su-anim-4">
              <div className="su-feature">
                <div className="su-feature-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <p className="su-feature-text"><strong>Drag-free builder</strong> — add fields, set rules, done</p>
              </div>
              <div className="su-feature">
                <div className="su-feature-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <p className="su-feature-text"><strong>Live responses</strong> — see answers as they come in</p>
              </div>
              <div className="su-feature">
                <div className="su-feature-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20V10M18 20V4M6 20v-4" />
                  </svg>
                </div>
                <p className="su-feature-text"><strong>Export anywhere</strong> — CSV, PDF, or your own dashboard</p>
              </div>
            </div>
          </div>

          <div className="su-mockup">
            <div className="su-mockup-dot-row">
              <span className="su-mockup-dot" />
              <span className="su-mockup-dot" />
              <span className="su-mockup-dot" />
            </div>
            <div className="su-mockup-bar w-60" />
            <div className="su-mockup-input" />
            <div className="su-mockup-bar w-80" />
            <div className="su-mockup-input" />
            <span className="su-mockup-check">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Saved
            </span>
          </div>

          <div className="su-mockup-2">
            <div className="su-mockup-2-row">
              <span className="su-mockup-2-icon" />
              <span className="su-mockup-2-text">New response</span>
            </div>
            <div className="su-mockup-2-row">
              <span className="su-mockup-2-icon" />
              <span className="su-mockup-2-text">42 today</span>
            </div>
          </div>

          <div className="su-hero-footer su-anim-5">
            <div className="su-avatars">
              <div className="su-avatar">JD</div>
              <div className="su-avatar">MK</div>
              <div className="su-avatar">RS</div>
            </div>
            <p className="su-hero-footer-text">
              <strong>2,400+</strong> makers building forms right now
            </p>
          </div>
        </div>

        {/* ===== RIGHT FORM PANEL ===== */}
        <div className="su-form-panel">
          <div className="su-form-card">
            <div className="su-mobile-brand">
              <div className="su-mobile-brand-mark">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <span className="su-mobile-brand-name">Dynamic Form Builder</span>
            </div>

            <h2 className="su-form-title">Create your account</h2>
            <p className="su-form-sub">Start building your first form in under a minute.</p>

            <div className="su-field">
              <label>Full name</label>
              <div className="su-field-inner">
                <span className="su-field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Jordan Lee"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div className="su-field">
              <label>Email address</label>
              <div className="su-field-inner">
                <span className="su-field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div className="su-field">
              <label>Password</label>
              <div className="su-field-inner">
                <span className="su-field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <p className="su-hint">Use 8+ characters with a mix of letters and numbers.</p>
            </div>

            <button className="su-btn-signup" onClick={handleSignup} disabled={loading}>
              {loading && <span className="su-spinner" />}
              {loading ? "Creating account..." : "Create account"}
            </button>

            <div className="su-divider"><span /><p>or sign up with</p><span /></div>

            <button className="su-btn-google">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Sign up with Google
            </button>

            <p className="su-footer-text">
              Already have an account? <Link to="/login">Log in</Link>
            </p>

            <p className="su-terms">
              By signing up, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;