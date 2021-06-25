import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import taskReducer from './tasks/taskReducer';
import columnReducer from './columns/columnReducer';

function saveToLocalStorage(state: RootState) {
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
type RootState = ReturnType<typeof rootReducer>;

const store: Store<RootState, Action> = createStore(
    rootReducer,
    loadFromLocalStorage(),
    composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
