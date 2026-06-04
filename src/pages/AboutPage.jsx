// ─── AboutPage ────────────────────────────────────────────────────
// Company mission, core values, team members, and contact info.

export default function AboutPage() {
  const values = [
    { icon: "🎯", title: "Our Mission",        desc: "Democratize wealth creation by making high-quality financial products accessible to every Indian investor, regardless of background or experience." },
    { icon: "🔍", title: "Transparency First", desc: "Zero hidden charges. We earn from AMCs as distribution commissions, never from you. Your returns are always maximized." },
    { icon: "🛡️", title: "SEBI Registered",   desc: "Fully compliant with SEBI regulations. Your investments are safe, your data is protected, and your rights are always respected." },
  ];

  const team = [
    { name: "Yash Motiani",     role: "Co-Founder & CEO",      emoji: "👨‍💻" },
    { name: "Anubhav Agarwal",  role: "Co-Founder & CTO",      emoji: "👨‍🔧" },
    { name: "Priya Sharma",     role: "Head of Product",        emoji: "👩‍💼" },
    { name: "Rohit Verma",      role: "Head of Research",       emoji: "👨‍🔬" },
  ];

  return (
    <div className="page fade-in">
      <div className="section">
        <div className="section-label">About Us</div>
        <h1 className="section-title">
          We believe everyone<br />deserves to <span className="green">grow wealth</span>
        </h1>
        <p className="section-sub" style={{marginBottom: 56, maxWidth: 700, margin: "0 auto 40px" }}>
          GrowWealth Securities is a SEBI-registered investment advisory platform built to make mutual fund investing simple, transparent, and accessible for every Indian.
        </p>

        {/* Values */}
        <div className="value-grid">
          {values.map(v => (
            <div key={v.title} className="value-card">
              <div className="value-icon">{v.icon}</div>
              <div className="value-title">{v.title}</div>
              <div className="value-desc">{v.desc}</div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div style={{ marginTop: 72 }}>
          <h2 className="section-title" style={{ fontSize: 28, marginBottom: 32 }}>Meet the Team</h2>
          <div className="team-grid">
            {team.map(t => (
              <div key={t.name} className="team-card">
                <div className="team-avatar">{t.emoji}</div>
                <div className="team-name">{t.name}</div>
                <div className="team-role">{t.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div style={{ marginTop: 72, padding: "48px", background: "var(--card)", border: "1px solid var(--card-border)", borderRadius: 20, textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, marginBottom: 12 }}>Have questions?</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 28 }}>Reach out to our team. We're here to help you make the best investment decisions.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ padding: "14px 24px", background: "var(--navy-3)", borderRadius: 12, fontSize: 14 }}>📧 hello@growwealth.in</div>
            <div style={{ padding: "14px 24px", background: "var(--navy-3)", borderRadius: 12, fontSize: 14 }}>📞 +91 98765 43210</div>
            <div style={{ padding: "14px 24px", background: "var(--navy-3)", borderRadius: 12, fontSize: 14 }}>📍 Jodhpur, Rajasthan</div>
          </div>
        </div>
      </div>
    </div>
  );
}
