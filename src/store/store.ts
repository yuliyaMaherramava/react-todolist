import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers } from 'redux';
import taskReducer from './reducers/taskReducer';
import columnReducer from './reducers/columnReducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
  columns: columnReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
