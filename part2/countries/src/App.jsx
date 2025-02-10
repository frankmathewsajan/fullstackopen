import {useState} from 'react'

const SearchBar = ({search, setSearch}) => {
    return (
        <>
            find countries <input type="text" value={search} onChange={({target}) => {
            setSearch(target.value)
        }}/><br/>
        </>
    )
}
const Matches = () => {
    return (
        <>No matches found</>
    )
}

function App() {
    const [search, setSearch] = useState('')
    const [result, setResult] = useState(({}))
    return (
        <>
            <SearchBar search={search} setSearch={setSearch}/>
            <Matches result={result} setResult={setResult}/>
        </>
    )
}

export default App
