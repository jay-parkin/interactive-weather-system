import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "../styles/MapContainer.css";
import "leaflet/dist/leaflet.css";

import Controls from "./Controls";

import { useEffect, useRef } from "react";

function ChangeMapView({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 10);
    }
  }, [coords]);
  return null;
}

export default function MapComponent({ coords, weather }) {
  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [coords]);

  return (
    <div className="map-box">
      <MapContainer
        center={coords}
        zoom={8}
        scrollWheelZoom
        style={{ height: "400px", width: "100%" }}
      >
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
  );
}
