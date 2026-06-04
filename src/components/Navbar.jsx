// ─── Navbar ───────────────────────────────────────────────────────
// Desktop: horizontal links. Mobile: hamburger → slide-down drawer.

import { useState } from "react";

const PAGES = ["home", "mutual-funds", "sip", "calculator", "about"];

function pageLabel(p) {
  if (p === "mutual-funds") return "Mutual Funds";
  if (p === "sip") return "SIP";
  return p.charAt(0).toUpperCase() + p.slice(1);
}

export default function Navbar({ page, setPage, isLoggedIn, setIsLoggedIn, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = theme === "dark";

  const navigate = (p) => { setPage(p); setMenuOpen(false); };

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <div className="nav-logo" onClick={() => navigate("home")}>
          <div className="logo-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 14 L8 6 L11 10 L14 7 L16 9" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          Grow<span>Wealth</span>
        </div>

        {/* Desktop links */}
        <div className="nav-links">
          {PAGES.map(p => (
            <button key={p} className={`nav-link ${page === p ? "active" : ""}`} onClick={() => navigate(p)}>
              {pageLabel(p)}
            </button>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? "☀️" : "🌙"}
          </button>
          {isLoggedIn ? (
            <>
              <button className="btn btn-ghost" onClick={() => navigate("dashboard")}>Dashboard</button>
              <button className="btn btn-primary" onClick={() => { setIsLoggedIn(false); navigate("home"); }}>Logout</button>
            </>
          ) : (
            <>
              <button className="btn btn-ghost nav-hide-sm" onClick={() => navigate("login")}>Login</button>
              <button className="btn btn-primary" onClick={() => navigate("signup")}>Sign Up</button>
            </>
          )}

          {/* Hamburger — mobile only */}
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span className={`ham-line ${menuOpen ? "open" : ""}`} />
            <span className={`ham-line ${menuOpen ? "open" : ""}`} />
            <span className={`ham-line ${menuOpen ? "open" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-menu">
          {/* Nav links */}
          {PAGES.map(p => (
            <button key={p} className={`mobile-nav-link ${page === p ? "active" : ""}`} onClick={() => navigate(p)}>
              {pageLabel(p)}
            </button>
          ))}

          <div className="mobile-menu-divider" />

          {/* Auth buttons */}
          {isLoggedIn ? (
            <>
              <button className="mobile-nav-link" onClick={() => navigate("dashboard")}>Dashboard</button>
              <button className="btn btn-primary" style={{ width: "100%", marginTop: 8 }}
                onClick={() => { setIsLoggedIn(false); navigate("home"); }}>Logout</button>
            </>
          ) : (
            <>
              <button className="btn btn-ghost" style={{ width: "100%", marginBottom: 10 }} onClick={() => navigate("login")}>Login</button>
              <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => navigate("signup")}>Sign Up</button>
            </>
          )}

          {/* Theme toggle inside drawer */}
          <button className="mobile-theme-btn" onClick={toggleTheme}>
            {isDark ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
          </button>
        </div>
      )}
    </>
  );
}
