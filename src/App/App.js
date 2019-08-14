import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import NoteContext from '../NoteContext'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import './App.css';
import PageNotFound from '../PageNotFound';
import config from '../config'

class App extends Component {
    state = {
        notes: [],
        folders: [],
        error: null
    };

    setFolders = folders => {
        this.setState({
            folders
        })
    }

    setNotes = notes => {
        this.setState({
            notes
        })
    }
    
    handleDeleteNote = noteId => {
        const newNotes = this.state.notes.filter(item => 
            noteId !== item.id)

        this.setState({
            notes: newNotes
        })
        
    }

    handleAddFolder = folder => {
        console.log('Folder added:', folder.folder_name)
        
        const newFolders = [...this.state.folders, folder];
        this.setState({
            folders: newFolders
        })
    }

    handleAddNote = note => {
        const newNotes = [...this.state.notes, note];
        this.setState({
            notes: newNotes
        })
    }

    componentDidMount() {
        // const foldersENDPOINT = "http://localhost:9090/folders"
        // const notesENDPOINT = "http://localhost:9090/notes"

        //FOLDERS API FETCH
        fetch(config.FOLDERS_API_ENDPOINT, {
            method: 'GET',
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
        .then(this.setFolders)
        .catch(error => this.setState({ error }))

        // NOTES API FETCH
        fetch(config.NOTES_API_ENDPOINT, {
            method: 'GET',
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
        .then(this.setNotes)
        .catch(error => this.setState({ error }))
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact key={path} path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav}/>
                <Route path="/add-folder" component={NoteListNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                <Switch>
                {['/', '/folder/:folderId'].map(path => (
                    
                    <Route
                        exact key={path} path={path}
                        component={NoteListMain}        
                    />
                ))}

                <Route
                    path="/note/:noteId"
                    component={NotePageMain}
                />
                <Route 
                    path='/add-folder'
                    component={AddFolder}
                />
                <Route 
                    path='/add-note'
                    component={AddNote}
                />
                <Route component={PageNotFound} />
                </Switch>

            </>
        );
    }

    render() {
        const contextValue = {
            notes: this.state.notes,
            folders: this.state.folders,
            handleDeleteNote: this.handleDeleteNote,
            handleAddFolder: this.handleAddFolder,
            handleAddNote: this.handleAddNote
        }
        return (
            <div className="App">
                <NoteContext.Provider value={contextValue} >
                    
                        <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    
                    <main className="App__main">{this.renderMainRoutes()}</main>
                    
                </NoteContext.Provider>
            </div>
        );
    }
}

export default App;
