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
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <MapComponent />
            <div className="card">
                <button onClick={async () => {
                    setLoading(true);
                    await sendToDrone();
                    setLoading(false);
                }}>
                    {loading ? "Sending..." : "Send data to firemen."}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    )
}

export default App
