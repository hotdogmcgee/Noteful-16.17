import React from 'react'
import './CircleButton.css'
import propTypes from 'prop-types'

export default function NavCircleButton(props) {
  const { tag, className, children, ...otherProps } = props

  //maybe I should refactor this with JSX

  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavCircleButton.defaultProps ={
  tag: 'a',
}

NavCircleButton.propTypes = {
    className: propTypes.string,
    children: propTypes.array
}

