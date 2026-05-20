import { useState, useEffect, useRef } from "react";

// ─── Design tokens ────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

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
  }

  body {
    background: var(--navy);
    color: var(--text);
    font-family: var(--font-body);
    font-size: 15px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--navy-2); }
  ::-webkit-scrollbar-thumb { background: var(--green-dim); border-radius: 3px; }

  /* ── Navbar ── */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px;
    height: 68px;
    background: rgba(13,27,42,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(34,197,94,0.1);
    transition: var(--transition);
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
  .btn { 
    padding: 9px 22px; border-radius: 10px; font-size: 14px; font-weight: 500;
    cursor: pointer; transition: var(--transition); border: none; font-family: var(--font-body);
  }
  .btn-ghost { background: transparent; border: 1px solid var(--card-border); color: var(--text); }
  .btn-ghost:hover { border-color: var(--green); color: var(--green); }
  .btn-primary { background: var(--green); color: #0d1b2a; font-weight: 600; }
  .btn-primary:hover { background: #4ade80; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(34,197,94,0.3); }
  .btn-outline { background: transparent; border: 1.5px solid var(--green); color: var(--green); }
  .btn-outline:hover { background: var(--green); color: var(--navy); }
  .btn-lg { padding: 13px 32px; font-size: 16px; border-radius: 12px; }

  /* ── Page wrapper ── */
  .page { padding-top: 68px; min-height: 100vh; }

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
    min-height: calc(100vh - 68px);
    display: flex; align-items: center;
    padding: 0 48px;
    position: relative; overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 80% 60% at 70% 50%, rgba(34,197,94,0.06) 0%, transparent 70%);
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
  .hero-stats { display: flex; gap: 40px; margin-top: 56px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.06); }
  .stat-item {}
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
  .fund-card:hover { transform: translateY(-3px); border-color: rgba(34,197,94,0.3); box-shadow: 0 12px 32px rgba(0,0,0,0.3); }
  .fund-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
  .fund-logo {
    width: 40px; height: 40px; border-radius: 10px;
    display: grid; place-items: center; font-size: 14px; font-weight: 700;
    color: var(--navy); flex-shrink: 0;
  }
  .fund-name { font-family: var(--font-display); font-size: 16px; font-weight: 600; margin-bottom: 4px; line-height: 1.3; }
  .fund-category { font-size: 12px; color: var(--text-muted); }
  .fund-stars { color: #fbbf24; font-size: 12px; letter-spacing: 1px; }
  .fund-metrics { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin: 16px 0; }
  .fund-metric-label { font-size: 11px; color: var(--text-muted); margin-bottom: 3px; }
  .fund-metric-val { font-family: var(--font-display); font-size: 17px; font-weight: 600; }
  .fund-metric-val.green { color: var(--green); }
  .fund-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05); }
  .fund-min { font-size: 12px; color: var(--text-muted); }
  .fund-min span { color: var(--text); font-weight: 500; }
  .risk-badge {
    font-size: 11px; padding: 3px 10px; border-radius: 100px; font-weight: 500;
  }
  .risk-low { background: rgba(34,197,94,0.1); color: var(--green); }
  .risk-mod { background: rgba(251,191,36,0.1); color: #fbbf24; }
  .risk-high { background: rgba(248,113,113,0.1); color: var(--red); }

  /* ── Search & Filter bar ── */
  .search-row { display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; align-items: center; }
  .search-wrap { flex: 1; min-width: 260px; position: relative; }
  .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 16px; }
  .search-input {
    width: 100%; padding: 11px 14px 11px 42px;
    background: var(--navy-3); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px; color: var(--text); font-family: var(--font-body); font-size: 14px;
    outline: none; transition: var(--transition);
  }
  .search-input:focus { border-color: var(--green); box-shadow: 0 0 0 3px var(--green-glow); }
  .search-input::placeholder { color: var(--text-muted); }
  .filter-btn {
    padding: 10px 18px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08);
    background: var(--navy-3); color: var(--text-muted); font-size: 13px; font-weight: 500;
    cursor: pointer; transition: var(--transition); font-family: var(--font-body);
    white-space: nowrap;
  }
  .filter-btn:hover, .filter-btn.active { border-color: var(--green); color: var(--green); background: var(--green-glow); }
  .filter-select {
    padding: 10px 14px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08);
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
  .pos { color: var(--green); }
  .neg { color: var(--red); }
  .holdings-table { width: 100%; border-collapse: collapse; }
  .holdings-table th { text-align: left; font-size: 12px; color: var(--text-muted); font-weight: 500; padding: 10px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); letter-spacing: 0.05em; text-transform: uppercase; }
  .holdings-table td { padding: 14px 16px; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.04); }
  .holdings-table tr:last-child td { border-bottom: none; }
  .holdings-table tr:hover td { background: rgba(34,197,94,0.03); }
  .progress-bar { height: 4px; background: var(--navy-3); border-radius: 2px; margin-top: 6px; }
  .progress-fill { height: 4px; background: var(--green); border-radius: 2px; }

  /* ── Auth ── */
  .auth-page {
    min-height: calc(100vh - 68px);
    display: flex; align-items: center; justify-content: center;
    padding: 48px;
    background: radial-gradient(ellipse 60% 60% at 50% 40%, rgba(34,197,94,0.05) 0%, transparent 70%);
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
    border: 1px solid rgba(255,255,255,0.08); border-radius: 10px;
    color: var(--text); font-family: var(--font-body); font-size: 14px; outline: none;
    transition: var(--transition);
  }
  .form-input:focus { border-color: var(--green); box-shadow: 0 0 0 3px var(--green-glow); }
  .form-input::placeholder { color: var(--text-muted); }
  .auth-footer { text-align: center; margin-top: 20px; font-size: 14px; color: var(--text-muted); }
  .auth-footer a { color: var(--green); cursor: pointer; }
  .divider { display: flex; align-items: center; gap: 12px; margin: 24px 0; color: var(--text-muted); font-size: 13px; }
  .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.07); }

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

  /* ── Transaction history ── */
  .tx-badge {
    font-size: 11px; padding: 3px 10px; border-radius: 100px;
    font-weight: 500; display: inline-block;
  }
  .tx-buy { background: rgba(34,197,94,0.1); color: var(--green); }
  .tx-redeem { background: rgba(248,113,113,0.1); color: var(--red); }

  /* ── Page transitions ── */
  .fade-in { animation: fadeIn 0.35s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  /* ── Footer ── */
  .footer {
    border-top: 1px solid rgba(255,255,255,0.06);
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
    cursor: pointer; transition: var(--transition); border: 1px solid rgba(255,255,255,0.08);
    background: transparent; color: var(--text-muted); font-family: var(--font-body);
  }
  .tab-btn.active { background: var(--green); color: var(--navy); border-color: var(--green); }
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

// ─── Data ─────────────────────────────────────────────────────────
const FUNDS = [
  { id:1, name:"Axis Bluechip Fund", amc:"Axis", category:"Large Cap", returns3y:"15.2%", returns1y:"21.4%", aum:"₹32,450 Cr", min:"₹500", stars:"★★★★★", risk:"low", color:"#22c55e" },
  { id:2, name:"ICICI Pru Technology Fund", amc:"ICICI", category:"Sectoral", returns3y:"22.8%", returns1y:"38.1%", aum:"₹15,230 Cr", min:"₹500", stars:"★★★★☆", risk:"high", color:"#f59e0b" },
  { id:3, name:"Mirae Asset Large Cap", amc:"Mirae", category:"Large Cap", returns3y:"18.5%", returns1y:"24.3%", aum:"₹28,900 Cr", min:"₹500", stars:"★★★★★", risk:"low", color:"#3b82f6" },
  { id:4, name:"SBI Small Cap Fund", amc:"SBI", category:"Small Cap", returns3y:"25.3%", returns1y:"42.7%", aum:"₹19,670 Cr", min:"₹500", stars:"★★★★☆", risk:"high", color:"#8b5cf6" },
  { id:5, name:"Parag Parikh Flexi Cap", amc:"PPFAS", category:"Flexi Cap", returns3y:"19.7%", returns1y:"28.9%", aum:"₹45,120 Cr", min:"₹500", stars:"★★★★★", risk:"mod", color:"#ec4899" },
  { id:6, name:"Kotak Emerging Equity", amc:"Kotak", category:"Mid Cap", returns3y:"20.1%", returns1y:"31.5%", aum:"₹12,890 Cr", min:"₹500", stars:"★★★★☆", risk:"mod", color:"#14b8a6" },
  { id:7, name:"HDFC Top 100 Fund", amc:"HDFC", category:"Large Cap", returns3y:"16.8%", returns1y:"23.1%", aum:"₹22,340 Cr", min:"₹500", stars:"★★★★☆", risk:"low", color:"#f97316" },
  { id:8, name:"Nippon India Growth Fund", amc:"Nippon", category:"Mid Cap", returns3y:"23.4%", returns1y:"37.2%", aum:"₹18,760 Cr", min:"₹100", stars:"★★★★★", risk:"mod", color:"#06b6d4" },
];

const HOLDINGS = [
  { fund:"Axis Bluechip Fund", units:"124.5", invested:"₹50,000", current:"₹62,340", returns:"+24.7%", change:"pos" },
  { fund:"Parag Parikh Flexi Cap", units:"89.2", invested:"₹35,000", current:"₹44,810", returns:"+28.0%", change:"pos" },
  { fund:"ICICI Pru Technology", units:"45.8", invested:"₹20,000", current:"₹27,620", returns:"+38.1%", change:"pos" },
  { fund:"SBI Small Cap Fund", units:"210.3", invested:"₹40,000", current:"₹38,200", returns:"-4.5%", change:"neg" },
];

const TXS = [
  { date:"12 May 2026", fund:"Axis Bluechip Fund", type:"buy", amount:"₹5,000", units:"9.82" },
  { date:"05 May 2026", fund:"SIP – Parag Parikh", type:"buy", amount:"₹3,000", units:"5.21" },
  { date:"28 Apr 2026", fund:"ICICI Pru Technology", type:"redeem", amount:"₹10,000", units:"18.4" },
  { date:"12 Apr 2026", fund:"Axis Bluechip Fund", type:"buy", amount:"₹5,000", units:"9.75" },
  { date:"05 Apr 2026", fund:"SIP – Parag Parikh", type:"buy", amount:"₹3,000", units:"5.18" },
];

const SIP_PLANS = [
  { name:"Wealth Builder SIP", desc:"Invest regularly in diversified equity funds. Build long-term wealth with disciplined monthly investments.", min:"₹500", category:"Equity", risk:"Moderate" },
  { name:"Tax Saver SIP", desc:"Save taxes under Section 80C while growing wealth. Lock-in of 3 years with ELSS funds.", min:"₹500", category:"ELSS", risk:"Moderate-High" },
  { name:"Debt SIP", desc:"Stable returns with lower risk. Ideal for short-to-medium term goals like emergency corpus.", min:"₹1,000", category:"Debt", risk:"Low" },
  { name:"Index SIP", desc:"Mirror Nifty 50 or Sensex with ultra-low expense ratios. Passive investing at its best.", min:"₹100", category:"Index", risk:"Moderate" },
  { name:"Small Cap SIP", desc:"High growth potential for long-term investors. Invest in emerging companies with strong fundamentals.", min:"₹500", category:"Small Cap", risk:"High" },
  { name:"Hybrid SIP", desc:"Balanced allocation between equity and debt. Ideal for investors seeking growth with stability.", min:"₹500", category:"Hybrid", risk:"Moderate" },
];

// ─── Components ───────────────────────────────────────────────────

function Navbar({ page, setPage, isLoggedIn, setIsLoggedIn }) {
  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => setPage("home")}>
        <div className="logo-icon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 14 L8 6 L11 10 L14 7 L16 9" stroke="#0d1b2a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        Grow<span>Wealth</span>
      </div>
      <div className="nav-links">
        {["home","mutual-funds","sip","calculator","about"].map(p => (
          <button key={p} className={`nav-link ${page===p?"active":""}`} onClick={() => setPage(p)}>
            {p === "mutual-funds" ? "Mutual Funds" : p === "sip" ? "SIP" : p.charAt(0).toUpperCase()+p.slice(1)}
          </button>
        ))}
      </div>
      <div className="nav-actions">
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

// ─── HOME ─────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div className="page fade-in">
      <div className="hero">
        <div className="hero-bg" /><div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge">Zero Commission Investing</div>
          <h1 className="hero-title">Invest Smart,<br /><em>Grow Wealth</em></h1>
          <p className="hero-desc">Access 1,000+ Mutual Funds and SIPs in one place. Start your investment journey with as little as ₹100.</p>
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

      {/* Features */}
      <div className="section">
        <div className="section-label">Why GrowWealth</div>
        <h2 className="section-title">Everything you need<br />to invest better</h2>
        <p className="section-sub" style={{marginBottom:40}}>A complete platform built for Indian investors — from beginners to seasoned portfolio managers.</p>
        <div className="feature-grid">
          {[
            { icon:"📈", title:"1,000+ Mutual Funds", desc:"Browse and invest in a curated selection across equity, debt, hybrid, and sectoral funds." },
            { icon:"🔁", title:"Systematic SIP", desc:"Automate your investments with flexible SIP plans. Set it once, grow forever." },
            { icon:"🧮", title:"Smart Calculators", desc:"Plan your financial future with SIP, lumpsum, and goal-based investment calculators." },
            { icon:"📊", title:"Portfolio Tracker", desc:"Real-time overview of your investments, returns, and fund holdings in one dashboard." },
            { icon:"🔒", title:"Secure & Trusted", desc:"Bank-grade security with 2FA. Your money and data are always protected." },
            { icon:"🏦", title:"Zero Commission", desc:"We earn from AMCs directly. You get the full returns, always." },
          ].map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top funds preview */}
      <div className="section" style={{paddingTop:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:28}}>
          <div>
            <div className="section-label">Top Performers</div>
            <h2 className="section-title" style={{marginBottom:0}}>Popular Funds</h2>
          </div>
          <button className="btn btn-outline" onClick={() => setPage("mutual-funds")}>View All →</button>
        </div>
        <div className="funds-grid">
          {FUNDS.slice(0,3).map(f => <FundCard key={f.id} fund={f} />)}
        </div>
      </div>

      {/* CTA */}
      <div style={{padding:"0 48px 80px"}}>
        <div style={{
          maxWidth:1200, margin:"0 auto",
          background:"linear-gradient(135deg, var(--navy-3) 0%, rgba(34,197,94,0.08) 100%)",
          border:"1px solid var(--card-border)", borderRadius:20, padding:"60px 48px",
          display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:24
        }}>
          <div>
            <h2 style={{fontFamily:"var(--font-display)",fontSize:32,fontWeight:700,marginBottom:10}}>Start investing today</h2>
            <p style={{color:"var(--text-muted)",fontSize:16}}>Join 50,000+ investors who trust GrowWealth for their financial journey.</p>
          </div>
          <div style={{display:"flex",gap:12}}>
            <button className="btn btn-primary btn-lg" onClick={() => setPage("signup")}>Create Free Account</button>
          </div>
        </div>
      </div>

      <Footer setPage={setPage} />
    </div>
  );
}

