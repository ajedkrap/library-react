import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Terms extends Component {
  render() {
    return (
      <>
        <span>
          <Link to='/'>Back to Login</Link>
          <br />Terms and Condition page
        </span>
      </>
    )
  }
}

export default Terms