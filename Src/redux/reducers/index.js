// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import authReducer from './authReducer';
import counterReducer from './counterReducer';
import engineerReducer from './engineerReducer'
import tokenReducer from './tokenReducer'
import categoryReducer from './categoryReducer'
// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  counterReducer: counterReducer,
  engineerReducer: engineerReducer,
  tokenReducer: tokenReducer,
  categoryReducer: categoryReducer
});

// Exports
export default rootReducer;