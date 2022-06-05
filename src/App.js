import "./App.css";
import logo from "./Img/logo.png";
import map from "./Img/map.png";
import loc from "./Img/loc.png";

function App() {
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
              />
            </div>
            <div className="button">
              <button className="calculate-btn">Calculate</button>
            </div>
            <h6>Destination</h6>
            <div className="input-logo">
              <img className="loc" src={loc} alt="loc" />
              <input
                type="text"
                className="dest-input"
                placeholder="Destination"
              />
            </div>
            <span className="output">
              <h3>Distance</h3>
              <h2 className="calc-distance">1,427 kms</h2>
            </span>
            <h4 className="output-text">
              The distance between <span className="bold">Mumbai</span> and{" "}
              <span className="bold">Delhi</span> is{" "}
              <span className="bold">1,427 kms</span>.
            </h4>
          </div>
          <div className="main-right">
            <img className="map" src={map} alt="map" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
