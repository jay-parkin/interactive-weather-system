import { useState } from "react";
import AddMapForm from "../components/AddMapForm";
import useMaps from "../utils/useMaps";

import PopupForecast from "../components/PopupForecast";
import "../styles/PopupForecast.css";

import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/MapsPage.css";

export default function Maps() {
  const { maps, adding, setAdding, handleAdd, removeMap } = useMaps();
  const [activeForecast, setActiveForecast] = useState(null);

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
                <Marker
                  position={m.coords}
                  eventHandlers={{ click: () => setActiveForecast(m.coords) }}
                />
              </LeafletMap>
            </div>

            <div className="map-card-footer">
              <div>
                <p className="map-name">
                  {`${m.name.name}${m.name.state ? `, ${m.name.state}` : ""}${
                    m.name.country ? `, ${m.name.country}` : ""
                  }`}
                </p>

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
      {activeForecast && (
        <div className="forecast-overlay">
          <div className="forecast-modal">
            <button
              className="close-btn"
              onClick={() => setActiveForecast(null)}
            >
              ×
            </button>
            <PopupForecast coords={activeForecast} />
          </div>
        </div>
      )}
    </div>
  );
}
