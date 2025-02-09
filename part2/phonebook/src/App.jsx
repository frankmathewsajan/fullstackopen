import {useEffect, useState} from "react";
import axios from 'axios';

const Number = ({name, number}) => (
    <p>
        {name}: {number}
    </p>
);

const Contacts = ({people}) => (
    <div>
        {people.map((person) => (
            <Number key={person.name} name={person.name} number={person.number}/>
        ))}
    </div>
);

const LaForm = ({onAdd}) => {
    const [form, setForm] = useState({name: "", number: ""});

    const handleChange = ({target}) => {
        const {name, value} = target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.number.trim()) return;

        onAdd(form);
        setForm({name: "", number: ""}); // Reset form
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <input
                    type="tel"
                    name="number"
                    placeholder="Phone Number"
                    value={form.number}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Add</button>
        </form>
    );
};

const Filter = ({searchValue, onChange}) => (
    <>
        filter shown with{" "}
        <input value={searchValue} onChange={({target}) => onChange(target.value)}/>
    </>
);

const App = () => {
    const [persons, setPersons] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then((res) => {
                setPersons(res.data)
            })
    }, [])

    const handleAdd = (newPerson) => {
        if (persons.some((p) => p.name === newPerson.name)) {
            alert(`${newPerson.name} is already in the phonebook.`);
            return;
        }

        setPersons([...persons, newPerson]);
    };

    const filteredPersons = persons.filter((p) =>
        p.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter searchValue={searchValue} onChange={setSearchValue}/>
            <h2>Add New</h2>
            <LaForm onAdd={handleAdd}/>
            <h2>Numbers</h2>
            <Contacts people={filteredPersons}/>
        </div>
    );
};

export default App;
