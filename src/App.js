import React, { useState } from "react";
import "./App.css";
import logo from "./Img/logo.png";
import loc from "./Img/loc.png";
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";
import SearchLocationInput from "./SearchLocationInput.js";

function App() {
  // States
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [output, setOutput] = useState(0);

  // Map Inputs
  const options = {
    destinations: [{ lat: 19.076, lng: 72.8777 }],
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

  // Handlers
  const calculateHandler = (e) => {
    setOutput(5);
  };

  // Autocomplete code
  let autoComplete;

  const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types: ["(cities)"], componentRestrictions: { country: "us" } }
    );
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery)
    );
  }
  async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    console.log(addressObject);
  }

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
              <SearchLocationInput
                loadScript={loadScript}
                handleScriptLoad={handleScriptLoad}
                set={setOrigin}
                placeholder="Origin"
                className="origin-input"
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
              <SearchLocationInput
                loadScript={loadScript}
                handleScriptLoad={handleScriptLoad}
                set={setDest}
                placeholder="Destination"
                className="dest-input"
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
            >
              <DistanceMatrixService
                options={{
                  destinations: [{ lat: 1.296788, lng: 103.778961 }],
                  origins: [{ lng: 72.89216, lat: 19.12092 }],
                  travelMode: "DRIVING",
                }}
                callback={(res) => {
                  console.log("RESPONSE", res);
                }}
              />
            </GoogleMap>
          </div>
        </div>
      </div>

      <div className="check">
        <SearchLocationInput
          loadScript={loadScript}
          handleScriptLoad={handleScriptLoad}
        />
      </div>
    </div>
  );
}

export default App;
