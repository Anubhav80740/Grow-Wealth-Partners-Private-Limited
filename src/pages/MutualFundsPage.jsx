// ─── MutualFundsPage ──────────────────────────────────────────────
// Browse & filter all mutual funds. Filters: search, risk, AMC, category.

import { useState } from "react";
import FundCard from "../components/FundCard";
import { FUNDS } from "../data";

const CATEGORIES = ["All", "Large Cap", "Mid Cap", "Small Cap", "Flexi Cap", "Sectoral", "Hybrid", "ELSS", "Index", "Debt"];

export default function MutualFundsPage() {
  const [search, setSearch] = useState("");
  const [cat,    setCat]    = useState("All");
  const [risk,   setRisk]   = useState("All");
  const [amc,    setAmc]    = useState("All");

  const filtered = FUNDS.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.amc.toLowerCase().includes(search.toLowerCase());
    const matchCat    = cat  === "All" || f.category === cat;
    const matchRisk   = risk === "All" || f.risk === risk;
    const matchAmc    = amc  === "All" || f.amc === amc;
    return matchSearch && matchCat && matchRisk && matchAmc;
  });

  return (
    <div className="page fade-in">
      <div className="section">
        <div className="section-label">Browse</div>
        <h1 className="section-title">Mutual Funds</h1>
        <p className="section-sub" style={{ marginBottom: 36, maxWidth: 5000, margin: "0 auto 40px" }}>
          Explore 1,000+ hand-picked mutual funds. Filter by category, risk level, and AMC.
        </p>

        {/* Search + dropdowns */}
        <div className="search-row">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              placeholder="Search by fund name or AMC..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="filter-select" value={risk} onChange={e => setRisk(e.target.value)}>
            <option value="All">All Risk</option>
            <option value="low">Low</option>
            <option value="mod">Moderate</option>
            <option value="high">High</option>
          </select>
          <select className="filter-select" value={amc} onChange={e => setAmc(e.target.value)}>
            <option value="All">All AMC</option>
            {[...new Set(FUNDS.map(f => f.amc))].map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        {/* Category tabs */}
        <div className="tab-row">
          {CATEGORIES.map(c => (
            <button key={c} className={`tab-btn ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        <div style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 20 }}>{filtered.length} funds found</div>

        <div className="funds-grid">
          {filtered.map(f => <FundCard key={f.id} fund={f} />)}
          {filtered.length === 0 && (
            <div style={{ color: "var(--text-muted)", padding: "40px 0" }}>No funds match your filters.</div>
          )}
        </div>
      </div>
    </div>
  );
}
