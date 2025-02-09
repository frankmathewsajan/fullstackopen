import Note from './components/Note'
import {useState, useEffect} from "react";
import noteService from './services/notes.js'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = {...note, important: !note.important}

        noteService.update(id, changedNote).then(response => {
            setNotes(notes.map(n => n.id === id ? response : n))
        }).catch(() => {
            alert(`the note '${note.content}' was already deleted from server`)
            setNotes(notes.filter(n => n.id !== id))
        })
    }

    useEffect(() => {
        noteService.getAll().then((res) => {
            setNotes(res)
        })
    }, [])
    const handleSubmit = (event) => {
        event.preventDefault()
        if (newNote === '') return false
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: String(notes.length + 1),
        }
        noteService.create(noteObject).then(res => {
            setNotes(notes.concat(res))
            setNewNote('')
        })
    }
    const handleNoteChange = ({target}) => {
        setNewNote(target.value)
    }
    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)
    return (
        <div>
            <h1>Notes</h1>
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all'}
            </button>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note} toggleImportance={() => {
                        toggleImportanceOf(note.id)
                    }}/>
                )}
            </ul>
            <form onSubmit={handleSubmit}>
                <input value={newNote} onChange={handleNoteChange} placeholder='new note...'/>
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default App
