import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MapContainer from "./components/MapContainer";
import ForecastCards from "./components/ForecastCards";
import "./App.css";

import "./utils/defaultIcon";

function App() {
  const [coords, setCoords] = useState([-33.8688, 151.2093]);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [locationDenied, setLocationDenied] = useState(false);

  const fetchWeatherByCoords = async (lat, lon) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const weatherData = await weatherRes.json();
    setWeather(weatherData);
    setCoords([lat, lon]);

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const forecastData = await forecastRes.json();
    const days = forecastData.list
      .filter((_, i) => i % 8 === 0)
      .map((entry) => ({
        date: new Date(entry.dt * 1000).toLocaleDateString("en-AU", {
          weekday: "short",
        }),
        temp: Math.round(entry.main.temp),
        description: entry.weather[0].main,
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
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
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
    <>
      <Header />
      <SearchBar onCoordsSearch={fetchWeatherByCoords} />
      <MapContainer
        coords={coords}
        weather={weather}
        onCurrentLocation={handleUseMyLocation}
        locationDenied={locationDenied}
      />
      <ForecastCards forecast={forecast} />
    </>
  );
}

export default App;
