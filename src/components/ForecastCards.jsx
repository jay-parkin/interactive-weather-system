import getWeatherIcon from "../utils/getWeatherIcon";

import "../styles/ForecastCards.css";

export default function ForecastCards({ forecast }) {
  return (
    <div className="forecast-container">
      {forecast.map((day, index) => (
        <div className="small-forecast-card" key={index}>
          <div className="forecast-content">
            <img
              src={getWeatherIcon(day.icon)}
              alt={day.description}
              className="forecast-icon"
            />
            <div className="forecast-text">
              <div className="forecast-top-row">
                <p className="forecast-day">{day.date}</p>
                <p className="forecast-temp">{day.tempDay}°C</p>
              </div>
              <p className="forecast-desc">{day.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
