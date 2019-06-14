import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import NoteContext from '../NoteContext';
import NotePageError from '../NotePageError'
import { findNote } from '../notes-helpers'
import propTypes from 'prop-types'

export default class NotePageMain extends React.Component {

  static defaultProps = {
    note: {
    content: '',
    id: '',
    modified: ''
  }, 
  match: {
    params: {}
  }
}

  static contextType = NoteContext

  render() {
    const { noteId } = this.props.match.params;
    //content being undefined is causing problems.  Can't seem to get error boundary to work correctly.
    const note = findNote(this.context.notes, noteId)
    return (
      
      <section className='NotePageMain'>
        {/* <NotePageError> */}
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
        {/* </NotePageError> */}
      </section>
    )
  }
}

NotePageMain.propTypes = {
  note: propTypes.shape({
    content: propTypes.string,
    id: propTypes.string,
    modified: propTypes.string
  }),
  match: propTypes.object
}

