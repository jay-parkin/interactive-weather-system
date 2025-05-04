import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header-container">
      <h1 className="logo">Weather Map</h1>

      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? "✕" : "☰"}
      </button>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Dashboard
        </Link>
        <Link to="/forecast" onClick={() => setMenuOpen(false)}>
          Forecast
        </Link>
        <Link to="/maps" onClick={() => setMenuOpen(false)}>
          Maps
        </Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>
          About
        </Link>
      </nav>

      <div className="header-controls controls">
        <button disabled>Log in</button>
        <button disabled>ALERTS</button>
      </div>
    </header>
  );
}
