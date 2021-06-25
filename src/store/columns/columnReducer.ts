import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';
import { createReducer, Action } from 'typesafe-actions';
import { actions } from '../actions';

export const initialState: ColumnState = {
    loading: false,
    error: null,
    byId: {},
    allIds: [],
};

const columnReducerRequest = createReducer<ColumnState, Action>(initialState)
    .handleAction(actions.columnsActions.getColumnActions.request, (state) => {
        return {
            ...state,
            loading: true,
            error: null,
        };
    })
    .handleAction(actions.columnsActions.getColumnActions.success, (state) => {
        return {
            ...state,
            loading: false,
            error: null,
        };
    })
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
        (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
    )
    .handleAction(
        actions.columnsActions.updateColumnActions.success,
        (state) => {
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
        (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
    )
    .handleAction(
        actions.columnsActions.deleteColumnActions.success,
        (state) => {
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

const columnByIdReducerSafe = createReducer<ColumnById, Action>(
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
            const columnId = '60d30d8efeac96162a86c6bc';
            return {
                ...state,
                [columnId]: {
                    ...state[columnId],
                    tasks: [...state[columnId].tasks, id],
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
        actions.columnsActions.deleteColumnActions.success,
        (state, { payload: { id } }) => {
            const columnsWithoutDeleted = { ...state };
            delete columnsWithoutDeleted[id];
            return columnsWithoutDeleted;
        }
    )
    .handleAction(
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

const columnAllIdsReducer = createReducer<ColumnState['allIds'], Action>(
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
        actions.columnsActions.deleteColumnActions.success,
        (state, { payload: { id } }) => {
            return state.filter((columnId) => columnId !== id);
        }
    );

const columnReducer = combineReducers({
    byId: columnByIdReducerSafe,
    allIds: columnAllIdsReducer,
    loading: (state: boolean = initialState.loading) => state,
    error: (state: Error | null = initialState.error) => state,
});

const reducer = reduceReducers(
    initialState,
    columnReducer,
    columnReducerRequest
);

export default reducer;
