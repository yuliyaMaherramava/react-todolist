import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import taskReducer from './tasks/taskReducer';
import columnReducer from './columns/columnReducer';

function saveToLocalStorage(state: StateType) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem('persistantState', serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem('persistantState');
        if (serialisedState === null) {
            return undefined;
        }
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

const rootReducer = combineReducers({
    tasks: taskReducer,
    columns: columnReducer,
});

const store = createStore(
    rootReducer,
    loadFromLocalStorage(),
    composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
