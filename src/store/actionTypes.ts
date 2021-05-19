import * as types from './types';

export type AddTaskType = {
    type: typeof types.ADD_TASK,
    payload: {
        id: string,
        name: string
    }
};
export type DeleteTaskType = {
    type: typeof types.DELETE_TASK,
    payload: {
        taskId: string,
        columnId: string,
    }
};
export type EditTaskType = {
    type: typeof types.EDIT_TASK,
    payload: {
        id: string,
        text: string
    }
};
export type ActionTypes = AddTaskType | DeleteTaskType | EditTaskType;
