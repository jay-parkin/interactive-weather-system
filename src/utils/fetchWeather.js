export const fetchWeatherByCoords = async (lat, lon) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  const weatherData = await weatherRes.json();

  const forecastRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=5&appid=${apiKey}&units=metric`
  );
  const forecastData = await forecastRes.json();

  const forecastDays = forecastData.list.map((entry) => ({
    date: new Date(entry.dt * 1000).toLocaleDateString("en-AU", {
      weekday: "long",
    }),
    tempDay: Math.round(entry.temp.day),
    tempMin: Math.round(entry.temp.min),
    tempMax: Math.round(entry.temp.max),
    feelsLike: Math.round(entry.feels_like.day),
    humidity: entry.humidity,
    rainChance: Math.round((entry.pop || 0) * 100),
    rainVolume: entry.rain || 0,
    windSpeed: entry.speed,
    windDeg: entry.deg,
    cloudiness: entry.clouds,
    description: entry.weather[0].description,
    icon: entry.weather[0].icon,
  }));

  return { weatherData, forecastDays };
};

export const fetchSuggestions = async (query) => {
  if (!query || query.length < 2) return [];

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
  );
  const data = await res.json();
  return data;
};
