// ─── SignupPage ───────────────────────────────────────────────────
// 3-step signup flow: personal details → password → success.

import { useState } from "react";

// Progress bar shown at top of each step
function StepBar({ step }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
      {[1, 2, 3].map(n => (
        <div key={n} style={{ flex: 1, height: 3, borderRadius: 2, background: n <= step ? "var(--green)" : "var(--navy-3)" }} />
      ))}
    </div>
  );
}

export default function SignupPage({ setPage, setIsLoggedIn }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStepOne = () => {
    setError("");
    if (!name || !email) {
      setError("Please provide your name and email.");
      return;
    }
    setStep(2);
  };

  const handleSignup = async () => {
    setError("");
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
      const res = await fetch(`${backendUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unable to create account.");
        return;
      }

      localStorage.setItem("authToken", data.token);
      setStep(3);
    } catch (err) {
      setError("Unable to connect to the server. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page fade-in">
      <div className="auth-page">
        <div className="auth-card">

          {step === 1 && (
            <>
              <StepBar step={1} />
              <div className="auth-title">Create account</div>
              <div className="auth-sub">Step 1 of 3 — Personal Details</div>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="Rahul Sharma" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="rahul@example.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input className="form-input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" />
              </div>
              {error && <div style={{ color: "#f87171", marginBottom: 12 }}>{error}</div>}
              <button className="btn btn-primary" style={{ width: "100%", marginTop: 8 }} onClick={handleStepOne}>
                Continue →
              </button>
              <div className="auth-footer">Already have an account? <a onClick={() => setPage("login")}>Log in</a></div>
            </>
          )}

          {step === 2 && (
            <>
              <StepBar step={2} />
              <div className="auth-title">Set Password</div>
              <div className="auth-sub">Step 2 of 3 — Security</div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 8 characters" />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input className="form-input" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter password" />
              </div>
              {error && <div style={{ color: "#f87171", marginBottom: 12 }}>{error}</div>}
              <button className="btn btn-primary" style={{ width: "100%", marginTop: 8 }} onClick={handleSignup} disabled={loading}>
                {loading ? "Creating account…" : "Continue →"}
              </button>
              <button className="btn btn-ghost" style={{ width: "100%", marginTop: 8 }} onClick={() => setStep(1)}>
                ← Back
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <StepBar step={3} />
              <div style={{ textAlign: "center", marginBottom: 8, fontSize: 40 }}>🎉</div>
              <div className="auth-title" style={{ textAlign: "center" }}>You're all set!</div>
              <div className="auth-sub" style={{ textAlign: "center", marginBottom: 28 }}>
                Account created successfully. Start your investment journey now.
              </div>
              <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => { setIsLoggedIn(true); setPage("dashboard"); }}>
                Go to Dashboard →
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
