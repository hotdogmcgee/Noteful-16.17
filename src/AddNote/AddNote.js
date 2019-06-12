import React from 'react'
// import './Addnote.css'
import NoteContext from '../NoteContext'
import ValidationError from '../ValidationError'

function postnote(note, callback) {
    const notesENDPOINT = "http://localhost:9090/notes"
    //notes API FETCH
    fetch(notesENDPOINT, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(res.status)
        }
        return res.json()
    })
    .then(data => {
        callback(note)
    })
    .catch(error => console.log(error))
}

export default class AddNote extends React.Component {
    constructor(props) {
        super(props)
        this.nameInput = React.createRef()
        this.descriptionInput = React.createRef()
    }

    static contextType = NoteContext
    
    handleSubmit(e) {
        e.preventDefault();
        const note = {
            name: this.nameInput.current.value,
            description: this.descriptionInput.current.value
        }
        console.log(note)

        postnote(note, this.context.handleAddNote)
    }

    render() {
        return (
            
            <form onSubmit={e => this.handleSubmit(e)}>
                <h2>Add a note</h2>
                <label htmlFor="note-name">enter note name</label>
                <input name="note-name" type="text" ref={this.nameInput}></input>
                <label htmlFor="note-description">enter note id</label>
                <input name="note-decription" type="text" ref={this.descriptionInput}></input>
                <button type="submit">Submit</button>
            
            </form>
            
        )
    }
}
