import "../styles/ForecastCards.css";

export default function ForecastCards({ forecast }) {
  return (
    <div className="forecast-container">
      {forecast.map((day, index) => (
        <div className="forecast-card" key={index}>
          <p>{day.date}</p>
          <p>{day.temp}°C</p>
          <p>{day.description}</p>
        </div>
      ))}
    </div>
  );
}
