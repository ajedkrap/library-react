import React, { Component } from 'react'
import {
  Col, Badge
} from 'reactstrap'
import { Animated } from 'react-animated-css'

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
    localStorage.removeItem('token')
    localStorage.removeItem('rememberMe')
    sessionStorage.removeItem('token')
    this.props.logout('/')
  }

  render() {
    return (
      <Animated animationIn="slideInLeft" animationOut="slideOutLeft" isVisible={this.props.getSideBar}>
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
              {this.state.isAdmin ?
                <Badge color='success' pill={true} >
                  <h5 className='m-0'>Admin</h5>
                </Badge> :
                <Badge color='info' pill={true}>
                  <h5 className='m-0' >User</h5>
                </Badge>}
            </div>
          </div>
          <Col className='h-50 p-0'>
            {this.state.isAdmin && (
              !this.props.inLoan && (
                <div style={{ borderRadius: '5em' }} className='h5 font-weight-light mt-1 rounded w-100 bg-white p-2 px-4' onClick={this.addBookModal}>+ Add Book</div>
              )
            )}
            <ul className="list-group pt-4 p-0">
              <li className="list-group-item" onClick={() => this.props.showBook()}>
                <div className='list-group-text'>Explore</div>
              </li>
              {!this.state.isAdmin && (this.props.getLoanData ?
                <li className="list-group-item align-items-center" onClick={() => this.props.goToLoans()}>
                  <div className='list-group-text'>Loans</div>
                  <Badge className='ml-4' color='info'>{this.props.getLoanData}</Badge>
                </li> :
                <li className="list-group-item " onClick={() => this.props.goToLoans()}>
                  <div className='list-group-text'>Loans</div>
                </li>
              )}
              {this.state.isAdmin && (

                <li className="list-group-item" onClick={() => this.props.goToLoans()}>
                  <div className='list-group-text'>Loan List</div>
                </li>
              )}
              <li className="list-group-item text-danger" onClick={this.logout.bind(this)}>
                <div className='list-group-text'>Logout</div>
              </li>
            </ul>
          </Col>
        </Col>
      </Animated >
    )
  }
}

export default Sidebar