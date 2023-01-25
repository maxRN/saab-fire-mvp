import { Dispatch, SetStateAction, useState } from "react";
import "./App.css";
import { SimpleMap } from "./MapComponent";

async function sendDronePromise(): Promise<string> {
  const sending = new Promise<string>((resolve) => {
    setTimeout(() => {
      console.log("done sending...");
      resolve("sent successfully!");
    }, 3000);
  });

  return sending;
}

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const MAX_DRONES = 7;
  const [dronesInUse, setDronesInUse] = useState(0);
  const dronesAvailable = MAX_DRONES - dronesInUse;
  const [polys, setPolys] = useState<Polygon[]>([]);

  const SEARCH_TIME_MIN = 8 * 60;

  return (
    <div className="App">
      <h1>FireFlyer Dashboard</h1>
      <div id="map"></div>
      <SimpleMap polys={polys} setPolys={setPolys} />
      <div className="card">
        <button
          style={{ margin: "1em" }}
          onClick={() => sendToDrone(setLoading)}
        >
          {loading ? "Sending..." : "Send data to fire flyer."}
        </button>
        <span>
          {MAX_DRONES - dronesInUse} drones available / {dronesInUse} drones
          surveying forest
        </span>
      </div>
      {polys.map((poly) => (
        <div key={poly.name}>
          <div>
            Search Area {poly.name}, drones: {poly.amntDrones}, est time:{" "}
            {poly.amntDrones === 0
              ? "Please assign at least one drone to this search area."
              : (SEARCH_TIME_MIN / poly.amntDrones).toString() + "min"}
          </div>
          <button
            disabled={dronesAvailable === MAX_DRONES || poly.amntDrones === 0}
            onClick={() => updateDroneCount(poly, setPolys, -1, setDronesInUse)}
          >
            -1
          </button>
          <button
            disabled={dronesAvailable === 0}
            onClick={() => updateDroneCount(poly, setPolys, 1, setDronesInUse)}
          >
            +1
          </button>
        </div>
      ))}
    </div>
  );
}

async function sendToDrone(
  setLoading: any
) {
  setLoading(true);
  await sendDronePromise();
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
};

export type Coordinate = {
  lat: number;
  lng: number;
};

export default App;
