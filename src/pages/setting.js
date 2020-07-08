import React, { Component } from 'react'
import {
  Row, Col, Container, Spinner,
  ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle,
  Table
} from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookReader, faUser, faDna, faChartPie } from '@fortawesome/free-solid-svg-icons'

import SideBar from '../components/sidebar.jsx'
import Footer from '../components/footer.jsx'

import moment from 'moment'
import swal from 'sweetalert'
import qs from 'querystring'

import Control from '../assets/control.png'
import Logo from '../assets/e-Library.png'

import { connect } from 'react-redux'
import { getLoan } from '../redux/actions/loans'

class Setting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSidebar: false,
      showUser: false,
      showGenre: false,
      showLoanList: true,
      showData: false,
      param: qs.parse(this.props.location.search.slice(1))
    }
  }

  showSidebar = (state) => {
    this.setState(state)
  }


  showUser = () => {
    this.setState({
      showUser: true,
      showGenre: false,
      showLoanList: false,
      showData: false,
    })
  }
  showGenre = () => {
    this.setState({
      showUser: false,
      showGenre: true,
      showLoanList: false,
      showData: false,
    })
  }
  showLoanList = () => {
    this.setState({
      showUser: false,
      showGenre: false,
      showLoanList: true,
      showData: false,
    })
  }
  showData = () => {
    this.setState({
      showUser: false,
      showGenre: false,
      showLoanList: false,
      showData: true,
    })
  }


  dropdownOpen = (e) => {
    e.preventDefault()
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  sortLoan = (param) => {
    const token = JSON.parse(sessionStorage.getItem('token')).token
    console.log(param)
    const params = `${qs.stringify(param)}`
    this.props.getLoan(token, params)
  }

  logout = (uri) => {
    swal("You've Logged Out")
    this.props.history.push(uri)
  }

  componentDidMount() {
    const token = JSON.parse(sessionStorage.getItem('token')).token
    this.props.getLoan(token)
  }


  render() {
    const { isAdmin, userData } = this.props.auth
    const { loanedBooks, loans } = this.props.loans
    const { showSidebar, showLoanList } = this.state

    const inSetting = this.props.history.location.pathname.slice(1) === 'setting'
    const params = this.state.param
    params.sort = params.sort || 0
    return (
      <>
        <Row className='d-flex flex-column mantap w-100 h-100 no-gutters'>
          {showSidebar && <SideBar
            getSideBar={showSidebar}
            getUser={userData}
            isAdmin={isAdmin}
            inSetting={inSetting}
            getLoanData={loanedBooks.length}
            showBook={() => this.props.history.push('/home')}
            goToSetting={() => this.props.history.push('/setting')}
            hideSidebar={this.showSidebar.bind(this)}
            logout={this.logout.bind(this)} />}

          <Col className='navbar  d-flex w-100 bg-white shadow align-items-center  px-4' >
            {!showSidebar ? <div className="d-flex justify-content-end my-3 px-5">
              <img src={Control} onClick={() => this.setState({ showSidebar: !this.state.showSidebar })} alt="control" />
            </div> : <div className='d-flex justify-content-end my-3 px-5'>
                <img src={Control} alt="control" />
              </div>}
            <div className="d-flex flex-grow-1 flex-row justify-content-center" onClick={() => this.showLoanList()}>
              <div className='d-flex align-items-center flex-column mx-2 px-2'>
                <FontAwesomeIcon className='h2 text-info' icon={faBookReader} />
                <div>Loans</div>
              </div>
              <div className='d-flex align-items-center flex-column mx-2 px-2'>
                <FontAwesomeIcon className='h2 text-primary' icon={faUser} />
                <div>User</div>
              </div>
              <div className='d-flex align-items-center flex-column mx-2 px-2'>
                <FontAwesomeIcon className='h2 text-info' icon={faDna} />
                <div>Genre</div>
              </div>
              <div className='d-flex align-items-center flex-column mx-2 px-2'>
                <FontAwesomeIcon className='h2 text-primary' icon={faChartPie} />
                <div>Stats</div>
              </div>
            </div>
            <div className="nav-brand d-flex  align-items-center">
              <img className="icon" src={Logo} alt="Logo" />
            </div>
          </Col>
          <Col className="relative p-4 flex-grow-1 overflow-auto" >
            <Container fluid={true}>
              {typeof loans === 'undefined' && (
                <div className='d-flex justify-content-center align-items-center'>
                  <Spinner style={{ width: '3rem', height: '3rem' }} />
                </div>
              )}
              {typeof loans !== 'undefined' && isAdmin && showLoanList && (
                <Row className='d-flex w-100 justify-content-center h-100'>
                  <h3>Loan list</h3>
                  <div className='w-100' />
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
                        <Table striped responsive hover>
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
                    {loans.length === 0 && isAdmin && showLoanList && (
                      <Col className='w-100'>
                        <p className='display-4 text-center'>No Data</p>

                      </Col>
                    )}
                  </Col>
                </Row>
              )}

            </Container>
          </Col>
          <Footer />
        </Row>
      </>

    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  loans: state.loans,
  genre: state.genre
})


const mapDispatchToProps = { getLoan }

export default connect(mapStateToProps, mapDispatchToProps)(Setting)