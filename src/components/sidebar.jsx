import React, { Component } from 'react'
import {
  Row, Col, Badge
} from 'reactstrap'
import { Animated } from 'react-animated-css'

import Profile from '../assets/profile.jpg'
import Control from '../assets/control.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faGlobe, faSignOutAlt, faBookReader, faCog } from '@fortawesome/free-solid-svg-icons'

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

  showBook = (e) => {
    e.preventDefault()
    this.props.showBook({ showSidebar: false })
  }

  logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    localStorage.removeItem('rememberMe')
    sessionStorage.removeItem('token')
    this.props.logout('/')
  }

  componentDidMount() {
    console.log(this.state)
    console.log(this.props)
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
              !this.props.inSetting && (
                <Row style={{ borderRadius: '5em' }} className='no-gutters h4 font-weight-light align-items-center mt-1 rounded w-100 bg-white p-2 px-4' onClick={this.addBookModal}>
                  <div>+ Add Book</div>
                  <FontAwesomeIcon className='ml-3' icon={faBookOpen} />
                </Row>
              )
            )}
            <ul className="list-group pt-4 p-0">
              <li className="list-group-item" onClick={this.showBook}>
                <div className='list-group-text'>
                  <FontAwesomeIcon className='mr-3' icon={faGlobe} />
                  Explore
                  </div>
              </li>
              {!this.state.isAdmin && (this.props.getLoanData ?
                <li className="list-group-item align-items-center" onClick={() => this.props.goToLoans()}>
                  <div className='list-group-text'>
                    <FontAwesomeIcon className='mr-3' icon={faBookReader} />
                    Loans</div>
                  <Badge className='ml-4' color='info'>{this.props.getLoanData}</Badge>
                </li> :
                <li className="list-group-item " onClick={() => this.props.goToLoans()}>
                  <div className='list-group-text'>
                    <FontAwesomeIcon className='mr-3' icon={faBookReader} />
                    Loans</div>
                </li>
              )}
              {this.state.isAdmin && (

                <li className="list-group-item" onClick={() => this.props.goToSetting()}>
                  <FontAwesomeIcon className='mr-3' icon={faCog} />
                  <div className='list-group-text'>Config</div>
                </li>
              )}
              <li className="list-group-item text-danger" onClick={this.logout.bind(this)}>
                <div className='list-group-text'>
                  <FontAwesomeIcon className='mr-3' icon={faSignOutAlt} />
                  Logout
                  </div>
              </li>
            </ul>
          </Col>
        </Col>
      </Animated >
    )
  }
}

export default Sidebar