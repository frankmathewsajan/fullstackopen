import { useEffect, useState } from 'react';
import axios from 'axios';
import log from "eslint-plugin-react/lib/util/log.js";
const api_key = import.meta.env.VITE_W_KEY

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
                    <button onClick={() => setCountry({ name: c.name.common, details: null, weather: null })}>Show</button>
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

            {country.weather && (
                <div>
                    <h3>Weather in {country.details.capital}</h3>
                    <p>Temperature: {country.weather.main.temp} °C</p>
                    <p>Weather: {country.weather.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${country.weather.weather[0].icon}.png`} alt="weather icon" />
                    <p>Wind : {country.weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

function App() {
    const [search, setSearch] = useState('');
    const [country, setCountry] = useState({ name: null, details: null, weather: null });
    const [message, setMessage] = useState('No Match Found');
    const [allCountries, setAllCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
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
            axios
                .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country.name}`)
                .then(response => {
                    setCountry(prev => ({ ...prev, details: response.data }));
                    if (response.data.capital) {
                        axios
                            .get(`https://api.openweathermap.org/data/2.5/weather?q=${response.data.capital}&appid=${api_key}`)
                            .then(weatherResponse => {
                                setCountry(prev => ({ ...prev, weather: weatherResponse.data }));
                            })
                            .catch(error => {
                                console.error('Error fetching weather:', error);
                            });
                    }
                })
                .catch(error => {
                    console.error('Error fetching country details:', error);
                });
        }
    }, [country.name]);

    useEffect(() => {
        if (search) {
            const filtered = allCountries.filter(c =>
                c.name.common.toLowerCase().includes(search.toLowerCase())
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
