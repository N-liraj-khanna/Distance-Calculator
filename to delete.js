import React, { Component } from "react";
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";
class ExampleDirections extends Component {
  state = {
    response: null,
    travelMode: "DRIVING",
    origin: "",
    destination: "",
  };

  distanceCallback = (response) => {
    console.log("Hello");
    console.log(response);

    if (response !== null) {
      if (response.status === "OK") {
        this.setState(() => ({
          response,
        }));
      } else {
        console.log("response: ", response);
      }
    }
  };

  checkDriving = ({ target: { checked } }) => {
    checked &&
      this.setState(() => ({
        travelMode: "DRIVING",
      }));
  };

  getOrigin = (ref) => {
    this.origin = ref;
  };

  getDestination = (ref) => {
    this.destination = ref;
  };

  onClick = () => {
    if (this.origin.value !== "" && this.destination.value !== "") {
      this.setState(() => ({
        origin: this.origin.value,
        destination: this.destination.value,
      }));
    }
  };

  onMapClick = (...args) => {
    console.log("onClick args: ", args);
  };

  render = () => (
    <div className="map">
      <div className="map-settings">
        <hr className="mt-0 mb-3" />

        <div className="row">
          <div className="col-md-6 col-lg-4">
            <div className="form-group">
              <label htmlFor="ORIGIN">Origin</label>
              <br />
              <input
                id="ORIGIN"
                className="form-control"
                type="text"
                ref={this.getOrigin}
              />
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="form-group">
              <label htmlFor="DESTINATION">Destination</label>
              <br />
              <input
                id="DESTINATION"
                className="form-control"
                type="text"
                ref={this.getDestination}
              />
            </div>
          </div>
        </div>

        <div className="d-flex flex-wrap">
          <div className="form-group custom-control custom-radio mr-4">
            <input
              id="DRIVING"
              className="custom-control-input"
              name="travelMode"
              type="radio"
              checked={this.state.travelMode === "DRIVING"}
              onChange={this.checkDriving}
            />
            <label className="custom-control-label" htmlFor="DRIVING">
              Driving
            </label>
          </div>
        </div>

        <button
          className="btn btn-primary"
          type="button"
          onClick={this.onClick}
        >
          Build Route
        </button>
      </div>

      <div className="map-container">
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={14}
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
              this.setState({
                totalTime: res.rows[0].elements[0].duration.text,
                totalDistance: res.rows[0].elements[0].distance.text,
              });
            }}
          />
        </GoogleMap>
      </div>
    </div>
  );
}

export default ExampleDirections;
