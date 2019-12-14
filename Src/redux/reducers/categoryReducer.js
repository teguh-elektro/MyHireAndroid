// Initial State
const initialState = {
    category: 0,
  };
  
  // Reducers (Modifies The State And Returns A New State)
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      // Login
      case 'ROLE': {
        return {
          // State
          ...state,
          // Redux Store
          category: action.category,
        }
      }
      // Default
      default: {
        return state;
      }
    }
  };
  
  // Exports
  export default authReducer;