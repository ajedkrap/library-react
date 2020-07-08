import React, { Component } from 'react'
import {
  Row, Col, Container,
  Spinner, Table, Button,
} from 'reactstrap'
import { Link } from 'react-router-dom'

import Control from '../assets/control.png'
import Logo from '../assets/e-Library.png'

import SideBar from '../components/sidebar.jsx'
import Footer from '../components/footer.jsx'

import swal from 'sweetalert'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faBookReader } from '@fortawesome/free-solid-svg-icons'

import { connect } from 'react-redux'
import { deleteLoanedBook, deleteAllBook, setLoan, returnLoan, clearMessage, clearLoan } from '../redux/actions/loans'

class Loan extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showSidebar: false,
    }
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




  render() {
    const { isAdmin, userData } = this.props.auth
    const { loanedBooks, isLoading, isSelecting, onLoan } = this.props.loans
    const { showSidebar } = this.state
    return (
      <>
        <Row className='d-flex flex-row mantap w-100 h-100 no-gutters'>
          {showSidebar && <SideBar
            getSideBar={showSidebar}
            getUser={userData}
            isAdmin={isAdmin}
            getLoanData={loanedBooks.length}
            showBook={() => this.showBook()}
            goToLoans={() => this.goToLoans()}
            hideSidebar={this.showSidebar.bind(this)}
            logout={this.logout.bind(this)} />}

          <Col className='content d-flex flex-grow-1 flex-column' >
            <Col className='navbar relative d-flex w-100 bg-white shadow align-items-center pl-3 px-4' >
              {!showSidebar ? <div className="d-flex justify-content-end my-3 px-5">
                <img src={Control} onClick={() => this.setState({ showSidebar: !this.state.showSidebar })} alt="control" />
              </div> : <div className='d-flex justify-content-end my-3 px-5'>
                  <img src={Control} alt="control" />
                </div>}
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
                        <Table striped responsive hover>
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
                                  <Button color='danger' onClick={() => this.props.deleteLoanedBook(index)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                  </Button>
                                </td>}
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        <Col className='d-flex justify-content-around w-100'>
                          {isSelecting && (
                            <div>
                              <Button color='info' className='mx-2' onClick={(e) => this.setLoans(e)}>
                                <FontAwesomeIcon icon={faBookReader} />
                                Loans
                              </Button>
                              <Button color='danger' className='mx-2' onClick={() => this.props.deleteAllBook()}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                                Delete All
                              </Button>
                            </div>
                          )}
                          {onLoan && (
                            <div>
                              <Button color='success' onClick={(e) => this.returnLoan(e)}>Return</Button>
                            </div>
                          )}
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

const mapDispatchToProps = { deleteLoanedBook, deleteAllBook, setLoan, returnLoan, clearMessage, clearLoan }

export default connect(mapStateToProps, mapDispatchToProps)(Loan)