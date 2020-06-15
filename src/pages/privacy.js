import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Privacy extends Component {
  render() {
    return (
      <>
        <span>
          <Link to='/'>Back to Login</Link>
          <br />Privacy page
        </span>
      </>
    )
  }
}

export default Privacy