import "../styles/AboutPage.css";

export default function About() {
  return (
    <div className="about-page">
      <h1 className="about-title">About</h1>

      <div className="about-content">
        <div className="about-section">
          <h2>Terms of Service</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dicta
            soluta voluptatum dolorum natus, ad numquam, veniam aut adipisci
            modi vero placeat doloremque fuga a, temporibus explicabo asperiores
            laboriosam enim.
          </p>
          <div className="controls">
            <button disabled className="about-button">
              View More
            </button>
          </div>
        </div>

        <div className="about-image">
          {/* This is where an image or illustration would go */}
          <div className="image-placeholder"></div>
        </div>

        <div className="about-section">
          <h2>Privacy Policy</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            qui, assumenda nihil numquam minus ut consectetur nostrum, aliquam,
            eaque suscipit nam vitae dolores velit. Consectetur quae vero iusto
            nulla numquam!
          </p>
          <div className="controls">
            <button disabled className="about-button">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
