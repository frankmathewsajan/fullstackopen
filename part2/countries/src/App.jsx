import { useEffect, useState } from 'react';
import axios from 'axios';

const SearchBar = ({ search, setSearch, setMessage }) => {
    return (
        <>
            find countries <input type="text" value={search} onChange={({ target }) => {
                setSearch(target.value);
                setMessage('Fetching...');
            }} /><br />
        </>
    );
};

const Matches = ({ result, message, setCountry }) => {
    if (!result || result.length === 0) {
        return <>{message}</>;
    }
    return (
        <ul>
            {result.map((c, index) => (
                <li key={index}>{c.name.common}&nbsp;
                    <button onClick={() => setCountry(prev => ({ ...prev, name: c.name.common }))}>Show</button>
                </li>
            ))}
        </ul>
    );
};

const CountryDetails = ({ country }) => {
    if (!country.details) return null;
    return (
        <div>
            <h2>{country.details.name?.common}</h2>
            <p>Capital: {country.details.capital}</p>
            <p>Population: {country.details.population}</p>
            <p>Area: {country.details.area} km²</p>
            <h3>Languages:</h3>
            <ul>
                {country.details.languages && Object.values(country.details.languages).map((lang, index) => (
                    <li key={index}>{lang}</li>
                ))}
            </ul>
            <img src={country.details.flags?.png} alt={`Flag of ${country.details.name?.common}`} width="100" />
        </div>
    );
};

function App() {
    const [search, setSearch] = useState('');
    const [country, setCountry] = useState({ name: null, details: null });
    const [message, setMessage] = useState('No Match Found');
    const [allCountries, setAllCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        console.log('Fetching all countries...');
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
            .then(response => {
                setAllCountries(response.data);
                setMessage('');
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
                setMessage('Failed to fetch country data');
            });
    }, []);

    useEffect(() => {
        if (country.name) {
            console.log(`Fetching details of ${country.name}`);
            axios
                .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country.name}`)
                .then(response => {
                    setCountry(prev => ({ ...prev, details: response.data }));
                })
                .catch(error => {
                    console.error('Error fetching country details:', error);
                });
        }
    }, [country.name]);

    useEffect(() => {
        if (search) {
            const filtered = allCountries.filter(country =>
                country.name.common.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredCountries(filtered);
            setMessage(filtered.length === 0 ? 'No Match Found' : '');
        } else {
            setFilteredCountries([]);
            setMessage('No Match Found');
        }
    }, [search, allCountries]);

    return (
        <>
            <SearchBar search={search} setSearch={setSearch} setMessage={setMessage} />
            <Matches result={filteredCountries} message={message} setCountry={setCountry} />
            <CountryDetails country={country} />
        </>
    );
}

export default App;
