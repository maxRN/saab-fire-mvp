import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import MapComponent from './MapComponent'

async function sendToDrone(): Promise<string> {
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

    return (
        <div className="App">
            <h1>FireFlyer Dashboard</h1>
            <div id="map"></div>
            <MapComponent />
            <div className="card">
                <button onClick={async () => {
                    setLoading(true);
                    await sendToDrone();
                    setLoading(false);
                }}>
                    {loading ? "Sending..." : "Send data to fire flyer."}
                </button>
            </div>
        </div>
    )
}

export default App
