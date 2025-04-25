import { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import "../styles/SearchBar.css";
import magnifyingGlass from "../assets/icons/magnifier.png";

export default function SearchBar({ onSearch, onCoordsSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) return setSuggestions([]);
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
      );
      const data = await res.json();
      setSuggestions(data);
    };

    const timeout = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (city) => {
    const { lat, lon, name, state, country } = city;

    setQuery(`${name}${state ? `, ${state}` : ""}, ${country}`);
    setSuggestions([]);

    onCoordsSearch(lat, lon);
  };

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
        <div className="autocomplete-wrapper">
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

          {suggestions.length > 0 && (
            <ul className="autocomplete-dropdown">
              {suggestions.map((city, index) => (
                <li key={index} onClick={() => handleSelect(city)}>
                  {city.name}
                  {city.state ? `, ${city.state}` : ""}, {city.country}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
