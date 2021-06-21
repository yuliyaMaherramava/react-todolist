import { Dispatch } from 'react';
import { createAction, createAsyncAction } from 'typesafe-actions';
import { v4 as uuidv4 } from 'uuid';
import api from '../../api';

export const addTask = createAction('tasks/ADD', (name: string) => ({
    id: uuidv4(),
    name,
}))();

export const deleteTask = createAction(
    'tasks/DELETE',
    (taskId: string, columnId: string) => ({
        taskId,
        columnId,
    })
)();

export const editTask = createAction(
    'tasks/EDIT',
    (id: string, text: string) => ({
        id,
        text,
    })
)();

export const dropTask = createAction(
    'tasks/DROP',
    (payload: DropTaskPayload) => payload
)();

export const getTaskActions = createAsyncAction(
    'tasks/GET_REQUEST',
    'tasks/GET_SUCCESS',
    'tasks/GET_FAILED'
)<undefined, Array<Task>, Error>();

export const getTasks = () => (dispatch: Dispatch) => {
    dispatch(getTaskActions.request());
    api.get<Array<Task>>('tasks')
        // eslint-disable-next-line prettier/prettier
        .then((res: { data: Array<Task>;}) => {
            dispatch(getTaskActions.success(res.data));
        })
        .catch((error: Error) => {
            dispatch(getTaskActions.failure(error));
        });
};
