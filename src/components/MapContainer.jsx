import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "../styles/MapContainer.css";
import "leaflet/dist/leaflet.css";

import { useEffect, useRef } from "react";
import MapClickHandler from "./MapClickHandler";
import useMaps from "../utils/useMaps";
import Toast from "./Toast";

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
  const { handleAdd } = useMaps();

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [coords]);

  const handleAddToMaps = () => {
    try {
      const id = Date.now();
      const location = weather?.location;

      let fullName = "";

      if (location) {
        fullName = `${location.name}${
          location.state ? `, ${location.state}` : ""
        }${location.country ? `, ${location.country}` : ""}`;
      } else {
        const cityName = weather?.name || "Unknown Location";
        const countryCode = weather?.sys?.country || "";

        fullName = `${cityName}${countryCode ? `, ${countryCode}` : ""}`;
      }

      const newMap = {
        id,
        coords,
        name: {
          name: location?.name || weather?.name || "Unknown Location",
          state: location?.state || null,
          country: location?.country || weather?.sys?.country || null,
        },
      };

      handleAdd(newMap);

      Toast().fire({ icon: "success", title: "Map Added!" });
    } catch (error) {
      console.error("Failed to add map:", error);
      Toast().fire({
        icon: "error",
        title: "Failed to Add Map!",
      });
    }
  };

  function getWindDirection(deg) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  }

  return (
    <div className="map-section">
      <div className="controls">
        <button disabled>Layers</button>
        <button onClick={onCurrentLocation} disabled={locationDenied}>
          Current Location
        </button>
      </div>
      <h2 className="forecast-city">
        {weather?.location
          ? `${weather.location.name}${
              weather.location.state ? `, ${weather.location.state}` : ""
            }${weather.location.country ? `, ${weather.location.country}` : ""}`
          : `${
              weather?.name ||
              (coords[0] === -33.8688 && coords[1] === 151.2093
                ? "Sydney"
                : "Loading...")
            }${weather?.sys?.country ? `, ${weather.sys.country}` : ""}`}
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
              {/* tempDay: Math.round(entry.temp.day),
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
              icon: entry.weather[0].icon, */}
              <Popup>
                <div className="popup-content">
                  <h3>Weather Details</h3>
                  <b>{weather?.name}</b>
                  <br />
                  Description: {weather?.weather?.[0]?.description}
                  <br />
                  Temp: {weather?.main?.temp}°C
                  <br />
                  Feels like: {weather?.main?.feels_like}°C
                  <br />
                  Wind: {weather?.wind?.speed} m/s
                  <br />
                  Humidity: {weather?.main?.humidity}%
                  <br />
                  <div className="controls">
                    <button onClick={handleAddToMaps}>Add to Maps</button>
                  </div>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
