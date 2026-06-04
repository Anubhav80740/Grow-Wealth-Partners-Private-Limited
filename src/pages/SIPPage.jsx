// ─── SIPPage ──────────────────────────────────────────────────────
// Explains SIP, lists plan options, and shows a step-by-step how-it-works.

import { SIP_PLANS } from "../data";

export default function SIPPage({ setPage }) {
  return (
    <div className="page fade-in">

      {/* ── Hero ── */}
      <div className="sip-hero" style={{ textAlign: "center" }}>
        <div className="section-label">Systematic Investment Plan</div>
        <h1 className="section-title" style={{ fontSize: "clamp(36px,5vw,60px)" }}>
          Invest a little,<br /><span className="green">gain a lot</span>
        </h1>
        <p className="section-sub" style={{ marginBottom: 40, maxWidth: 480, margin: "0 auto 40px" }}>
          Start SIPs from as low as ₹100/month. The power of compounding works best with consistency.
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => setPage("calculator")}>
          Calculate SIP Returns →
        </button>
      </div>

      {/* ── SIP plan cards ── */}
      <div className="section" style={{ paddingTop: 0 }}>
        <h2 className="section-title" style={{ fontSize: 28, marginBottom: 28 }}>Choose your SIP plan</h2>
        <div className="sip-grid">
          {SIP_PLANS.map((s, i) => (
            <div key={s.name} className="sip-card">
              <div className="sip-number">0{i + 1}</div>
              <div className="sip-card-title">{s.name}</div>
              <div className="sip-card-desc">{s.desc}</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                <span className="tag">{s.category}</span>
                <span className="tag">{s.risk}</span>
              </div>
              <div className="sip-min">Min SIP: <strong>{s.min}/month</strong></div>
            </div>
          ))}
        </div>
      </div>

      {/* ── How SIP works ── */}
      <div className="section" style={{ paddingTop: 0 }}>
        <h2 className="section-title" style={{ fontSize: 28, marginBottom: 32 }}>How SIP works</h2>
        <div className="feature-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
          {[
            { icon: "1️⃣", title: "Choose a Fund",    desc: "Pick a mutual fund that matches your risk appetite and financial goal." },
            { icon: "2️⃣", title: "Set Amount & Date", desc: "Decide how much to invest and on which date every month." },
            { icon: "3️⃣", title: "Auto-Debit",        desc: "Amount is automatically debited from your bank account on the set date." },
            { icon: "4️⃣", title: "Units Allocated",   desc: "Fund units are allocated based on the NAV on the investment date." },
            { icon: "5️⃣", title: "Watch it Grow",     desc: "Track your investment growth on your portfolio dashboard." },
          ].map(s => (
            <div key={s.title} className="feature-card">
              <div className="feature-icon">{s.icon}</div>
              <div className="feature-title">{s.title}</div>
              <div className="feature-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
