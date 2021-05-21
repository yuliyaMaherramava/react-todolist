import * as types from './types';

export type AddTaskType = {
    type: typeof types.ADD_TASK,
    payload: {
        id: string,
        name: string
    },
};

export type DeleteTaskType = {
    type: typeof types.DELETE_TASK,
    payload: {
        taskId: string,
        columnId: string,
    },
};

export type EditTaskType = {
    type: typeof types.EDIT_TASK,
    payload: {
        id: string,
        text: string
    },
};
export type EditColumnType = {
    type: typeof types.EDIT_COLUMN,
    payload: {
        id: string,
        text: string
    },
};
export type DeleteColumnType = {
    type: typeof types.DELETE_COLUMN,
    payload: {
        id: string
    },
};

export type ActionTypes = AddTaskType
| DeleteTaskType
| EditTaskType
| EditColumnType
| DeleteColumnType;
