import { ActionTypes } from '../actionTypes';
import * as types from '../types';

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

const columnReducer = (
    state = initialState,
    action: ActionTypes
): ColumnState => {
    switch (action.type) {
        case types.ADD_TASK: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    1: {
                        ...state.byId['1'],
                        tasks: [...state.byId['1'].tasks, action.payload.id],
                    },
                },
            };
        }
        case types.DELETE_TASK: {
            const { taskId, columnId } = action.payload;
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [columnId]: {
                        ...state.byId[columnId],
                        tasks: state.byId[columnId].tasks.filter(
                            (id) => id !== taskId
                        ),
                    },
                },
            };
        }
        case types.DELETE_COLUMN: {
            const columnsWithoutDeleted = { ...state.byId };
            delete columnsWithoutDeleted[action.payload.id];
            return {
                ...state,
                byId: { ...columnsWithoutDeleted },
                allIds: state.allIds.filter((id) => id !== action.payload.id),
            };
        }
        case types.EDIT_COLUMN: {
            const { id, text } = action.payload;
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [id]: {
                        ...state.byId[id],
                        name: text,
                    },
                },
            };
        }
        case types.DROP_TASK: {
            const { destionationId, sourceId, draggableId } = action.payload;
            const sourceColumn = state.byId[sourceId];
            const destinationColumn = state.byId[destionationId];
            return {
                ...state,
                byId: {
                    ...state.byId,
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
                },
            };
        }
        default:
            return state;
    }
};

export default columnReducer;
