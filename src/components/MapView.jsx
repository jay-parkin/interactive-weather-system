import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styles/MapContainer.css";
import "leaflet/dist/leaflet.css";

export default function MapComponent({ coords, weather }) {
  return (
    <div className="map-box">
      <MapContainer
        center={coords}
        zoom={8}
        scrollWheelZoom
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {coords && (
          <Marker position={coords}>
            <Popup>
              <b>{weather?.name}</b>
              <br />
              {weather?.weather[0]?.description}
              <br />
              Temp: {weather?.main?.temp}°C
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
