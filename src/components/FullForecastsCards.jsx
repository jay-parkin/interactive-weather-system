import getWeatherIcon from "../utils/getWeatherIcon";

import "../styles/FullForecastCards.css";

export default function ForecastCards({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  function getWindDirection(deg) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  }

  return (
    <div className="forecast-cards-container">
      {forecast.map((day, index) => (
        <div className="full-forecast-card" key={index}>
          <img
            src={getWeatherIcon(day.icon)}
            alt={day.description}
            className="forecast-icon"
          />
          <p className="forecast-day">{day.date}</p>
          <p className="forecast-temp">{day.tempDay}°C</p>
          <p className="forecast-range">
            {day.tempMin}° / {day.tempMax}°
          </p>
          <p className="forecast-desc">{day.description}</p>
          <p className="forecast-feels-like">Feels like {day.feelsLike}°C</p>
          <p className="forecast-humidity">Humidity: {day.humidity}%</p>
          <p className="forecast-rain">Rain: {day.rainChance}%</p>
          <p className="forecast-wind">
            Wind: {day.windSpeed} m/s {getWindDirection(day.windDeg)}
          </p>
        </div>
      ))}
    </div>
  );
}
