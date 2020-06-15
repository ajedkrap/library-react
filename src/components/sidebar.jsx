import React, { Component } from 'react'
import {
  Col, Badge
} from 'reactstrap'
import { Link } from 'react-router-dom'

import Profile from '../assets/profile.jpg'
import Control from '../assets/control.png'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdmin: this.props.isAdmin,
      userData: this.props.getUser,
      books: {
        id: '',
        title: '',
        description: '',
        image: null,
        genre: '',
        author: '',
        release_date: '',
        status: ''
      }
    }
  }


  hideSidebar = (e) => {
    e.preventDefault()
    this.props.hideSidebar({ showSidebar: false })
  }

  addBookModal = (e) => {
    e.preventDefault()
    this.props.addBookModal({ addBook: true })
  }

  logout = (e) => {
    e.preventDefault()
    localStorage.clear()
    sessionStorage.clear()
    this.props.logout('/')
  }

  render() {
    return (
      <div className='lighten fade show'>
        <Col md='12' className='sidebar position-fixed d-flex flex-column bg-white h-100 p-0 shadow'>
          <div className="d-flex justify-content-end my-3 px-3">
            <img src={Control} onClick={this.hideSidebar} alt="control" />
          </div>
          <div className="d-flex flex-column my-5 profile justify-content-center align-items-center p-0 h-auto">
            <div className="d-flex justify-content-center align-items-center profile-picture py-2 w-100" >
              <img className="rounded-circle" src={Profile} alt="Profile" />
            </div>
            <div className="mt-1 p-3 h3 font-weight-bold text-center">{this.state.userData.username}</div>
            <div>
              {this.state.isAdmin ? <Badge className='h4' color='success' pill >Admin</Badge> : <Badge className='h4' color='info' pill>User</Badge>}
            </div>
          </div>
          <Col className='h-50'>
            {this.state.isAdmin && (<div className=' mt-3 rounded w-100 bg-white px-2' onClick={this.addBookModal}>+ Add Book</div>)}
            <ul className="list-group pt-4 px-2">
              <Link to='/home'>
                <li className="list-group-item" onClick={this.showBook}>Explore</li>
              </Link>
              {!this.state.isAdmin && (
                <Link to={{
                  pathname: '/loan',
                  state: {
                    book: {
                      id: this.state.id,
                      title: this.state.title,
                      description: this.state.description,
                      image: this.state.image,
                      genre: this.state.genre,
                      author: this.state.author,
                      release_date: this.state.release,
                      status: this.state.status
                    }
                  }
                }}>
                  <li className="list-group-item" onClick={this.showLoans}>Loans</li>
                </Link>
              )}
              {this.state.isAdmin && (
                <Link to={{
                  pathname: '/loan',
                  state: {
                    book: {
                      id: this.state.id,
                      title: this.state.title,
                      description: this.state.description,
                      image: this.state.image,
                      genre: this.state.genre,
                      author: this.state.author,
                      release_date: this.state.release,
                      status: this.state.status
                    }
                  }
                }}>
                  <li className="list-group-item" onClick={this.showLoans}>Loan List</li>
                </Link>
              )}
              <li className="list-group-item text-danger" onClick={this.logout.bind(this)}>Logout</li>
            </ul>
          </Col>
        </Col>
      </div>
    )
  }
}

export default Sidebar