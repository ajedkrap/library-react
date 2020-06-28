import React, { Component } from 'react'
import {
  Row, Col,
  Button, Label, Input,
  Form, FormGroup, FormText,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Navbar, NavItem, Badge
} from 'reactstrap'

import Footer from '../components/footer'

import Moment from 'react-moment'

import moment from 'moment'
import axios from 'axios'
import swal from 'sweetalert'

import { connect } from 'react-redux'
import { addLoanedBook } from '../redux/actions/loans'

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editBook: false,
      deleteBook: false,
      isLoading: false,
      isAdmin: props.location.state.isAdmin,
    }
    this.book = {
      id: '',
      title: '',
      description: '',
      image: null,
      genre: '',
      author: '',
      release_date: '',
    }
    this.data = {
      title: '',
      description: '',
      image: null,
      genre: '',
      author: '',
      release_date: '',
    }
    this.editBookModal = this.editBookModal.bind(this)
  }

  editBookModal = () => {
    this.data = {}
    this.setState({ editBook: !this.state.editBook })
  }

  editBook = async (e) => {
    e.preventDefault()
    const token = JSON.parse(sessionStorage.getItem('token')).token
    const data = new FormData()
    for (const key in this.data) {
      if (key === 'image') {
        data.append(key, this.data[key], this.data[key].image)
      }
      else if (key === 'release_date') {
        data.append(key, moment(this.data[key], 'YYYY-MM-DD').format('DD-MM-YYYY'))
      }
      else {
        data.append(key, this.data[key])
      }
    }
    const { REACT_APP_URL } = process.env
    const url = `${REACT_APP_URL}books/${this.books.id}`
    await axios.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(
        response => {
          this.setState({ editBook: !this.state.editBook })
          swal({
            icon: 'success',
            title: 'Success',
            text: 'Book edited'
          })
        }
      ).catch((error) => {
        swal({
          icon: 'error',
          title: 'haha!',
          text: "Error"
        })
      })
  }

  deleteBook = (e) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          const { REACT_APP_URL } = process.env
          const token = JSON.parse(sessionStorage.getItem('token')).token
          const url = `${REACT_APP_URL}books/${this.book.id}`
          await axios.delete(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          this.props.history.push('/home')
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          })
        } else {
          swal("Your imaginary file is safe!")
        }
      })
  }

  borrowBook(data) {
    if (this.props.loans.isSelecting) {
      this.props.addLoanedBook(data)
    }
    this.props.history.push('/home')
    swal({
      icon: 'success',
      title: 'Book added to Loan',
      text: `${this.book.title}`
    })
  }

  render() {
    this.book = this.props.location.state
    const { isAdmin } = this.props.auth
    const genre = this.book.genre.split(',')
    const author = this.book.author.split(',')
    return (
      <>
        <div className='floating w-100'>
          <Navbar className='d-flex  justify-content-between m-2 w-100'>
            <NavItem>
              <Button className='border rounded-circle bg-white' color="black" onClick={() => this.props.history.goBack()}>
                Back
                </Button>
            </NavItem>
            {isAdmin && (
              <NavItem className='mr-2'>
                <Button onClick={this.editBookModal} className='h2 ml-2'>Edit</Button>
                <Button onClick={this.deleteBook} className='h2 ml-2'>Delete</Button>
              </NavItem>
            )}
            {!isAdmin && (
              <div></div>
            )}
          </Navbar>
        </div>
        <div className=' w-100 h-100 no-gutters' style={{ zIndex: 1 }}>
          <Row className='d-flex flex-column mantap w-100 h-100 no-gutters'>
            <Col className=' d-flex w-100 h-25 book-bg no-gutters shadow' style={{ backgroundImage: `url(${this.book.image})` }}>
              <Row className="lighten w-100 no-gutters">
              </Row>
            </Col>
            <Col className="d-flex w-100 cover  no-gutters">
              <img className='shadow h-100' src={this.book.image} alt="cover" />
            </Col>
            <Row className='d-flex w-100 no-gutters book-detail pb-3'>
              <Col lg={9} md={12} className='d-flex flex-column p-4' >
                <div className='d-flex justify-content-between' >
                  <div className='d-flex flex-row justify-content-center text-center mb-2'>
                    {genre.map(genre => (
                      <Badge className="badge badge-pill mr-2 badge-warning text-white">
                        <div className="h5 m-0 p-1">
                          {genre}
                        </div>
                      </Badge>
                    ))}
                  </div>
                  <div className="text-success h5"> {this.book.status} </div>
                </div>
                <div className="h1"> {this.book.title} </div>
                <div className="h4 mb-3">
                  <Moment format="DD MMMM YYYY">
                    {this.book.release_date}
                  </Moment>
                </div>
                <div className='d-flex  mt-3'>
                  {author.map((author, index, array) => {
                    return index === array.length - 1 ? <div className=" mr-1 h4 author"> {author} </div> : <div className=" mr-1 h4 author"> {author} |</div>
                  })}
                </div>

                <div className='h4 font-weight-light text-justify'> {this.book.description} </div>
              </Col>
              {!isAdmin && (<Col lg={3} md={12} className='d-flex flex-column py-5 justify-content-end align-items-center'>
                <Button onClick={() => this.borrowBook(this.book)} className='border-0 w-75 bg-info text-white'>
                  <h3 className='p-2 px-4'>Borrow</h3>
                </Button>
              </Col>)}

              <div classname='mantap w-100 my-4'></div>
            </Row>
          </Row>
          <Footer />
        </div>

        <Modal isOpen={this.state.editBook}>
          <ModalHeader>
            <p>Edit Book</p>
            <Button color="secondary" onClick={() => this.setState({ editBook: !this.state.editBook })}>Cancel</Button>
          </ModalHeader>
          <Form  >
            <ModalBody>
              <FormGroup className='d-flex flex-row no-gutters'>
                <Label md="3" for="title">Title</Label>
                <Input md="9" type="text" onChange={(event) => (this.data.title = event.target.value)} />
              </FormGroup>
              <FormGroup className='d-flex flex-row no-gutters'>
                <Label md="3" for="description">Description</Label>
                <Input md='9' type="text" onChange={(event) => (this.data.description = event.target.value)} />
              </FormGroup>
              <FormGroup className='d-flex flex-row no-gutters'>
                <Label md="3" for="genre">Genre</Label>
                <div md="9" className='d-flex flex-column'>
                  <Input type="text" onChange={(event) => (this.data.genre = event.target.value)} />
                  <FormText>
                    If multiple, separated by comma. (e.g. Action, Fantasy, Novel)
                  </FormText>
                </div>
              </FormGroup>
              <FormGroup className='d-flex flex-row no-gutters'>
                <Label md="3" for="author">Author</Label>
                <div md="9" className='d-flex flex-column'>
                  <Input type="text" onChange={(event) => (this.data.author = event.target.value)} />
                  <FormText>
                    If multiple, separated by comma. (e.g. jk rowling, pidi baiq, raditya dika)
                  </FormText>
                </div>
              </FormGroup>
              <FormGroup className='d-flex flex-row no-gutters'>
                <Label md="3" for="release-date">Release Date</Label>
                <Input md="9" type="date" onChange={(event) => (this.data['release_date'] = event.target.value)} />
              </FormGroup>
              <FormGroup className='d-flex flex-row no-gutters'>
                <Label md="3" for="image">Image</Label>
                <Input md="9" type="file" accept="image/png, image/jpeg, image/jpg, image/gif" onChange={(event) => (this.data.image = event.target.files[0])} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>

              <Button onClick={this.editBook} type='submit' color="secondary">Submit</Button>

            </ModalFooter>
          </Form>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  loans: state.loans
})

const mapDispatchToProps = { addLoanedBook }

export default connect(mapStateToProps, mapDispatchToProps)(Details)