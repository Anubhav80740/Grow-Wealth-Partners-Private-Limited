// ─── App.jsx ──────────────────────────────────────────────────────
// Root component. Owns global state (current page, auth).
// Renders the Navbar, injects global CSS, and routes to the right page.

import { useState } from "react";

import CSS from "./styles";
import Navbar from "./components/Navbar";

import HomePage       from "./pages/HomePage";
import MutualFundsPage from "./pages/MutualFundsPage";
import SIPPage        from "./pages/SIPPage";
import CalculatorPage from "./pages/CalculatorPage";
import AboutPage      from "./pages/AboutPage";
import LoginPage      from "./pages/LoginPage";
import SignupPage     from "./pages/SignupPage";
import DashboardPage  from "./pages/DashboardPage";

export default function App() {
  const [page,       setPage]       = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      <Navbar page={page} setPage={setPage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {renderPage()}
    </>
  );
}
