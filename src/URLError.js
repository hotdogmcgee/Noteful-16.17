import React from 'react'

export default class URLError extends React.Component {

  render() {
      return (
        <h2 className="error">{this.props.message}</h2>
      );
  } 
}