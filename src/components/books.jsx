
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Row, Col, Badge,
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
      options: {},
      param: this.props.sendParams,
      isAdmin: this.props.isAdmin,
      isLoading: false,
      dropdownOpen: false
    }
    this.fetchData = this.fetchData.bind(this);
  }

  dropdownOpen = (e) => {
    e.preventDefault()
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  fetchData = async (params) => {
    this.setState({ isLoading: true })
    const param = `${qs.stringify(params)}`
    const { REACT_APP_URL } = process.env
    const url = `${REACT_APP_URL}books?${param}`
    const results = await axios.get(url)
    const { data, options } = results.data
    this.setState({ data, options, isLoading: false })
    if (params) {
      this.props.sendUrl(`?${param}`)
    }
  }

  async componentDidMount() {
    const params = this.state.param
    await this.fetchData(params)
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
          <Row className="d-flex">
            <div className='d-flex w-100 justify-content-between mb-3'>
              <h3>List Book</h3>
              <div className='mr-4 pr-4'>
                <ButtonDropdown direction='left' isOpen={this.state.dropdownOpen} toggle={this.dropdownOpen}>
                  <DropdownToggle caret>
                    Sort
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem value='0' onClick={(e) => { this.fetchData({ ...params, sort: parseInt(e.target.value) }) }}>A to Z</DropdownItem>
                    <DropdownItem value='1' onClick={(e) => { this.fetchData({ ...params, sort: parseInt(e.target.value) }) }}>Z to A</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
            </div>
            <div className='w-100'></div>
            {this.state.data.length !== 0 &&
              this.state.data.map((book) => (
                <Col lg='3' md='6' sm='6' xs='6' className=" pt-3 w-auto">
                  <CardDeck>
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
                              <Badge className=" pr-1 text-white" color="success" pill>{book.status}</Badge>
                            )}
                            {book.status === 'Not Available' && (
                              <Badge className="pr-1 text-white" color="success" pill>{book.status}</Badge>
                            )}
                          </Row>
                          <Row className='p-1 genre'>
                            {book.genre.map((genre, index) => (
                              (index < 2) && <Badge className="mr-1 text-white" color="warning" pill>{genre}</Badge> // eslint-disable-next-line
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
        )}
        <Row className='mt-5 mb-5'>
          <Col>
            <div className='d-flex flex-row justify-content-around'>
              <div>
                {<Button className="ml-5" onClick={() => this.fetchData({ ...params, page: parseInt(params.page) - 1 })}>Prev</Button>}
              </div>
              <div>
                {[...Array(this.state.options.totalPage)].map((o, i) => {
                  return (
                    <Button onClick={() => this.fetchData({ ...params, page: params.page ? i + 1 : i + 1 })} className='mr-1 ml-1' key={i.toString()}>{i + 1}</Button>
                  )
                })}
              </div>
              <div>
                {<Button className="mr-5" onClick={() => this.fetchData({ ...params, page: parseInt(params.page) + 1 })}>Next</Button>}
              </div>
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

export default Books