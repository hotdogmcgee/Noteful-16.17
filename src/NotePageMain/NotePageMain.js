import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import NoteContext from '../NoteContext';
import { findNote } from '../notes-helpers'

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
    const note = findNote(this.context.notes, noteId);
    return (
      <section className='NotePageMain'>
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
      </section>
    )
  }
}

