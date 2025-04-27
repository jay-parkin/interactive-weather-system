import { useState, useEffect } from "react";
import { fetchWeatherByCoords } from "../utils/fetchWeather";

export default function useMaps() {
  const [maps, setMaps] = useState(() => {
    const savedMaps = localStorage.getItem("maps");
    return savedMaps ? JSON.parse(savedMaps) : [];
  });

  const [adding, setAdding] = useState(false);

  useEffect(() => {
    localStorage.setItem("maps", JSON.stringify(maps));
  }, [maps]);

  const handleAdd = async (m) => {
    const { weatherData } = await fetchWeatherByCoords(
      m.coords[0],
      m.coords[1]
    );
    setMaps((prev) => [...prev, { ...m, weather: weatherData }]);
  };

  const removeMap = (id) => {
    setMaps((prev) => prev.filter((m) => m.id !== id));
  };

  return {
    maps,
    setMaps,
    adding,
    setAdding,
    handleAdd,
    removeMap,
  };
}
