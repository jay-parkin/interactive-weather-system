import { useState, useEffect } from "react";

import SearchBar from "../components/SearchBar";
import MapContainer from "../components/MapContainer";
import ForecastCards from "../components/ForecastCards";

import { fetchWeatherByCoords } from "../utils/fetchWeather";

import "../utils/defaultIcon";

const Dashboard = () => {
  const [coords, setCoords] = useState([-33.8688, 151.2093]);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
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

      localStorage.setItem(
        "defaultLocation",
        JSON.stringify({
          coords: [lat, lon],
          location,
        })
      );
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
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
          const { latitude, longitude } = position.coords;
          handleFetchWeather(latitude, longitude);
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
      <SearchBar onCoordsSearch={handleFetchWeather} />

      <MapContainer
        coords={coords}
        weather={weather}
        onCurrentLocation={handleUseMyLocation}
        onMapClick={handleFetchWeather}
        locationDenied={locationDenied}
      />

      <ForecastCards forecast={forecast} />
    </>
  );
};

export default Dashboard;
