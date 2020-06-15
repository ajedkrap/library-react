import React, { Component } from 'react'
import {
  Row, Col, Container,
  Button, Label, Input,
  Form, FormGroup, FormText,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';


import Control from '../assets/control.png'
import Logo from '../assets/e-Library.png'

import Books from '../components/books.jsx'
import SideBar from '../components/sidebar.jsx'

import qs from 'querystring'
import moment from 'moment'
import axios from 'axios'
import swal from 'sweetalert'
import FormData from 'form-data'

class Home extends Component {
  constructor(props) {
    super(props)
    this.checkToken = () => {
      if (!localStorage.getItem('token')) {
        alert('You must login first')
        props.history.push('/')
      }
      else {
        props.history.push('/home')
      }
    }
    const userData = JSON.parse(localStorage.getItem('myData'))
    this.state = {
      isAdmin: this.getRoles(userData.roles),
      showSidebar: false,
      addBook: false,
      isLoading: false,
      param: qs.parse(this.props.location.search.slice(1)),
      search: '',
      image: null,
      title: '',
      description: '',
      genre: '',
      author: '',
      release_date: '',
      userData,
      data: []
    }
    this.books = React.createRef()
  }

  getRoles = (_roles) => {
    const roles = _roles === 1 ? true : false
    return roles
  }

  showSidebar = (state) => {
    this.setState(state)
  }

  showBook = (state) => {
    this.setState(state)
  }

  showLoans = (state) => {
    this.setState(state)
  }

  addBookModal = (state) => {
    this.setState(state)
  }

  logout = (uri) => {
    swal("You've Logged Out")
    this.props.history.push(uri)
  }

  addBook = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('image', this.state.image, this.state.image.name)
    data.append('description', this.state.description)
    data.append('title', this.state.title)
    data.append('genre', this.state.genre)
    data.append('author', this.state.author)
    data.append('releaseDate', moment(this.state.release_date, 'YYYY-MM-DD').format('DD-MM-YYYY'))
    const { REACT_APP_URL } = process.env
    const url = `${REACT_APP_URL}books`
    await axios.post(url, data)
      .then(
        response => {
          console.log(response)
          this.setState({ showSidebar: false, addBook: false })
          swal({
            icon: 'success',
            title: 'Success',
            text: `${response.data.data.title} added`
          })
        }
      ).catch((error) => {
        console.log(error)
        swal({
          icon: 'error',
          title: 'haha!',
          text: `${error}`
        })
      })
  }

  fetchSearch = (event) => {
    if (event.keyCode === 13) {
      const searchParam = Object.assign(this.state.param, qs.parse(`search=${event.target.value}`))
      this.setState({ param: searchParam })
      this.books.current.fetchData(this.state.param)
    }
  }

  async componentDidMount() {
    this.checkToken()
    const results = await axios.get('http://localhost:8080/books')
    const { data } = results.data
    this.setState({ data })
  }

  render() {
    const params = this.state.param
    return (
      <>
        <Row className='d-flex mantap flex-row w-100 h-100 no-gutters'>
          {this.state.showSidebar && <SideBar getUser={this.state.userData} isAdmin={this.state.isAdmin} book={this.showBook.bind(this)} loan={this.showLoans.bind(this)} hideSidebar={this.showSidebar.bind(this)} addBookModal={this.addBookModal.bind(this)} logout={this.logout.bind(this)} />}
          <Col className='content d-flex flex-grow-1 flex-column' >
            <Col className='navbar relative d-flex w-100 bg-white justify-content-between shadow align-items-center pl-3 px-4' >
              {!this.state.showSidebar ? <div className="d-flex justify-content-end my-3 px-5">
                <img src={Control} onClick={() => this.setState({ showSidebar: !this.state.showSidebar })} alt="control" />
              </div> : <div className='h-100 px-5'></div>}
              <div className="nav-brand d-flex flex-grow-1 justify-content-center align-items-center">
                <img className="icon" src={Logo} alt="Logo" />
              </div>
              <div className="d-flex  justify-content-center">
                <input className="input-search" onKeyDown={(event) => this.fetchSearch(event)} placeholder="Search Book" />
              </div>

            </Col>
            <Col className=" p-4 " >
              <Container className='h-25 w-100 mb-3' fluid={true}>
                <Carousel autoPlay={5000} animationSpeed={4000} infinite arrows centered slidesPerPage={2}>
                  {this.state.data.map(books => (
                    <img src={books.image} alt={books.title} />
                  ))}
                </Carousel>
              </Container>
              <Container fluid={true}>
                <Books ref={this.books} isAdmin={this.state.isAdmin} sendUrl={(param) => (this.props.history.push(param))} sendParams={params} />
              </Container>
            </Col>
          </Col>
        </Row>

        <Modal isOpen={this.state.addBook}>
          <ModalHeader>
            <p>Add Book</p>
            <Button color="secondary" onClick={() => this.setState({ addBook: !this.state.addBook, showSidebar: !this.state.showSidebar })}>Cancel</Button>
          </ModalHeader>
          <Form >
            <ModalBody>
              <FormGroup className='d-flex flex-row no-gutters'>
                <Label md="3" for="title">Title</Label>
                <Input md="9" type="text" onChange={(event) => { this.setState({ title: event.target.value }) }} />
              </FormGroup>
              <FormGroup className='d-flex flex-row no-gutters'>
                <Label md="3" for="description">Description</Label>
                <Input md='9' type="text" onChange={(event) => { this.setState({ description: event.target.value }) }} />
              </FormGroup>
              <FormGroup className='d-flex flex-row no-gutters'>
                <Label md="3" for="genre">Genre</Label>
                <div md="9" className='d-flex flex-column'>
                  <Input type="text" onChange={(event) => { this.setState({ genre: event.target.value }) }} />
                  <FormText>
                    If multiple, separated by comma. (e.g. Action, Fantasy, Novel)
                  </FormText>
                </div>
              </FormGroup>
              <FormGroup className='d-flex flex-row no-gutters'>
                <Label md="3" for="author">Author</Label>
                <div md="9" className='d-flex flex-column'>
                  <Input type="text" onChange={(event) => { this.setState({ author: event.target.value }) }} />
                  <FormText>
                    If multiple, separated by comma. (e.g. jk rowling, pidi baiq, raditya dika)
                  </FormText>
                </div>
              </FormGroup>
              <FormGroup className='d-flex flex-row no-gutters'>
                <Label md="3" for="release-date">Release Date</Label>
                <Input md="9" type="date" onChange={(event) => { this.setState({ release_date: event.target.value }) }} />
              </FormGroup>
              <FormGroup className='d-flex flex-row no-gutters'>
                <Label md="3" for="image">Image</Label>
                <Input md="9" type="file" accept="image/png, image/jpeg, image/jpg, image/gif" onChange={(event) => { this.setState({ image: event.target.files[0] }) }} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type='submit' onClick={this.addBook} color="secondary">Submit</Button>
            </ModalFooter>
          </Form>
        </Modal>

      </>
    )
  }
}

export default Home