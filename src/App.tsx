import {useEffect, useState} from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://dhbw.radicalsimplicity.com/calendar/test/events/8257')
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <h1 className="text-3xl text-amber-300">Vite + React + Tailwind</h1>
            <br/>
            <button className="border-2 border-b-blue-500" onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
            <div>
                <pre>{data ? JSON.stringify(data, null, 2) : "Loading"}</pre>
            </div>
        </>
    )
}

export default App
