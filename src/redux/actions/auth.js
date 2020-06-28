import http from '../../helper/http'
import qs from 'querystring'
require('dotenv').config()

const { REACT_APP_URL } = process.env

export const signUp = (signUpData) => {
  const url = `${REACT_APP_URL}auth/signup`
  const data = qs.stringify(signUpData)
  return {
    type: 'SIGN_UP',
    payload: http('users').post(url, data)
  }
}

export const login = (loginData) => {
  const url = `${REACT_APP_URL}auth/login`
  const data = qs.stringify(loginData)
  return {
    type: 'LOG_IN',
    payload: http('users').post(url, data)
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}