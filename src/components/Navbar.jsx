// ─── Navbar ───────────────────────────────────────────────────────
// Shown on every page. Receives current page + auth state + theme from App.

export default function Navbar({ page, setPage, isLoggedIn, setIsLoggedIn, theme, toggleTheme }) {
  const isDark = theme === "dark";

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => setPage("home")}>
        <div className="logo-icon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 14 L8 6 L11 10 L14 7 L16 9" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        Grow<span>Wealth</span>
      </div>

      <div className="nav-links">
        {["home", "mutual-funds", "sip", "calculator", "about"].map(p => (
          <button
            key={p}
            className={`nav-link ${page === p ? "active" : ""}`}
            onClick={() => setPage(p)}
          >
            {p === "mutual-funds" ? "Mutual Funds"
              : p === "sip" ? "SIP"
              : p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      <div className="nav-actions">
        {/* Theme toggle */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          aria-label="Toggle theme"
        >
          {isDark ? "☀️" : "🌙"}
        </button>

        {isLoggedIn ? (
          <>
            <button className="btn btn-ghost" onClick={() => setPage("dashboard")}>Dashboard</button>
            <button className="btn btn-primary" onClick={() => { setIsLoggedIn(false); setPage("home"); }}>Logout</button>
          </>
        ) : (
          <>
            <button className="btn btn-ghost" onClick={() => setPage("login")}>Login</button>
            <button className="btn btn-primary" onClick={() => setPage("signup")}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
}