// ─── FUND CARD (shared) ───────────────────────────────────────────
function FundCard({ fund }) {
  const riskMap = { low:"risk-low", mod:"risk-mod", high:"risk-high" };
  const riskLabel = { low:"Low Risk", mod:"Moderate", high:"High Risk" };
  return (
    <div className="fund-card">
      <div className="fund-header">
        <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
          <div className="fund-logo" style={{background:fund.color}}>{fund.amc.slice(0,2)}</div>
          <div>
            <div className="fund-name">{fund.name}</div>
            <div className="fund-category">{fund.category}</div>
          </div>
        </div>
        <div className="fund-stars">{fund.stars}</div>
      </div>
      <div className="fund-metrics">
        <div><div className="fund-metric-label">3Y Returns</div><div className="fund-metric-val green">{fund.returns3y}</div></div>
        <div><div className="fund-metric-label">1Y Returns</div><div className="fund-metric-val green">{fund.returns1y}</div></div>
        <div><div className="fund-metric-label">AUM</div><div className="fund-metric-val">{fund.aum}</div></div>
      </div>
      <div className="fund-footer">
        <div className="fund-min">Min: <span>{fund.min}</span></div>
        <span className={`risk-badge ${riskMap[fund.risk]}`}>{riskLabel[fund.risk]}</span>
      </div>
    </div>
  );
}

