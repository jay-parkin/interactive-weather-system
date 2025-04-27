import { useState, useEffect } from "react";
import { fetchWeatherByCoords } from "../utils/fetchWeather";
import AddMapForm from "../components/AddMapForm";

import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/MapsPage.css";

export default function Maps() {
  const [maps, setMaps] = useState(() => {
    const savedMaps = localStorage.getItem("maps");
    if (savedMaps) {
      return JSON.parse(savedMaps);
    } else {
      return [];
    }
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

  return (
    <div className="maps-page">
      <h1>Maps</h1>
      <div className="controls">
        <button disabled>Saved Maps</button>
        <button onClick={() => setAdding(true)}>Add New Map</button>
      </div>

      {adding && (
        <AddMapForm
          onAdd={async (m) => {
            await handleAdd(m);
            setAdding(false);
          }}
          onCancel={() => setAdding(false)}
        />
      )}

      <div className="maps-grid">
        {maps.map((m) => (
          <div className="map-card" key={m.id}>
            <div className="map-card-body">
              <LeafletMap
                center={m.coords}
                zoom={8}
                scrollWheelZoom={false}
                dragging={false}
                doubleClickZoom={false}
                zoomControl={false}
                style={{ height: "200px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={m.coords}>
                  <Popup>{m.name}</Popup>
                </Marker>
              </LeafletMap>
            </div>

            <div className="map-card-footer">
              <div>
                <p className="map-name">{m.name}</p>
                {m.weather && (
                  <p className="weather-details">
                    {Math.round(m.weather.main.temp)}°C —{" "}
                    {m.weather.weather[0].description}
                  </p>
                )}
              </div>
              <button className="btn-remove" onClick={() => removeMap(m.id)}>
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
