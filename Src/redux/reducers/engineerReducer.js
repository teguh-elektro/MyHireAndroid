// Initial State
const initialState = {
  id: 0,
};

// Reducers (Modifies The State And Returns A New State)
const engineerReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case 'GET_ENGINEER': {
      return {
        // State
        ...state,
        // Redux Store
        id: action.id,
      }
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default engineerReducer;