// ─── MUTUAL FUNDS PAGE ───────────────────────────────────────────
function MutualFundsPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [risk, setRisk] = useState("All");
  const [amc, setAmc] = useState("All");

  const cats = ["All","Large Cap","Mid Cap","Small Cap","Flexi Cap","Sectoral","Hybrid","ELSS","Index","Debt"];
  const filtered = FUNDS.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.amc.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === "All" || f.category === cat;
    const matchRisk = risk === "All" || f.risk === risk;
    const matchAmc = amc === "All" || f.amc === amc;
    return matchSearch && matchCat && matchRisk && matchAmc;
  });

  return (
    <div className="page fade-in">
      <div className="section">
        <div className="section-label">Browse</div>
        <h1 className="section-title">Mutual Funds</h1>
        <p className="section-sub" style={{marginBottom:36}}>Explore 1,000+ hand-picked mutual funds. Filter by category, risk level, and AMC.</p>

        <div className="search-row">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input className="search-input" placeholder="Search by fund name or AMC..." value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
          <select className="filter-select" value={risk} onChange={e=>setRisk(e.target.value)}>
            <option value="All">All Risk</option>
            <option value="low">Low</option>
            <option value="mod">Moderate</option>
            <option value="high">High</option>
          </select>
          <select className="filter-select" value={amc} onChange={e=>setAmc(e.target.value)}>
            <option value="All">All AMC</option>
            {[...new Set(FUNDS.map(f=>f.amc))].map(a=><option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        <div className="tab-row">
          {cats.map(c => <button key={c} className={`tab-btn ${cat===c?"active":""}`} onClick={()=>setCat(c)}>{c}</button>)}
        </div>

        <div style={{color:"var(--text-muted)",fontSize:13,marginBottom:20}}>{filtered.length} funds found</div>
        <div className="funds-grid">
          {filtered.map(f => <FundCard key={f.id} fund={f} />)}
          {filtered.length === 0 && <div style={{color:"var(--text-muted)",padding:"40px 0"}}>No funds match your filters.</div>}
        </div>
      </div>
    </div>
  );
}

// ─── SIP PAGE ─────────────────────────────────────────────────────
function SIPPage({ setPage }) {
  return (
    <div className="page fade-in">
      <div className="sip-hero">
        <div className="section-label">Systematic Investment Plan</div>
        <h1 className="section-title" style={{fontSize:"clamp(36px,5vw,60px)"}}>Invest a little,<br /><span className="green">gain a lot</span></h1>
        <p className="section-sub" style={{marginBottom:40}}>Start SIPs from as low as ₹100/month. The power of compounding works best with consistency.</p>
        <button className="btn btn-primary btn-lg" onClick={()=>setPage("calculator")}>Calculate SIP Returns →</button>
      </div>

      <div className="section" style={{paddingTop:0}}>
        <div style={{marginBottom:28}}>
          <h2 className="section-title" style={{fontSize:28}}>Choose your SIP plan</h2>
        </div>
        <div className="sip-grid">
          {SIP_PLANS.map((s,i) => (
            <div key={s.name} className="sip-card">
              <div className="sip-number">0{i+1}</div>
              <div className="sip-card-title">{s.name}</div>
              <div className="sip-card-desc">{s.desc}</div>
              <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
                <span className="tag">{s.category}</span>
                <span className="tag">{s.risk}</span>
              </div>
              <div className="sip-min">Min SIP: <strong>{s.min}/month</strong></div>
            </div>
          ))}
        </div>
      </div>

      {/* How SIP works */}
      <div className="section" style={{paddingTop:0}}>
        <h2 className="section-title" style={{fontSize:28,marginBottom:32}}>How SIP works</h2>
        <div className="feature-grid" style={{gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))"}}>
          {[
            {icon:"1️⃣", title:"Choose a Fund", desc:"Pick a mutual fund that matches your risk appetite and financial goal."},
            {icon:"2️⃣", title:"Set Amount & Date", desc:"Decide how much to invest and on which date every month."},
            {icon:"3️⃣", title:"Auto-Debit", desc:"Amount is automatically debited from your bank account on the set date."},
            {icon:"4️⃣", title:"Units Allocated", desc:"Fund units are allocated based on the NAV on the investment date."},
            {icon:"5️⃣", title:"Watch it Grow", desc:"Track your investment growth on your portfolio dashboard."},
          ].map(s => (
            <div key={s.title} className="feature-card">
              <div className="feature-icon">{s.icon}</div>
              <div className="feature-title">{s.title}</div>
              <div className="feature-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CALCULATOR ───────────────────────────────────────────────────
function CalculatorPage() {
  const [mode, setMode] = useState("sip");
  const [amount, setAmount] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const invested = mode === "sip" ? amount * 12 * years : amount;
  const maturity = mode === "sip"
    ? amount * (((Math.pow(1 + rate / 1200, years * 12) - 1) / (rate / 1200)) * (1 + rate / 1200))
    : amount * Math.pow(1 + rate / 100, years);
  const gains = maturity - invested;

  const fmt = n => "₹" + Math.round(n).toLocaleString("en-IN");

  return (
    <div className="page fade-in">
      <div className="section">
        <div className="section-label">Tools</div>
        <h1 className="section-title">Investment Calculator</h1>
        <p className="section-sub" style={{marginBottom:36}}>Plan your financial future. See how your money grows over time.</p>

        <div className="tab-row">
          <button className={`tab-btn ${mode==="sip"?"active":""}`} onClick={()=>setMode("sip")}>SIP Calculator</button>
          <button className={`tab-btn ${mode==="lump"?"active":""}`} onClick={()=>setMode("lump")}>Lumpsum</button>
        </div>

        <div className="calc-grid">
          <div className="calc-card">
            <div className="calc-title">{mode==="sip"?"SIP":"Lumpsum"} Calculator</div>

            <div className="range-wrap">
              <div className="range-label">
                <span>{mode==="sip"?"Monthly Investment":"Lumpsum Amount"}</span>
                <span>{fmt(amount)}</span>
              </div>
              <input type="range" min={mode==="sip"?500:1000} max={mode==="sip"?100000:5000000}
                step={mode==="sip"?500:5000} value={amount} onChange={e=>setAmount(+e.target.value)} />
            </div>

            <div className="range-wrap">
              <div className="range-label"><span>Expected Return (p.a.)</span><span>{rate}%</span></div>
              <input type="range" min={1} max={30} step={0.5} value={rate} onChange={e=>setRate(+e.target.value)} />
            </div>

            <div className="range-wrap">
              <div className="range-label"><span>Time Period</span><span>{years} Years</span></div>
              <input type="range" min={1} max={30} step={1} value={years} onChange={e=>setYears(+e.target.value)} />
            </div>
          </div>

          <div>
            <div className="calc-result" style={{marginBottom:16}}>
              <div className="calc-result-label">Estimated Maturity Value</div>
              <div className="calc-result-val">{fmt(maturity)}</div>
            </div>
            <div className="calc-breakdown">
              <div className="calc-bd-item">
                <div className="calc-bd-label">Total Invested</div>
                <div className="calc-bd-val">{fmt(invested)}</div>
              </div>
              <div className="calc-bd-item">
                <div className="calc-bd-label">Total Gains</div>
                <div className="calc-bd-val" style={{color:"var(--green)"}}>{fmt(gains)}</div>
              </div>
              <div className="calc-bd-item">
                <div className="calc-bd-label">Absolute Returns</div>
                <div className="calc-bd-val" style={{color:"var(--green)"}}>{((gains/invested)*100).toFixed(1)}%</div>
              </div>
              <div className="calc-bd-item">
                <div className="calc-bd-label">CAGR</div>
                <div className="calc-bd-val">{rate}% p.a.</div>
              </div>
            </div>

            {/* Simple donut-style visual */}
            <div style={{marginTop:20, padding:20, background:"var(--card)", border:"1px solid var(--card-border)", borderRadius:"var(--radius)"}}>
              <div style={{marginBottom:12, fontSize:13, color:"var(--text-muted)"}}>Corpus Breakdown</div>
              <div style={{height:8, borderRadius:4, background:"var(--navy-3)", overflow:"hidden"}}>
                <div style={{height:"100%", width:`${Math.min((invested/maturity)*100,100).toFixed(1)}%`, background:"var(--text-muted)", borderRadius:4, float:"left"}} />
                <div style={{height:"100%", width:`${Math.min((gains/maturity)*100,100).toFixed(1)}%`, background:"var(--green)", borderRadius:4, float:"left"}} />
              </div>
              <div style={{display:"flex", gap:20, marginTop:12, fontSize:13}}>
                <span style={{color:"var(--text-muted)"}}>■ Invested: {((invested/maturity)*100).toFixed(0)}%</span>
                <span style={{color:"var(--green)"}}>■ Gains: {((gains/maturity)*100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────
function AboutPage() {
  return (
    <div className="page fade-in">
      <div className="section">
        <div className="section-label">About Us</div>
        <h1 className="section-title">We believe everyone<br />deserves to <span className="green">grow wealth</span></h1>
        <p className="section-sub" style={{marginBottom:56}}>
          GrowWealth Securities is a SEBI-registered investment advisory platform built to make mutual fund investing simple, transparent, and accessible for every Indian.
        </p>

        <div className="value-grid">
          {[
            {icon:"🎯", title:"Our Mission", desc:"Democratize wealth creation by making high-quality financial products accessible to every Indian investor, regardless of background or experience."},
            {icon:"🔍", title:"Transparency First", desc:"Zero hidden charges. We earn from AMCs as distribution commissions, never from you. Your returns are always maximized."},
            {icon:"🛡️", title:"SEBI Registered", desc:"Fully compliant with SEBI regulations. Your investments are safe, your data is protected, and your rights are always respected."},
          ].map(v => (
            <div key={v.title} className="value-card">
              <div className="value-icon">{v.icon}</div>
              <div className="value-title">{v.title}</div>
              <div className="value-desc">{v.desc}</div>
            </div>
          ))}
        </div>

        <div style={{marginTop:72}}>
          <h2 className="section-title" style={{fontSize:28,marginBottom:32}}>Meet the Team</h2>
          <div className="team-grid">
            {[
              {name:"Yash Motiani", role:"Co-Founder & CEO", emoji:"👨‍💻"},
              {name:"Anubhav Agarwal", role:"Co-Founder & CTO", emoji:"👨‍🔧"},
              {name:"Priya Sharma", role:"Head of Product", emoji:"👩‍💼"},
              {name:"Rohit Verma", role:"Head of Research", emoji:"👨‍🔬"},
            ].map(t => (
              <div key={t.name} className="team-card">
                <div className="team-avatar">{t.emoji}</div>
                <div className="team-name">{t.name}</div>
                <div className="team-role">{t.role}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginTop:72, padding:"48px", background:"var(--card)", border:"1px solid var(--card-border)", borderRadius:20, textAlign:"center"}}>
          <h2 style={{fontFamily:"var(--font-display)", fontSize:28, marginBottom:12}}>Have questions?</h2>
          <p style={{color:"var(--text-muted)", marginBottom:28}}>Reach out to our team. We're here to help you make the best investment decisions.</p>
          <div style={{display:"flex", justifyContent:"center", gap:16, flexWrap:"wrap"}}>
            <div style={{padding:"14px 24px", background:"var(--navy-3)", borderRadius:12, fontSize:14}}>📧 hello@growwealth.in</div>
            <div style={{padding:"14px 24px", background:"var(--navy-3)", borderRadius:12, fontSize:14}}>📞 +91 98765 43210</div>
            <div style={{padding:"14px 24px", background:"var(--navy-3)", borderRadius:12, fontSize:14}}>📍 Jodhpur, Rajasthan</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AUTH PAGES ───────────────────────────────────────────────────
function LoginPage({ setPage, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [forgot, setForgot] = useState(false);
  const [reset, setReset] = useState(false);

  if (reset) return (
    <div className="page fade-in">
      <div className="auth-page">
        <div className="auth-card">
          <div style={{textAlign:"center",marginBottom:8}}>✅</div>
          <div className="auth-title" style={{textAlign:"center"}}>Check your email</div>
          <p style={{color:"var(--text-muted)",fontSize:14,textAlign:"center",marginBottom:28}}>
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <button className="btn btn-primary" style={{width:"100%"}} onClick={()=>setForgot(false)||setReset(false)}>Back to Login</button>
        </div>
      </div>
    </div>
  );

  if (forgot) return (
    <div className="page fade-in">
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-title">Reset Password</div>
          <div className="auth-sub">Enter your email to receive a reset link.</div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <button className="btn btn-primary" style={{width:"100%",marginTop:8}} onClick={()=>setReset(true)}>Send Reset Link</button>
          <div className="auth-footer"><a onClick={()=>setForgot(false)}>← Back to Login</a></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page fade-in">
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-title">Welcome back</div>
          <div className="auth-sub">Log in to your GrowWealth account</div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} />
          </div>
          <div style={{textAlign:"right",marginBottom:20}}>
            <a style={{fontSize:13,color:"var(--green)",cursor:"pointer"}} onClick={()=>setForgot(true)}>Forgot password?</a>
          </div>
          <button className="btn btn-primary" style={{width:"100%"}} onClick={()=>{setIsLoggedIn(true);setPage("dashboard");}}>
            Log In
          </button>
          <div className="divider">or</div>
          <button className="btn btn-ghost" style={{width:"100%"}}>Continue with Google</button>
          <div className="auth-footer">Don't have an account? <a onClick={()=>setPage("signup")}>Sign up free</a></div>
        </div>
      </div>
    </div>
  );
}

function SignupPage({ setPage, setIsLoggedIn }) {
  const [step, setStep] = useState(1);
  return (
    <div className="page fade-in">
      <div className="auth-page">
        <div className="auth-card">
          {step === 1 ? (
            <>
              <div style={{display:"flex",gap:6,marginBottom:28}}>
                <div style={{flex:1,height:3,background:"var(--green)",borderRadius:2}}/>
                <div style={{flex:1,height:3,background:"var(--navy-3)",borderRadius:2}}/>
                <div style={{flex:1,height:3,background:"var(--navy-3)",borderRadius:2}}/>
              </div>
              <div className="auth-title">Create account</div>
              <div className="auth-sub">Step 1 of 3 — Personal Details</div>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" placeholder="Rahul Sharma" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" placeholder="rahul@example.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input className="form-input" type="tel" placeholder="+91 98765 43210" />
              </div>
              <button className="btn btn-primary" style={{width:"100%",marginTop:8}} onClick={()=>setStep(2)}>Continue →</button>
              <div className="auth-footer">Already have an account? <a onClick={()=>setPage("login")}>Log in</a></div>
            </>
          ) : step === 2 ? (
            <>
              <div style={{display:"flex",gap:6,marginBottom:28}}>
                <div style={{flex:1,height:3,background:"var(--green)",borderRadius:2}}/>
                <div style={{flex:1,height:3,background:"var(--green)",borderRadius:2}}/>
                <div style={{flex:1,height:3,background:"var(--navy-3)",borderRadius:2}}/>
              </div>
              <div className="auth-title">Set Password</div>
              <div className="auth-sub">Step 2 of 3 — Security</div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input className="form-input" type="password" placeholder="Min 8 characters" />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input className="form-input" type="password" placeholder="Re-enter password" />
              </div>
              <button className="btn btn-primary" style={{width:"100%",marginTop:8}} onClick={()=>setStep(3)}>Continue →</button>
              <button className="btn btn-ghost" style={{width:"100%",marginTop:8}} onClick={()=>setStep(1)}>← Back</button>
            </>
          ) : (
            <>
              <div style={{display:"flex",gap:6,marginBottom:28}}>
                <div style={{flex:1,height:3,background:"var(--green)",borderRadius:2}}/>
                <div style={{flex:1,height:3,background:"var(--green)",borderRadius:2}}/>
                <div style={{flex:1,height:3,background:"var(--green)",borderRadius:2}}/>
              </div>
              <div style={{textAlign:"center",marginBottom:8,fontSize:40}}>🎉</div>
              <div className="auth-title" style={{textAlign:"center"}}>You're all set!</div>
              <div className="auth-sub" style={{textAlign:"center",marginBottom:28}}>Account created successfully. Start your investment journey now.</div>
              <button className="btn btn-primary" style={{width:"100%"}} onClick={()=>{setIsLoggedIn(true);setPage("dashboard");}}>
                Go to Dashboard →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────
function DashboardPage({ setPage }) {
  const [tab, setTab] = useState("overview");
  const totalInvested = 145000;
  const currentVal = 172970;
  const gains = currentVal - totalInvested;
  const returnsAbs = ((gains/totalInvested)*100).toFixed(1);

  return (
    <div className="page fade-in">
      <div className="section">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:32,flexWrap:"wrap",gap:16}}>
          <div>
            <div className="section-label">Wealth Elite</div>
            <h1 className="section-title" style={{marginBottom:4}}>Welcome back, Rahul 👋</h1>
            <div style={{color:"var(--text-muted)",fontSize:14}}>Portfolio snapshot as of {new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}</div>
          </div>
          <button className="btn btn-primary" onClick={()=>setPage("mutual-funds")}>+ Invest More</button>
        </div>

        <div className="dash-grid">
          <div className="dash-stat">
            <div className="dash-stat-label">Current Portfolio Value</div>
            <div className="dash-stat-val">₹{currentVal.toLocaleString("en-IN")}</div>
            <div className="dash-stat-change pos">↑ +₹{gains.toLocaleString("en-IN")} ({returnsAbs}%)</div>
          </div>
          <div className="dash-stat">
            <div className="dash-stat-label">Total Invested</div>
            <div className="dash-stat-val">₹{totalInvested.toLocaleString("en-IN")}</div>
            <div className="dash-stat-change muted">Across 4 funds</div>
          </div>
          <div className="dash-stat">
            <div className="dash-stat-label">Active SIPs</div>
            <div className="dash-stat-val">3</div>
            <div className="dash-stat-change pos">↑ ₹8,000/month</div>
          </div>
        </div>

        <div className="tab-row">
          {["overview","holdings","transactions","sips"].map(t =>
            <button key={t} className={`tab-btn ${tab===t?"active":""}`} onClick={()=>setTab(t)}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          )}
        </div>

        {tab === "overview" && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
            <div className="card">
              <div style={{fontFamily:"var(--font-display)",fontSize:17,fontWeight:600,marginBottom:20}}>Portfolio Allocation</div>
              {HOLDINGS.map(h => {
                const pct = (parseInt(h.invested.replace(/[^0-9]/g,"")) / totalInvested * 100).toFixed(0);
                return (
                  <div key={h.fund} style={{marginBottom:16}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:5}}>
                      <span>{h.fund}</span><span className={h.change}>{h.returns}</span>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{width:`${pct}%`}} /></div>
                    <div style={{fontSize:12,color:"var(--text-muted)",marginTop:3}}>{pct}% of portfolio</div>
                  </div>
                );
              })}
            </div>
            <div className="card">
              <div style={{fontFamily:"var(--font-display)",fontSize:17,fontWeight:600,marginBottom:20}}>Quick Stats</div>
              {[
                {label:"Best Performer",val:"ICICI Pru Tech +38.1%",color:"var(--green)"},
                {label:"Highest AUM Fund",val:"Parag Parikh Flexi Cap",color:"var(--text)"},
                {label:"Next SIP Date",val:"5 June 2026",color:"var(--text)"},
                {label:"Total Units Held",val:"469.8 units",color:"var(--text)"},
                {label:"Portfolio XIRR",val:"~22.4% p.a.",color:"var(--green)"},
              ].map(s=>(
                <div key={s.label} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,0.04)",fontSize:14}}>
                  <span style={{color:"var(--text-muted)"}}>{s.label}</span>
                  <span style={{color:s.color,fontWeight:500}}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "holdings" && (
          <div className="card" style={{padding:0,overflow:"hidden"}}>
            <table className="holdings-table">
              <thead>
                <tr><th>Fund</th><th>Units</th><th>Invested</th><th>Current Value</th><th>Returns</th></tr>
              </thead>
              <tbody>
                {HOLDINGS.map(h => (
                  <tr key={h.fund}>
                    <td style={{fontWeight:500}}>{h.fund}</td>
                    <td>{h.units}</td>
                    <td>{h.invested}</td>
                    <td>{h.current}</td>
                    <td className={h.change}>{h.returns}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "transactions" && (
          <div className="card" style={{padding:0,overflow:"hidden"}}>
            <table className="holdings-table">
              <thead>
                <tr><th>Date</th><th>Fund</th><th>Type</th><th>Amount</th><th>Units</th></tr>
              </thead>
              <tbody>
                {TXS.map((t,i) => (
                  <tr key={i}>
                    <td style={{color:"var(--text-muted)",fontSize:13}}>{t.date}</td>
                    <td style={{fontWeight:500}}>{t.fund}</td>
                    <td><span className={`tx-badge tx-${t.type}`}>{t.type==="buy"?"Buy":"Redeem"}</span></td>
                    <td>{t.amount}</td>
                    <td style={{color:"var(--text-muted)"}}>{t.units}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "sips" && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
            {[
              {name:"Axis Bluechip Fund",amount:"₹5,000/mo",date:"12th",status:"Active",next:"12 Jun 2026"},
              {name:"Parag Parikh Flexi Cap",amount:"₹3,000/mo",date:"5th",status:"Active",next:"5 Jun 2026"},
              {name:"SBI Small Cap Fund",amount:"₹0/mo",date:"—",status:"Paused",next:"—"},
            ].map(s => (
              <div key={s.name} className="card">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                  <div style={{fontFamily:"var(--font-display)",fontSize:16,fontWeight:600}}>{s.name}</div>
                  <span className={s.status==="Active"?"tag":"risk-badge risk-mod"} style={{fontSize:11}}>{s.status}</span>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  {[{l:"Amount",v:s.amount},{l:"Debit Date",v:s.date},{l:"Next SIP",v:s.next}].map(r=>(
                    <div key={r.l}><div style={{fontSize:11,color:"var(--text-muted)",marginBottom:3}}>{r.l}</div><div style={{fontSize:14,fontWeight:500}}>{r.v}</div></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div>
        <div className="footer-logo">Grow<span>Wealth</span> Securities</div>
        <div style={{marginTop:6,fontSize:12}}>SEBI Registered Investment Advisor • ARN-XXXXXX</div>
      </div>
      <div style={{display:"flex",gap:20}}>
        {["home","mutual-funds","sip","calculator","about"].map(p=>(
          <span key={p} style={{cursor:"pointer",color:"var(--text-muted)"}} onClick={()=>setPage(p)}>
            {p==="mutual-funds"?"Mutual Funds":p.charAt(0).toUpperCase()+p.slice(1)}
          </span>
        ))}
      </div>
      <div style={{fontSize:12}}>© 2026 GrowWealth. All rights reserved.</div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const renderPage = () => {
    switch(page) {
      case "home": return <HomePage setPage={setPage} />;
      case "mutual-funds": return <MutualFundsPage />;
      case "sip": return <SIPPage setPage={setPage} />;
      case "calculator": return <CalculatorPage />;
      case "about": return <AboutPage />;
      case "login": return <LoginPage setPage={setPage} setIsLoggedIn={setIsLoggedIn} />;
      case "signup": return <SignupPage setPage={setPage} setIsLoggedIn={setIsLoggedIn} />;
      case "dashboard": return isLoggedIn ? <DashboardPage setPage={setPage} /> : <LoginPage setPage={setPage} setIsLoggedIn={setIsLoggedIn} />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <Navbar page={page} setPage={setPage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {renderPage()}
    </>
  );
}
