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
const columnByIdReducerSafe = createReducer<ColumnById, RootAction>(
    initialState.byId
)
    .handleAction(actions.taskActions.addTask, (state, { payload: { id } }) => {
        return {
            ...state,
            1: {
                ...state['1'],
                tasks: [...state['1'].tasks, id],
            },
        };
    })
    .handleAction(
        actions.taskActions.deleteTask,
        (state, { payload: { taskId, columnId } }) => {
            return {
                ...state,
                [columnId]: {
                    ...state[columnId],
                    tasks: state[columnId].tasks.filter((id) => id !== taskId),
                },
            };
        }
    )
    .handleAction(
        actions.taskActions.dropTask,
        (state, { payload: { draggableId, sourceId, destionationId } }) => {
            const sourceColumn = state[sourceId];
            const destinationColumn = state[destionationId];
            return {
                ...state,
                [sourceId]: {
                    ...sourceColumn,
                    tasks: sourceColumn.tasks.filter(
                        (id) => id !== draggableId
                    ),
                },
                [destionationId]: {
                    ...destinationColumn,
                    tasks: [...destinationColumn.tasks, draggableId],
                },
            };
        }
    )
    .handleAction(
        actions.columnsActions.deleteColumn,
        (state, { payload: { id } }) => {
            const columnsWithoutDeleted = { ...state };
            delete columnsWithoutDeleted[id];
            return columnsWithoutDeleted;
        }
    )
    .handleAction(
        actions.columnsActions.editColumn,
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
).handleAction(
    actions.columnsActions.deleteColumn,
    (state, { payload: { id } }) => {
        return state.filter((columnId) => columnId !== id);
    }
);

const columnReducerSafe = combineReducers({
    byId: columnByIdReducerSafe,
    allIds: columnAllIdsReducer,
});

export default columnReducerSafe;
