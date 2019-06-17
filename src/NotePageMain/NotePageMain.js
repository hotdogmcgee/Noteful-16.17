import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import NoteContext from '../NoteContext';
import NotePageError from '../NotePageError'
import { findNote } from '../notes-helpers'
import propTypes from 'prop-types'
import URLError from '../URLError'

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
    const note = findNote(this.context.notes, noteId)
    console.log(note)

    if (!note) {
      const message='that note does not exist'
      return <URLError message={message}/>
    }
    return (
      
      <section className='NotePageMain'>
        <NotePageError>
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
        </NotePageError>
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

