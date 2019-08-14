import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import { getNotesForFolder, findFolder } from '../notes-helpers'
import NoteContext from '../NoteContext';
import propTypes from 'prop-types'
import URLError from '../URLError'

export default class NoteListMain extends React.Component {

  static defaultProps = {
    notes: [],
    match: {
      params: {}
    }
  }

  static contextType = NoteContext

  render() {
    //need state to update properly, new folders have an undefined id until reload
    const { notes, folders } = this.context
    const {folderId} = this.props.match.params;
    const notesForFolder = getNotesForFolder(notes, folderId)
    const newFolder = findFolder(folders, folderId)

    //why did this logic not work? I also tried putting ! around the whole condition.
    // if (folderId !== folders.find(folder => folder.id === folderId)) 
    
//Homepage has an undefined folderId
    if (!newFolder && folderId !== undefined) {
      const message='This folder does not exist'
      return <URLError message={message}/>
    } 

  return (
    <section className='NoteListMain'>
      <ul>
        {notesForFolder.map(note =>
          <li key={note.id}>
            <Note
              id={note.id}
              note_name={note.note_name}
              modified={note.modified}
              folder_id={note.folder_id}
              content={note.content}
            />
          </li>
        )}
      </ul>
      <div className='NoteListMain__button-container'>
        <CircleButton
          tag={Link}
          to='/add-note'
          type='button'
          className='NoteListMain__add-note-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Note
        </CircleButton>
      </div>
    </section>
  )
  }
}

NoteListMain.propTypes = {
  notes: propTypes.array,
  match: propTypes.object
}

