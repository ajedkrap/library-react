const initialState = {
  tasks: []
}

const loans = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD TASK': {
      const tasks = state.tasks
      tasks.push(action.payload)
      return {
        ...state,
        tasks
      }
      break
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default loans