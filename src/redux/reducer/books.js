const initialState = {
  isLoading: false,
  isError: false,
  bookData: [],
  pageInfo: []
}

const books = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOOK_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'GET_BOOK_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'GET_BOOK_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        bookData: action.payload.data.data,
        pageInfo: action.payload.data.options,
      }
    }
    default: {
      return {
        state
      }
    }
  }
}
export default books