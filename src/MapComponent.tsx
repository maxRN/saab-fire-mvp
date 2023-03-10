import GoogleMapReact from "google-map-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Coordinate, Polygon } from "./App";

type onClickProps = {
  lat: number;
  lng: number;
  event: MouseEvent;
};

function getCenterOfPolygon(coords: Coordinate[]): Coordinate {
  const l = coords.length;

  const sum = coords.reduce((acc, curr) => ({
    lat: acc.lat + curr.lat,
    lng: acc.lng + curr.lng,
    x: 0,
    y: 0,
  }));

  return { lat: sum.lat / l, lng: sum.lng / l, x: 0, y: 0 };
}

type SimpleMapProps = {
  polys: Polygon[];
  setPolys: Dispatch<SetStateAction<Polygon[]>>;
};

export function SimpleMap({ polys, setPolys }: SimpleMapProps) {
  const defaultProps = {
    center: {
      lat: 50.9064509,
      lng: 14.3204418,
    },
    zoom: 11,
  };

  const mapsAPIref: any = useRef(null);
  const mapRef: any = useRef(null);

  const [currentPoly, setCurrentPoly] = useState<Coordinate[]>([]);

  function onClickOnMap({ lat, lng, event }: onClickProps) {
    if (mapsAPIref.current === null || mapRef.current === null) {
      return;
    }

    console.log("map clicked: ", event);

    new mapsAPIref.current.Marker({
      position: {
        lat,
        lng,
      },
      map: mapRef.current,
    });
    // setCorners((oldState: { lat: number, lng: number }[]) => [...oldState, { lat, lng }])
    setCurrentPoly((oldState: Coordinate[]) => [
      ...oldState,
      { lat, lng, x: event.clientX, y: event.clientY },
    ]);
  }
  type APIProps = {
    map: any;
    maps: any;
    ref: any;
  };

  function googleAPILoaded({ map, maps }: APIProps) {
    mapsAPIref.current = maps;
    mapRef.current = map;
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "80vh", width: "60vw" }}>
      <GoogleMapReact
        onClick={onClickOnMap}
        bootstrapURLKeys={{ key: "AIzaSyAj0-b3jl0qxB9vatFCSy9k5WlZsW_k7p4" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={googleAPILoaded}
      ></GoogleMapReact>
      <div id="buttonsNextToMap">
        <button
          onClick={() =>
            createNewPoly(
              currentPoly,
              setCurrentPoly,
              polys,
              setPolys,
              mapsAPIref,
              mapRef
            )
          }
          style={{ margin: "1em" }}
        >
          Draw polygon
        </button>
      </div>
    </div>
  );
}

function createNewPoly(
  coords: Coordinate[],
  setCurrentPoly: Dispatch<SetStateAction<Coordinate[]>>,
  polys: Polygon[],
  setPolys: Dispatch<SetStateAction<Polygon[]>>,
  API: any,
  mapRef: any
) {
  if (coords.length === 0) {
    return;
  }

  const map = mapRef.current as google.maps.Map;

  // draw polygon
  new API.current.Polygon({
    paths: coords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map,
  });

  // draw marker
  new API.current.Marker({
    position: getCenterOfPolygon(coords),
    label: {
      text: "Search Area " + (polys.length + 1).toString(),
      color: "#0041FF",
      fontSize: "20px",
    },
    map,
  });

  // save polygon to search list
  const newPoly: Polygon = {
    path: coords,
    name: (polys.length + 1).toString(),
    centerLat: getCenterOfPolygon(coords).lat.toFixed(10).toString(),
    centerLon: getCenterOfPolygon(coords).lng.toFixed(10).toString(),
    amntDrones: 0,
  };
  setPolys((pols) => [...pols, newPoly]);
  setCurrentPoly([]);
}
