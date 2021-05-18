import { createStore, combineReducers } from 'redux';
import taskReducer from './reducers/taskReducer';

const rootReducer = combineReducers({
  task: taskReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>; // for future typing mapStateToProps

const store = createStore(rootReducer);

export default store;
