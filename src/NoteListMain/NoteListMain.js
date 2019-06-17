import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import { getNotesForFolder } from '../notes-helpers'
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
    const { notes, folders } = this.context
    const {folderId} = this.props.match.params;
    const notesForFolder = getNotesForFolder(notes, folderId)
    if (folderId !== folders.find(folder => folder.id === folderId)) {
     
      console.log(folderId)
      const message='This folder does not exist'
      return <URLError message={message}/>
    } 
    // else {
    //   console.log('false')
    // }
    
  return (
    <section className='NoteListMain'>
      <ul>
        {notesForFolder.map(note =>
          <li key={note.id}>
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
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

