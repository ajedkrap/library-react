const initialState = {
  loanData: {},
  isLoading: false,
  isError: false,
  isSelecting: true,
  onLoan: false,
  message: null,
  loanedHistory: [],
  loanedBooks: [],
  loans: [],
}

const loans = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        message: null
      }
    }
    case 'CLEAR_LOAN_DATA': {
      return {
        ...state,
        loanData: {}
      }
    }
    case 'ADD_LOANED_BOOK': {
      const loanedBooks = state.loanedBooks
      const loanedHistory = state.loanedHistory
      loanedBooks.push(action.payload)
      loanedHistory.push(action.payload)
      return {
        ...state,
        loanedBooks,
        loanedHistory
      }
    }
    case 'DELETE_LOANED_BOOK': {
      const loanedBooks = state.loanedBooks
      loanedBooks.splice(action.payload, 1)
      return {
        ...state,
        loanedBooks
      }
    }
    case 'DELETE_ALL_BOOK': {
      return {
        ...state,
        loanedBooks: []
      }
    }
    case 'GET_LOAN_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'GET_LOAN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case 'GET_LOAN_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        loans: action.payload.data.data
      }
    }
    case 'SET_LOAN': {
      return {
        ...state,
        isSelecting: false,
        onLoan: true,
      }
    }
    case 'SET_LOAN_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'SET_LOAN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message
      }
    }
    case 'SET_LOAN_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSelecting: false,
        onLoan: true,
        loanData: action.payload.data.data,
        message: action.payload.data.message
      }
    }
    case 'RETURN_LOAN_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'RETURN_LOAN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message
      }
    }
    case 'RETURN_LOAN_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSelecting: true,
        onLoan: false,
        message: action.payload.data.message,
        loanedBooks: [],
        loanData: action.payload.data.data
      }
    }
    default: {
      return state
    }
  }
}
export default loans