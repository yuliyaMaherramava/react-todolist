import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import { actions, RootAction } from '../actions';

export const initialState: ColumnState = {
    byId: {
        1: {
            id: '1',
            name: 'To do',
            tasks: [],
            order: 1,
        },
        2: {
            id: '2',
            name: 'In progress',
            tasks: [],
            order: 2,
        },
        3: {
            id: '3',
            name: 'Done',
            tasks: [],
            order: 3,
        },
    },
    allIds: ['1', '2', '3'],
};

const columnReducerRequest = createReducer<ColumnState, RootAction>(
    initialState
)
    .handleAction(
        actions.columnsActions.getColumnActions.request,
        (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
    )
    .handleAction(
        actions.columnsActions.getColumnActions.success,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: null,
            };
        }
    )
    .handleAction(
        actions.columnsActions.getColumnActions.failure,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
    )
    .handleAction(
        actions.columnsActions.updateColumnActions.request,
        (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
    )
    .handleAction(
        actions.columnsActions.updateColumnActions.success,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: null,
            };
        }
    )
    .handleAction(
        actions.columnsActions.updateColumnActions.failure,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
    )
    .handleAction(
        actions.columnsActions.deleteColumnActions.request,
        (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
    )
    .handleAction(
        actions.columnsActions.deleteColumnActions.success,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: null,
            };
        }
    )
    .handleAction(
        actions.columnsActions.deleteColumnActions.failure,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
    );

const columnByIdReducerSafe = createReducer<ColumnById, RootAction>(
    initialState.byId
)
    .handleAction(
        actions.columnsActions.getColumnActions.success,
        (state, { payload }) => {
            const newById = { ...state };
            payload.forEach((column) => {
                newById[column.id] = column;
            });
            return newById;
        }
    )
    .handleAction(
        actions.taskActions.createTaskActions.success,
        (state, { payload: { id } }) => {
            return {
                ...state,
                1: {
                    ...state['1'],
                    tasks: [...state['1'].tasks, id],
                },
            };
        }
    )
    .handleAction(
        actions.taskActions.deleteTaskActions.success,
        (state, { payload: { id, columnId } }) => {
            return {
                ...state,
                [columnId]: {
                    ...state[columnId],
                    tasks: state[columnId].tasks.filter(
                        (arrId) => arrId !== id
                    ),
                },
            };
        }
    )
    .handleAction(
        actions.taskActions.dropTaskActions.success,
        (state, { payload: { id, sourceId, destinationId } }) => {
            const sourceColumn = state[sourceId];
            const destinationColumn = state[destinationId];
            return {
                ...state,
                [sourceId]: {
                    ...sourceColumn,
                    tasks: sourceColumn.tasks.filter((arrId) => arrId !== id),
                },
                [destinationId]: {
                    ...destinationColumn,
                    tasks: [...destinationColumn.tasks, id],
                },
            };
        }
    )
    .handleAction(
        // actions.columnsActions.deleteColumn,
        actions.columnsActions.deleteColumnActions.success,
        (state, { payload: { id } }) => {
            const columnsWithoutDeleted = { ...state };
            delete columnsWithoutDeleted[id];
            return columnsWithoutDeleted;
        }
    )
    .handleAction(
        // actions.columnsActions.editColumn,
        actions.columnsActions.updateColumnActions.success,
        (state, { payload: { id, text } }) => {
            return {
                ...state,
                [id]: {
                    ...state[id],
                    name: text,
                },
            };
        }
    );

const columnAllIdsReducer = createReducer<ColumnState['allIds'], RootAction>(
    initialState.allIds
)
    .handleAction(
        actions.columnsActions.getColumnActions.success,
        (state, { payload }) => {
            const newColumnIds = payload.map((column) => column.id);
            const setColumnIds = Array.from(new Set(newColumnIds));
            return {
                ...state,
                ...setColumnIds,
            };
        }
    )
    .handleAction(
        // actions.columnsActions.deleteColumn,
        actions.columnsActions.deleteColumnActions.success,
        (state, { payload: { id } }) => {
            return state.filter((columnId) => columnId !== id);
        }
    );

const columnReducer = combineReducers({
    byId: columnByIdReducerSafe,
    allIds: columnAllIdsReducer,
});

const reducer = reduceReducers(
    initialState,
    columnReducer,
    columnReducerRequest
);

export default reducer;
