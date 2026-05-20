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

  return (
    <div className="page fade-in">
      <div className="auth-page">
        <div className="auth-card">

          {/* ── Step 1: Personal details ── */}
          {step === 1 && (
            <>
              <StepBar step={1} />
              <div className="auth-title">Create account</div>
              <div className="auth-sub">Step 1 of 3 — Personal Details</div>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" placeholder="Rahul Sharma" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" placeholder="rahul@example.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input className="form-input" type="tel" placeholder="+91 98765 43210" />
              </div>
              <button className="btn btn-primary" style={{ width: "100%", marginTop: 8 }} onClick={() => setStep(2)}>
                Continue →
              </button>
              <div className="auth-footer">Already have an account? <a onClick={() => setPage("login")}>Log in</a></div>
            </>
          )}

          {/* ── Step 2: Password ── */}
          {step === 2 && (
            <>
              <StepBar step={2} />
              <div className="auth-title">Set Password</div>
              <div className="auth-sub">Step 2 of 3 — Security</div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input className="form-input" type="password" placeholder="Min 8 characters" />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input className="form-input" type="password" placeholder="Re-enter password" />
              </div>
              <button className="btn btn-primary" style={{ width: "100%", marginTop: 8 }} onClick={() => setStep(3)}>
                Continue →
              </button>
              <button className="btn btn-ghost" style={{ width: "100%", marginTop: 8 }} onClick={() => setStep(1)}>
                ← Back
              </button>
            </>
          )}

          {/* ── Step 3: Success ── */}
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
