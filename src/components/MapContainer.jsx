import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "../styles/MapContainer.css";
import "leaflet/dist/leaflet.css";

import { useEffect, useRef } from "react";
import MapClickHandler from "./MapClickHandler";

function ChangeMapView({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 10);
    }
  }, [coords]);
  return null;
}

export default function MapComponent({
  coords,
  weather,
  onCurrentLocation,
  locationDenied,
  onMapClick,
}) {
  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [coords]);

  return (
    <div className="map-section">
      <div className="controls">
        <button disabled>Layers</button>
        <button onClick={onCurrentLocation} disabled={locationDenied}>
          Current Location
        </button>
      </div>
      <h2 className="forecast-city">
        {weather?.name ||
          (coords[0] === -33.8688 && coords[1] === 151.2093
            ? "Sydney"
            : "Loading...")}
      </h2>

      <div className="map-box">
        <MapContainer
          center={coords}
          zoom={8}
          scrollWheelZoom
          style={{ height: "400px", width: "100%" }}
        >
          <MapClickHandler onMapClick={onMapClick} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ChangeMapView coords={coords} />
          {coords && (
            <Marker position={coords} ref={markerRef}>
              <Popup>
                <b>{weather?.name}</b>
                <br />
                {weather?.weather?.[0]?.description}
                <br />
                Temp: {weather?.main?.temp}°C
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
