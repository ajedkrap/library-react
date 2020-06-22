import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

import logo from '../assets/e-Library.png'

import swal from 'sweetalert'
import qs from 'querystring'
import axios from 'axios'
require('dotenv').config()

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      isAdmin: false,
    }
  }


  login = async (event) => {
    event.preventDefault()
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    const data = qs.stringify(user)
    const { REACT_APP_URL } = process.env
    const url = `${REACT_APP_URL}auth/login`
    await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      console.log(response)
      localStorage.setItem('rememberMe', this.state.rememberMe);
      localStorage.setItem('token', this.state.rememberMe ? JSON.stringify(response.data.data) : '');
      sessionStorage.setItem('token', JSON.stringify(response.data.data))
      this.props.history.push('/home')
      swal({
        icon: 'success',
        title: `Welcome, ${response.data.message} `,
        text: `${response.data.data.email}`
      })
    }).catch((error) => {
      console.log(error)
      swal({
        icon: 'error',
        title: 'Register Failed',
        text: `${error}`
      })
    })
  }


  componentWillMount() {
    const rememberMe = JSON.parse(localStorage.getItem('rememberMe'))
    if (rememberMe) {
      this.props.history.push('/home')
    }
  }

  render() {
    return (
      <>
        <Row className='d-flex w-100 h-100 login no-gutters'>
          <Col md={7} className='library-cover'>
            <div className='library-overlay h-100 w-100 p-0'>
              <div className='d-flex flex-column justify-content-around w-100 h-100 no-gutters' >
                <div className='d-flex justify-content-start bg-white font-weight-bold logo-wrapper align-items-center w-100'>
                  <img className="icon" src={logo} alt="Logo" />
                </div>
                <h1 className='text-white display-3 font-weight-lighter ml-3 pl-4 pt-4 w-50'>"Book is a Dream that you hold in your hands"</h1>
              </div>
            </div>
          </Col>
          <Col md={5}>
            <div className='d-flex login-form flex-column w-100 h-100'>
              <div className='flex-grow-1 d-flex mb-3 py-5 justify-content-center align-items-center w-100 '>
                <Form className='w-75' onSubmit={this.login} >
                  <div className="mb-5 no-gutters">
                    <h1 className='font-weight-bolder display-4'>Login</h1>
                    <Col className='no-gutters col-7' >Welcome Back, Please Login to your account</Col>
                  </div>
                  <div className="shadow d-flex flex-column m-2 mb-4 input-form">
                    <FormGroup>
                      <Label className='w-100'>
                        <div>Email Address</div>
                        <Input type='email' onChange={event => this.setState({ email: event.target.value })} />
                      </Label>
                    </FormGroup>
                    <FormGroup>
                      <Label className='w-100'>
                        <div>Password</div>
                        <Input type='password' className='w-100' id="password" onChange={event => this.setState({ password: event.target.value })} />
                      </Label>
                    </FormGroup>
                  </div>
                  <div className='d-flex flex-row justify-content-start mt-1 mb-4'>
                    <FormGroup check>
                      <Label check>
                        <Input value={!this.state.rememberMe} type='checkbox' onChange={event => this.setState({ rememberMe: event.target.value })} />
                        <span className='text-muted'>Remember Me</span>
                      </Label>
                    </FormGroup>
                  </div>
                  <div className='button p-0 d-flex'>
                    <Button className="text-white border-white left text-wrap" type='submit'>Login</Button>
                    <Link className='text-decoration-none' to='/signup'>
                      <Button className="text-muted border-muted right text-wrap">Sign Up</Button>
                    </Link>
                  </div>
                </Form>
              </div>
              <div className='d-flex flex-column mx-5 pb-3'>
                <div className='text-muted'>By signing up, you agree to Book’s</div>
                <div className='text-muted'>
                  <Link className='text-decoration-none text-dark' to='/terms'>Terms and Conditions</Link>
                  &nbsp;&amp;&nbsp;
                   <Link className='text-decoration-none text-dark' to='/privacy'>Privacy Policy</Link >
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

export default Login