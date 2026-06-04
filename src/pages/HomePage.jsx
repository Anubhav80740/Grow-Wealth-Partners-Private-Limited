// ─── HomePage ─────────────────────────────────────────────────────

import FundCard from "../components/FundCard";
import Footer from "../components/Footer";
import { FUNDS } from "../data";
import appMockup from "../assets/app-mockup.png";

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

        {/* Animated visual — hidden on mobile */}
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

      {/* ── App Promo Section ── */}
      <div className="section">
        <div style={{
          background: "linear-gradient(135deg, var(--navy-3) 0%, rgba(34,197,94,0.07) 100%)",
          border: "1px solid var(--card-border)",
          borderRadius: 20,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          gap: 0,
          minHeight: 340,
          flexWrap: "wrap",
        }}>

          {/* Left — text + buttons */}
          <div style={{ flex: "1 1 300px", padding: "52px 48px" }}>
            <div className="section-label" style={{ marginBottom: 20 }}>Now on Mobile</div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(22px,3.5vw,38px)",
              fontWeight: 700, lineHeight: 1.2, marginBottom: 16,
            }}>
              Manage your portfolio<br />from anywhere
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.7, marginBottom: 36, maxWidth: 400 }}>
              Track investments, start SIPs, and monitor market movements — all from the GrowWealth mobile app. Available on Android and iOS.
            </p>

            {/* App store buttons */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>

              {/* ── REPLACE THE href BELOW with your real Google Play Store link ── */}
              <a
                href="https://play.google.com/store/apps/REPLACE_WITH_YOUR_APP_ID"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "12px 22px",
                  background: "var(--text)", color: "var(--navy)",
                  borderRadius: 12, textDecoration: "none",
                  transition: "var(--transition)",
                  border: "1px solid transparent",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Google Play icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3.18 1.4L13.86 12 3.18 22.6a1 1 0 01-.68-.94V2.34a1 1 0 01.68-.94z" fill="#EA4335"/>
                  <path d="M17.82 8.18l-4-2.28L3.18 1.4l10.68 10.6 3.96-3.82z" fill="#FBBC04"/>
                  <path d="M17.82 15.82l-4 2.28-10.64 4.5 10.68-10.6 3.96 3.82z" fill="#34A853"/>
                  <path d="M20.5 12a1 1 0 01-.5.86l-2.18 1.24-3.96-3.82 3.96-3.82 2.18 1.24A1 1 0 0120.5 12z" fill="#4285F4"/>
                </svg>
                <div>
                  <div style={{ fontSize: 10, opacity: 0.7, fontFamily: "var(--font-body)", lineHeight: 1 }}>GET IT ON</div>
                  <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "var(--font-display)", lineHeight: 1.3 }}>Google Play</div>
                </div>
              </a>

              {/* ── REPLACE THE href BELOW with your real Apple App Store link ── */}
              <a
                href="https://apps.apple.com/app/REPLACE_WITH_YOUR_APP_ID"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "12px 22px",
                  background: "transparent", color: "var(--text)",
                  borderRadius: 12, textDecoration: "none",
                  border: "1px solid var(--card-border)",
                  transition: "var(--transition)",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--green)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--card-border)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {/* Apple icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div style={{ fontSize: 10, opacity: 0.7, fontFamily: "var(--font-body)", lineHeight: 1 }}>DOWNLOAD ON THE</div>
                  <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "var(--font-display)", lineHeight: 1.3 }}>App Store</div>
                </div>
              </a>

            </div>
          </div>

          {/* Right — app mockup image — hidden on mobile */}
          <div className="app-promo-img-wrap">
            {/*
              ── IMAGE SOURCE ────────────────────────────────────────────────
              Put your mockup image inside src/assets/ and update the import
              at the top of this file:
                import appMockup from "../assets/app-mockup.png";
              Then replace the src below with: src={appMockup}
              ─────────────────────────────────────────────────────────────── */}
            <img
              src={appMockup}
              alt="GrowWealth mobile and desktop app"
              style={{
                width: "100%", maxWidth: 460,
                objectFit: "contain",
                objectPosition: "bottom",
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.35))",
                transform: "translateY(10px)",
              }}
            />
          </div>

        </div>
      </div>

      {/* ── Top funds preview ── */}
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="section-top-row">
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
      <div className="contact-section-wrap">
        <div className="contact-section-inner">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="section-label" style={{ margin: "0 auto 16px" }}>Get in Touch</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,4vw,38px)", fontWeight: 700, marginBottom: 12 }}>
              Contact Us Today
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
              Have questions about investing? Our team of SEBI-registered advisors is here to help you every step of the way.
            </p>
          </div>

          {/* Contact cards */}
          <div className="contact-cards-grid">
            {[
              { icon: "📧", label: "Email Us",  value: "hello@growwealth.in", sub: "We reply within 24 hours" },
              { icon: "📞", label: "Call Us",   value: "+91 98765 43210",     sub: "Mon – Sat, 9 AM – 6 PM" },
              { icon: "📍", label: "Visit Us",  value: "Jodhpur, Rajasthan",  sub: "By appointment only" },
              { icon: "💬", label: "Live Chat", value: "Available on app",    sub: "Avg. response: 5 mins" },
            ].map(c => (
              <div key={c.label} className="contact-card">
                <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>{c.label}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{c.value}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{c.sub}</div>
              </div>
            ))}
          </div>

          {/* Message form */}
          <div className="contact-form-card">
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
              Send us a message
            </div>
            <div className="contact-form-grid">
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
              <textarea className="form-input" placeholder="Tell us how we can help you..." rows={4} style={{ resize: "vertical", lineHeight: 1.6 }} />
            </div>
            <button className="btn btn-primary btn-lg">Send Message →</button>
          </div>
        </div>
      </div>

      <Footer setPage={setPage} />
    </div>
  );
}