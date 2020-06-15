import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

import logo from '../assets/e-Library.png'

import swal from 'sweetalert'
import qs from 'querystring'
import axios from 'axios'
require('dotenv').config()


class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      isAdmin: false,
      data: {}
    }
  }

  signUp = async (event) => {
    event.preventDefault()
    const signUpData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      roles: this.state.isAdmin
    }
    const signUp = qs.stringify(signUpData)
    const { REACT_APP_URL } = process.env
    const url = `${REACT_APP_URL}auth/signup`
    await axios.post(url, signUp, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      console.log(response)
      swal({
        icon: 'success',
        title: `Welcome, ${response.data.message} `,
        text: `${response.data.data.email}, ${this.state.isAdmin ? 'admin' : 'user'}`
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
              <div className='flex-grow-1 d-flex py-5  justify-content-center align-items-center w-100 mt-n5'>
                <Form className=" w-75" onSubmit={this.signUp}>
                  <div className="mb-5 no-gutters">
                    <h1 className='font-weight-bolder display-4'>Sign Up</h1>
                    <Col className='no-gutters col-7' >Welcome Back, Please Sign Up to your account</Col>
                  </div>
                  <div className="shadow d-flex flex-column m-2 mb-4 input-form">
                    <FormGroup>
                      <Label className='w-100'>
                        <div>Username</div>
                        <Input type='text' onChange={event => this.setState({ username: event.target.value })} />
                      </Label>
                    </FormGroup>
                    <FormGroup>
                      <Label className='w-100'>
                        <div>Email Address</div>
                        <Input type='email' onChange={event => this.setState({ email: event.target.value })} />
                      </Label>
                    </FormGroup>
                    <FormGroup>
                      <Label className='w-100'>
                        <div>Password</div>
                        <Input type='password' onChange={event => this.setState({ password: event.target.value })} />
                      </Label>
                    </FormGroup>
                  </div>
                  <FormGroup check>
                    <Label check className='mb-4 mt-2'>
                      <Input type='checkbox' onClick={event => this.setState({ isAdmin: !this.state.isAdmin })} />
                      <span className='text-muted'>as Admin</span>
                    </Label>
                  </FormGroup>
                  <div className='button p-0 d-flex'>
                    <Button className="text-white border-white left text-wrap" type='submit'>Sign Up</Button>
                    <Link className='text-decoration-none' to='/'>
                      <Button className="text-muted border-muted right text-wrap">Login</Button>
                    </Link>
                  </div>
                </Form>
              </div>
              <div className='d-flex flex-column px-5 pb-3'>
                <div className='text-muted'>By signing up, you agree to Book’s</div>
                <div className='text-muted'>
                  <Link className='text-decoration-none text-dark' to='/terms'>Terms and Conditions</Link>
                  &nbsp;&amp;&nbsp;
                   <Link className='text-decoration-none text-dark' to='/privacy'>Privacy Policy</Link ></div>
              </div>
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

export default SignUp