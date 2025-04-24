import "../styles/Controls.css";

export default function Controls({ onCurrentLocation, onLayerToggle }) {
  return (
    <div className="controls">
      <button onClick={onLayerToggle}>Layers</button>
      <button onClick={onCurrentLocation}>Current Location</button>
    </div>
  );
}
