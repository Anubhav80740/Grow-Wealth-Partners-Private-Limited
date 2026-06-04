const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ══════════════════════════════════════════
     THEME VARIABLES
  ══════════════════════════════════════════ */
  :root {
    --navy: #0d1b2a;
    --navy-2: #112236;
    --navy-3: #162d44;
    --green: #22c55e;
    --green-dim: #16a34a;
    --green-glow: rgba(34,197,94,0.15);
    --text: #e2eaf4;
    --text-muted: #7a9bb5;
    --card: #0f2035;
    --card-border: rgba(34,197,94,0.15);
    --red: #f87171;
    --font-display: 'Clash Display', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --radius: 14px;
    --transition: 0.25s cubic-bezier(0.4,0,0.2,1);
    --ticker-bg: #0a1628;
    --ticker-border: rgba(34,197,94,0.12);
    --nav-h: 60px;
    --ticker-h: 34px;
  }
  :root.light {
    --navy: #f0f4f8;
    --navy-2: #e2eaf4;
    --navy-3: #d1dce8;
    --green: #16a34a;
    --green-dim: #15803d;
    --green-glow: rgba(22,163,74,0.12);
    --text: #0d1b2a;
    --text-muted: #4a6480;
    --card: #ffffff;
    --card-border: rgba(22,163,74,0.2);
    --red: #dc2626;
    --ticker-bg: #e8f0e8;
    --ticker-border: rgba(22,163,74,0.2);
  }

  /* ══════════════════════════════════════════
     BASE
  ══════════════════════════════════════════ */
  html { scroll-behavior: smooth; }
  body {
    background: var(--navy); color: var(--text);
    font-family: var(--font-body); font-size: 15px; line-height: 1.6;
    overflow-x: hidden;
    transition: background 0.3s ease, color 0.3s ease;
  }
  /* Explicitly inherit --text so headings never stay white in light mode */
  h1, h2, h3, h4, h5, h6 { color: var(--text); }
  p { color: inherit; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--navy-2); }
  ::-webkit-scrollbar-thumb { background: var(--green-dim); border-radius: 3px; }

  /* ══════════════════════════════════════════
     NAVBAR
  ══════════════════════════════════════════ */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: var(--nav-h);
    background: rgba(13,27,42,0.92); backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(34,197,94,0.1);
    transition: var(--transition);
  }
  :root.light .navbar {
    background: rgba(240,244,248,0.95);
    border-bottom-color: rgba(22,163,74,0.15);
  }
  .nav-logo {
    display: flex; align-items: center; gap: 10px;
    font-family: var(--font-display); font-size: 20px; font-weight: 700;
    color: var(--text); cursor: pointer; flex-shrink: 0;
  }
  .nav-logo span { color: var(--green); }
  .logo-icon {
    width: 32px; height: 32px; background: var(--green);
    border-radius: 8px; display: grid; place-items: center; flex-shrink: 0;
  }
  .nav-links { display: flex; align-items: center; gap: 4px; }
  .nav-link {
    padding: 6px 12px; border-radius: 8px; color: var(--text-muted);
    font-size: 14px; font-weight: 500; cursor: pointer;
    transition: var(--transition); border: none; background: transparent;
    font-family: var(--font-body);
  }
  .nav-link:hover { color: var(--text); background: var(--navy-3); }
  .nav-link.active { color: var(--green); background: var(--green-glow); }
  .nav-actions { display: flex; gap: 8px; align-items: center; }

  /* Theme toggle */
  .theme-toggle {
    width: 36px; height: 36px; border-radius: 10px;
    border: 1px solid var(--card-border); background: transparent;
    cursor: pointer; display: grid; place-items: center; font-size: 16px;
    transition: var(--transition); flex-shrink: 0;
  }
  .theme-toggle:hover { border-color: var(--green); background: var(--green-glow); }

  /* Hamburger button */
  .hamburger {
    display: none; flex-direction: column; justify-content: center;
    gap: 5px; width: 36px; height: 36px; border-radius: 10px;
    border: 1px solid var(--card-border); background: transparent;
    cursor: pointer; padding: 8px; transition: var(--transition);
  }
  .hamburger:hover { border-color: var(--green); background: var(--green-glow); }
  .ham-line {
    display: block; height: 2px; background: var(--text);
    border-radius: 2px; transition: var(--transition);
    transform-origin: center;
  }
  .ham-line.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .ham-line.open:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .ham-line.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* Mobile drawer */
  .mobile-menu {
    display: none;
    position: fixed; top: var(--nav-h); left: 0; right: 0; z-index: 190;
    background: var(--navy-2); border-bottom: 1px solid var(--card-border);
    padding: 16px; flex-direction: column; gap: 4px;
    animation: slideDown 0.2s ease;
  }
  @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
  .mobile-nav-link {
    display: block; width: 100%; text-align: left;
    padding: 12px 16px; border-radius: 10px; border: none;
    background: transparent; color: var(--text-muted);
    font-size: 15px; font-weight: 500; font-family: var(--font-body);
    cursor: pointer; transition: var(--transition);
  }
  .mobile-nav-link:hover, .mobile-nav-link.active {
    background: var(--navy-3); color: var(--green);
  }
  .mobile-menu-divider {
    height: 1px; background: var(--card-border); margin: 8px 0;
  }
  .mobile-theme-btn {
    margin-top: 8px; padding: 12px 16px; border-radius: 10px;
    border: 1px solid var(--card-border); background: transparent;
    color: var(--text-muted); font-size: 14px; font-weight: 500;
    font-family: var(--font-body); cursor: pointer;
    transition: var(--transition); text-align: left;
  }
  .mobile-theme-btn:hover { border-color: var(--green); color: var(--green); }

  /* ══════════════════════════════════════════
     MARKET TICKER
  ══════════════════════════════════════════ */
  .ticker-wrap {
    position: fixed; top: var(--nav-h); left: 0; right: 0; z-index: 99;
    height: var(--ticker-h);
    background: var(--ticker-bg);
    border-bottom: 1px solid var(--ticker-border);
    overflow: hidden; display: flex; align-items: center;
  }
  .ticker-fade-left {
    position: absolute; left: 0; top: 0; bottom: 0; width: 48px; z-index: 2;
    background: linear-gradient(to right, var(--ticker-bg), transparent);
    pointer-events: none;
  }
  .ticker-fade-right {
    position: absolute; right: 0; top: 0; bottom: 0; width: 48px; z-index: 2;
    background: linear-gradient(to left, var(--ticker-bg), transparent);
    pointer-events: none;
  }
  .ticker-track {
    display: flex; align-items: center;
    animation: ticker-scroll 38s linear infinite;
    white-space: nowrap; will-change: transform;
  }
  .ticker-track:hover { animation-play-state: paused; }
  @keyframes ticker-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .ticker-item {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 0 24px; font-size: 12px;
    border-right: 1px solid var(--ticker-border);
  }
  .ticker-name  { color: var(--text-muted); font-weight: 500; letter-spacing: 0.04em; }
  .ticker-price { color: var(--text); font-weight: 600; font-family: var(--font-display); }
  .ticker-up    { color: #22c55e; font-weight: 500; }
  .ticker-down  { color: var(--red); font-weight: 500; }

  /* ══════════════════════════════════════════
     PAGE & LAYOUT
  ══════════════════════════════════════════ */
  .page { padding-top: var(--nav-h); min-height: 100vh; }
  .page-with-ticker { padding-top: calc(var(--nav-h) + var(--ticker-h)); }

  .section { padding: 72px 48px; max-width: 1200px; margin: 0 auto; }
  .section-label {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--green-glow); border: 1px solid var(--card-border);
    color: var(--green); font-size: 12px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; padding: 5px 14px; border-radius: 100px; margin-bottom: 18px;
  }
  .section-title {
    font-family: var(--font-display); font-size: clamp(28px,4vw,42px);
    font-weight: 700; line-height: 1.15; margin-bottom: 16px; color: var(--text);
  }
  .section-sub { color: var(--text-muted); font-size: 17px; max-width: 520px; line-height: 1.7; }
  .section-top-row {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-bottom: 28px; gap: 16px; flex-wrap: wrap;
  }

  /* ══════════════════════════════════════════
     HERO
  ══════════════════════════════════════════ */
  .hero {
    min-height: calc(100vh - var(--nav-h) - var(--ticker-h));
    display: flex; align-items: center; padding: 40px 48px;
    position: relative; overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 80% 60% at 70% 50%, rgba(34,197,94,0.06) 0%, transparent 70%);
  }
  :root.light .hero-bg {
    background: radial-gradient(ellipse 80% 60% at 70% 50%, rgba(22,163,74,0.05) 0%, transparent 70%);
  }
  .hero-grid {
    position: absolute; inset: 0; pointer-events: none; opacity: 0.04;
    background-image: linear-gradient(var(--green) 1px, transparent 1px), linear-gradient(90deg, var(--green) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .hero-content { max-width: 600px; position: relative; z-index: 1; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--green-glow); border: 1px solid var(--card-border);
    padding: 6px 16px; border-radius: 100px; margin-bottom: 24px;
    font-size: 13px; color: var(--green); font-weight: 500;
  }
  .hero-badge::before { content: '●'; font-size: 8px; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .hero-title {
    font-family: var(--font-display); font-size: clamp(36px,6vw,68px);
    font-weight: 700; line-height: 1.08; margin-bottom: 20px; color: var(--text);
  }
  .hero-title em { color: var(--green); font-style: normal; }
  .hero-desc { color: var(--text-muted); font-size: 17px; line-height: 1.7; margin-bottom: 36px; }
  .hero-actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
  .hero-stats {
    display: flex; gap: 32px; margin-top: 48px; padding-top: 36px;
    border-top: 1px solid rgba(128,128,128,0.12); flex-wrap: wrap;
  }
  .stat-num { font-family: var(--font-display); font-size: 26px; font-weight: 700; color: var(--green); }
  .stat-label { font-size: 13px; color: var(--text-muted); margin-top: 2px; }
  .hero-visual {
    position: absolute; right: 48px; top: 50%; transform: translateY(-50%);
    width: 380px; height: 380px; pointer-events: none;
  }
  .hero-ring { position: absolute; inset: 0; border: 1px solid rgba(34,197,94,0.12); border-radius: 50%; animation: spin 30s linear infinite; }
  .hero-ring-2 { position: absolute; inset: 40px; border: 1px dashed rgba(34,197,94,0.1); border-radius: 50%; animation: spin 20s linear infinite reverse; }
  .hero-ring-dot { position: absolute; width: 8px; height: 8px; background: var(--green); border-radius: 50%; top: -4px; left: 50%; margin-left: -4px; box-shadow: 0 0 12px var(--green); }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .hero-card-float {
    position: absolute; background: var(--card); border: 1px solid var(--card-border);
    border-radius: var(--radius); padding: 14px 18px; backdrop-filter: blur(8px);
    animation: float 6s ease-in-out infinite;
  }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  .hero-card-float:nth-child(3) { top: 60px; right: 40px; animation-delay: -2s; }
  .hero-card-float:nth-child(4) { bottom: 80px; left: 20px; animation-delay: -4s; }
  .float-label { font-size: 11px; color: var(--text-muted); margin-bottom: 4px; }
  .float-val { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--green); }
  .float-change { font-size: 12px; color: var(--green); }

  /* ══════════════════════════════════════════
     BUTTONS
  ══════════════════════════════════════════ */
  .btn {
    padding: 9px 22px; border-radius: 10px; font-size: 14px; font-weight: 500;
    cursor: pointer; transition: var(--transition); border: none; font-family: var(--font-body);
  }
  .btn-ghost { background: transparent; border: 1px solid var(--card-border); color: var(--text); }
  .btn-ghost:hover { border-color: var(--green); color: var(--green); }
  .btn-primary { background: var(--green); color: #fff; font-weight: 600; }
  :root.light .btn-primary { color: #fff; }
  .btn-primary:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(34,197,94,0.25); }
  .btn-outline { background: transparent; border: 1.5px solid var(--green); color: var(--green); }
  .btn-outline:hover { background: var(--green); color: #fff; }
  .btn-lg { padding: 13px 28px; font-size: 15px; border-radius: 12px; }

  /* ══════════════════════════════════════════
     CARDS
  ══════════════════════════════════════════ */
  .card {
    background: var(--card); border: 1px solid var(--card-border);
    border-radius: var(--radius); padding: 24px; transition: var(--transition);
  }
  .card:hover { border-color: rgba(34,197,94,0.25); }

  /* Feature cards */
  .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
  .feature-card {
    background: var(--card); border: 1px solid var(--card-border);
    border-radius: var(--radius); padding: 24px; transition: var(--transition);
    position: relative; overflow: hidden;
  }
  .feature-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--green), transparent);
    opacity: 0; transition: var(--transition);
  }
  .feature-card:hover { transform: translateY(-4px); border-color: rgba(34,197,94,0.3); }
  .feature-card:hover::before { opacity: 1; }
  .feature-icon { width: 44px; height: 44px; background: var(--green-glow); border: 1px solid var(--card-border); border-radius: 10px; display: grid; place-items: center; font-size: 20px; margin-bottom: 14px; }
  .feature-title { font-family: var(--font-display); font-size: 17px; font-weight: 600; margin-bottom: 8px; color: var(--text); }
  .feature-desc { color: var(--text-muted); font-size: 14px; line-height: 1.6; }

  /* Fund cards */
  .funds-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
  .fund-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 22px; transition: var(--transition); cursor: pointer; }
  .fund-card:hover { transform: translateY(-3px); border-color: rgba(34,197,94,0.3); box-shadow: 0 12px 32px rgba(0,0,0,0.06); }
  :root.light .fund-card:hover { box-shadow: 0 12px 32px rgba(0,0,0,0.12); }
  .fund-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
  .fund-logo { width: 38px; height: 38px; border-radius: 10px; display: grid; place-items: center; font-size: 13px; font-weight: 700; color: #fff; flex-shrink: 0; }
  .fund-name { font-family: var(--font-display); font-size: 15px; font-weight: 600; margin-bottom: 3px; line-height: 1.3; color: var(--text); }
  .fund-category { font-size: 12px; color: var(--text-muted); }
  .fund-stars { color: #f59e0b; font-size: 11px; letter-spacing: 1px; }
  .fund-metrics { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin: 14px 0; }
  .fund-metric-label { font-size: 11px; color: var(--text-muted); margin-bottom: 3px; }
  .fund-metric-val { font-family: var(--font-display); font-size: 16px; font-weight: 600; }
  .fund-metric-val.green { color: var(--green); }
  .fund-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 1px solid var(--card-border); }
  .fund-min { font-size: 12px; color: var(--text-muted); }
  .fund-min span { color: var(--text); font-weight: 500; }
  .risk-badge { font-size: 11px; padding: 3px 10px; border-radius: 100px; font-weight: 500; }
  .risk-low  { background: rgba(34,197,94,0.1);  color: #16a34a; }
  .risk-mod  { background: rgba(245,158,11,0.1); color: #d97706; }
  .risk-high { background: rgba(220,38,38,0.1);  color: #dc2626; }

  /* ══════════════════════════════════════════
     SEARCH & FILTERS
  ══════════════════════════════════════════ */
  .search-row { display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap; align-items: center; }
  .search-wrap { flex: 1; min-width: 220px; position: relative; }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 15px; }
  .search-input {
    width: 100%; padding: 10px 12px 10px 38px;
    background: var(--navy-3); border: 1px solid var(--card-border);
    border-radius: 10px; color: var(--text); font-family: var(--font-body); font-size: 14px;
    outline: none; transition: var(--transition);
  }
  .search-input:focus { border-color: var(--green); box-shadow: 0 0 0 3px var(--green-glow); }
  .search-input::placeholder { color: var(--text-muted); }
  .filter-select {
    padding: 10px 12px; border-radius: 10px; border: 1px solid var(--card-border);
    background: var(--navy-3); color: var(--text-muted); font-size: 13px;
    cursor: pointer; outline: none; font-family: var(--font-body);
  }
  .tab-row { display: flex; gap: 6px; margin-bottom: 24px; flex-wrap: wrap; }
  .tab-btn {
    padding: 7px 16px; border-radius: 8px; font-size: 13px; font-weight: 500;
    cursor: pointer; transition: var(--transition); border: 1px solid var(--card-border);
    background: transparent; color: var(--text-muted); font-family: var(--font-body);
  }
  .tab-btn.active { background: var(--green); color: #fff; border-color: var(--green); }
  .tab-btn:hover:not(.active) { border-color: var(--green); color: var(--green); }

  /* ══════════════════════════════════════════
     DASHBOARD
  ══════════════════════════════════════════ */
  .dash-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 24px; }
  .dash-stat { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 22px; }
  .dash-stat-label { font-size: 13px; color: var(--text-muted); margin-bottom: 8px; }
  .dash-stat-val { font-family: var(--font-display); font-size: clamp(20px,3vw,30px); font-weight: 700; color: var(--text); }
  .dash-stat-change { font-size: 13px; margin-top: 6px; }
  .pos { color: #16a34a; }
  .neg { color: var(--red); }
  .holdings-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .holdings-table { width: 100%; border-collapse: collapse; min-width: 520px; }
  .holdings-table th { text-align: left; font-size: 12px; color: var(--text-muted); font-weight: 500; padding: 10px 14px; border-bottom: 1px solid var(--card-border); letter-spacing: 0.05em; text-transform: uppercase; white-space: nowrap; }
  .holdings-table td { padding: 13px 14px; font-size: 14px; border-bottom: 1px solid var(--card-border); white-space: nowrap; }
  .holdings-table tr:last-child td { border-bottom: none; }
  .holdings-table tr:hover td { background: var(--green-glow); }
  .progress-bar { height: 4px; background: var(--navy-3); border-radius: 2px; margin-top: 6px; }
  .progress-fill { height: 4px; background: var(--green); border-radius: 2px; }

  /* ══════════════════════════════════════════
     AUTH
  ══════════════════════════════════════════ */
  .auth-page {
    min-height: calc(100vh - var(--nav-h));
    display: flex; align-items: center; justify-content: center;
    padding: 40px 20px;
    background: radial-gradient(ellipse 60% 60% at 50% 40%, var(--green-glow) 0%, transparent 70%);
  }
  .auth-card { background: var(--card); border: 1px solid var(--card-border); border-radius: 20px; padding: 40px 32px; width: 100%; max-width: 440px; }
  .auth-title { font-family: var(--font-display); font-size: 26px; font-weight: 700; margin-bottom: 8px; color: var(--text); }
  .auth-sub { color: var(--text-muted); font-size: 14px; margin-bottom: 28px; }
  .form-group { margin-bottom: 16px; }
  .form-label { font-size: 13px; font-weight: 500; color: var(--text-muted); margin-bottom: 7px; display: block; }
  .form-input {
    width: 100%; padding: 11px 13px; background: var(--navy-3);
    border: 1px solid var(--card-border); border-radius: 10px;
    color: var(--text); font-family: var(--font-body); font-size: 14px; outline: none;
    transition: var(--transition);
  }
  .form-input:focus { border-color: var(--green); box-shadow: 0 0 0 3px var(--green-glow); }
  .form-input::placeholder { color: var(--text-muted); }
  .auth-footer { text-align: center; margin-top: 20px; font-size: 14px; color: var(--text-muted); }
  .auth-footer a { color: var(--green); cursor: pointer; }
  .divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; color: var(--text-muted); font-size: 13px; }
  .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--card-border); }

  /* ══════════════════════════════════════════
     CALCULATOR
  ══════════════════════════════════════════ */
  .calc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start; }
  .calc-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 28px; }
  .calc-title { font-family: var(--font-display); font-size: 20px; font-weight: 700; margin-bottom: 24px; color: var(--text); }
  .range-wrap { margin-bottom: 20px; }
  .range-label { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
  .range-label span:last-child { font-family: var(--font-display); font-weight: 600; color: var(--green); }
  input[type=range] { width: 100%; -webkit-appearance: none; height: 4px; background: var(--navy-3); border-radius: 2px; outline: none; }
  input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; background: var(--green); border-radius: 50%; cursor: pointer; box-shadow: 0 0 8px rgba(34,197,94,0.4); }
  .calc-result { background: var(--green-glow); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 24px; }
  .calc-result-label { font-size: 13px; color: var(--text-muted); margin-bottom: 6px; }
  .calc-result-val { font-family: var(--font-display); font-size: clamp(28px,4vw,36px); font-weight: 700; color: var(--green); }
  .calc-breakdown { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px; }
  .calc-bd-item { background: var(--navy-3); border-radius: 10px; padding: 14px; }
  .calc-bd-label { font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
  .calc-bd-val { font-family: var(--font-display); font-size: 18px; font-weight: 600; color: var(--text); }

  /* ══════════════════════════════════════════
     SIP PAGE
  ══════════════════════════════════════════ */
  .sip-hero { padding: 56px 48px; max-width: 1200px; margin: 0 auto; }
  .sip-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
  .sip-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 24px; cursor: pointer; transition: var(--transition); }
  .sip-card:hover { transform: translateY(-3px); border-color: rgba(34,197,94,0.3); }
  .sip-number { font-family: var(--font-display); font-size: 12px; color: var(--green); font-weight: 600; margin-bottom: 10px; letter-spacing: 0.05em; }
  .sip-card-title { font-family: var(--font-display); font-size: 18px; font-weight: 700; margin-bottom: 10px; color: var(--text); }
  .sip-card-desc { font-size: 14px; color: var(--text-muted); line-height: 1.6; margin-bottom: 14px; }
  .sip-min { font-size: 13px; color: var(--text-muted); }
  .sip-min strong { color: var(--green); }

  /* ══════════════════════════════════════════
     ABOUT
  ══════════════════════════════════════════ */
  .team-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
  .team-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 24px; text-align: center; }
  .team-avatar { width: 68px; height: 68px; border-radius: 50%; background: var(--green-glow); border: 2px solid var(--green); display: grid; place-items: center; font-size: 24px; margin: 0 auto 14px; }
  .team-name { font-family: var(--font-display); font-size: 16px; font-weight: 600; margin-bottom: 4px; color: var(--text); }
  .team-role { font-size: 13px; color: var(--text-muted); }
  .value-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-top: 40px; }
  .value-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 24px; text-align: center; }
  .value-icon { font-size: 30px; margin-bottom: 12px; }
  .value-title { font-family: var(--font-display); font-size: 17px; font-weight: 600; margin-bottom: 8px; color: var(--text); }
  .value-desc { font-size: 14px; color: var(--text-muted); line-height: 1.6; }

  /* ══════════════════════════════════════════
     CONTACT SECTION
  ══════════════════════════════════════════ */
  .contact-section-wrap { padding: 0 48px 72px; }
  .contact-section-inner {
    max-width: 1200px; margin: 0 auto;
    background: linear-gradient(135deg, var(--navy-3) 0%, rgba(34,197,94,0.08) 100%);
    border: 1px solid var(--card-border); border-radius: 20px; padding: 56px 48px;
  }
  .contact-cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px,1fr)); gap: 14px; margin-bottom: 32px; }
  .contact-card {
    background: var(--card); border: 1px solid var(--card-border);
    border-radius: var(--radius); padding: 22px 16px; text-align: center;
    transition: var(--transition);
  }
  .contact-card:hover { border-color: var(--green); }
  .contact-form-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 28px; }
  .contact-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }

  /* ══════════════════════════════════════════
     TRANSACTIONS / MISC
  ══════════════════════════════════════════ */
  .tx-badge { font-size: 11px; padding: 3px 10px; border-radius: 100px; font-weight: 500; display: inline-block; }
  .tx-buy    { background: rgba(34,197,94,0.1); color: #16a34a; }
  .tx-redeem { background: rgba(220,38,38,0.1); color: #dc2626; }
  .green { color: var(--green); }
  .muted { color: var(--text-muted); }
  .tag { display: inline-block; font-size: 11px; padding: 3px 10px; border-radius: 100px; background: var(--green-glow); border: 1px solid var(--card-border); color: var(--green); font-weight: 500; }

  /* ══════════════════════════════════════════
     LIGHT MODE — targeted fixes for text/bg that
     become invisible when theme variables flip.
     All hardcoded colors in inline JSX styles are
     overridden here via class-based selectors.
  ══════════════════════════════════════════ */

  /* Primary button text: keep white in both modes (green bg is dark enough) */
  .btn-primary { color: #fff; }

  /* Ghost button text inherits var(--text) which flips — make sure it stays legible */
  :root.light .btn-ghost { color: var(--text); }

  /* Fund logo initials are on a coloured bg — always white */
  .fund-logo { color: #fff !important; }

  /* Tab active always white text on green bg */
  .tab-btn.active { color: #fff; }
  :root.light .tab-btn.active { color: #fff; }

  /* Hero stats border: was semi-transparent white, needs to be semi-transparent dark in light mode */
  :root.light .hero-stats { border-top-color: rgba(0,0,0,0.1); }

  /* Dashboard: hardcoded rgba(255,255,255,0.04) border in table rows — fix for light */
  :root.light .holdings-table td { border-bottom-color: rgba(0,0,0,0.06); }
  :root.light .holdings-table th { border-bottom-color: rgba(0,0,0,0.08); }

  /* Holdings & tx table row hover */
  :root.light .holdings-table tr:hover td { background: var(--green-glow); }

  /* Dashboard card inner — box shadow makes it feel elevated in light mode */
  :root.light .card { box-shadow: 0 1px 6px rgba(0,0,0,0.07); }
  :root.light .dash-stat { box-shadow: 0 1px 6px rgba(0,0,0,0.07); }

  /* Corpus breakdown bar in Calculator — hardcoded navy-3 bg already uses var, but the
     float divs inside use inline styles — the bar background needs light mode override */
  :root.light input[type=range] { background: var(--navy-3); }

  /* Ticker: hardcoded green colors for up/down need to be readable on light ticker bg */
  :root.light .ticker-up { color: #15803d; }
  :root.light .ticker-down { color: var(--red); }
  :root.light .ticker-name { color: var(--text-muted); }
  :root.light .ticker-price { color: var(--text); }

  /* Quick stats row separators (Dashboard inline border-bottom rgba white) */
  :root.light .quick-stats-item {
    border-bottom-color: rgba(0,0,0,0.05) !important;
  }

  /* Contact info pills on HomePage (inline style: background var(--navy-3)) — already vars, fine */
  /* But the outer gradient wrapper needs a light override */
  :root.light .contact-section-inner {
    background: linear-gradient(135deg, var(--navy-3) 0%, rgba(22,163,74,0.06) 100%);
  }

  /* SIP card inline border-color on hover already uses rgba(34,197,94,0.3) — fine */

  /* Auth card: "Continue with Google" ghost btn */
  :root.light .btn-ghost { border-color: var(--card-border); }

  /* Step bar inactive segments (inline style background var(--navy-3)) — already a var, fine */

  /* Footer navigation link spans */
  :root.light .footer-nav-link { color: var(--text-muted); }
  :root.light .footer-nav-link:hover { color: var(--green); cursor: pointer; }

  /* Risk badges — hardcoded hex colors, already readable in light */
  :root.light .risk-mod { color: #92400e; background: rgba(245,158,11,0.15); }
  :root.light .risk-low { color: #15803d; background: rgba(34,197,94,0.12); }
  :root.light .risk-high { color: #b91c1c; background: rgba(220,38,38,0.12); }

  /* Tx badges */
  :root.light .tx-buy    { color: #15803d; }
  :root.light .tx-redeem { color: #b91c1c; }

  /* pos / neg return text */
  :root.light .pos { color: #15803d; }
  :root.light .neg { color: #b91c1c; }

  /* Navbar: ensure logo text is always readable */
  :root.light .nav-logo { color: var(--text); }

  /* Hero-card floats use var(--card) and var(--green) — already adaptive */

  /* App promo section gradient */
  :root.light .app-promo-wrap {
    background: linear-gradient(135deg, var(--navy-3) 0%, rgba(22,163,74,0.06) 100%) !important;
  }

  /* Hamburger lines in light mode */
  :root.light .ham-line { background: var(--text); }

  /* Mobile menu background */
  :root.light .mobile-menu { background: var(--navy-2); }

  /* "Send Message" form textarea */
  :root.light textarea.form-input { color: var(--text); }

  /* CTA block on HomePage bottom */
  :root.light .cta-block {
    background: linear-gradient(135deg, var(--navy-3) 0%, rgba(22,163,74,0.06) 100%) !important;
  }

  /* ══════════════════════════════════════════
     FOOTER
  ══════════════════════════════════════════ */
  .footer {
    border-top: 1px solid var(--card-border); padding: 36px 48px;
    display: flex; justify-content: space-between; align-items: center;
    color: var(--text-muted); font-size: 13px; flex-wrap: wrap; gap: 16px;
  }
  .footer-logo { font-family: var(--font-display); font-weight: 700; font-size: 17px; color: var(--text); }
  .footer-logo span { color: var(--green); }

  /* ══════════════════════════════════════════
     ANIMATIONS
  ══════════════════════════════════════════ */
  .fade-in { animation: fadeIn 0.35s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  /* ══════════════════════════════════════════
     MOBILE — ≤ 768px
  ══════════════════════════════════════════ */
  @media (max-width: 768px) {

    /* Variables */
    :root { --nav-h: 60px; --ticker-h: 30px; }

    /* Navbar */
    .navbar { padding: 0 16px; }
    .nav-links { display: none; }
    .nav-hide-sm { display: none; }
    .hamburger { display: flex; }
    .mobile-menu { display: flex; }
    .theme-toggle { display: none; } /* moved inside drawer on mobile */

    /* Ticker */
    .ticker-item { padding: 0 14px; gap: 6px; }
    .ticker-item .ticker-price { display: none; } /* save space — show name + % only */

    /* Hero */
    .hero { padding: 32px 20px; min-height: auto; flex-direction: column; align-items: flex-start; }
    .hero-visual { display: none; }
    .hero-content { max-width: 100%; }
    .hero-desc { font-size: 15px; }
    .hero-actions { flex-direction: column; align-items: stretch; }
    .hero-actions .btn { text-align: center; }
    .hero-stats { gap: 20px; margin-top: 32px; padding-top: 24px; }
    .stat-num { font-size: 22px; }

    /* Sections */
    .section { padding: 40px 16px; }
    .sip-hero { padding: 40px 16px; }
    .section-top-row { flex-direction: column; align-items: flex-start; }

    /* Grids → single column */
    .funds-grid { grid-template-columns: 1fr; }
    .sip-grid { grid-template-columns: 1fr; }
    .feature-grid { grid-template-columns: 1fr; }
    .team-grid { grid-template-columns: 1fr 1fr; }
    .value-grid { grid-template-columns: 1fr; }

    /* Dashboard */
    .dash-grid { grid-template-columns: 1fr; }
    .dash-stat-val { font-size: 24px; }

    /* Calculator */
    .calc-grid { grid-template-columns: 1fr; }
    .calc-breakdown { grid-template-columns: 1fr 1fr; }

    /* Contact */
    .contact-section-wrap { padding: 0 16px 48px; }
    .contact-section-inner { padding: 32px 20px; }
    .contact-cards-grid { grid-template-columns: 1fr 1fr; }
    .contact-form-grid { grid-template-columns: 1fr; }
    .contact-form-card { padding: 20px; }

    /* Auth */
    .auth-page { padding: 24px 16px; align-items: flex-start; padding-top: 40px; }
    .auth-card { padding: 28px 20px; border-radius: 16px; }

    /* Footer */
    .footer { flex-direction: column; text-align: center; padding: 28px 16px; gap: 12px; }
    .footer > div:nth-child(2) { display: none; } /* hide footer nav links */

    /* Fund card metrics — 2 col on mobile */
    .fund-metrics { grid-template-columns: 1fr 1fr; }
    .fund-metrics > div:last-child { display: none; } /* hide AUM on small screens */

    /* Buttons */
    .btn-lg { padding: 12px 24px; font-size: 15px; }
  }

  /* ══════════════════════════════════════════
     SMALL MOBILE — ≤ 400px
  ══════════════════════════════════════════ */
  @media (max-width: 400px) {
    .contact-cards-grid { grid-template-columns: 1fr; }
    .team-grid { grid-template-columns: 1fr; }
    .calc-breakdown { grid-template-columns: 1fr; }
    .hero-stats { flex-direction: column; gap: 16px; }
  }
`;

export default CSS;