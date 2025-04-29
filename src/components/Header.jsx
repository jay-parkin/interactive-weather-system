import { Link } from "react-router-dom";

import "../styles/Header.css";

export default function Header() {
  return (
    <header className="header-container">
      <h1 className="logo">Weather Map</h1>
      <nav className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/forecast">Forecast</Link>
        <Link to="/maps">Maps</Link>
        <Link to="/about">About</Link>
      </nav>
      <div className="controls">
        <button disabled>Log in</button>
        <button disabled>ALERTS</button>
      </div>
    </header>
  );
}
