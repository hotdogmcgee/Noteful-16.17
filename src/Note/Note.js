import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import NoteContext from '../NoteContext'
import propTypes from 'prop-types'
import config from '../config'


class Note extends React.Component {
  static defaultProps = {
    note: {
      content: '',
      id: '',
      note_name: '',
      folder_id: '',
      modified: ''
    }, 
  }

  deleteNote(noteId, callback) {
    fetch(config.NOTES_API_ENDPOINT + `/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application-json'
      }
    })
    //again having trouble with this block, why is it throwing error, uneexpected end of JSON input?
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      //necessary?
      // return res.json()
    })
    .then(data => {
      this.props.history.push('/')
      callback(noteId)
      
      
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <NoteContext.Consumer>
        {(context) => (
        <div className='Note'>
          <h2 className='Note__title'>
            <Link to={`/note/${this.props.id}`}>
              {this.props.note_name}
            </Link>
          </h2>
          <button 
            className='Note__delete' 
            type='button'
            onClick={() => this.deleteNote(this.props.id, context.handleDeleteNote)}
            >
            <FontAwesomeIcon icon='trash-alt' />
            {' '}
            remove
          </button>
          <div className='Note__dates'>
            <div className='Note__dates-modified'>
              Modified
              {' '}
              <span className='Date'>
                {format(this.props.modified, 'Do MMM YYYY')}
              </span>
            </div>
          </div>
        </div>
        )
        }
      </NoteContext.Consumer>
    )
  }
}

Note.propTypes = {
  note: propTypes.shape({
    content: propTypes.string,
    id: propTypes.string,
    modified: propTypes.string
  })
};


export default withRouter(Note)
