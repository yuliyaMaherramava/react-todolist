import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import { actions, RootAction } from '../actions';

export const initialState: TaskState = {
    byId: {},
    allIds: [],
};
const taskByIdReducerSafe = createReducer<TaskById, RootAction>(
    initialState.byId
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
    .handleAction(actions.taskActions.addTask, (state, { payload: { id } }) => {
        return [...state, id];
    })
    .handleAction(
        actions.taskActions.deleteTask,
        (state, { payload: { taskId } }) => {
            return state.filter((id) => id !== taskId);
        }
    );

const taskReducerSafe = combineReducers({
    byId: taskByIdReducerSafe,
    allIds: taskAllIdsReducer,
});

export default taskReducerSafe;
