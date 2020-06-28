
import http from '../../helper/http'
import qs from 'querystring'
require('dotenv').config()


const { REACT_APP_URL } = process.env

export const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

export const clearLoan = () => {
  return {
    type: 'CLEAR_LOAN_DATA'
  }
}

export const addLoanedBook = (data) => {
  return {
    type: 'ADD_LOANED_BOOK',
    payload: data
  }
}

export const deleteLoanedBook = (index) => {
  return {
    type: 'DELETE_LOANED_BOOK',
    payload: index
  }
}

export const deleteAllBook = () => {
  return {
    type: 'DELETE_ALL_BOOK',
  }
}

export const getLoan = (token, param = null) => {
  const url = `${REACT_APP_URL}loans?${param}`
  return {
    type: 'GET_LOAN',
    payload: http(token).get(url)
  }
}

export const setLoan = (loanData, token) => {
  const url = `${REACT_APP_URL}loans`
  const data = qs.stringify(loanData)
  return {
    type: "SET_LOAN",
    payload: http(token).post(url, data)
  }
}

export const returnLoan = (loanIndex, token) => {
  const url = `${REACT_APP_URL}loans`
  const data = qs.stringify(loanIndex)
  return {
    type: "RETURN_LOAN",
    payload: http(token).patch(url, data)
  }
}
