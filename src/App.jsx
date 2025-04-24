import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MapContainer from "./components/MapContainer";
import ForecastCards from "./components/ForecastCards";
import Controls from "./components/Controls";
import "./App.css";

function App() {
  const [coords, setCoords] = useState([-33.8688, 151.2093]);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const fetchWeather = async (query) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const geo = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`
    );
    const geoData = await geo.json();
    const { lat, lon } = geoData[0];
    setCoords([lat, lon]);

    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    setWeather(await weatherRes.json());

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await forecastRes.json();
    const days = data.list
      .filter((_, i) => i % 8 === 0)
      .map((entry) => ({
        date: new Date(entry.dt * 1000).toLocaleDateString("en-AU", {
          weekday: "short",
        }),
        temp: Math.round(entry.main.temp),
        description: entry.weather[0].main,
      }));
    setForecast(days);
  };

  useEffect(() => {
    fetchWeather("Sydney");
  }, []);

  return (
    <>
      <Header />
      <SearchBar onSearch={fetchWeather} />
      <Controls onCurrentLocation={() => {}} onLayerToggle={() => {}} />
      <MapContainer coords={coords} weather={weather} />
      <ForecastCards forecast={forecast} />
    </>
  );
}

export default App;
