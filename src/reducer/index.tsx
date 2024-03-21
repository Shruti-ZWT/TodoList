import { combineReducers } from 'redux';
import { operationsReducer } from './operations';

const rootReducer = combineReducers({
  operationsReducer,
});

export { rootReducer };