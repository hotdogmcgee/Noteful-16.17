import React from 'react'

const NoteContext = React.createContext({
    notes: [],
    folders: [],
    handleDeleteNote: () => {},
    handleAddFolder: () => {},
    handleAddNote: () => {}
})

export default NoteContext