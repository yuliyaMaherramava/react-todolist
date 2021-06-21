import { combineReducers, Reducer } from 'redux';
import reduceReducers from 'reduce-reducers';
import { createReducer } from 'typesafe-actions';
import { actions, RootAction } from '../actions';

export const initialState: TaskState = {
    loading: false,
    error: undefined,
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
                error: undefined,
            };
        }
    )
    .handleAction(
        actions.taskActions.getTaskActions.success,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: undefined,
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
        actions.taskActions.addTask,
        (state, { payload: { id, name } }) => {
            return {
                ...state,
                [id]: {
                    id,
                    name,
                    columnId: '1',
                    createdAt: new Date(),
                },
            };
        }
    )
    .handleAction(
        actions.taskActions.deleteTask,
        (state, { payload: { taskId } }) => {
            const tasksWithoutDeleted = { ...state };
            delete tasksWithoutDeleted[taskId];
            return {
                ...tasksWithoutDeleted,
            };
        }
    )
    .handleAction(
        actions.taskActions.editTask,
        (state, { payload: { id, text } }) => {
            return {
                ...state,
                [id]: {
                    ...state[id],
                    name: text,
                },
            };
        }
    )
    .handleAction(
        actions.taskActions.dropTask,
        (state, { payload: { draggableId, destionationId } }) => {
            return {
                ...state,
                [draggableId]: {
                    ...state[draggableId],
                    columnId: destionationId,
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
            return {
                ...state,
                ...newTasksIds,
            };
        }
    )
    .handleAction(actions.taskActions.addTask, (state, { payload: { id } }) => {
        return [...state, id];
    })
    .handleAction(
        actions.taskActions.deleteTask,
        (state, { payload: { taskId } }) => {
            return state.filter((id) => id !== taskId);
        }
    );

const taskReducer: Reducer<TaskState, RootAction> = combineReducers({
    byId: taskByIdReducer,
    allIds: taskAllIdsReducer,
    loading: (state: boolean = initialState.loading) => state,
    error: (state: Error | undefined = initialState.error) => state,
});

const reducer = reduceReducers(initialState, taskReducer, taskReducerRequest);

export default reducer;
