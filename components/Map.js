import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as React from "react";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);
  const [viewport, setViewport] = React.useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 9,
  });
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/arissaca/cl9n6dhsy001714pgtm80bua9"
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p>❤️❤️</p>
          </Marker>
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
