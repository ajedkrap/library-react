import React, { Component } from 'react'
import {
  Row, Col,
  Button, Label, Input,
  Form, FormGroup, FormText,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Navbar, NavItem, Badge
} from 'reactstrap'
import { Link } from 'react-router-dom'

import Moment from 'react-moment'

import moment from 'moment'
import axios from 'axios'
import swal from 'sweetalert'

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editBook: false,
      deleteBook: false,
      id: props.match.params.id,
      title: props.location.state.title,
      description: props.location.state.description,
      status: props.location.state.status,
      author: props.location.state.author.split(','),
      genre: props.location.state.genre.split(','),
      image: props.location.state.image,
      release_date: props.location.state.release_date,
      isLoading: false,
      isAdmin: props.location.state.isAdmin,
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
    const url = `${REACT_APP_URL}books/${this.state.id}`
    await axios.patch(url, data)
      .then(
        response => {
          console.log(response)
          this.setState({ editBook: !this.state.editBook })
          swal({
            icon: 'success',
            title: 'Success',
            text: 'Book edited'
          })
        }
      ).catch((error) => {
        console.log(error)
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
          const url = `${REACT_APP_URL}books/${this.state.id}`
          await axios.delete(url)
          this.props.history.push('/home')
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          })
        } else {
          swal("Your imaginary file is safe!")
        }
      })
  }

  render() {
    return (
      <>
        <Row className='d-flex flex-column mantap w-100 h-100 no-gutters'>
          <Col className=' d-flex w-100 mh-50 book-bg no-gutters shadow' style={{ backgroundImage: `url(${this.state.image})` }}>
            <Row className="lighten w-100 no-gutters">
              <Navbar className='d-flex justify-content-between m-2 floating w-100'>
                <NavItem>
                  <Button className='border rounded-circle bg-white' color="black" onClick={() => this.props.history.goBack()}>
                    Back
              </Button>
                </NavItem>
                {this.state.isAdmin && (
                  <NavItem className='mr-2'>
                    <Button onClick={this.editBookModal} className='h2 ml-2'>Edit</Button>
                    <Button onClick={this.deleteBook} className='h2 ml-2'>Delete</Button>
                  </NavItem>
                )}
                {!this.state.isAdmin && (
                  <div></div>
                )}
              </Navbar>
            </Row>
          </Col>
          <Col className="d-flex w-100 justify-content-end cover no-gutters">
            <img className='shadow h-100' src={this.state.image} alt="cover" />
          </Col>
          <Col className='d-flex w-100 no-gutters '>
            <Col className='d-flex flex-column p-4' >
              <div className='d-flex justify-content-between' >
                <div className='d-flex flex-row justify-content-center text-center mb-2'>
                  {this.state.genre.map(genre => (
                    <Badge className="badge badge-pill mr-2 badge-warning text-white">
                      <div className="h5 p-1">
                        {genre}
                      </div>
                    </Badge>
                  ))}
                </div>
                <div className="text-success h5"> {this.state.status} </div>
              </div>
              <div className="h1"> {this.state.title} </div>
              <div className="h4 mb-3">
                <Moment format="DD MMMM YYYY">
                  {this.state.release_date}
                </Moment>
              </div>
              <div className='d-flex  mt-3'>
                {this.state.author.map((author, index, array) => {
                  return index === array.length - 1 ? <div className=" mr-1 h6 author"> {author} </div> : <div className=" mr-1 h6 author"> {author} |</div>
                })}
              </div>

              <div className=''> {this.state.description} </div>
            </Col>
            {!this.state.isAdmin && (<Col className='d-flex flex-column py-5 justify-content-end align-items-center'>
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
                    release_date: this.state.release_date,
                    status: this.state.status
                  }
                }
              }}>
                <Button className='border-0 w-100 bg-warning text-white'>
                  <h3 className='p-2'>Borrow</h3>
                </Button>
              </Link>
            </Col>)}
          </Col>
        </Row>

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

export default Details