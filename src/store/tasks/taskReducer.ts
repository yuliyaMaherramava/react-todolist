import { combineReducers, Reducer } from 'redux';
import reduceReducers from 'reduce-reducers';
import { createReducer } from 'typesafe-actions';
import { actions, RootAction } from '../actions';

export const initialState: TaskState = {
    loading: false,
    error: null,
    byId: {},
    allIds: [],
};

const taskReducerRequest = createReducer<TaskState, RootAction>(initialState)
    .handleAction(
        actions.taskActions.getTaskActions.request,
        (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
    )
    .handleAction(
        actions.taskActions.getTaskActions.success,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: null,
            };
        }
    )
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
    .handleAction(
        actions.taskActions.createTaskActions.request,
        (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
    )
    .handleAction(
        actions.taskActions.createTaskActions.success,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: null,
            };
        }
    )
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
    .handleAction(
        actions.taskActions.updateTaskActions.request,
        (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
    )
    .handleAction(
        actions.taskActions.updateTaskActions.success,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: null,
            };
        }
    )
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
    .handleAction(
        actions.taskActions.deleteTaskActions.request,
        (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
    )
    .handleAction(
        actions.taskActions.deleteTaskActions.success,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: null,
            };
        }
    )
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
    .handleAction(
        actions.taskActions.dropTaskActions.request,
        (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
    )
    .handleAction(
        actions.taskActions.dropTaskActions.success,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: null,
            };
        }
    )
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

const taskByIdReducer = createReducer<TaskById, RootAction>(initialState.byId)
    .handleAction(
        actions.taskActions.getTaskActions.success,
        (state, { payload }) => {
            const newById = { ...state };
            payload.forEach((task) => {
                newById[task.id] = task;
            });
            return newById;
        }
    )
    .handleAction(
        actions.taskActions.createTaskActions.success,
        (
            state,
            { payload: { id, name, columnId, order, createdAt, updatedAt } }
        ) => {
            return {
                ...state,
                [id]: {
                    id,
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
        (state, { payload: { id, taskText } }) => {
            return {
                ...state,
                [id]: {
                    ...state[id],
                    name: taskText,
                },
            };
        }
    )
    .handleAction(
        actions.taskActions.dropTaskActions.success,
        (state, { payload: { id, destinationId, order } }) => {
            return {
                ...state,
                [id]: {
                    ...state[id],
                    columnId: destinationId,
                    order,
                },
            };
        }
    );

const taskAllIdsReducer = createReducer<TaskState['allIds'], RootAction>(
    initialState.allIds
)
    .handleAction(
        actions.taskActions.getTaskActions.success,
        (state, { payload }) => {
            const newTasksIds = payload.map((task) => task.id);
            const setTaskIds = Array.from(new Set(newTasksIds));
            return {
                ...state,
                ...setTaskIds,
            };
        }
    )
    .handleAction(
        actions.taskActions.createTaskActions.success,
        (state, { payload: { id } }) => {
            return [...state, id];
        }
    )
    .handleAction(
        actions.taskActions.deleteTaskActions.success,
        (state, { payload: { id } }) => {
            return state.filter((arrId) => arrId !== id);
        }
    );

const taskReducer: Reducer<TaskState, RootAction> = combineReducers({
    byId: taskByIdReducer,
    allIds: taskAllIdsReducer,
    loading: (state: boolean = initialState.loading) => state,
    error: (state: Error | null = initialState.error) => state,
});

const reducer = reduceReducers(initialState, taskReducer, taskReducerRequest);

export default reducer;
