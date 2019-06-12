import React from 'react'

// function renderNotePageNav(routeProps) {
//     const {noteId} = routeProps.match.params;
//     const note = findNote(notes, noteId) || {};
//     const folder = findFolder(folders, note.folderId);
//     return <NotePageNav {...routeProps} folder={folder} />;
// }

const NoteContext = React.createContext({
    notes: [],
    folders: [],
    handleDeleteNote: () => {},
    handleAddFolder: () => {},
    handleAddNote: () => {}
})

export default NoteContext