import { Dispatch, SetStateAction, useState } from 'react'
import './App.css'
import MapComponent from './MapComponent'

async function sendDronePromise(): Promise<string> {
    const sending = new Promise<string>((resolve) => {
        setTimeout(() => {
            console.log("done sending...")
            resolve("sent successfully!");
        }, 3000);
    })

    return sending;
}

function App() {
    const [loading, setLoading] = useState<boolean>(false);
    const [dronesInUse, setDronesInUse] = useState(3);

    const MAX_DRONES = 7

    return (
        <div className="App">
            <h1>FireFlyer Dashboard</h1>
            <div id="map"></div>
            <MapComponent />
            <div className="card">
                <button style={{margin: "1em"}} onClick={() => sendToDrone(setLoading, setDronesInUse)}>
                    {loading ? "Sending..." : "Send data to fire flyer."}
                </button>
                <span>{MAX_DRONES - dronesInUse} drones available / {dronesInUse} drones surveying forest</span>
            </div>
        </div>
    )
}

async function sendToDrone(setLoading: any, setDronesInUse: Dispatch<SetStateAction<number>>) {
    setLoading(true);
    await sendDronePromise();
    setLoading(false);
    setDronesInUse((drones) => drones + 1)
}

export default App
