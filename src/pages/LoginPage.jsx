// ─── LoginPage ────────────────────────────────────────────────────
// Handles login, forgot-password, and password-reset-sent states.

import { useState, useEffect } from "react";

export default function LoginPage({ setPage, setIsLoggedIn }) {
  const [email,  setEmail]  = useState("");
  const [pass,   setPass]   = useState("");
  const [forgot, setForgot] = useState(false);
  const [reset,  setReset]  = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("authToken", token);
      setIsLoggedIn(true);
      setPage("dashboard");
    }
  }, [setIsLoggedIn, setPage]);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unable to log in. Check your credentials.");
        return;
      }

      localStorage.setItem("authToken", data.token);
      setIsLoggedIn(true);
      setPage("dashboard");
    } catch (err) {
      setError("Unable to connect to the server. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unable to process request.");
        return;
      }
      setMessage(data.message || "If your email exists, we've sent a reset link.");
      setReset(true);
    } catch (err) {
      setError("Unable to connect to the server. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ── Password-reset confirmation ──
  if (reset) return (
    <div className="page fade-in">
      <div className="auth-page">
        <div className="auth-card">
          <div style={{ textAlign: "center", marginBottom: 8 }}>✅</div>
          <div className="auth-title" style={{ textAlign: "center" }}>Check your email</div>
          <p style={{ color: "var(--text-muted)", fontSize: 14, textAlign: "center", marginBottom: 28 }}>
            {message || `We've sent a password reset link to ${email}`}
          </p>
          <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => { setForgot(false); setReset(false); setMessage(""); setError(""); }}>
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
          {error && <div style={{ color: "#f87171", marginBottom: 12 }}>{error}</div>}
          <button className="btn btn-primary" style={{ width: "100%", marginTop: 8 }} onClick={handleForgot} disabled={loading || !email}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
          <div className="auth-footer"><a onClick={() => { setForgot(false); setError(""); }}>{`← Back to Login`}</a></div>
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

          {error && <div style={{ color: "#f87171", marginBottom: 12 }}>{error}</div>}

          <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleLogin} disabled={loading || !email || !pass}>
            {loading ? "Logging in…" : "Log In"}
          </button>
          <div className="divider">or</div>
          <button className="btn btn-ghost" style={{ width: "100%" }} onClick={() => { window.location.href = "/api/auth/google"; }}>
            Continue with Google
          </button>

          <div className="auth-footer">
            Don't have an account? <a onClick={() => setPage("signup")}>Sign up free</a>
          </div>
        </div>
      </div>
    </div>
  );
}
