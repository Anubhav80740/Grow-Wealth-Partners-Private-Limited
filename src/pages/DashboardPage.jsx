// ─── DashboardPage ────────────────────────────────────────────────
// Authenticated user's portfolio overview with tabbed sections:
// Overview | Holdings | Transactions | SIPs

import { useState } from "react";
import { HOLDINGS, TXS } from "../data";

const TOTAL_INVESTED = 145000;
const CURRENT_VAL    = 172970;

export default function DashboardPage({ setPage }) {
  const [tab, setTab] = useState("overview");

  const gains      = CURRENT_VAL - TOTAL_INVESTED;
  const returnsAbs = ((gains / TOTAL_INVESTED) * 100).toFixed(1);

  return (
    <div className="page fade-in">
      <div className="section">

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="section-label">Wealth Elite</div>
            <h1 className="section-title" style={{ marginBottom: 4 }}>Welcome back, Rahul 👋</h1>
            <div style={{ color: "var(--text-muted)", fontSize: 14 }}>
              Portfolio snapshot as of {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => setPage("mutual-funds")}>+ Invest More</button>
        </div>

        {/* Stats row */}
        <div className="dash-grid">
          <div className="dash-stat">
            <div className="dash-stat-label">Current Portfolio Value</div>
            <div className="dash-stat-val">₹{CURRENT_VAL.toLocaleString("en-IN")}</div>
            <div className="dash-stat-change pos">↑ +₹{gains.toLocaleString("en-IN")} ({returnsAbs}%)</div>
          </div>
          <div className="dash-stat">
            <div className="dash-stat-label">Total Invested</div>
            <div className="dash-stat-val">₹{TOTAL_INVESTED.toLocaleString("en-IN")}</div>
            <div className="dash-stat-change muted">Across 4 funds</div>
          </div>
          <div className="dash-stat">
            <div className="dash-stat-label">Active SIPs</div>
            <div className="dash-stat-val">3</div>
            <div className="dash-stat-change pos">↑ ₹8,000/month</div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="tab-row">
          {["overview", "holdings", "transactions", "sips"].map(t => (
            <button key={t} className={`tab-btn ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* ── Overview tab ── */}
        {tab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Allocation bars */}
            <div className="card">
              <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, marginBottom: 20 }}>Portfolio Allocation</div>
              {HOLDINGS.map(h => {
                const pct = (parseInt(h.invested.replace(/[^0-9]/g, "")) / TOTAL_INVESTED * 100).toFixed(0);
                return (
                  <div key={h.fund} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                      <span>{h.fund}</span>
                      <span className={h.change}>{h.returns}</span>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 3 }}>{pct}% of portfolio</div>
                  </div>
                );
              })}
            </div>

            {/* Quick stats */}
            <div className="card">
              <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, marginBottom: 20 }}>Quick Stats</div>
              {[
                { label: "Best Performer",    val: "ICICI Pru Tech +38.1%",  color: "var(--green)" },
                { label: "Highest AUM Fund",  val: "Parag Parikh Flexi Cap", color: "var(--text)"  },
                { label: "Next SIP Date",     val: "5 June 2026",            color: "var(--text)"  },
                { label: "Total Units Held",  val: "469.8 units",            color: "var(--text)"  },
                { label: "Portfolio XIRR",    val: "~22.4% p.a.",            color: "var(--green)" },
              ].map(s => (
                <div key={s.label} className="quick-stats-item" style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 14 }}>
                  <span style={{ color: "var(--text-muted)" }}>{s.label}</span>
                  <span style={{ color: s.color, fontWeight: 500 }}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Holdings tab ── */}
        {tab === "holdings" && (
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <table className="holdings-table">
              <thead>
                <tr><th>Fund</th><th>Units</th><th>Invested</th><th>Current Value</th><th>Returns</th></tr>
              </thead>
              <tbody>
                {HOLDINGS.map(h => (
                  <tr key={h.fund}>
                    <td style={{ fontWeight: 500 }}>{h.fund}</td>
                    <td>{h.units}</td>
                    <td>{h.invested}</td>
                    <td>{h.current}</td>
                    <td className={h.change}>{h.returns}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Transactions tab ── */}
        {tab === "transactions" && (
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <table className="holdings-table">
              <thead>
                <tr><th>Date</th><th>Fund</th><th>Type</th><th>Amount</th><th>Units</th></tr>
              </thead>
              <tbody>
                {TXS.map((t, i) => (
                  <tr key={i}>
                    <td style={{ color: "var(--text-muted)", fontSize: 13 }}>{t.date}</td>
                    <td style={{ fontWeight: 500 }}>{t.fund}</td>
                    <td><span className={`tx-badge tx-${t.type}`}>{t.type === "buy" ? "Buy" : "Redeem"}</span></td>
                    <td>{t.amount}</td>
                    <td style={{ color: "var(--text-muted)" }}>{t.units}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── SIPs tab ── */}
        {tab === "sips" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
            {[
              { name: "Axis Bluechip Fund",        amount: "₹5,000/mo", date: "12th", status: "Active", next: "12 Jun 2026" },
              { name: "Parag Parikh Flexi Cap",     amount: "₹3,000/mo", date: "5th",  status: "Active", next: "5 Jun 2026"  },
              { name: "SBI Small Cap Fund",         amount: "₹0/mo",     date: "—",    status: "Paused", next: "—"           },
            ].map(s => (
              <div key={s.name} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600 }}>{s.name}</div>
                  <span className={s.status === "Active" ? "tag" : "risk-badge risk-mod"} style={{ fontSize: 11 }}>{s.status}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[{ l: "Amount", v: s.amount }, { l: "Debit Date", v: s.date }, { l: "Next SIP", v: s.next }].map(r => (
                    <div key={r.l}>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 3 }}>{r.l}</div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{r.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}