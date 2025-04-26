import getWeatherIcon from "../utils/getWeatherIcon";
import "../styles/ForecastCards.css";

export default function ForecastCards({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="forecast-cards-container">
      {forecast.map((day, index) => (
        <div className="forecast-card" key={index}>
          <img
            src={getWeatherIcon(day.icon)}
            alt={day.description}
            className="forecast-icon"
          />
          <p className="forecast-day">{day.date}</p>
          <p className="forecast-temp">{day.temp}°C</p>
          <p className="forecast-desc">{day.description}</p>
          <p className="forecast-feels-like">Feels like {day.feels_like}°C</p>
        </div>
      ))}
    </div>
  );
}
