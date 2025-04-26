import "../styles/Header.css";

export default function Header() {
  return (
    <header className="header-container">
      <h1 className="logo">Weather Map</h1>
      <nav className="nav-links">
        <a href="#">Dashboard</a>
        <a href="#">Forecast</a>
        <a href="#">Maps</a>
        <a href="#">About</a>
      </nav>
      <div className="controls">
        <button disabled>ALERTS</button>
      </div>
    </header>
  );
}
