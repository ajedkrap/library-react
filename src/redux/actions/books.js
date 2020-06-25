import http from '../../helper/http'
import qs from 'querystring'
require('dotenv').config()

const { REACT_APP_URL } = process.env

export const getBook = (bookData, token) => {
  const url = `${REACT_APP_URL}auth/signup`
  const data = qs.stringify(bookData)
  return {
    type: 'GET_BOOK',
    payload: http('books', token).post(url, data)
  }
}