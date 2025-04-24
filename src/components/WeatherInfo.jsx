export default function WeatherInfo({ data }) {
  if (!data) return <p>No weather data to display.</p>;

  return (
    <div>
      <h2>Weather in {data.name}</h2>
      <p>Temperature: {data.main.temp} °C</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
    </div>
  );
}
