// ─── HomePage ─────────────────────────────────────────────────────
// Landing page: hero section, features grid, top-fund preview, CTA.

import FundCard from "../components/FundCard";
import Footer from "../components/Footer";
import { FUNDS } from "../data";

export default function HomePage({ setPage }) {
  return (
    <div className="page page-with-ticker fade-in">

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
      {/*<div className="section">
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
      </div>*/}

            {/* ── Under construction banner ── */}
      <div className="section">
        <div style={{
          border: "1px dashed var(--card-border)",
          borderRadius: "var(--radius)",
          padding: "56px 40px",
          textAlign: "center",
          background: "var(--green-glow)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Subtle animated dots in the background */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.06,
            backgroundImage: "radial-gradient(var(--green) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }} />
 
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🚧</div>
            <div className="section-label" style={{ margin: "0 auto 16px" }}>In Progress</div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(22px,4vw,32px)",
              fontWeight: 700, marginBottom: 12,
            }}>
              We're building something great here
            </h2>
            <p style={{
              color: "var(--text-muted)", fontSize: 15, maxWidth: 480,
              margin: "0 auto 28px", lineHeight: 1.7,
            }}>
              This section is currently under development. Our team is working hard to bring you an amazing experience — check back soon!
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "var(--green)", opacity: 0.3 + i * 0.25,
                  animation: `pulse ${0.8 + i * 0.2}s ease-in-out infinite alternate`,
                }} />
              ))}
            </div>
          </div>
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

{/* ── Contact Us ── */}
      <div style={{ padding: "0 48px 80px" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          background: "linear-gradient(135deg, var(--navy-3) 0%, rgba(34,197,94,0.08) 100%)",
          border: "1px solid var(--card-border)", borderRadius: 20, padding: "60px 48px",
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label" style={{ margin: "0 auto 16px" }}>Get in Touch</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,4vw,38px)", fontWeight: 700, marginBottom: 12 }}>
              Contact Us Today
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
              Have questions about investing? Our team of SEBI-registered advisors is here to help you every step of the way.
            </p>
          </div>
 
          {/* Contact cards row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
            {[
              { icon: "📧", label: "Email Us", value: "hello@growwealth.in", sub: "We reply within 24 hours" },
              { icon: "📞", label: "Call Us", value: "+91 98765 43210", sub: "Mon – Sat, 9 AM – 6 PM" },
              { icon: "📍", label: "Visit Us", value: "Jodhpur, Rajasthan", sub: "By appointment only" },
              { icon: "💬", label: "Live Chat", value: "Available on app", sub: "Avg. response: 5 mins" },
            ].map(c => (
              <div key={c.label} style={{
                background: "var(--card)", border: "1px solid var(--card-border)",
                borderRadius: "var(--radius)", padding: "24px 20px", textAlign: "center",
                transition: "var(--transition)",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--green)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--card-border)"}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>{c.label}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{c.value}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{c.sub}</div>
              </div>
            ))}
          </div>
 
          {/* Quick message form */}
          <div style={{
            background: "var(--card)", border: "1px solid var(--card-border)",
            borderRadius: "var(--radius)", padding: "32px",
          }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
              Send us a message
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label className="form-label">Your Name</label>
                <input className="form-input" placeholder="Rahul Sharma" />
              </div>
              <div>
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" placeholder="rahul@example.com" />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label className="form-label">Message</label>
              <textarea
                className="form-input"
                placeholder="Tell us how we can help you..."
                rows={4}
                style={{ resize: "vertical", lineHeight: 1.6 }}
              />
            </div>
            <button className="btn btn-primary btn-lg">Send Message →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
