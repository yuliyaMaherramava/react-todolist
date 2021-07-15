import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import { createReducer, Action } from 'typesafe-actions';
import { actions } from '../actions';

export const initialState: TaskState = {
    loading: false,
    error: null,
    byId: {},
    byColumn: {},
};

const taskReducerRequest = createReducer<TaskState, Action>(initialState)
    .handleAction(actions.taskActions.getTaskActions.request, (state) => {
        return {
            ...state,
            loading: true,
            error: null,
        };
    })
    .handleAction(actions.taskActions.getTaskActions.success, (state) => {
        return {
            ...state,
            loading: false,
            error: null,
        };
    })
    .handleAction(
        actions.taskActions.getTaskActions.failure,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
    )
    .handleAction(actions.taskActions.createTaskActions.request, (state) => {
        return {
            ...state,
            loading: true,
            error: null,
        };
    })
    .handleAction(actions.taskActions.createTaskActions.success, (state) => {
        return {
            ...state,
            loading: false,
            error: null,
        };
    })
    .handleAction(
        actions.taskActions.createTaskActions.failure,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
    )
    .handleAction(actions.taskActions.updateTaskActions.request, (state) => {
        return {
            ...state,
            loading: true,
            error: null,
        };
    })
    .handleAction(actions.taskActions.updateTaskActions.success, (state) => {
        return {
            ...state,
            loading: false,
            error: null,
        };
    })
    .handleAction(
        actions.taskActions.updateTaskActions.failure,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
    )
    .handleAction(actions.taskActions.deleteTaskActions.request, (state) => {
        return {
            ...state,
            loading: true,
            error: null,
        };
    })
    .handleAction(actions.taskActions.deleteTaskActions.success, (state) => {
        return {
            ...state,
            loading: false,
            error: null,
        };
    })
    .handleAction(
        actions.taskActions.deleteTaskActions.failure,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
    )
    .handleAction(actions.taskActions.dropTaskActions.request, (state) => {
        return {
            ...state,
            loading: true,
            error: null,
        };
    })
    .handleAction(actions.taskActions.dropTaskActions.success, (state) => {
        return {
            ...state,
            loading: false,
            error: null,
        };
    })
    .handleAction(
        actions.taskActions.dropTaskActions.failure,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
    );

const taskByIdReducer = createReducer<TaskById, Action>(initialState.byId)
    .handleAction(
        actions.taskActions.getTaskActions.success,
        (state, { payload }) => {
            const newById = { ...state };
            payload.forEach((task) => {
                newById[task._id] = task;
            });
            return newById;
        }
    )
    .handleAction(
        actions.taskActions.createTaskActions.success,
        (
            state,
            { payload: { _id, name, columnId, order, createdAt, updatedAt } }
        ) => {
            return {
                ...state,
                [_id]: {
                    _id,
                    name,
                    order,
                    columnId,
                    createdAt,
                    updatedAt,
                },
            };
        }
    )
    .handleAction(
        actions.taskActions.deleteTaskActions.success,
        (state, { payload: { id } }) => {
            const tasksWithoutDeleted = { ...state };
            delete tasksWithoutDeleted[id];
            return {
                ...tasksWithoutDeleted,
            };
        }
    )
    .handleAction(
        actions.taskActions.updateTaskActions.success,
        (state, { payload: { id, name } }) => {
            return {
                ...state,
                [id]: {
                    ...state[id],
                    name,
                },
            };
        }
    )
    .handleAction(
        actions.taskActions.dropTaskActions.success,
        (state, { payload: { id, destinationId, destinationOrder } }) => {
            return {
                ...state,
                [id]: {
                    ...state[id],
                    columnId: destinationId,
                    order: destinationOrder,
                },
            };
        }
    );

const taskByColumnReducer = createReducer<TaskState['byColumn'], Action>(
    initialState.byColumn
)
    .handleAction(
        actions.columnsActions.getColumnActions.success,
        (state, { payload }) => {
            const newByColumn = { ...state };
            payload.forEach((column) => {
                newByColumn[column._id] = [];
            });
            return newByColumn;
        }
    )
    .handleAction(
        actions.taskActions.getTaskActions.success,
        (state, { payload }) => {
            const newByColumn = { ...state };
            payload.forEach((task) => {
                newByColumn[task.columnId].push(task._id);
            });
            return { ...state, ...newByColumn };
        }
    )
    .handleAction(
        actions.taskActions.createTaskActions.success,
        (state, { payload: { _id, columnId } }) => {
            return {
                ...state,
                [columnId]: [...state[columnId], _id],
            };
        }
    )
    .handleAction(
        actions.taskActions.deleteTaskActions.success,
        (state, { payload: { id, columnId } }) => {
            return {
                ...state,
                [columnId]: state[columnId].filter((arrId) => arrId !== id),
            };
        }
    )
    .handleAction(
        actions.taskActions.dropTaskActions.success,
        (state, { payload: { id, destinationId, sourceId } }) => {
            if (destinationId === sourceId) {
                return {
                    ...state,
                };
            }
            return {
                ...state,
                [sourceId]: state[sourceId].filter((arrId) => arrId !== id),
                [destinationId]: [...state[destinationId], id],
            };
        }
    );

const taskReducer = combineReducers({
    byId: taskByIdReducer,
    byColumn: taskByColumnReducer,
    loading: (state: boolean = initialState.loading) => state,
    error: (state: Error | null = initialState.error) => state,
});

const reducer = reduceReducers(initialState, taskReducer, taskReducerRequest);

export default reducer;
