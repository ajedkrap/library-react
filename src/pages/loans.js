import React, { Component } from 'react'
import {
  Row, Col, Container,
  Spinner, Table, Button,
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'
import { Link } from 'react-router-dom'

import Control from '../assets/control.png'
import Logo from '../assets/e-Library.png'

import SideBar from '../components/sidebar.jsx'
import Footer from '../components/footer.jsx'

import moment from 'moment'
import swal from 'sweetalert'
import qs from 'querystring'

import { connect } from 'react-redux'
import { deleteLoanedBook, deleteAllBook, getLoan, setLoan, returnLoan, clearMessage, clearLoan } from '../redux/actions/loans'

class Loan extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showSidebar: false,
      dropDownOpen: false,
      param: qs.parse(this.props.location.search.slice(1)),
    }
  }

  dropdownOpen = (e) => {
    e.preventDefault()
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  setLoans = (e) => {
    e.preventDefault()
    const { loanedBooks, message } = this.props.loans
    const { token } = this.props.auth.userData
    const getBooksId = loanedBooks.map(book => book.id).join(',')
    swal({
      title: "Loan System",
      text: "Are you done selecting books?\n\nSelect OK to Loan, Select Cancel to add more book",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(onLoan => {
        if (onLoan) {
          this.props.setLoan({ books: getBooksId }, token)
            .then(_ => {
              swal({
                title: 'Loan Recorded',
                text: this.props.loans.message + `\n make sure to Return before ${this.props.loans.loanData.due_date}`,
                icon: "success",
              })
            })
            .catch(error => {
              swal({
                title: 'Loan Failed',
                text: message,
                icon: "error",
              })
            })
          this.props.clearMessage()
        } else {
          swal("Make sure you've get what you need");
        }

      });

  }

  returnLoan = (e) => {
    e.preventDefault()
    const { loanData, message } = this.props.loans
    const { token } = this.props.auth.userData
    swal({
      title: "Loan System",
      text: "Are you done selecting books?\n\nSelect OK to Return",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(returning => {
        if (returning) {
          try {
            this.props.returnLoan({ loanId: loanData.id }, token)
              .then(_ => {
                if (this.props.loans.loanData.status_id === 3) {
                  swal({
                    title: 'On Time',
                    text: 'Book has returned',
                    icon: 'success'
                  })
                }
              })
              .catch(error => {
                swal({
                  title: 'Overdue',
                  text: 'Fines will be applied to your account',
                  icon: 'warning'
                })
              })
          }
          catch (error) {
            swal({
              title: 'Return Failed',
              text: message,
              icon: 'error'
            })
          }

        } else {
          swal("Make sure you've get what you need");
        }
      });

  }

  showSidebar = (state) => {
    this.setState(state)
  }

  showBook() {
    this.setState({ showSidebar: false })
    this.props.history.push('/home')
  }

  goToLoans() {
    this.setState({ showSidebar: false })
    this.props.history.push('/loan')
  }

  addBookModal = (state) => {
    this.setState(state)
  }

  logout = (uri) => {
    swal("You've Logged Out")
    this.props.history.push(uri)
  }

  sortLoan = (param) => {
    const token = JSON.parse(sessionStorage.getItem('token')).token
    console.log(param)
    const params = `${qs.stringify(param)}`
    this.props.getLoan(token, params)
    if (param) {
      this.props.history.push(`/loan?${params}`)
    }
  }

  componentDidMount() {
    const token = JSON.parse(sessionStorage.getItem('token')).token
    this.props.getLoan(token)
    console.log(this.props)
  }


  render() {
    const { isAdmin, userData } = this.props.auth
    const { loanedBooks, loans, isLoading, isSelecting, onLoan } = this.props.loans
    const { showSidebar } = this.state
    const inLoan = this.props.history.location.pathname.slice(1) === 'loan'
    const params = this.state.param
    params.sort = params.sort || 0
    return (
      <>
        <Row className='d-flex flex-row mantap w-100 h-100 no-gutters'>
          {showSidebar && <SideBar
            getSideBar={showSidebar}
            getUser={userData}
            isAdmin={isAdmin}
            inLoan={inLoan}
            getLoanData={loanedBooks.length}
            showBook={() => this.showBook()}
            goToLoans={() => this.goToLoans()}
            hideSidebar={this.showSidebar.bind(this)}
            logout={this.logout.bind(this)} />}

          <Col className='content d-flex flex-grow-1 flex-column' >
            <Col className='navbar relative d-flex w-100 bg-white shadow align-items-center pl-3 px-4' >
              {!showSidebar && (<div className="d-flex justify-content-end my-3 px-3">
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
                {isLoading && (
                  <div className='d-flex justify-content-center align-items-center'>
                    <Spinner style={{ width: '3rem', height: '3rem' }} />
                  </div>
                )}
                {!isLoading && !isAdmin && (
                  <Row className='d-flex w-100 justify-content-center h-100'>
                    <h3>Loaned Book</h3>
                    <div className='w-100' />
                    {loanedBooks.length !== 0 && (
                      <Col className='w-100'>
                        <Table striped>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Id</th>
                              <th>Title</th>
                              <th>Author</th>
                              <th>Status</th>
                              {!onLoan && <th>Delete</th>}
                            </tr>
                          </thead>
                          <tbody>
                            {loanedBooks.map((book, index,) => (
                              <tr>
                                <th scope='row'>{index}</th>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                {onLoan ? <td>Booked</td> : <td>{book.status}</td>}
                                {!onLoan && <td>
                                  <Button onClick={() => this.props.deleteLoanedBook(index)}>
                                    Delete
                                  </Button>
                                </td>}
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        <Col className='d-flex justify-content-around w-100'>
                          {isSelecting && (
                            <div>
                              <Button onClick={(e) => this.setLoans(e)} >Loans</Button>
                              <Button onClick={() => this.props.deleteAllBook()} >Delete</Button>
                            </div>
                          )}
                          {onLoan && (<Button onClick={(e) => this.returnLoan(e)}>Return</Button>)}
                        </Col>
                      </Col>)}
                    {loanedBooks.length === 0 && (
                      <Row className='d-flex justify-content-center align-items-center mt-3 w-100'>
                        <div className='display-4 ml-5 m-0'>No Data.....</div>
                        <Link className='pl-4' to='/home' >
                          <Button color='info'>
                            Borrow Book?
                          </Button>
                        </Link>
                      </Row>
                    )}
                  </Row>
                )}
                {!isLoading && isAdmin && (
                  <Row className='d-flex w-100 justify-content-center h-100'>
                    <h3>Loan list</h3>
                    <div className='w-100 py-2' />
                    <Col className='w-100 py-2 d-flex justify-content-end' >
                      <ButtonDropdown direction='bottom' isOpen={this.state.dropdownOpen} toggle={this.dropdownOpen}>
                        <DropdownToggle caret>
                          Sort
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem value='0' onClick={(e) => { this.sortLoan({ ...params, sort: parseInt(e.target.value) }) }}>Newest</DropdownItem>
                          <DropdownItem value='1' onClick={(e) => { this.sortLoan({ ...params, sort: parseInt(e.target.value) }) }}>Oldest</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </Col>
                    <div className='w-100 py-2' />
                    <Col className='w-100'>
                      {loans.length !== 0 && (
                        <Col className='w-100'>
                          <Table striped>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Loan Date</th>
                                <th>Due Date</th>
                                <th>Return Date</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loans.map((loan, index) => (
                                <tr>
                                  <th scope='row'>{index}</th>
                                  <td>{loan.username}</td>
                                  <td>{moment(loan.loan_date).format('DD-MM-YYYY')}</td>
                                  <td>{moment(loan.due_date).format('DD-MM-YYYY')}</td>
                                  <td>{loan.return_date !== null ? moment(loan.return_date).format('DD-MM-YYYY') : '-'}</td>
                                  <td>{loan.status}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Col>)}
                      {loans.length === 0 && (
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
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  loans: state.loans
})

const mapDispatchToProps = { deleteLoanedBook, deleteAllBook, getLoan, setLoan, returnLoan, clearMessage, clearLoan }

export default connect(mapStateToProps, mapDispatchToProps)(Loan)