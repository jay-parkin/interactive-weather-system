import { useEffect, useState } from "react";
import { fetchWeatherByCoords } from "../utils/fetchWeather";
import FullForecastsCards from "./FullForecastsCards";

import "../styles/PopupForecast.css";

export default function PopupForecast({ coords }) {
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const loadForecast = async () => {
      try {
        const { forecastDays, weatherData } = await fetchWeatherByCoords(
          coords[0],
          coords[1]
        );
        setForecast(forecastDays);

        const loc = weatherData.name || "Unknown";
        const state = weatherData?.location?.state || "";
        const country = weatherData?.sys?.country || "";

        setLocation(
          `${loc}${state ? `, ${state}` : ""}${country ? `, ${country}` : ""}`
        );
      } catch (err) {
        console.error("Failed to load forecast for popup", err);
      }
    };
    loadForecast();
  }, [coords]);

  return (
    <>
      <div className="popup-forecast-container">
        {location && <h2 className="forecast-location-title">{location}</h2>}
        <FullForecastsCards forecast={forecast} />
      </div>
    </>
  );
}
