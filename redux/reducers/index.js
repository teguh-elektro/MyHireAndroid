// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import authReducer from './authReducer';
import counterReducer from './counterReducer';
import engineerReducer from './engineerReducer'
import tokenReducer from './tokenReducer'
// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  counterReducer: counterReducer,
  engineerReducer: engineerReducer,
  tokenReducer: tokenReducer
});

// Exports
export default rootReducer;