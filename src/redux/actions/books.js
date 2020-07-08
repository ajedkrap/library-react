import http from '../../helper/http'
import qs from 'querystring'
require('dotenv').config()

const { REACT_APP_URL } = process.env

export const getBook = (token, param = null) => {
  const params = `${qs.stringify(param)}`
  const url = `${REACT_APP_URL}books?${params}`
  return {
    type: 'GET_BOOK',
    payload: http(token).get(url)
  }
}