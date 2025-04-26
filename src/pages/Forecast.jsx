import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import FullForecastsCards from "../components/FullForecastsCards";
import { fetchWeatherByCoords } from "../utils/fetchWeather";
import "../styles/ForecastPage.css";

export default function Forecast() {
  const [coords, setCoords] = useState([-33.8688, 151.2093]);
  const [forecast, setForecast] = useState([]);
  const [weather, setWeather] = useState(null);
  const [locationDenied, setLocationDenied] = useState(false);

  const handleFetchWeather = async (lat, lon) => {
    try {
      const { weatherData, forecastDays } = await fetchWeatherByCoords(
        lat,
        lon
      );
      setWeather(weatherData);
      setForecast(forecastDays);
      setCoords([lat, lon]);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    }
  };

  useEffect(() => {
    handleFetchWeather(coords[0], coords[1]);
  }, []);

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleFetchWeather(
            position.coords.latitude,
            position.coords.longitude
          );
          setLocationDenied(false);
        },
        (error) => {
          console.error(error);
          alert("Location access denied.");
          setLocationDenied(true);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLocationDenied(true);
    }
  };

  return (
    <div className="forecast-page">
      <h1 className="forecast-title">5 Day Forecast</h1>

      <SearchBar onCoordsSearch={handleFetchWeather} />

      <div className="controls">
        <button onClick={handleUseMyLocation} disabled={locationDenied}>
          Current Location
        </button>
        <button disabled>Choose Location</button>
      </div>

      <h2 className="forecast-city">{weather?.name || "Loading..."}</h2>

      <FullForecastsCards forecast={forecast} />
    </div>
  );
}
