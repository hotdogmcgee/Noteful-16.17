import React from 'react'
import './AddNote.css'
import NoteContext from '../NoteContext'
import ValidationError from '../ValidationError'

function postnote(note, callback) {
    const notesENDPOINT = "http://localhost:9090/notes"
    //notes API FETCH
    fetch(notesENDPOINT, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(note)
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
        this.contentInput = React.createRef()
        this.idInput = React.createRef()
        this.modifiedInput = React.createRef()
        this.folderIdInput = React.createRef();
        this.state ={
            validationMessages: {
                
            }
        }
    }

    static contextType = NoteContext

    // validateName(fieldValue) {
    //     const fieldErrors = {...this.state.validationMessages};
    //     let hasError = false;
    
    //     fieldValue = fieldValue.trim();
    //     if(fieldValue.length === 0) {
    //       fieldErrors.name = 'Name is required';
    //       hasError = true;
    //     } else {
    //       if (fieldValue.length < 3) {
    //         fieldErrors.name = 'Name must be at least 3 characters long';
    //         hasError = true;
    //       } else {
    //         fieldErrors.name = '';
    //         hasError = false;
    //       }
    //     }
    
    //     this.setState({
    //       validationMessages: fieldErrors,
    //       nameValid: !hasError
    //     }, this.formValid );
    
    // }
    
    handleSubmit(e) {
        e.preventDefault();
        const note = {
            name: this.nameInput.current.value,
            content: this.contentInput.current.value,
            id: this.contentInput.current.value,
            modified: this.modifiedInput.current.value,
            folderId: this.folderIdInput.current.ref
        }
        console.log(note)

        postnote(note, this.context.handleAddNote)
    }

    render() {

        const { folders } = this.context;
        const folderChoices = folders.map((item, key) => 
            <option key={key} ref={this.folderIdInput}>{item.name}</option>)
        return (
            
            <form onSubmit={e => this.handleSubmit(e)}>
                <h2>Add a note</h2>
                <label htmlFor="note-name">enter note name</label>
                <input name="note-name" type="text" ref={this.nameInput}></input>
                <label htmlFor="note-content">enter note content</label>
                <input name="note-content" type="text" ref={this.contentInput}></input>
                <label htmlFor="note-id">enter note id</label>
                <input name="note-id" type="text" ref={this.idInput}></input>
                <label htmlFor="modified-id">enter date of modification</label>
                <input name="modified-id" type="text" ref={this.modifiedInput}></input>

                <label htmlFor="folder-id">select a folder</label>
                <select>
                    {folderChoices}
                </select>
                <button type="submit">Submit</button>
            
            </form>
            
        )
    }
}
