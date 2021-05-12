import { createStore, combineReducers } from 'redux';
import reducer from './addtodo-reducer';

let reducers = combineReducers({
    Todo:reducer,
});

type ReducerType = typeof reducers;
export type StateType = ReturnType<ReducerType>;

let store = createStore(reducers);
export default store;