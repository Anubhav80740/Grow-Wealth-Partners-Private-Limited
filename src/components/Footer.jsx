// ─── Footer ───────────────────────────────────────────────────────
// Shown at the bottom of pages that include it (e.g. HomePage).

export default function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div>
        <div className="footer-logo">Grow<span>Wealth</span> Securities</div>
        <div style={{ marginTop: 6, fontSize: 12 }}>SEBI Registered Investment Advisor • ARN-XXXXXX</div>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        {["home", "mutual-funds", "sip", "calculator", "about"].map(p => (
          <span
            key={p}
            style={{ cursor: "pointer", color: "var(--text-muted)" }}
            onClick={() => setPage(p)}
          >
            {p === "mutual-funds" ? "Mutual Funds" : p.charAt(0).toUpperCase() + p.slice(1)}
          </span>
        ))}
      </div>

      <div style={{ fontSize: 12 }}>© 2026 GrowWealth. All rights reserved.</div>
    </footer>
  );
}
