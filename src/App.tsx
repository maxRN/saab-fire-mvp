import { Dispatch, SetStateAction, useState } from "react";
import "./App.css";
import { LeafletMap } from "./Leaflet";
import { SimpleMap } from "./MapComponent";

async function sendDronePromise(poly: Polygon): Promise<Response> {
  if (poly === undefined) {
    return Promise.resolve(new Response("no polygon"));
  }

  console.log("sending coords from first polygon:", poly);
  const coords = poly.path.map(
    (coord) => coord.x.toString() + ";" + coord.y.toString()
  );
  console.log(coords);
  return fetch("http://localhost:9090/example?coords=" + coords);
}

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const MAX_DRONES = 7;
  const [dronesInUse, setDronesInUse] = useState(0);
  const dronesAvailable = MAX_DRONES - dronesInUse;
  const [polys, setPolys] = useState<Polygon[]>([]);

  const SEARCH_TIME_MIN = 8 * 60;

  return <LeafletMap />;
  {
    /*
    <div className="App">
      <h1>FyreFlyer Dashboard</h1>
      <div className="main-container">
        <div className="left-container">
          <div className="inner-flex-container">
            <h3 className="operating-mode">Current Search Mode</h3>
            <div className="operating-mode-container">
              <button className="circular-button-active">
                <div className="dark-text">Active Search Mode</div>
              </button>
              <button className="circular-button-passive">
                <div className="dark-text">Passive Search Mode</div>
              </button>
            </div>
          </div>
          <div className="log-container">
            <h3>Log</h3>
            <span>
              {polys.map((poly) => (
                <div>
                  <b>Search Area {poly.name}</b>
                  <br></br>
                  Current search mode: <b className="active-mode">ACTIVE</b>
                  <br></br>
                  Longtitude: {poly.centerLon}
                  <br></br>
                  Latitude: {poly.centerLat}
                </div>
              ))}
            </span>
          </div>
        </div>
        <div className="map-container">
          <div id="map"></div>
          <SimpleMap polys={polys} setPolys={setPolys} />
          <div className="right-container">
            <div className="card">
              <button
                style={{ margin: "1em" }}
                onClick={() => sendToDrone(setLoading, polys[0])}
              >
                {loading ? "Sending..." : "Send data to fire flyer."}
              </button>
            </div>
            <div className="available-drones">
              <span>
                Drones available: {MAX_DRONES - dronesInUse} <br></br>
                Drones currently surveying forest: {dronesInUse}
              </span>
            </div>
            {polys.map((poly) => (
              <div key={poly.name} className="search-container">
                <div>
                  <h3 className="search-area">Search Area {poly.name}</h3>{" "}
                  <br></br>
                  Drones: {poly.amntDrones}
                  <br></br>
                  Estimated search time:{" "}
                  {poly.amntDrones === 0
                    ? "No drones assigned yet."
                    : (SEARCH_TIME_MIN / poly.amntDrones)
                        .toFixed(2)
                        .toString() + "min"}
                </div>
                <button
                  disabled={dronesAvailable === 0}
                  onClick={() =>
                    updateDroneCount(poly, setPolys, 1, setDronesInUse)
                  }
                >
                  +1
                </button>
                <button
                  disabled={
                    dronesAvailable === MAX_DRONES || poly.amntDrones === 0
                  }
                  onClick={() =>
                    updateDroneCount(poly, setPolys, -1, setDronesInUse)
                  }
                >
                  -1
                </button>
              </div>
            ))}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  */
  }
}

async function sendToDrone(setLoading: any, poly: Polygon) {
  // setLoading(true);
  await sendDronePromise(poly);
  setLoading(false);
}

function updateDroneCount(
  poly: Polygon,
  setPolys: Dispatch<SetStateAction<Polygon[]>>,
  amount: number,
  setDronesInUse: Dispatch<SetStateAction<number>>
) {
  poly.amntDrones = poly.amntDrones + amount;
  setDronesInUse((drones) => drones + amount);
  setPolys((polys) => [...polys]);
}

export type Polygon = {
  path: Coordinate[];
  name: string;
  amntDrones: number;
  centerLat: string;
  centerLon: string;
};

export type Coordinate = {
  lat: number;
  lng: number;
  x: number;
  y: number;
};

export default App;
