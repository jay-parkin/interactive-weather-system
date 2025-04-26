import { useState, useEffect } from "react";

import FullForecastsCards from "../components/FullForecastsCards";
import "../styles/ForecastPage.css";

export default function Forecast() {
  const [coords, setCoords] = useState([-33.8688, 151.2093]);
  const [forecast, setForecast] = useState([]);
  const [weather, setWeather] = useState(null);
  const [locationDenied, setLocationDenied] = useState(false);

  const fetchWeatherByCoords = async (lat, lon) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const weatherData = await weatherRes.json();
    setWeather(weatherData);

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const forecastData = await forecastRes.json();

    const days = forecastData.list
      .filter((_, i) => i % 8 === 0)
      .map((entry) => ({
        date: new Date(entry.dt * 1000).toLocaleDateString("en-AU", {
          weekday: "long",
        }),
        temp: Math.round(entry.main.temp),
        description: entry.weather[0].description,
        feels_like: Math.round(entry.main.feels_like),
        icon: entry.weather[0].icon,
      }));

    setForecast(days);
  };

  useEffect(() => {
    fetchWeatherByCoords(coords[0], coords[1]);
  }, []);

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(
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
      <h1 className="forecast-title">Forecast</h1>

      <div className="controls">
        <button onClick={handleUseMyLocation} disabled={locationDenied}>
          Current Location
        </button>
        <button>Choose Location</button>
      </div>

      <h2 className="forecast-city">{weather?.name || "Loading..."}</h2>

      <FullForecastsCards forecast={forecast} />
    </div>
  );
}
