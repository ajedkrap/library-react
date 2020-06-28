const initialState = {
  isLoading: false,
  isError: false,
  isAdmin: false,
  message: null,
  userData: {}
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        message: null
      }
    }
    case 'SIGN_UP_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'SIGN_UP_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message
      }
    }
    case 'SIGN_UP_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message
      }
    }
    case 'LOG_IN_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'LOG_IN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message
      }
    }
    case 'LOG_IN_FULFILLED': {
      const { data } = action.payload
      sessionStorage.setItem('token', JSON.stringify(data.data))
      return {
        ...state,
        isLoading: false,
        isError: false,
        userData: data.data,
        isAdmin: data.data.roles === 'admin',
        message: data.message
      }
    }
    default: {
      return state
    }
  }

}
export default auth