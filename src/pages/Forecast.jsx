import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import FullForecastsCards from "../components/FullForecastsCards";
import { fetchWeatherByCoords } from "../utils/fetchWeather";
import "../styles/ForecastPage.css";
import ForecastGraph from "../components/ForecastGraph";

export default function Forecast() {
  const [coords, setCoords] = useState([-33.8688, 151.2093]);
  const [forecast, setForecast] = useState([]);
  const [weather, setWeather] = useState(null);
  const [locationDenied, setLocationDenied] = useState(false);

  const handleFetchWeather = async (lat, lon, location = null) => {
    try {
      const { weatherData, forecastDays } = await fetchWeatherByCoords(
        lat,
        lon
      );

      const fallbackLocation = {
        name: weatherData.name,
        state: null,
        country: weatherData.sys?.country || "",
      };

      setWeather({
        ...weatherData,
        location: location || fallbackLocation,
      });

      setForecast(forecastDays);
      setCoords([lat, lon]);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("defaultLocation");
    if (saved) {
      const { coords, location } = JSON.parse(saved);
      handleFetchWeather(coords[0], coords[1], location);
    } else {
      handleFetchWeather(coords[0], coords[1]);
    }
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

      <h2 className="forecast-city">
        {weather?.location
          ? `${weather.location.name}${
              weather.location.state ? `, ${weather.location.state}` : ""
            }${weather.location.country ? `, ${weather.location.country}` : ""}`
          : `${weather?.name || "Loading..."}${
              weather?.sys?.country ? `, ${weather.sys.country}` : ""
            }`}
      </h2>

      <FullForecastsCards forecast={forecast} />
      <ForecastGraph forecast={forecast} />
    </div>
  );
}
