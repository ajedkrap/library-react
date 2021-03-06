import React, { Component } from 'react'
import {
  Row, Col, Container,
  Spinner, Table, Button
} from 'reactstrap'


import Control from '../assets/control.png'
import Logo from '../assets/e-Library.png'

import SideBar from '../components/sidebar.jsx'

import moment from 'moment'
import swal from 'sweetalert'

class Loan extends Component {
  constructor(props) {
    super(props)
    const userData = JSON.parse(localStorage.getItem('myData'))
    this.state = {
      userData,
      isAdmin: this.getRoles(userData.roles),
      isLoading: false,
      isSelect: true,
      isLoan: false,
      books: [],
      loans: [],
      id: props.location.state.id,
      title: props.location.state.title,
      description: props.location.state.description,
      image: props.location.state.image,
      genre: props.location.state.genre,
      author: props.location.state.author,
      release_date: props.location.state.release_date,
      book: {
        id: '',
        title: '',
        description: '',
        image: null,
        genre: '',
        author: '',
        release_date: ''
      }
    }
  }

  getRoles = (_roles) => {
    const roles = _roles === 1 ? true : false
    return roles
  }

  setLoans = (e) => {
    e.preventDefault()
    this.setState({ isLoading: !this.state.isLoading })
    swal({
      title: "Ready to loan?",
      text: "Once you loan, you will not be able to select more books!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          const loan = {
            id: this.state.loans.length++,
            username: this.state.userData.username,
            amountOfBook: this.state.books.length,
            loaned_date: moment().format('DD-MM-YYYY'),
            due_date: moment().add(this.amountOfBook, 'd').format('DD-MM-YYYY'),
            return_date: '',
            status: 'On Loan'
          }
          this.state.loans.push(loan)
          swal({
            icon: "success",
            title: 'Loan Created!',
            text: `Book is the world's window`
          })
          swal(
            'Fines applied after exceeding due date'
          )
          swal(
            `Make sure to return before ${loan.due_date}`
          )
          this.setState({ isLoading: !this.state.isLoading, isLoan: !this.state.isLoan, isSelect: !this.state.isSelect })
        } else {
          swal("Make sure to check the book again, and chill!");
          this.setState({ isloading: false })
        }
      })

  }

  return = (e) => {
    e.preventDefault()
    this.setState({ isLoading: !this.state.isLoading })
    swal({
      title: "Have?",
      text: "Once you return, you will not be able to access the book!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal({
          title: 'Book Returned!',
          text: `yet, we'll check the whether the loan is overdue`
        })
        const result = this.state.loans.filter(obj => {
          return obj.username === this.state.userData.username
        })
        result.return_date = moment().format('DD-MM-YYYY')
        if (result.return_date > result.due_date) {
          result.status = 'Returned'
          swal({
            icon: 'success',
            title: 'You return the book on time',
          })
        } else {
          result.status = 'Overdue'
          const overdue = moment(result.return_date, 'DD-MM-YYYY').valueOf() - moment(result.due_date, 'DD-MM-YYYY').valueOf()
          swal({
            icon: 'warning',
            title: `It is already ${overdue} days overdue`,
          })
          swal('make sure to return the book on due in future, OK? :)')
        }
        this.state.loans[result.id--] = result
        this.state.books = []
        swal('Don\'t forget to keep reading book!!')
        this.setState({ isLoading: !this.state.isLoading, isLoan: !this.state.isLoan, isSelect: !this.state.isSelect })
      } else {
        swal("Make sure to check the book again, and cool!");
        this.setState({ isloading: false })
      }
    })
  }


  showSidebar = (state) => {
    this.setState(state)
  }

  addBookModal = (state) => {
    this.setState(state)
  }

  componentDidMount() {
    this.setState({ isloading: true })
    this.setState({
      book: {
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        genre: this.state.genre,
        author: this.state.author,
        release_date: this.state.release_date,
      }
    })
    if (this.state.isSelect) {
      this.state.books.push(this.state.book)
    }
    this.setState({ isloading: false })
  }

  render() {
    return (
      <>
        <Row className='d-flex flex-row mantap w-100 h-100 no-gutters'>
          {this.state.showSidebar && <SideBar getUser={this.state.userData} isAdmin={this.state.isAdmin} hideSidebar={this.showSidebar.bind(this)} addBookModal={this.addBookModal.bind(this)} />}
          <Col className='content d-flex flex-grow-1 flex-column' >
            <Col className='navbar relative d-flex w-100 bg-white shadow align-items-center pl-3 px-4' >
              {!this.state.showSidebar && (<div className="d-flex justify-content-end my-3 px-3">
                <img src={Control} onClick={() => this.setState({ showSidebar: !this.state.showSidebar })} alt="control" />
              </div>)}
              <div className="d-flex flex-grow-1 justify-content-center">
                <div className='h-100'></div>
              </div>
              <div className="nav-brand d-flex flex-row align-items-center">
                <img className="icon" src={Logo} alt="Logo" />
              </div>
            </Col>
            <Col className="relative p-4 flex-grow-1 overflow-auto" >

              <Container fluid={true}>
                {this.state.isLoading && (
                  <div className='d-flex justify-content-center align-items-center'>
                    <Spinner style={{ width: '3rem', height: '3rem' }} />
                  </div>
                )}
                {!this.state.isLoading && !this.state.isAdmin && (
                  <Row className='d-flex w-100 justify-content-center h-100'>
                    <h3>Loaned Book</h3>
                    <div className='w-100' />
                    {this.state.books.length !== 0 && (
                      <Col className='w-100'>
                        <Table striped>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Id</th>
                              <th>Title</th>
                              <th>Author</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.books.map((books, index) => (
                              <tr>
                                <th scope='row'>{index}</th>
                                <td>{books.id}</td>
                                <td>{books.title}</td>
                                <td>{books.author}</td>
                                <td>{books.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        <Col className='d-flex justify-content-around w-100'>
                          {this.state.isSelect && (<Button onClick={this.setLoans} >Loans</Button>)}
                          {this.state.isLoan && (<Button onClick={this.return}>Return</Button>)}
                        </Col>
                      </Col>)}
                    {this.state.books.length === 0 && (
                      <Col className='w-100'>
                        <p className='display-4 text-center'>No Data</p>
                      </Col>
                    )}
                  </Row>
                )}
                {!this.state.isLoading && this.state.isAdmin && (
                  <Row className='d-flex w-100 justify-content-center h-100'>
                    <h3>Loan list</h3>
                    <Col className='w-100'>
                      {this.state.loans.length !== 0 && (
                        <Col className='w-100'>
                          <Table striped>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Amount of Book</th>
                                <th>Loan Date</th>
                                <th>Due Date</th>
                                <th>Return Date</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.loans.map(loan => (
                                <tr>
                                  <th scope='row'>{loan.id}</th>
                                  <td>{loan.id}</td>
                                  <td>{loan.username}</td>
                                  <td>{loan.amountOfBook}</td>
                                  <td>{loan.loaned_date}</td>
                                  <td>{loan.due_date}</td>
                                  <td>{loan.return_date}</td>
                                  <td>{loan.status}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Col>)}
                      {this.state.loans.length === 0 && (
                        <Col className='w-100'>
                          <p className='display-4 text-center'>No Data</p>
                        </Col>
                      )}
                    </Col>
                  </Row>
                )}

              </Container>
            </Col>
          </Col>
        </Row>

      </>
    )
  }
}

export default Loan