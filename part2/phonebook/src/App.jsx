import {useEffect, useState} from "react";
import phoneServices from "./services/phone.js";

const Contact = ({person, onDelete}) => (
    <p>
        {person.name}: {person.number}{" "}
        <button onClick={() => onDelete(person.id)}>Delete</button>
    </p>
);

const Contacts = ({people, onDelete}) => (
    <div>{people.map((p) => <Contact key={p.id} person={p} onDelete={onDelete}/>)}</div>
);

const LaForm = ({persons, setPersons}) => {
    const [form, setForm] = useState({name: "", number: ""});

    const handleChange = (e) =>
        setForm((prev) => ({...prev, [e.target.name]: e.target.value}));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = form.name.trim();
        const number = form.number.trim();
        if (!name || !number) return;

        const existingPerson = persons.find((p) => p.name === name);

        try {
            if (existingPerson) {
                if (!window.confirm(`${name} is already in the phonebook, replace the old number?`)) return;

                const updatedPerson = {...existingPerson, number};
                const updatedData = await phoneServices.update(existingPerson.id, updatedPerson);

                setPersons((prev) => prev.map((p) => (p.id === updatedData.id ? updatedData : p)));
            } else {
                const newPerson = await phoneServices.create({name, number});
                setPersons((prev) => [...prev, newPerson]);
            }

            setForm({name: "", number: ""});
        } catch (error) {
            console.error("Operation failed:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required/>
            <input name="number" placeholder="Phone Number" value={form.number} onChange={handleChange} required/>
            <button type="submit">Add</button>
        </form>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        phoneServices.getAll().then(setPersons).catch((err) => console.error("Failed to fetch contacts:", err));
    }, []);

    const handleDelete = async (id) => {
        const person = persons.find((p) => p.id === id);
        if (!person || !window.confirm(`Delete ${person.name}?`)) return;

        try {
            await phoneServices.remove(id);
            setPersons((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };
    const handleFilter = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter searchValue={searchValue} handleFilter={handleFilter}/>
            <h2>Add New</h2>
            <LaForm persons={persons} setPersons={setPersons}/>
            <h2>Numbers</h2>
            <Contacts people={persons.filter((p) => p.name.toLowerCase().includes(searchValue.toLowerCase()))}
                      onDelete={handleDelete}/>
        </div>
    );
};

const Filter = ({searchValue, handleFilter}) => {
    return <input placeholder="Filter" value={searchValue} onChange={handleFilter}/>
}
export default App;
