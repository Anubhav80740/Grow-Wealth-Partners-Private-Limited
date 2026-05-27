// ─── Global CSS styles ────────────────────────────────────────────
// Imported once in App.jsx via <style>{CSS}</style>

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Dark mode (default) ── */
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
    /* Ticker */
    --ticker-bg: #0a1628;
    --ticker-border: rgba(34,197,94,0.12);
    /* Scrollbar */
    --scrollbar-track: #112236;
  }

  /* ── Light mode ── */
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
    --scrollbar-track: #e2eaf4;
  }

  body {
    background: var(--navy);
    color: var(--text);
    font-family: var(--font-body);
    font-size: 15px;
    line-height: 1.6;
    overflow-x: hidden;
    transition: background 0.3s ease, color 0.3s ease;
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--scrollbar-track); }
  ::-webkit-scrollbar-thumb { background: var(--green-dim); border-radius: 3px; }

  /* ── Ticker strip ── */
  .ticker-wrap {
    position: fixed; top: 68px; left: 0; right: 0; z-index: 99;
    height: 34px;
    background: var(--ticker-bg);
    border-bottom: 1px solid var(--ticker-border);
    overflow: hidden;
    display: flex; align-items: center;
  }
  .ticker-fade-left {
    position: absolute; left: 0; top: 0; bottom: 0; width: 60px; z-index: 2;
    background: linear-gradient(to right, var(--ticker-bg), transparent);
    pointer-events: none;
  }
  .ticker-fade-right {
    position: absolute; right: 0; top: 0; bottom: 0; width: 60px; z-index: 2;
    background: linear-gradient(to left, var(--ticker-bg), transparent);
    pointer-events: none;
  }
  .ticker-track {
    display: flex; align-items: center; gap: 0;
    animation: ticker-scroll 38s linear infinite;
    white-space: nowrap;
    will-change: transform;
  }
  .ticker-track:hover { animation-play-state: paused; }
  @keyframes ticker-scroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .ticker-item {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 0 28px; font-size: 12px; font-family: var(--font-body);
    border-right: 1px solid var(--ticker-border);
  }
  .ticker-name { color: var(--text-muted); font-weight: 500; letter-spacing: 0.04em; }
  .ticker-price { color: var(--text); font-weight: 600; font-family: var(--font-display); }
  .ticker-up   { color: #22c55e; font-weight: 500; }
  .ticker-down { color: var(--red); font-weight: 500; }

  /* ── Navbar ── */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px;
    height: 68px;
    background: rgba(13,27,42,0.88);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(34,197,94,0.1);
    transition: var(--transition);
  }
  :root.light .navbar {
    background: rgba(240,244,248,0.92);
    border-bottom-color: rgba(22,163,74,0.15);
  }
  .nav-logo {
    display: flex; align-items: center; gap: 10px;
    font-family: var(--font-display); font-size: 22px; font-weight: 700;
    color: var(--text); text-decoration: none; cursor: pointer;
  }
  .nav-logo span { color: var(--green); }
  .logo-icon {
    width: 34px; height: 34px; background: var(--green);
    border-radius: 8px; display: grid; place-items: center;
  }
  .nav-links { display: flex; align-items: center; gap: 6px; }
  .nav-link {
    padding: 6px 14px; border-radius: 8px;
    color: var(--text-muted); font-size: 14px; font-weight: 500;
    cursor: pointer; transition: var(--transition); border: none;
    background: transparent; font-family: var(--font-body);
  }
  .nav-link:hover, .nav-link.active { color: var(--text); background: var(--navy-3); }
  .nav-link.active { color: var(--green); }
  .nav-actions { display: flex; gap: 10px; align-items: center; }

  /* ── Theme toggle button ── */
  .theme-toggle {
    width: 36px; height: 36px; border-radius: 10px;
    border: 1px solid var(--card-border);
    background: transparent; cursor: pointer;
    display: grid; place-items: center; font-size: 16px;
    transition: var(--transition); color: var(--text-muted);
  }
  .theme-toggle:hover { border-color: var(--green); color: var(--green); background: var(--green-glow); }

  .btn { 
    padding: 9px 22px; border-radius: 10px; font-size: 14px; font-weight: 500;
    cursor: pointer; transition: var(--transition); border: none; font-family: var(--font-body);
  }
  .btn-ghost { background: transparent; border: 1px solid var(--card-border); color: var(--text); }
  .btn-ghost:hover { border-color: var(--green); color: var(--green); }
  .btn-primary { background: var(--green); color: #fff; font-weight: 600; }
  .btn-primary:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(34,197,94,0.3); }
  .btn-outline { background: transparent; border: 1.5px solid var(--green); color: var(--green); }
  .btn-outline:hover { background: var(--green); color: #fff; }
  .btn-lg { padding: 13px 32px; font-size: 16px; border-radius: 12px; }

  /* ── Page wrapper ── */
  /* On homepage: account for navbar (68px) + ticker (34px) = 102px */
  .page { padding-top: 68px; min-height: 100vh; }
  .page-with-ticker { padding-top: 102px; }

  /* ── Section ── */
  .section { padding: 80px 48px; max-width: 1200px; margin: 0 auto; }
  .section-sm { padding: 48px 48px; max-width: 1200px; margin: 0 auto; }
  .section-label {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--green-glow); border: 1px solid var(--card-border);
    color: var(--green); font-size: 12px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; padding: 5px 14px; border-radius: 100px;
    margin-bottom: 18px;
  }
  .section-title {
    font-family: var(--font-display); font-size: 42px; font-weight: 700; line-height: 1.15;
    margin-bottom: 16px;
  }
  .section-sub { color: var(--text-muted); font-size: 17px; max-width: 520px; line-height: 1.7; }

  /* ── Hero ── */
  .hero {
    min-height: calc(100vh - 102px);
    display: flex; align-items: center;
    padding: 0 48px;
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
    background-image: linear-gradient(var(--green) 1px, transparent 1px),
      linear-gradient(90deg, var(--green) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .hero-content { max-width: 640px; position: relative; z-index: 1; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--green-glow); border: 1px solid var(--card-border);
    padding: 6px 16px; border-radius: 100px; margin-bottom: 28px;
    font-size: 13px; color: var(--green); font-weight: 500;
  }
  .hero-badge::before { content: '●'; font-size: 8px; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .hero-title {
    font-family: var(--font-display); font-size: clamp(44px,6vw,72px);
    font-weight: 700; line-height: 1.08; margin-bottom: 24px;
  }
  .hero-title em { color: var(--green); font-style: normal; }
  .hero-desc { color: var(--text-muted); font-size: 18px; line-height: 1.7; margin-bottom: 40px; max-width: 500px; }
  .hero-actions { display: flex; gap: 14px; align-items: center; }
  .hero-stats { display: flex; gap: 40px; margin-top: 56px; padding-top: 40px; border-top: 1px solid rgba(128,128,128,0.12); }
  .stat-num { font-family: var(--font-display); font-size: 28px; font-weight: 700; color: var(--green); }
  .stat-label { font-size: 13px; color: var(--text-muted); margin-top: 2px; }
  .hero-visual {
    position: absolute; right: 48px; top: 50%; transform: translateY(-50%);
    width: 420px; height: 420px; pointer-events: none;
  }
  .hero-ring {
    position: absolute; inset: 0; border: 1px solid rgba(34,197,94,0.12);
    border-radius: 50%; animation: spin 30s linear infinite;
  }
  .hero-ring-2 {
    position: absolute; inset: 40px; border: 1px dashed rgba(34,197,94,0.1);
    border-radius: 50%; animation: spin 20s linear infinite reverse;
  }
  .hero-ring-dot {
    position: absolute; width: 8px; height: 8px; background: var(--green);
    border-radius: 50%; top: -4px; left: 50%; margin-left: -4px;
    box-shadow: 0 0 12px var(--green);
  }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .hero-card-float {
    position: absolute; background: var(--card); border: 1px solid var(--card-border);
    border-radius: var(--radius); padding: 16px 20px; backdrop-filter: blur(8px);
    animation: float 6s ease-in-out infinite;
  }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  .hero-card-float:nth-child(3) { top: 60px; right: 40px; animation-delay: -2s; }
  .hero-card-float:nth-child(4) { bottom: 80px; left: 20px; animation-delay: -4s; }
  .float-label { font-size: 11px; color: var(--text-muted); margin-bottom: 4px; }
  .float-val { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--green); }
  .float-change { font-size: 12px; color: var(--green); }

  /* ── Feature grid ── */
  .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
  .feature-card {
    background: var(--card); border: 1px solid var(--card-border); border-radius: var(--radius);
    padding: 28px; transition: var(--transition);
    position: relative; overflow: hidden;
  }
  .feature-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--green), transparent);
    opacity: 0; transition: var(--transition);
  }
  .feature-card:hover { transform: translateY(-4px); border-color: rgba(34,197,94,0.3); }
  .feature-card:hover::before { opacity: 1; }
  .feature-icon {
    width: 48px; height: 48px; background: var(--green-glow);
    border: 1px solid var(--card-border); border-radius: 12px;
    display: grid; place-items: center; font-size: 22px; margin-bottom: 16px;
  }
  .feature-title { font-family: var(--font-display); font-size: 18px; font-weight: 600; margin-bottom: 8px; }
  .feature-desc { color: var(--text-muted); font-size: 14px; line-height: 1.6; }

  /* ── Cards ── */
  .card {
    background: var(--card); border: 1px solid var(--card-border);
    border-radius: var(--radius); padding: 24px; transition: var(--transition);
  }
  .card:hover { border-color: rgba(34,197,94,0.25); }

  /* ── Fund cards ── */
  .funds-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
  .fund-card {
    background: var(--card); border: 1px solid var(--card-border);
    border-radius: var(--radius); padding: 24px; transition: var(--transition);
    cursor: pointer;
  }
  .fund-card:hover { transform: translateY(-3px); border-color: rgba(34,197,94,0.3); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
  .fund-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
  .fund-logo {
    width: 40px; height: 40px; border-radius: 10px;
    display: grid; place-items: center; font-size: 14px; font-weight: 700;
    color: #fff; flex-shrink: 0;
  }
  .fund-name { font-family: var(--font-display); font-size: 16px; font-weight: 600; margin-bottom: 4px; line-height: 1.3; }
  .fund-category { font-size: 12px; color: var(--text-muted); }
  .fund-stars { color: #f59e0b; font-size: 12px; letter-spacing: 1px; }
  .fund-metrics { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin: 16px 0; }
  .fund-metric-label { font-size: 11px; color: var(--text-muted); margin-bottom: 3px; }
  .fund-metric-val { font-family: var(--font-display); font-size: 17px; font-weight: 600; }
  .fund-metric-val.green { color: var(--green); }
  .fund-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid var(--card-border); }
  .fund-min { font-size: 12px; color: var(--text-muted); }
  .fund-min span { color: var(--text); font-weight: 500; }
  .risk-badge { font-size: 11px; padding: 3px 10px; border-radius: 100px; font-weight: 500; }
  .risk-low  { background: rgba(34,197,94,0.1);  color: #16a34a; }
  .risk-mod  { background: rgba(245,158,11,0.1); color: #d97706; }
  .risk-high { background: rgba(220,38,38,0.1);  color: #dc2626; }

  /* ── Search & Filter ── */
  .search-row { display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; align-items: center; }
  .search-wrap { flex: 1; min-width: 260px; position: relative; }
  .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 16px; }
  .search-input {
    width: 100%; padding: 11px 14px 11px 42px;
    background: var(--navy-3); border: 1px solid var(--card-border);
    border-radius: 10px; color: var(--text); font-family: var(--font-body); font-size: 14px;
    outline: none; transition: var(--transition);
  }
  .search-input:focus { border-color: var(--green); box-shadow: 0 0 0 3px var(--green-glow); }
  .search-input::placeholder { color: var(--text-muted); }
  .filter-btn {
    padding: 10px 18px; border-radius: 10px; border: 1px solid var(--card-border);
    background: var(--navy-3); color: var(--text-muted); font-size: 13px; font-weight: 500;
    cursor: pointer; transition: var(--transition); font-family: var(--font-body);
    white-space: nowrap;
  }
  .filter-btn:hover, .filter-btn.active { border-color: var(--green); color: var(--green); background: var(--green-glow); }
  .filter-select {
    padding: 10px 14px; border-radius: 10px; border: 1px solid var(--card-border);
    background: var(--navy-3); color: var(--text-muted); font-size: 13px;
    cursor: pointer; outline: none; font-family: var(--font-body);
  }

  /* ── Dashboard ── */
  .dash-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 28px; }
  .dash-stat {
    background: var(--card); border: 1px solid var(--card-border);
    border-radius: var(--radius); padding: 24px;
  }
  .dash-stat-label { font-size: 13px; color: var(--text-muted); margin-bottom: 8px; }
  .dash-stat-val { font-family: var(--font-display); font-size: 30px; font-weight: 700; }
  .dash-stat-change { font-size: 13px; margin-top: 6px; }
  .pos { color: #16a34a; }
  .neg { color: var(--red); }
  .holdings-table { width: 100%; border-collapse: collapse; }
  .holdings-table th { text-align: left; font-size: 12px; color: var(--text-muted); font-weight: 500; padding: 10px 16px; border-bottom: 1px solid var(--card-border); letter-spacing: 0.05em; text-transform: uppercase; }
  .holdings-table td { padding: 14px 16px; font-size: 14px; border-bottom: 1px solid var(--card-border); }
  .holdings-table tr:last-child td { border-bottom: none; }
  .holdings-table tr:hover td { background: var(--green-glow); }
  .progress-bar { height: 4px; background: var(--navy-3); border-radius: 2px; margin-top: 6px; }
  .progress-fill { height: 4px; background: var(--green); border-radius: 2px; }

  /* ── Auth ── */
  .auth-page {
    min-height: calc(100vh - 68px);
    display: flex; align-items: center; justify-content: center;
    padding: 48px;
    background: radial-gradient(ellipse 60% 60% at 50% 40%, var(--green-glow) 0%, transparent 70%);
  }
  .auth-card {
    background: var(--card); border: 1px solid var(--card-border);
    border-radius: 20px; padding: 48px; width: 100%; max-width: 440px;
  }
  .auth-title { font-family: var(--font-display); font-size: 28px; font-weight: 700; margin-bottom: 8px; }
  .auth-sub { color: var(--text-muted); font-size: 14px; margin-bottom: 32px; }
  .form-group { margin-bottom: 18px; }
  .form-label { font-size: 13px; font-weight: 500; color: var(--text-muted); margin-bottom: 7px; display: block; }
  .form-input {
    width: 100%; padding: 12px 14px; background: var(--navy-3);
    border: 1px solid var(--card-border); border-radius: 10px;
    color: var(--text); font-family: var(--font-body); font-size: 14px; outline: none;
    transition: var(--transition);
  }
  .form-input:focus { border-color: var(--green); box-shadow: 0 0 0 3px var(--green-glow); }
  .form-input::placeholder { color: var(--text-muted); }
  .auth-footer { text-align: center; margin-top: 20px; font-size: 14px; color: var(--text-muted); }
  .auth-footer a { color: var(--green); cursor: pointer; }
  .divider { display: flex; align-items: center; gap: 12px; margin: 24px 0; color: var(--text-muted); font-size: 13px; }
  .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--card-border); }

  /* ── Calculator ── */
  .calc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
  .calc-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 32px; }
  .calc-title { font-family: var(--font-display); font-size: 22px; font-weight: 700; margin-bottom: 24px; }
  .range-wrap { margin-bottom: 22px; }
  .range-label { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
  .range-label span:last-child { font-family: var(--font-display); font-weight: 600; color: var(--green); }
  input[type=range] {
    width: 100%; -webkit-appearance: none; height: 4px;
    background: var(--navy-3); border-radius: 2px; outline: none;
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none; width: 18px; height: 18px; background: var(--green);
    border-radius: 50%; cursor: pointer; box-shadow: 0 0 8px rgba(34,197,94,0.4);
  }
  .calc-result { background: var(--green-glow); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 28px; }
  .calc-result-label { font-size: 13px; color: var(--text-muted); margin-bottom: 6px; }
  .calc-result-val { font-family: var(--font-display); font-size: 36px; font-weight: 700; color: var(--green); }
  .calc-breakdown { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px; }
  .calc-bd-item { background: var(--navy-3); border-radius: 10px; padding: 16px; }
  .calc-bd-label { font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
  .calc-bd-val { font-family: var(--font-display); font-size: 20px; font-weight: 600; }

  /* ── SIP page ── */
  .sip-hero { padding: 64px 48px; max-width: 1200px; margin: 0 auto; }
  .sip-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
  .sip-card {
    background: var(--card); border: 1px solid var(--card-border);
    border-radius: var(--radius); padding: 28px; cursor: pointer;
    transition: var(--transition);
  }
  .sip-card:hover { transform: translateY(-3px); border-color: rgba(34,197,94,0.3); }
  .sip-number { font-family: var(--font-display); font-size: 13px; color: var(--green); font-weight: 600; margin-bottom: 12px; letter-spacing: 0.05em; }
  .sip-card-title { font-family: var(--font-display); font-size: 20px; font-weight: 700; margin-bottom: 10px; }
  .sip-card-desc { font-size: 14px; color: var(--text-muted); line-height: 1.6; margin-bottom: 16px; }
  .sip-min { font-size: 13px; color: var(--text-muted); }
  .sip-min strong { color: var(--green); }

  /* ── About ── */
  .team-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
  .team-card {
    background: var(--card); border: 1px solid var(--card-border);
    border-radius: var(--radius); padding: 28px; text-align: center;
  }
  .team-avatar {
    width: 72px; height: 72px; border-radius: 50%;
    background: var(--green-glow); border: 2px solid var(--green);
    display: grid; place-items: center; font-size: 26px;
    margin: 0 auto 16px;
  }
  .team-name { font-family: var(--font-display); font-size: 17px; font-weight: 600; margin-bottom: 4px; }
  .team-role { font-size: 13px; color: var(--text-muted); }
  .value-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 48px; }
  .value-card {
    background: var(--card); border: 1px solid var(--card-border);
    border-radius: var(--radius); padding: 28px; text-align: center;
  }
  .value-icon { font-size: 32px; margin-bottom: 14px; }
  .value-title { font-family: var(--font-display); font-size: 18px; font-weight: 600; margin-bottom: 8px; }
  .value-desc { font-size: 14px; color: var(--text-muted); line-height: 1.6; }

  /* ── Transactions ── */
  .tx-badge { font-size: 11px; padding: 3px 10px; border-radius: 100px; font-weight: 500; display: inline-block; }
  .tx-buy    { background: rgba(34,197,94,0.1);  color: #16a34a; }
  .tx-redeem { background: rgba(220,38,38,0.1);  color: #dc2626; }

  /* ── Page transitions ── */
  .fade-in { animation: fadeIn 0.35s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  /* ── Footer ── */
  .footer {
    border-top: 1px solid var(--card-border);
    padding: 40px 48px;
    display: flex; justify-content: space-between; align-items: center;
    color: var(--text-muted); font-size: 13px;
  }
  .footer-logo { font-family: var(--font-display); font-weight: 700; font-size: 18px; }
  .footer-logo span { color: var(--green); }

  /* ── Misc ── */
  .green { color: var(--green); }
  .muted { color: var(--text-muted); }
  .tag {
    display: inline-block; font-size: 11px; padding: 3px 10px;
    border-radius: 100px; background: var(--green-glow); border: 1px solid var(--card-border);
    color: var(--green); font-weight: 500;
  }
  .tab-row { display: flex; gap: 6px; margin-bottom: 28px; flex-wrap: wrap; }
  .tab-btn {
    padding: 7px 18px; border-radius: 8px; font-size: 13px; font-weight: 500;
    cursor: pointer; transition: var(--transition); border: 1px solid var(--card-border);
    background: transparent; color: var(--text-muted); font-family: var(--font-body);
  }
  .tab-btn.active { background: var(--green); color: #fff; border-color: var(--green); }
  .tab-btn:hover:not(.active) { border-color: var(--green); color: var(--green); }

  @media(max-width:768px) {
    .navbar { padding: 0 20px; }
    .nav-links { display: none; }
    .hero { padding: 40px 20px; flex-direction: column; }
    .hero-visual { display: none; }
    .section { padding: 48px 20px; }
    .calc-grid { grid-template-columns: 1fr; }
    .dash-grid { grid-template-columns: 1fr; }
    .value-grid { grid-template-columns: 1fr; }
    .footer { flex-direction: column; gap: 10px; padding: 28px 20px; }
  }
`;

export default CSS;
