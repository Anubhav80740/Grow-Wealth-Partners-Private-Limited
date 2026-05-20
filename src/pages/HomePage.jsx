// ─── HomePage ─────────────────────────────────────────────────────
// Landing page: hero section, features grid, top-fund preview, CTA.

import FundCard from "../components/FundCard";
import Footer from "../components/Footer";
import { FUNDS } from "../data";

export default function HomePage({ setPage }) {
  return (
    <div className="page fade-in">

      {/* ── Hero ── */}
      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />

        <div className="hero-content">
          <div className="hero-badge">Zero Commission Investing</div>
          <h1 className="hero-title">Invest Smart,<br /><em>Grow Wealth</em></h1>
          <p className="hero-desc">
            Access 1,000+ Mutual Funds and SIPs in one place. Start your investment journey with as little as ₹100.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => setPage("signup")}>Get Started →</button>
            <button className="btn btn-ghost btn-lg" onClick={() => setPage("mutual-funds")}>Explore Funds</button>
          </div>
          <div className="hero-stats">
            <div className="stat-item"><div className="stat-num">1,000+</div><div className="stat-label">Mutual Funds</div></div>
            <div className="stat-item"><div className="stat-num">₹0</div><div className="stat-label">Commission</div></div>
            <div className="stat-item"><div className="stat-num">50K+</div><div className="stat-label">Investors</div></div>
          </div>
        </div>

        {/* Animated visual */}
        <div className="hero-visual">
          <div className="hero-ring"><div className="hero-ring-dot" /></div>
          <div className="hero-ring-2" />
          <div className="hero-card-float">
            <div className="float-label">Portfolio Value</div>
            <div className="float-val">₹1,74,970</div>
            <div className="float-change">↑ +12.3% this month</div>
          </div>
          <div className="hero-card-float">
            <div className="float-label">SIP Active</div>
            <div className="float-val">3 Plans</div>
            <div className="float-change">↑ ₹8,000/month</div>
          </div>
        </div>
      </div>

      {/* ── Feature highlights ── */}
      <div className="section">
        <div className="section-label">Why GrowWealth</div>
        <h2 className="section-title">Everything you need<br />to invest better</h2>
        <p className="section-sub" style={{ marginBottom: 40 }}>
          A complete platform built for Indian investors — from beginners to seasoned portfolio managers.
        </p>
        <div className="feature-grid">
          {[
            { icon: "📈", title: "1,000+ Mutual Funds", desc: "Browse and invest in a curated selection across equity, debt, hybrid, and sectoral funds." },
            { icon: "🔁", title: "Systematic SIP", desc: "Automate your investments with flexible SIP plans. Set it once, grow forever." },
            { icon: "🧮", title: "Smart Calculators", desc: "Plan your financial future with SIP, lumpsum, and goal-based investment calculators." },
            { icon: "📊", title: "Portfolio Tracker", desc: "Real-time overview of your investments, returns, and fund holdings in one dashboard." },
            { icon: "🔒", title: "Secure & Trusted", desc: "Bank-grade security with 2FA. Your money and data are always protected." },
            { icon: "🏦", title: "Zero Commission", desc: "We earn from AMCs directly. You get the full returns, always." },
          ].map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Top funds preview ── */}
      <div className="section" style={{ paddingTop: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
          <div>
            <div className="section-label">Top Performers</div>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Popular Funds</h2>
          </div>
          <button className="btn btn-outline" onClick={() => setPage("mutual-funds")}>View All →</button>
        </div>
        <div className="funds-grid">
          {FUNDS.slice(0, 3).map(f => <FundCard key={f.id} fund={f} />)}
        </div>
      </div>

      {/* ── CTA banner ── */}
      <div style={{ padding: "0 48px 80px" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          background: "linear-gradient(135deg, var(--navy-3) 0%, rgba(34,197,94,0.08) 100%)",
          border: "1px solid var(--card-border)", borderRadius: 20, padding: "60px 48px",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24,
        }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, marginBottom: 10 }}>Start investing today</h2>
            <p style={{ color: "var(--text-muted)", fontSize: 16 }}>Join 50,000+ investors who trust GrowWealth for their financial journey.</p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => setPage("signup")}>Create Free Account</button>
        </div>
      </div>

      <Footer setPage={setPage} />
    </div>
  );
}
