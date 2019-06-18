import React from 'react'
import './AddNote.css'
import NoteContext from '../NoteContext'
import ValidationError from '../ValidationError'

export default class AddNote extends React.Component {
    constructor(props) {
        super(props)
        this.nameInput = React.createRef()
        this.contentInput = React.createRef()
        this.idInput = React.createRef()
        this.modifiedInput = React.createRef()
        this.folderIdInput = React.createRef();
        this.state = {
            formValid: false,
            nameValid: false,
            idValid: false,
            contentValid: false,
            modifiedValid: false,
            validationMessages: {
                name: '',
                content: '',
                id: '',
                modified: '',
            }
        }
    }

    static contextType = NoteContext

    formValid() {
        const { nameValid, idValid, contentValid, modifiedValid } = this.state
        this.setState({
          formValid: nameValid && idValid && contentValid && modifiedValid
        });
      }

    updateName(name) {
        this.setState({name}, () => {this.validateName(name)});
      }

    updateId(id) {
        this.setState({id}, () => {this.validateId(id)});
    }

    updateContent(content) {
        this.setState({content}, () => {this.validateContent(content)})
    }

    updateModified(modified) {
        this.setState({modified}, () => {this.validateModified(modified)})
    }

    validateName(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;
    
        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
          fieldErrors.name = 'Name is required';
          hasError = true;
        } else {
          if (fieldValue.length < 3) {
            fieldErrors.name = 'Name must be at least 3 characters long';
            hasError = true;
          } else {
            if(!fieldValue.match(new RegExp(/^[a-zA-Z]+$/))) {
              fieldErrors.name = 'Note name can only accept letters A-Z';
              hasError = true;
            } else {
              fieldErrors.name = '';
              hasError = false;
            }
          }
        }
    
        this.setState({
          validationMessages: fieldErrors,
          nameValid: !hasError
        }, this.formValid );
    }

    validateId(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;
    
        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
          fieldErrors.id = 'ID is required';
          hasError = true;
        } else {
          if (fieldValue.length < 3) {
            fieldErrors.id = 'ID must be at least 3 characters long';
            hasError = true;
          } else {
            if (!fieldValue.match(new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/))) {
              fieldErrors.id = 'Note ID must contain at least one number and one letter';
              hasError = true;
            } else {
            fieldErrors.id = '';
            hasError = false;
            }
          }
        }
    
        this.setState({
          validationMessages: fieldErrors,
          idValid: !hasError
        }, this.formValid );
    }

    validateContent(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;
    
        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
          fieldErrors.content = 'Content is required';
          hasError = true;
        } else {
          if (fieldValue.length < 10 || fieldValue.length > 100) {
            fieldErrors.content = 'Content must be between 10 and 100 characters long';
            hasError = true;
          } else {
            fieldErrors.content = '';
            hasError = false;
          }
        }
    
        this.setState({
          validationMessages: fieldErrors,
          contentValid: !hasError
        }, this.formValid );
    }

    validateModified(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;
    
        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
          fieldErrors.modified = 'Please select a month, day, and year';
          hasError = true;
        } else {
            fieldErrors.modified = '';
            hasError = false;
          }
        
    
        this.setState({
          validationMessages: fieldErrors,
          modifiedValid: !hasError
        }, this.formValid );
    }

    postnote(note, callback) {
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
            this.props.history.push('/')
            callback(note)
        })
        .catch(error => console.log(error))
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const note = {
            name: this.nameInput.current.value,
            content: this.contentInput.current.value,
            id: this.contentInput.current.value,
            modified: this.modifiedInput.current.value,
            folderId: this.folderIdInput.current.value
        }
        this.postnote(note, this.context.handleAddNote)
    }

    render() {

        const { nameValid, idValid, contentValid, modifiedValid, validationMessages } = this.state
        const { folders } = this.context;
        const folderChoices = folders.map((item, key) => 
            <option key={key} value={item.id}>{item.name}</option>)
        return (
            
            <form onSubmit={e => this.handleSubmit(e)}>
                <h2>Add a note</h2>
                <label htmlFor="note-name">enter note name</label>
                <input 
                    name="note-name" type="text" ref={this.nameInput} 
                    onChange={e => this.updateName(e.target.value)}
                ></input>
                <ValidationError hasError={!nameValid} message={validationMessages.name} />

                <label htmlFor="note-content">enter note content</label>
                <input name="note-content" type="text" ref={this.contentInput}
                    onChange={e => this.updateContent(e.target.value)}
                ></input>
                <ValidationError hasError={!contentValid} message={validationMessages.content} />

                <label htmlFor="note-id">enter note id</label>
                <input name="note-id" type="text" ref={this.idInput}
                    onChange={e => this.updateId(e.target.value)}
                ></input>
                <ValidationError hasError={!idValid} message={validationMessages.id} />

                <label htmlFor="modified-id">enter date of modification</label>
                <input required name="modified-id" type="date" ref={this.modifiedInput}
                    onChange={e => this.updateModified(e.target.value)}
                ></input>
                <ValidationError hasError={!modifiedValid} message={validationMessages.modified} />

                <label htmlFor="folder-id">select a folder</label>
                <select ref={this.folderIdInput}>
                    {folderChoices}
                </select>
                <button className="disabled" type="submit" disabled={!this.state.formValid}>Submit</button>
            </form>  
        )
    }
}
