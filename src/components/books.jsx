
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Row, Col, Container, Badge, Collapse,
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Card, CardImg, CardText, CardBody, CardTitle, CardDeck,
  Spinner, Button
} from 'reactstrap'

import qs from 'querystring'
import axios from 'axios'
require('dotenv').config()


class Books extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      genreData: [],
      options: {},
      param: this.props.sendParams,
      showMoreGenre: false,
      isAdmin: this.props.isAdmin,
      isLoading: false,
      dropdownOpen: false,
      genre: ''
    }
    this.getBook = this.getBook.bind(this);
    this.getGenre = this.getGenre.bind(this)
  }

  dropdownOpen = (e) => {
    e.preventDefault()
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  getBookByGenre = async (genre) => {
    this.setState({ isLoading: true })
    const token = JSON.parse(sessionStorage.getItem('token')).token
    const { REACT_APP_URL } = process.env
    const url = `${REACT_APP_URL}books/${genre}`
    const results = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const { data } = results.data
    this.setState({ data, isLoading: false })
    this.setGenreHeader(genre)
    if (genre !== '') {
      this.props.sendGenreUrl(`/home/${genre}`)
      this.setState({ genre, showMoreGenre: !this.state.showMoreGenre })
    } else {
      this.setState({ genre: '', showMoreGenre: !this.state.showMoreGenre })
    }
  }

  setGenreHeader(genre) {
    const headerList = document.getElementsByClassName('genre-header')[0]
    if (typeof headerList !== 'undefined') {
      const replace = headerList.getAttribute('class').replace('genre', 'genre-header')
      document.getElementsByClassName('genre-header')[0].setAttribute(replace)
    }
    if (genre !== 'header' && genre !== '') {
      const addHeader = document.getElementById(genre).getAttribute('class')
      const setHeader = addHeader.replace('genre', 'genre-header')
      document.getElementById(genre).setAttribute('class', setHeader)
    } else {
      const addHeader = document.getElementById('header').getAttribute('class')
      const setHeader = addHeader.replace('genre', 'genre-header')
      document.getElementById('header').setAttribute('class', setHeader)
    }

  }

  getBook = async (params) => {
    this.setState({ isLoading: true })
    this.props.sendUrl('/home')
    const param = `${qs.stringify(params)}`
    const token = JSON.parse(sessionStorage.getItem('token')).token
    const { REACT_APP_URL } = process.env
    const url = `${REACT_APP_URL}books?${param}`
    const results = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const { data, options } = results.data
    this.setState({ data, options, isLoading: false })
    this.setState({ genre: '', showMoreGenre: false })
    this.setGenreHeader('header')
    if (params) {
      this.props.sendUrl(`?${param}`)
    }
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
    this.setState({ genreData: genreResults.data.data, showMoreGenre: false })
  }

  showMoreGenre() {
    this.setState({ showMoreGenre: !this.state.showMoreGenre })
  }

  async componentDidMount() {
    const params = this.state.param
    await this.getBook(params)
    await this.getGenre()
  }


  render() {
    const params = this.state.param
    params.page = params.page || 1
    params.search = params.search || ''
    params.sort = params.sort || 0
    return (
      <>
        {this.state.isLoading &&
          <div className='d-flex justify-content-center align-items-center'>
            <Spinner style={{ width: '3rem', height: '3rem' }} />
          </div>
        }
        {!this.state.isLoading && (
          <Container className='mt-4' fluid={true}>
            <Row className=' genre-badge  m-0 my-3'>
              {this.state.genreData.map((genres) => (

                <Badge key={genres.id} color='info' className=' m-2 shadow' style={{ textTransform: 'capitalize' }} onClick={() => this.getBookByGenre(genres.genre)} pill={true}>
                  <div className='h5 p-1 m-0 genre-text'> {genres.genre} </div>
                </Badge>

              ))}
            </Row>
            <Row className='m-0 mb-3 no-gutters' >
              <div className='col-lg-3 col-md-12 pr-2 genre-col no-gutters'>
                <div className='mt-5 pt-3 w-100'></div>
                <ul className='text-muted' style={{ listStyleType: 'none' }}>
                  <li id='header' className='h5 genre mb-3' onClick={() => this.getBook()} >All Genre</li>
                  {this.state.genreData.map((genres, index) => {
                    while (index < 6) {
                      return <li key={genres.id} id={genres.genre} className='h5 genre mb-3' style={{ textTransform: 'capitalize' }} onClick={() => this.getBookByGenre(genres.genre)}>{genres.genre}</li>;
                    }
                  })}
                  <Collapse isOpen={this.state.showMoreGenre}>
                    {this.state.genreData.map((genres, index) => {
                      while (index > 6) {
                        return <li key={genres.id} id={genres.genre} className='h5 genre mb-3' style={{ textTransform: 'capitalize' }} onClick={() => this.getBookByGenre(genres.genre)}>{genres.genre}</li>;
                      }
                    })}
                  </Collapse>
                  <li className='h5 genre mb-3' style={{ textTransform: 'capitalize' }} onClick={() => this.showMoreGenre()} >... More Genre</li>
                  <li className='h5 mt-5 text-dark mb-3'>Recent Borrowed Book</li>
                </ul>
              </div>
              <div className='col-lg-9 col-md-12 book-list no-gutters'>
                <div className='d-flex w-100 justify-content-between mx-3'>
                  <h3 style={{ textTransform: 'capitalize' }}>{this.state.genre !== '' ? this.state.genre : 'list book'}</h3>
                  {!this.state.genre && !this.state.genre !== '' && <div className='mr-4 pr-4'>
                    <ButtonDropdown direction='left' isOpen={this.state.dropdownOpen} toggle={this.dropdownOpen}>
                      <DropdownToggle caret>
                        Sort
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem value='0' onClick={(e) => { this.getBook({ ...params, sort: parseInt(e.target.value) }) }}>A to Z</DropdownItem>
                        <DropdownItem value='1' onClick={(e) => { this.getBook({ ...params, sort: parseInt(e.target.value) }) }}>Z to A</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </div>}
                </div>
                <div className='w-100 mt-2'></div>
                <Row className='w-100 m-0 bg-white'>
                  {this.state.data.length !== 0 &&
                    this.state.data.map((book) => (
                      <Col key={book.id} md='6' sm='6' xs='6' className=" p-0">
                        <CardDeck className="p-4">
                          <Card className="shadow">
                            <Link className="text-decoration-none text-color-black" to={{
                              pathname: `/book/${book.id}`,
                              state: {
                                id: `${book.id}`,
                                title: `${book.title}`,
                                description: `${book.description}`,
                                genre: `${book.genre}`,
                                status: `${book.status}`,
                                author: `${book.author}`,
                                image: `${book.image}`,
                                release_date: `${book.release_date}`,
                                isAdmin: this.state.isAdmin
                              }
                            }}>
                              <CardImg top width="100%" src={book.image} alt="Card image cap" />
                              <CardBody>
                                <Row className='p-1 status'>
                                  {book.status === 'Available' && (
                                    <Badge className=" pr-1 text-white" color="success" pill={true}>{book.status}</Badge>
                                  )}
                                  {book.status === 'Not Available' && (
                                    <Badge className="pr-1 text-white" color="success" pill={true}>{book.status}</Badge>
                                  )}
                                </Row>
                                <Row className='p-1 genre'>
                                  {book.genre.map((genre, index) => (
                                    (index < 2) && <Badge key={index} className="mr-1 text-white" color="warning" pill={true}>{genre}</Badge> // eslint-disable-next-line
                                  ))}
                                </Row>
                                <CardTitle className="font-weight-bold text-truncate">{book.title}</CardTitle>
                                <CardText className=" desc text-truncate">{book.description}</CardText>
                              </CardBody>
                            </Link>
                          </Card>
                        </CardDeck>
                      </Col>
                    ))}
                  {this.state.data.length === 0 && (
                    <h1 className="d-flex justify-content-center mt-1">Data is not available!</h1>
                  )}
                </Row>
              </div>
            </Row>
          </Container>
        )}
        {!this.state.genre && !this.state.genre !== '' && (<Row className='mt-5 mb-5'>
          <Col>
            <div className='d-flex flex-row justify-content-around'>
              <div>
                {<Button className="ml-5" onClick={() => this.getBook({ ...params, page: parseInt(params.page) - 1 })}>Prev</Button>}
              </div>
              <div>
                {[...Array(this.state.options.totalPage)].map((o, i) => {
                  return (
                    <Button onClick={() => this.getBook({ ...params, page: params.page ? i + 1 : i + 1 })} className='mr-1 ml-1' key={i.toString()}>{i + 1}</Button>
                  )
                })}
              </div>
              <div>
                {<Button className="mr-5" onClick={() => this.getBook({ ...params, page: parseInt(params.page) + 1 })}>Next</Button>}
              </div>
            </div>
          </Col>
        </Row>)}
      </>
    )
  }
}

export default Books