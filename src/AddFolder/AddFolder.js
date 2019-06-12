import React from 'react'
import './AddFolder.css'
import NoteContext from '../NoteContext'
import ValidationError from '../ValidationError'

function postFolder(folder, callback) {
    const foldersENDPOINT = "http://localhost:9090/folders"
    //FOLDERS API FETCH
    fetch(foldersENDPOINT, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(folder)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(res.status)
        }
        return res.json()
    })
    .then(data => {
        callback(folder)
    })
    .catch(error => console.log(error))
}

export default class AddFolder extends React.Component {
    constructor(props) {
        super(props)
        this.nameInput = React.createRef()
        this.numberInput = React.createRef()
    }

    static contextType = NoteContext
    
    handleSubmit(e) {
        e.preventDefault();
        const folder = {
            name: this.nameInput.current.value,
            id: this.numberInput.current.value
        }
        console.log(folder)

        postFolder(folder, this.context.handleAddFolder)
    }

    render() {
        return (
            
            <form onSubmit={e => this.handleSubmit(e)}>
                <h2>Add a Folder</h2>
                <label htmlFor="folder-name">enter folder name</label>
                <input name="folder-name" type="text" ref={this.nameInput}></input>
                <label htmlFor="folder-id">enter folder id</label>
                <input name="folder-id" type="number" ref={this.numberInput}></input>
                <button type="submit">Submit</button>
            
            </form>
            
        )
    }
}

