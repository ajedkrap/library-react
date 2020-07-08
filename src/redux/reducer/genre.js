const initialState = {
  isLoading: false,
  isError: false,
  genreData: [],
  genres: []
}

const genre = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_GENRE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'GET_GENRE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'GET_GENRE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        genreData: action.payload.data.data,
        genres: action.payload.data.data.map(genres => genres.genre)
      }
    }
    default: {
      return {
        state
      }
    }
  }
}

export default genre