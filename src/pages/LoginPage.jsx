// ─── LoginPage ────────────────────────────────────────────────────
// Handles login, forgot-password, and password-reset-sent states.

import { useState } from "react";

export default function LoginPage({ setPage, setIsLoggedIn }) {
  const [email,  setEmail]  = useState("");
  const [pass,   setPass]   = useState("");
  const [forgot, setForgot] = useState(false);
  const [reset,  setReset]  = useState(false);

  // ── Password-reset confirmation ──
  if (reset) return (
    <div className="page fade-in">
      <div className="auth-page">
        <div className="auth-card">
          <div style={{ textAlign: "center", marginBottom: 8 }}>✅</div>
          <div className="auth-title" style={{ textAlign: "center" }}>Check your email</div>
          <p style={{ color: "var(--text-muted)", fontSize: 14, textAlign: "center", marginBottom: 28 }}>
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => { setForgot(false); setReset(false); }}>
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );

  // ── Forgot-password form ──
  if (forgot) return (
    <div className="page fade-in">
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-title">Reset Password</div>
          <div className="auth-sub">Enter your email to receive a reset link.</div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <button className="btn btn-primary" style={{ width: "100%", marginTop: 8 }} onClick={() => setReset(true)}>
            Send Reset Link
          </button>
          <div className="auth-footer"><a onClick={() => setForgot(false)}>← Back to Login</a></div>
        </div>
      </div>
    </div>
  );

  // ── Main login form ──
  return (
    <div className="page fade-in">
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-title">Welcome back</div>
          <div className="auth-sub">Log in to your GrowWealth account</div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} />
          </div>

          <div style={{ textAlign: "right", marginBottom: 20 }}>
            <a style={{ fontSize: 13, color: "var(--green)", cursor: "pointer" }} onClick={() => setForgot(true)}>
              Forgot password?
            </a>
          </div>

          <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => { setIsLoggedIn(true); setPage("dashboard"); }}>
            Log In
          </button>
          <div className="divider">or</div>
          <button className="btn btn-ghost" style={{ width: "100%" }}>Continue with Google</button>

          <div className="auth-footer">
            Don't have an account? <a onClick={() => setPage("signup")}>Sign up free</a>
          </div>
        </div>
      </div>
    </div>
  );
}
