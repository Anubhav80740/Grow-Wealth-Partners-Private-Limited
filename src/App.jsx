// ─── App.jsx ──────────────────────────────────────────────────────
// Root component. Owns global state: current page, auth, and theme.
// Applies theme class to <html>, renders Navbar + MarketTicker + page.

import { useState, useEffect } from "react";

import CSS from "./styles";
import Navbar        from "./components/Navbar";
import MarketTicker  from "./components/MarketTicker";

import HomePage        from "./pages/HomePage";
import MutualFundsPage from "./pages/MutualFundsPage";
import SIPPage         from "./pages/SIPPage";
import CalculatorPage  from "./pages/CalculatorPage";
import AboutPage       from "./pages/AboutPage";
import LoginPage       from "./pages/LoginPage";
import SignupPage      from "./pages/SignupPage";
import DashboardPage   from "./pages/DashboardPage";

export default function App() {
  const [page,       setPage]       = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

<<<<<<< HEAD
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(Boolean(token));
  }, []);
=======
  // ── Theme: read saved preference or default to dark ──
  const [theme, setTheme] = useState(() => localStorage.getItem("gw-theme") || "dark");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("gw-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  const isHome = page === "home";
>>>>>>> 14d70d136a31db08c781d8157fac82c80e28c098

  const renderPage = () => {
    switch (page) {
      case "home":         return <HomePage       setPage={setPage} />;
      case "mutual-funds": return <MutualFundsPage />;
      case "sip":          return <SIPPage         setPage={setPage} />;
      case "calculator":   return <CalculatorPage />;
      case "about":        return <AboutPage />;
      case "login":        return <LoginPage  setPage={setPage} setIsLoggedIn={setIsLoggedIn} />;
      case "signup":       return <SignupPage setPage={setPage} setIsLoggedIn={setIsLoggedIn} />;
      case "dashboard":    return isLoggedIn
        ? <DashboardPage setPage={setPage} />
        : <LoginPage     setPage={setPage} setIsLoggedIn={setIsLoggedIn} />;
      default:             return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <Navbar
        page={page}
        setPage={setPage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      {/* Ticker only appears on the Home page, sticky below the navbar */}
      {isHome && <MarketTicker />}
      {renderPage()}
    </>
  );
}
