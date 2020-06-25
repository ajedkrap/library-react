import { combineReducers } from 'redux'

import books from './books'
import loans from './loans'
import auth from './auth'

export default combineReducers({
  books,
  loans,
  auth
})