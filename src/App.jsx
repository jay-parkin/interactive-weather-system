import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Dashboard from "./pages/Dashboard";
import Forecast from "./pages/Forecast";
import Header from "./components/Header";
import Maps from "./pages/MapsPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/maps" element={<Maps />} />
        </Routes>

        {/* This is our custom footer!
        <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
