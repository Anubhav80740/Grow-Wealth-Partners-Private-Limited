// ─── CalculatorPage ───────────────────────────────────────────────
// SIP and Lumpsum investment calculator with sliders and result breakdown.

import { useState } from "react";

export default function CalculatorPage() {
  const [mode,   setMode]   = useState("sip");
  const [amount, setAmount] = useState(5000);
  const [rate,   setRate]   = useState(12);
  const [years,  setYears]  = useState(10);

  // Calculations
  const invested = mode === "sip" ? amount * 12 * years : amount;
  const maturity  = mode === "sip"
    ? amount * (((Math.pow(1 + rate / 1200, years * 12) - 1) / (rate / 1200)) * (1 + rate / 1200))
    : amount * Math.pow(1 + rate / 100, years);
  const gains = maturity - invested;

  const fmt = n => "₹" + Math.round(n).toLocaleString("en-IN");

  return (
    <div className="page fade-in">
      <div className="section">
        <div className="section-label">Tools</div>
        <h1 className="section-title">Investment Calculator</h1>
        <p className="section-sub" style={{ marginBottom: 36, maxWidth: 400, margin: "0 auto 40px" }}>
          Plan your financial future. See how your money grows over time.
        </p>

        {/* Mode toggle */}
        <div className="tab-row">
          <button className={`tab-btn ${mode === "sip"  ? "active" : ""}`} onClick={() => setMode("sip")}>SIP Calculator</button>
          <button className={`tab-btn ${mode === "lump" ? "active" : ""}`} onClick={() => setMode("lump")}>Lumpsum</button>
        </div>

        <div className="calc-grid">

          {/* ── Sliders ── */}
          <div className="calc-card">
            <div className="calc-title">{mode === "sip" ? "SIP" : "Lumpsum"} Calculator</div>

            <div className="range-wrap">
              <div className="range-label">
                <span>{mode === "sip" ? "Monthly Investment" : "Lumpsum Amount"}</span>
                <span>{fmt(amount)}</span>
              </div>
              <input
                type="range"
                min={mode === "sip" ? 500 : 1000}
                max={mode === "sip" ? 100000 : 5000000}
                step={mode === "sip" ? 500 : 5000}
                value={amount}
                onChange={e => setAmount(+e.target.value)}
              />
            </div>

            <div className="range-wrap">
              <div className="range-label"><span>Expected Return (p.a.)</span><span>{rate}%</span></div>
              <input type="range" min={1} max={30} step={0.5} value={rate} onChange={e => setRate(+e.target.value)} />
            </div>

            <div className="range-wrap">
              <div className="range-label"><span>Time Period</span><span>{years} Years</span></div>
              <input type="range" min={1} max={30} step={1} value={years} onChange={e => setYears(+e.target.value)} />
            </div>
          </div>

          {/* ── Results ── */}
          <div>
            <div className="calc-result" style={{ marginBottom: 16 }}>
              <div className="calc-result-label">Estimated Maturity Value</div>
              <div className="calc-result-val">{fmt(maturity)}</div>
            </div>

            <div className="calc-breakdown">
              <div className="calc-bd-item">
                <div className="calc-bd-label">Total Invested</div>
                <div className="calc-bd-val">{fmt(invested)}</div>
              </div>
              <div className="calc-bd-item">
                <div className="calc-bd-label">Total Gains</div>
                <div className="calc-bd-val" style={{ color: "var(--green)" }}>{fmt(gains)}</div>
              </div>
              <div className="calc-bd-item">
                <div className="calc-bd-label">Absolute Returns</div>
                <div className="calc-bd-val" style={{ color: "var(--green)" }}>{((gains / invested) * 100).toFixed(1)}%</div>
              </div>
              <div className="calc-bd-item">
                <div className="calc-bd-label">CAGR</div>
                <div className="calc-bd-val">{rate}% p.a.</div>
              </div>
            </div>

            {/* Corpus breakdown bar */}
            <div style={{ marginTop: 20, padding: 20, background: "var(--card)", border: "1px solid var(--card-border)", borderRadius: "var(--radius)" }}>
              <div style={{ marginBottom: 12, fontSize: 13, color: "var(--text-muted)" }}>Corpus Breakdown</div>
              <div style={{ height: 8, borderRadius: 4, background: "var(--navy-3)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.min((invested / maturity) * 100, 100).toFixed(1)}%`, background: "var(--text-muted)", borderRadius: 4, float: "left" }} />
                <div style={{ height: "100%", width: `${Math.min((gains / maturity) * 100, 100).toFixed(1)}%`, background: "var(--green)", borderRadius: 4, float: "left" }} />
              </div>
              <div style={{ display: "flex", gap: 20, marginTop: 12, fontSize: 13 }}>
                <span style={{ color: "var(--text-muted)" }}>■ Invested: {((invested / maturity) * 100).toFixed(0)}%</span>
                <span style={{ color: "var(--green)" }}>■ Gains: {((gains / maturity) * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
