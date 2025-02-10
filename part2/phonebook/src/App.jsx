import {useEffect, useState} from "react";
import phoneServices from "./services/phone.js";
import './index.css'

const Contact = ({person, onDelete}) => (
    <p>
        {person.name}: {person.number}{" "}
        <button onClick={() => onDelete(person.id)}>Delete</button>
    </p>
);

const Contacts = ({people, onDelete}) => (
    <div>{people.map((p) => <Contact key={p.id} person={p} onDelete={onDelete}/>)}</div>
);

const LaForm = ({persons, setPersons, setMessage}) => {
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
                setMessage({
                    content: `Edited ${name}`,
                    class: 'success'
                });
            } else {
                const newPerson = await phoneServices.create({name, number});
                setPersons((prev) => [...prev, newPerson]);
                setMessage({
                    content: `Added ${name}`,
                    class: 'success'
                });
            }

            // Auto-hide notification after 5 seconds
            setTimeout(() => {
                setMessage({content: null, class: null});
            }, 5000);

            setForm({name: "", number: ""});
        } catch (error) {
            console.error("Operation failed:", error);
            setMessage({
                content: "Operation failed",
                class: 'error'
            });

            setTimeout(() => {
                setMessage({content: null, class: null});
            }, 5000);
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


const Notification = ({message}) => {
    if (!message.content) {
        return null;
    }

    return (
        <div className={message.class}>
            {message.content}
        </div>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [message, setMessage] = useState({class: null, content: null});

    useEffect(() => {
        phoneServices.getAll().then(setPersons).catch((err) => {
            console.error("Failed to fetch contacts:", err);
            setMessage({
                content: "Failed to load contacts",
                class: "error"
            });
            setTimeout(() => {
                setMessage({content: null, class: null});
            }, 5000);
        });
    }, []);

    const handleDelete = async (id) => {
        const person = persons.find((p) => p.id === id);
        if (!person || !window.confirm(`Delete ${person.name}?`)) return;

        try {
            await phoneServices.remove(id);
            setPersons((prev) => prev.filter((p) => p.id !== id));
            setMessage({
                content: `Deleted ${person.name}`,
                class: 'error'
            });

            setTimeout(() => {
                setMessage({content: null, class: null});
            }, 5000);
        } catch (error) {
            console.error("Delete failed:", error);
            setMessage({
                content: "Delete failed",
                class: "error"
            });

            setTimeout(() => {
                setMessage({content: null, class: null});
            }, 5000);
        }
    };

    const handleFilter = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={message}/>
            <Filter searchValue={searchValue} handleFilter={handleFilter}/>
            <h2>Add New</h2>
            <LaForm persons={persons} setPersons={setPersons} setMessage={setMessage}/>
            <h2>Numbers</h2>
            <Contacts
                people={persons.filter((p) => p.name.toLowerCase().includes(searchValue.toLowerCase()))}
                onDelete={handleDelete}
            />
        </div>
    );
};


const Filter = ({searchValue, handleFilter}) => {
    return <input placeholder="Filter" value={searchValue} onChange={handleFilter}/>
}
export default App;
