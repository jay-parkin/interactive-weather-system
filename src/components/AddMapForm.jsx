import { useState, useEffect } from "react";

import SearchBar from "./SearchBar";

export default function AddMapForm({ onAdd, onCancel }) {
  const handleCoordsSearch = (lat, lon, fullName) => {
    const id = Date.now();
    const coords = [lat, lon];
    onAdd({ id, coords, name: fullName });

    console.log("Map added:", { id, coords, name: fullName });
  };

  return (
    <>
      <SearchBar
        onCoordsSearch={(lat, lon, fullName) =>
          handleCoordsSearch(lat, lon, fullName)
        }
      />

      <div className="controls cancel">
        <button onClick={onCancel}>Cancel</button>
      </div>
    </>
  );
}
