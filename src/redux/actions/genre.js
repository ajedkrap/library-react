import http from '../../helper/http'
require('dotenv').config()

const { REACT_APP_URL } = process.env

export const getGenre = (token) => {
  const url = `${REACT_APP_URL}genre`
  return {
    type: 'GET_GENRE',
    payload: http(token).get(url)
  }
}