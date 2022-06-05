import React, { useState } from "react";
import "./App.css";
import logo from "./Img/logo.png";
import loc from "./Img/loc.png";
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";

function App() {
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [output, setOutput] = useState(0);

  const options = {
    destinations: [{ lat: 19.0760, lng: 72.8777 }],
    origins: [{ lng: 28.7041, lat: 77.1025 }],
    travelMode: "DRIVING",
  };

  const mapContainerStyle = {
    width: "560px",
    height: "511px",
  };

  const center = {
    lat: 20.5937,
    lng: 78.9629,
  };

  const originHandler = (e) => {
    setOrigin(e.target.value);
    console.log(origin);
  };
  const destHandler = (e) => {
    setDest(e.target.value);
    console.log(dest);
  };
  const calculateHandler = (e) => {
    setOutput(5);
  };

  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="main">
        <div className="main-comment">
          Let's calculate <span className="bold">distance</span> from Google
          maps
        </div>
        <div className="main-content">
          <div className="main-left">
            <h6>Origin</h6>
            <div className="input-logo">
              <img className="loc" src={loc} alt="loc" />
              <input
                type="text"
                className="origin-input"
                placeholder="Origin"
                value={origin}
                onChange={originHandler}
              />
            </div>
            <div className="button">
              <button className="calculate-btn" onClick={calculateHandler}>
                Calculate
              </button>
            </div>
            <h6>Destination</h6>
            <div className="input-logo">
              <img className="loc" src={loc} alt="loc" />
              <input
                type="text"
                className="dest-input"
                placeholder="Destination"
                value={dest}
                onChange={destHandler}
              />
            </div>
            <span className="output">
              <h3>Distance</h3>
              <h2 className="calc-distance">{output} kms</h2>
            </span>
            {output > 0 && (
              <h4 className="output-text">
                The distance between <span className="bold">{origin}</span> and{" "}
                <span className="bold">{dest}</span> is{" "}
                <span className="bold">{output}</span>.
              </h4>
            )}
          </div>
          <div className="main-right">
            <GoogleMap
              id="map"
              mapContainerStyle={mapContainerStyle}
              zoom={4}
              center={center}
              options={options}
            ></GoogleMap>
          </div>
        </div>
      </div>

      <div className="map-container"></div>
    </div>
  );
}

export default App;
