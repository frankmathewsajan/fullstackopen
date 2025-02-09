const Note = ({note, toggleImportance}) => {
    return (
        <>
            <li>{note.content}</li>
            <button onClick={toggleImportance}>{note.important ? 'not important' : 'important'}
            </button>
        </>
    )
}

export default Note