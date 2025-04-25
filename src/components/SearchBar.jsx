import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import "../styles/SearchBar.css";
import searchWeather from "../assets/icons/searchWeather.png";
import magnifyingGlass from "../assets/icons/magnifier.png";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className="search-panel">
      <div className="search-panel-container">

        <InputGroup className="input-container-field">
          <Form.Control
            className="search-form-input"
            placeholder="Search Location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button className="input-container-btn" onClick={handleSubmit}>
            <img
              className="search-panel-return-img"
              src={magnifyingGlass}
              alt="Magnifying Glass Img"
            />
          </Button>
        </InputGroup>
      </div>
    </div>
  );
}
