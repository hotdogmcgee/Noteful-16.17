import React from 'react'
import './AddFolder.css'
import NoteContext from '../NoteContext'
import ValidationError from '../ValidationError'

class AddFolder extends React.Component {
    constructor(props) {
        super(props)
        this.nameInput = React.createRef()
        this.numberInput = React.createRef();
        this.state = {
            formValid: false,
            nameValid: false,
            idValid: false,
            validationMessages: {
                name: '',
                id: ''
            }
        }
    }

    static contextType = NoteContext

    formValid() {
        this.setState({
          formValid: this.state.nameValid && this.state.idValid
        });
      }

    updateName(name) {
        this.setState({name}, () => {this.validateName(name)});
      }

    updateId(id) {
        this.setState({id}, () => {this.validateId(id)});
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
            fieldErrors.name = '';
            hasError = false;
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
          fieldErrors.id = 'An ID is required';
          hasError = true;
        } else {
          if (fieldValue.length < 3) {
            fieldErrors.id = 'ID must be at least 3 characters long';
            hasError = true;
          } else {
            fieldErrors.id = '';
            hasError = false;
          }
        }
    
        this.setState({
          validationMessages: fieldErrors,
          idValid: !hasError
        }, this.formValid );
    
    }
    
    ostFolder(folder, callback) {
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
          this.props.history.push('/')
          callback(folder)
      })
      .catch(error => console.log(error))
  }

    handleSubmit(e) {
        e.preventDefault();
        const folder = {
            name: this.nameInput.current.value,
            id: this.numberInput.current.value
        }
        console.log(folder)

        this.postFolder(folder, this.context.handleAddFolder)
    }

    render() {
        return (
            
            <form onSubmit={e => this.handleSubmit(e)}>
                <h2>Add a Folder</h2>
                <label htmlFor="folder-name">enter folder name</label>
                <input name="folder-name" type="text" ref={this.nameInput} onChange={e => this.updateName(e.target.value)}></input>
                <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name} />

                <label htmlFor="folder-id">enter folder id</label>
                <input name="folder-id" type="number" ref={this.numberInput} onChange={e => this.updateId(e.target.value)}></input>
                <ValidationError hasError={!this.state.idValid} message={this.state.validationMessages.id} />
                <button type="submit">Submit</button>
            
            </form>
            
        )
    }
}

export default AddFolder

