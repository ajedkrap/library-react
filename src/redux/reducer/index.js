import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import books from './books'
import loans from './loans'
import auth from './auth'
import genre from './genre'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'loans', 'genre', 'books']
}

const rootReducer = combineReducers({
  books,
  genre,
  loans,
  auth
})

export default persistReducer(persistConfig, rootReducer)