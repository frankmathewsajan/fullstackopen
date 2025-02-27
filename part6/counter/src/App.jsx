import {useState} from 'react'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <h1>{count}</h1>
            <button onClick={() => setCount((count) => count + 1)}>
                Add
            </button>
            <button onClick={() => setCount((count) => count + 1)}>
                Sub
            </button>
            <button onClick={() => setCount((count) => count + 1)}>
                Zero
            </button>
        </>
    )
}

export default App
