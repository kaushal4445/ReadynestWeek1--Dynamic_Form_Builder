import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log(res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("isLoggedIn", "true");

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@600;700;800&display=swap');

        * { box-sizing: border-box; }

        @keyframes lg-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lg-float {
          0%, 100% { transform: translateY(0) rotate(-1.5deg); }
          50%      { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes lg-pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.45); }
          70%  { box-shadow: 0 0 0 10px rgba(124, 58, 237, 0); }
          100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
        }
        @keyframes lg-gradient-sweep {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes lg-drift {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, 30px) scale(1.08); }
        }
        @keyframes lg-spin { to { transform: rotate(360deg); } }
        @keyframes lg-shine {
          0%   { transform: translateX(-120%) skewX(-12deg); }
          100% { transform: translateX(220%) skewX(-12deg); }
        }

        .lg-anim-1 { opacity: 0; animation: lg-fade-up 0.7s ease-out 0.05s forwards; }
        .lg-anim-2 { opacity: 0; animation: lg-fade-up 0.7s ease-out 0.18s forwards; }
        .lg-anim-3 { opacity: 0; animation: lg-fade-up 0.7s ease-out 0.3s forwards; }
        .lg-anim-4 { opacity: 0; animation: lg-fade-up 0.7s ease-out 0.42s forwards; }
        .lg-anim-5 { opacity: 0; animation: lg-fade-up 0.7s ease-out 0.54s forwards; }

        .login-root {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr;
          background: #0a0a1a;
          color: #fff;
        }
        @media (min-width: 1024px) {
          .login-root { grid-template-columns: 1.1fr 1fr; }
        }

        /* ===== LEFT: BRAND / PITCH PANEL ===== */
        .lg-hero {
          position: relative;
          overflow: hidden;
          display: none;
          flex-direction: column;
          justify-content: space-between;
          padding: 3rem;
          background: radial-gradient(circle at 30% 20%, #1e1240 0%, #0a0a1a 60%);
        }
        @media (min-width: 1024px) {
          .lg-hero { display: flex; }
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.35;
          animation: lg-drift 14s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .orb-1 {
          width: 460px; height: 460px;
          background: radial-gradient(circle, #6c3de8, transparent 70%);
          top: -120px; left: -100px;
        }
        .orb-2 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, #06b6d4, transparent 70%);
          bottom: -100px; right: -80px;
          animation-delay: -6s;
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 44px 44px;
          pointer-events: none;
        }

        .lg-hero-content { position: relative; z-index: 10; }

        .lg-brand-row {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          margin-bottom: 4rem;
        }
        .lg-brand-mark {
          width: 40px; height: 40px;
          border-radius: 11px;
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 22px rgba(124, 58, 237, 0.45);
          flex-shrink: 0;
          animation: lg-pulse-ring 2.6s ease-out infinite;
        }
        .lg-brand-name {
          font-family: 'Lexend', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .lg-hero-heading {
          font-family: 'Lexend', sans-serif;
          font-size: 2.6rem;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 1.1rem;
          max-width: 480px;
        }
        .lg-hero-heading .accent {
          background: linear-gradient(120deg, #c4b5fd, #67e8f9, #c4b5fd);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: lg-gradient-sweep 5s ease-in-out infinite;
        }
        .lg-hero-sub {
          color: rgba(255,255,255,0.5);
          font-size: 1.05rem;
          line-height: 1.6;
          max-width: 440px;
          margin: 0 0 2.75rem;
        }

        .lg-feature-list {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .lg-feature {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .lg-feature-icon {
          width: 38px; height: 38px;
          border-radius: 11px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .lg-feature-icon svg { color: #a78bfa; }
        .lg-feature-text { font-size: 0.92rem; color: rgba(255,255,255,0.7); }
        .lg-feature-text strong { color: #fff; font-weight: 600; }

        /* FLOATING MOCKUP CARDS */
        .lg-mockup {
          position: absolute;
          top: 14%;
          right: 6%;
          width: 210px;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          padding: 1rem;
          box-shadow: 0 24px 50px rgba(0,0,0,0.35);
          animation: lg-float 6s ease-in-out infinite;
          z-index: 5;
        }
        .lg-mockup-row { display: flex; align-items: center; gap: 0.55rem; margin-bottom: 0.7rem; }
        .lg-mockup-row:last-child { margin-bottom: 0; }
        .lg-mockup-avatar {
          width: 24px; height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          flex-shrink: 0;
        }
        .lg-mockup-bars { flex: 1; }
        .lg-mockup-bar { height: 7px; border-radius: 4px; background: rgba(255,255,255,0.12); margin-bottom: 4px; }
        .lg-mockup-bar.w-70 { width: 70%; }
        .lg-mockup-bar.w-45 { width: 45%; }

        .lg-mockup-2 {
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
          animation: lg-float 7.5s ease-in-out infinite;
          animation-delay: -2.5s;
          z-index: 5;
          text-align: center;
        }
        .lg-mockup-2-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: #67e8f9;
          margin: 0 0 0.2rem;
        }
        .lg-mockup-2-label {
          font-size: 0.66rem;
          color: rgba(255,255,255,0.45);
          font-weight: 600;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .lg-hero-footer {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .lg-avatars { display: flex; }
        .lg-avatar {
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 2px solid #0a0a1a;
          margin-left: -8px;
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
        }
        .lg-avatar:first-child { margin-left: 0; }
        .lg-hero-footer-text { font-size: 0.84rem; color: rgba(255,255,255,0.45); }
        .lg-hero-footer-text strong { color: rgba(255,255,255,0.75); }

        /* ===== RIGHT: FORM PANEL ===== */
        .lg-form-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          position: relative;
        }
        @media (min-width: 1024px) {
          .lg-form-panel { padding: 3rem; }
        }
        .lg-form-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 80% 0%, rgba(124, 58, 237, 0.12), transparent 50%);
          pointer-events: none;
        }
        @media (min-width: 1024px) {
          .lg-form-panel::before { display: none; }
        }

        .lg-mobile-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 2rem;
        }
        @media (min-width: 1024px) {
          .lg-mobile-brand { display: none; }
        }
        .lg-mobile-brand-mark {
          width: 34px; height: 34px;
          border-radius: 10px;
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .lg-mobile-brand-name {
          font-family: 'Lexend', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
        }

        /* Glass card */
        .card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 420px;
          animation: lg-fade-up 0.6s ease-out 0.1s both;
        }

        .logo-wrap {
          display: none;
        }

        .card-title {
          font-family: 'Lexend', sans-serif;
          font-size: 1.9rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          margin: 0 0 0.5rem;
        }
        .card-sub {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.45);
          margin: 0 0 2rem;
          font-weight: 400;
        }

        .field { margin-bottom: 1.1rem; }
        .field label {
          display: block;
          font-size: 0.78rem;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          margin-bottom: 0.45rem;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
        .field-inner { position: relative; }
        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.3);
          pointer-events: none;
          display: flex;
          transition: color 0.2s;
        }
        .field-inner:focus-within .field-icon {
          color: #a78bfa;
        }
        .field input {
          width: 100%;
          box-sizing: border-box;
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
        .field input::placeholder { color: rgba(255,255,255,0.25); }
        .field input:focus {
          border-color: rgba(124, 58, 237, 0.7);
          background: rgba(124, 58, 237, 0.08);
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.18);
        }

        .forgot-row {
          display: flex;
          justify-content: flex-end;
          margin: -0.3rem 0 1.5rem;
        }
        .forgot-row a {
          font-size: 0.8rem;
          color: rgba(167, 139, 250, 0.8);
          text-decoration: none;
          transition: color 0.15s;
        }
        .forgot-row a:hover { color: #a78bfa; }

        .btn-login {
          width: 100%;
          padding: 0.85rem;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
          color: #fff;
          font-size: 0.95rem;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.01em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.45);
        }
        .btn-login::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 40%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: translateX(-120%) skewX(-12deg);
        }
        .btn-login:hover:not(:disabled)::after {
          animation: lg-shine 1s ease-out;
        }
        .btn-login:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(124, 58, 237, 0.55);
        }
        .btn-login:active:not(:disabled) { transform: translateY(0); }
        .btn-login:disabled { opacity: 0.7; cursor: default; }

        .spinner {
          display: inline-block;
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: lg-spin 0.7s linear infinite;
          vertical-align: middle;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 1.5rem 0;
        }
        .divider span { flex: 1; height: 1px; background: rgba(255,255,255,0.08); }
        .divider p { font-size: 0.78rem; color: rgba(255,255,255,0.3); margin: 0; }

        .btn-social {
          width: 100%;
          padding: 0.75rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.75);
          font-size: 0.88rem;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: background 0.2s, border-color 0.2s;
        }
        .btn-social:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.18);
        }

        .card-footer {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.4);
        }
        .card-footer a {
          color: #a78bfa;
          text-decoration: none;
          font-weight: 600;
          margin-left: 0.4rem;
          transition: color 0.15s;
        }
        .card-footer a:hover { color: #c4b5fd; }
      `}</style>

      <div className="login-root">
        {/* ===== LEFT HERO / PITCH PANEL ===== */}
        <div className="lg-hero">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="grid-overlay" />

          <div className="lg-hero-content">
            <div className="lg-brand-row lg-anim-1">
              <div className="lg-brand-mark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <span className="lg-brand-name">Dynamic Form Builder</span>
            </div>

            <h1 className="lg-hero-heading lg-anim-2">
              Pick up right where <span className="accent">you left off.</span>
            </h1>
            <p className="lg-hero-sub lg-anim-3">
              Your forms, responses, and dashboards are exactly how you left them. Sign in to keep building.
            </p>

            <div className="lg-feature-list lg-anim-4">
              <div className="lg-feature">
                <div className="lg-feature-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <p className="lg-feature-text"><strong>Your responses</strong> are waiting, synced and ready</p>
              </div>
              <div className="lg-feature">
                <div className="lg-feature-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <p className="lg-feature-text"><strong>Pick up instantly</strong> — no setup, just sign in</p>
              </div>
              <div className="lg-feature">
                <div className="lg-feature-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <p className="lg-feature-text"><strong>Secure by default</strong> — your data stays yours</p>
              </div>
            </div>
          </div>

          <div className="lg-mockup">
            <div className="lg-mockup-row">
              <span className="lg-mockup-avatar" />
              <div className="lg-mockup-bars">
                <div className="lg-mockup-bar w-70" />
                <div className="lg-mockup-bar w-45" />
              </div>
            </div>
            <div className="lg-mockup-row">
              <span className="lg-mockup-avatar" />
              <div className="lg-mockup-bars">
                <div className="lg-mockup-bar w-70" />
                <div className="lg-mockup-bar w-45" />
              </div>
            </div>
          </div>

          <div className="lg-mockup-2">
            <p className="lg-mockup-2-value">128</p>
            <p className="lg-mockup-2-label">Responses today</p>
          </div>

          <div className="lg-hero-footer lg-anim-5">
            <div className="lg-avatars">
              <div className="lg-avatar">JD</div>
              <div className="lg-avatar">MK</div>
              <div className="lg-avatar">RS</div>
            </div>
            <p className="lg-hero-footer-text">
              <strong>2,400+</strong> makers building forms right now
            </p>
          </div>
        </div>

        {/* ===== RIGHT FORM PANEL ===== */}
        <div className="lg-form-panel">
          <div className="card">
            <div className="lg-mobile-brand">
              <div className="lg-mobile-brand-mark">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <span className="lg-mobile-brand-name">Dynamic Form Builder</span>
            </div>

            <h1 className="card-title">Welcome back</h1>
            <p className="card-sub">Sign in to continue to your workspace</p>

            {/* Email */}
            <div className="field">
              <label>Email address</label>
              <div className="field-inner">
                <span className="field-icon">
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

            {/* Password */}
            <div className="field">
              <label>Password</label>
              <div className="field-inner">
                <span className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div className="forgot-row">
              <a href="#">Forgot password?</a>
            </div>

            <button className="btn-login" onClick={handleLogin} disabled={loading}>
              {loading ? <span className="spinner" /> : "Sign in"}
            </button>

            <div className="divider">
              <span /><p>or continue with</p><span />
            </div>

            <button className="btn-social">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Sign in with Google
            </button>

            <p className="card-footer">
              Don't have an account?
              <Link to="/signup">Create one free</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;