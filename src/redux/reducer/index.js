import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// import books from './books'
import loans from './loans'
import auth from './auth'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'loans']
}

const rootReducer = combineReducers({
  // books,
  loans,
  auth
})

export default persistReducer(persistConfig, rootReducer)