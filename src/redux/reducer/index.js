import { combineReducers } from 'redux'

import books from './books'
import loans from './loans'

export default combineReducers({
  books, loans
})