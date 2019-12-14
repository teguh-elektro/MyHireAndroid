// Initial State
const initialState = {
    token: '',
  };
  
  // Reducers (Modifies The State And Returns A New State)
  const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
      // Login
      case 'TOKEN': {
        return {
          // State
          ...state,
          // Redux Store
          token: action.token,
        }
      }
      // Default
      default: {
        return state;
      }
    }
  };
  
  // Exports
  export default tokenReducer;