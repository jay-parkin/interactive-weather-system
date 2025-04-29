import "../styles/AboutPage.css";

export default function About() {
  return (
    <div className="about-page">
      <h1 className="about-title">About</h1>

      <div className="about-content">
        <div className="about-section">
          <h2>Terms of Service</h2>
          <p>Stay in loop with our company news. Sign up to our newsletter and receive the freshest info.</p>
          <button className="about-button">View More</button>
        </div>

        <div className="about-image">
          {/* This is where an image or illustration would go */}
          <div className="image-placeholder"></div>
        </div>

        <div className="about-section">
          <h2>Privacy Policy</h2>
          <p>Stay in loop with our company news. Sign up to our newsletter and receive the freshest info.</p>
          <button className="about-button">View More</button>
        </div>
      </div>
    </div>
  );
}
