import React, { Component } from 'react'
import {
  Row, Col, Container, Spinner,
  Button, Label, Input, CustomInput,
  Form, FormGroup, FormText,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'


import Carousel from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import Select from 'react-select/creatable'

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
import { getBook } from '../redux/actions/books'
import { getGenre } from '../redux/actions/genre'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSidebar: false,
      addBook: false,
      isLoading: false,
      param: qs.parse(this.props.location.search.slice(1)),
      search: '',
      genreData: [],
    }
    this.book = {
      image: null,
      title: '',
      description: '',
      genre: '',
      author: '',
      release_date: '',

    }

    this.genre = ''
    this.books = React.createRef()

  }

  // handlerChange = (e, key) => {
  //   switch (key) {
  //     case 'image': {
  //       return this.book[key] = e.target.files[0]
  //     }
  //     case 'release_date': {
  //       return this.book[key] = moment(e.target.value, 'YYYY-MM-DD').format('DD-MM-YYYY')
  //     }
  //     default:
  //       return this.book[key] = e.target.value
  //   }
  // }

  showSidebar = (state) => {
    this.setState(state)
  }

  showBook = (state) => {
    this.setState(state)
  }


  addBookModal = (state) => {
    this.setState(state)
  }

  showBook = (state) => {
    this.setState(state)
    this.props.history.push('/home')
  }

  logout = (uri) => {
    swal("You've Logged Out")
    this.props.history.push(uri)
  }

  handleGenreChange = (value) => {
    if (value === null) {
      value = []
    }
    const newValue = value.map(value => value.value).join(',')
    this.book.genre = newValue
  }

  handleChange = (e, key) => {
    if (key === 'image') {
      this.book[key] = e.target.files[0]
    }
    else if (key === 'release_date') {
      this.book[key] = moment(e.target.value, 'YYYY-MM-DD').format('DD MM YYYY')
    }
    else {
      this.book[key] = e.target.value
    }
  }

  addBook = (e) => {
    e.preventDefault()
    const { image, description, title, genre, author, release_date } = this.book
    console.log(this.book)
    const data = new FormData()
    data.append('image', image, image.name)
    data.append('description', description)
    data.append('title', title)
    data.append('genre', genre)
    data.append('author', author)
    data.append('releaseDate', release_date)
    // const { REACT_APP_URL } = process.env
    // const url = `${REACT_APP_URL}books`
    // await axios.post(url, data)
    //   .then(
    //     response => {
    //       console.log(response)
    //       this.setState({ showSidebar: false, addBook: false })
    //       swal({
    //         icon: 'success',
    //         title: 'Success',
    //         text: `${response.data.data.title} added`
    //       })
    //     }
    //   ).catch((error) => {
    //     console.log(error)
    //     swal({
    //       icon: 'error',
    //       title: 'haha!',
    //       text: `${error}`
    //     })
    //   })
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


  getGenre = async () => {
    const token = JSON.parse(sessionStorage.getItem('token')).token
    const { REACT_APP_URL } = process.env
    const genreUrl = `${REACT_APP_URL}genre`
    const genreResults = await axios.get(genreUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const genreData = genreResults.data.data.map(genres => genres.genre)
    this.setState({ genreData })
  }

  componentDidMount() {
    const token = JSON.parse(sessionStorage.getItem('token')).token
    this.props.getGenre(token)
    this.props.getBook(token)
    // .catch(error => {
    //   if (this.state.data.length < 1) {
    //     localStorage.removeItem('rememberMe')
    //     localStorage.removeItem('token')
    //     sessionStorage.removeItem('token')
    //     this.props.history.push('/')
    //   }
    // })

  }

  componentDidUpdate() {
    console.log(this.props)
    console.log(this.state)
  }

  render() {

    const { param, showSidebar, addBook, } = this.state
    const { isAdmin, userData } = this.props.auth
    const { loanedBooks } = this.props.loans
    const { genres } = this.props.genre
    const { bookData } = this.props.books
    let getGenres = []
    if (typeof genres !== 'undefined') {
      getGenres = genres.map(genre => ({ value: genre, label: genre }))
    }
    return (
      <>
        <Row className='d-flex flex-row w-100 no-gutters'>
          {showSidebar && <SideBar
            getSideBar={showSidebar}
            getUser={userData}
            getLoanData={loanedBooks.length}
            isAdmin={isAdmin}
            showBook={this.showBook.bind(this)}
            goToLoans={() => this.props.history.push('/loan')}
            goToSetting={() => this.props.history.push('/setting')}
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
                {typeof bookData === 'undefined' &&
                  <div className='w-100 d-flex justify-content-center'>
                    <Spinner color="primary" />
                  </div>
                }
                {typeof bookData !== 'undefined' && (
                  <Carousel autoPlay={6000} infinite arrows centered slidesPerPage={2}
                    breakpoints={{
                      768: {
                        slidesPerPage: 1,
                      },
                      1024: {
                        slidesPerPage: 1,
                      }
                    }}>

                    {bookData.length !== 0 && bookData.map(books => (
                      <div key={books.id} className='w-auto d-flex align-items-end '>
                        <div style={{ zIndex: 2 }} className='h-auto w-auto text-box d-flex position-fixed flex-column text-white ml-2 pl-2 pb-3'>
                          <div style={{ textShadow: '2px 2px 10px black', textTransform: 'uppercase', width: '24rem' }} className='h3 py-1 text-truncate'>{books.title}</div>
                          <div style={{ textShadow: '2px 2px 10px black', textTransform: 'capitalize' }} className='h5 w-100' >{books.author[0]}</div>
                        </div>
                        <img style={{ zIndex: 1, opacity: 0.8 }} className='p-0 shadow' src={books.image} alt='books' />
                      </div>
                    ))}

                  </Carousel>)}
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
                <Input md="9" type="text" onChange={(e) => this.handleChange(e, 'title')} />
              </FormGroup>
              <FormGroup className='d-flex flex-row no-gutters'>
                <Label md="3" for="description">Description</Label>
                <Input col='5' md='9' type="textarea" onChange={(e) => this.handleChange(e, 'description')} />
              </FormGroup>
              <FormGroup className='d-flex flex-row no-gutters'>
                <Label md="3" for="genre">Genre</Label>
                <Select
                  md='9'
                  className='w-100'
                  isMulti
                  options={getGenres}
                  onChange={this.handleGenreChange} />
              </FormGroup>
              <FormGroup className='d-flex flex-row no-gutters'>
                <Label md="3" for="author">Author</Label>
                <div md="9" className='d-flex flex-column'>
                  <Input type="text" onChange={(e) => this.handleChange(e, 'author')} />
                  <FormText>
                    If multiple, separated by comma. (e.g. jk rowling, pidi baiq, raditya dika)
                  </FormText>
                </div>
              </FormGroup>
              <FormGroup className='d-flex flex-row no-gutters'>
                <Label md="3" for="release-date">Release Date</Label>
                <Input md="9" type="date" onChange={(e) => this.handleChange(e, 'release_date')} />
              </FormGroup>
              <FormGroup className='d-flex flex-row no-gutters'>
                <Label md="3" for="image">Image</Label>
                <CustomInput Input md="9" type="file" accept="image/png, image/jpeg, image/jpg, image/gif"
                  onChange={(e) => this.handleChange(e, 'image')} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type='submit' color='info' onClick={this.addBook} >Submit</Button>
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
  genre: state.genre,
  books: state.books
})

const mapDispatchToProps = { getBook, getGenre }

export default connect(mapStateToProps, mapDispatchToProps)(Home)