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
import Footer from '../components/footer.jsx'

import qs from 'querystring'
import moment from 'moment'
import axios from 'axios'
import swal from 'sweetalert'
import FormData from 'form-data'

import { connect } from 'react-redux'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      data: [],
    }
    this.genre = ''
    this.books = React.createRef()
  }

  getRoles = (_roles) => {
    const roles = _roles === 'admin' ? true : false
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
      this.books.current.getBook(this.state.param)
    }
  }

  fetchSearchbyGenre = (genre) => {
    this.books.current.getBookByGenre(genre)
  }

  fetchCarousel = async () => {
    const token = JSON.parse(sessionStorage.getItem('token')).token
    const { REACT_APP_URL } = process.env
    const url = `${REACT_APP_URL}books`
    const results = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const { data } = results.data
    this.setState({ data })
  }

  async componentDidMount() {
    await this.fetchCarousel()
      .catch(error => {
        if (this.state.data.length < 1) {
          localStorage.removeItem('rememberMe')
          localStorage.removeItem('token')
          sessionStorage.removeItem('token')
          this.props.history.push('/')
        }
      })
  }


  render() {
    const { param, showSidebar, addBook, data } = this.state
    const { isAdmin, userData } = this.props.auth
    const { loanedBooks } = this.props.loans
    return (
      <>
        <Row className='d-flex flex-row w-100 no-gutters'>
          {showSidebar && <SideBar
            getSideBar={showSidebar}
            getUser={userData}
            getLoanData={loanedBooks.length}
            isAdmin={isAdmin}
            showBook={() => this.props.history.push('/home')}
            goToLoans={() => this.props.history.push('/loan')}
            loan={this.showLoans.bind(this)}
            hideSidebar={this.showSidebar.bind(this)}
            addBookModal={this.addBookModal.bind(this)}
            logout={this.logout.bind(this)} />
          }
          <Col className='content d-flex flex-column ' >
            <Col className='shadow navbar relative d-flex w-100 bg-white justify-content-between shadow align-items-center pl-3 px-4' >
              {!showSidebar ? <div className="d-flex justify-content-end my-3 px-5">
                <img src={Control} onClick={() => this.setState({ showSidebar: !this.state.showSidebar })} alt="control" />
              </div> : <div className='d-flex justify-content-end my-3 px-5'>
                  <img src={Control} alt="control" />
                </div>}

              <div className="d-flex  flex-grow-1  justify-content-center">
                <input className="input-search" onKeyDown={(event) => this.fetchSearch(event)} placeholder="Search Book" />
              </div>
              <div className="nav-brand d-flex justify-content-center align-items-center">
                <img className="icon" src={Logo} alt="Logo" />
              </div>

            </Col>
            <Col className=" mantap p-2 " >
              <Container className='mh-25 w-100 mb-3 my-4 ' fluid={true}>
                <Carousel autoPlay={6000} infinite arrows centered slidesPerPage={2}
                  breakpoints={{
                    768: {
                      slidesPerPage: 1,
                    },
                    1024: {
                      slidesPerPage: 1,
                    }
                  }}>
                  {data.map(books => (
                    <div key={books.id} className='w-auto d-flex align-items-end '>
                      <div style={{ zIndex: 2 }} className='h-auto w-auto text-box d-flex position-fixed flex-column text-white ml-2 pl-2 pb-3'>
                        <div style={{ textShadow: '2px 2px 10px black', textTransform: 'uppercase', width: '24rem' }} className='h3 py-1 text-truncate'>{books.title}</div>
                        <div style={{ textShadow: '2px 2px 10px black', textTransform: 'capitalize' }} className='h5 w-100' >{books.author[0]}</div>
                      </div>
                      <img style={{ zIndex: 1, opacity: 0.8 }} className='p-0 shadow' src={books.image} alt='books' />
                    </div>
                  ))}
                </Carousel>
              </Container>
              <div className='w-100 py-3' />
              <Books ref={this.books}
                isAdmin={isAdmin}
                getLocation={this.props.history}
                sendUrl={(param) => this.props.history.push(param)}
                sendGenreUrl={(genre) => this.props.history.push(genre)}
                sendParams={param} />

              <Footer />
            </Col>
          </Col>
        </Row>

        <Modal isOpen={addBook}>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  loans: state.loans,
})

export default connect(mapStateToProps, null)(Home)