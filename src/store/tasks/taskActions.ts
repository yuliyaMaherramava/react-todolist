import { Dispatch } from 'react';
import { createAction, createAsyncAction } from 'typesafe-actions';
import { v4 as uuidv4 } from 'uuid';
import api from '../../api';

// export const addTask = createAction('tasks/ADD', (name: string) => ({
//     id: uuidv4(),
//     name,
// }))();

// export const deleteTask = createAction(
//     'tasks/DELETE',
//     (taskId: string, columnId: string) => ({
//         taskId,
//         columnId,
//     })
// )();

// export const editTask = createAction(
//     'tasks/EDIT',
//     (id: string, text: string) => ({
//         id,
//         text,
//     })
// )();

// export const dropTask = createAction(
//     'tasks/DROP',
//     (payload: DropTaskPayload) => payload
// )();

export const getTaskActions = createAsyncAction(
    'tasks/GET_REQUEST',
    'tasks/GET_SUCCESS',
    'tasks/GET_FAILED'
)<undefined, Array<Task>, Error>();

export const createTaskActions = createAsyncAction(
    'tasks/CREATE_REQUEST',
    'tasks/CREATE_SUCCESS',
    'tasks/CREATE_FAILED'
)<undefined, Task, Error>();

export const deleteTaskActions = createAsyncAction(
    'tasks/DELETE_REQUEST',
    'tasks/DELETE_SUCCESS',
    'tasks/DELETE_FAILED'
)<undefined, DeleteTaskPayload, Error>();

export const updateTaskActions = createAsyncAction(
    'tasks/UPDATE_REQUEST',
    'tasks/UPDATE_SUCCESS',
    'tasks/UPDATE_FAILED'
)<undefined, UpdateTaskPayload, Error>();

export const dropTaskActions = createAsyncAction(
    'tasks/UPDATE_REQUEST',
    'tasks/UPDATE_SUCCESS',
    'tasks/UPDATE_FAILED'
)<undefined, DropTaskPayload, Error>();

export const getTasks = () => (dispatch: Dispatch) => {
    dispatch(getTaskActions.request());
    api.get<Array<Task>>('tasks')
        // eslint-disable-next-line prettier/prettier
        .then(({data}) => {
            dispatch(getTaskActions.success(data));
        })
        .catch((error: Error) => {
            dispatch(getTaskActions.failure(error));
        });
};

export const createTasks = (text: string) => (dispatch: Dispatch) => {
    dispatch(createTaskActions.request());
    api.post<Task>('tasks', { text })
        .then(({ data }) => {
            dispatch(createTaskActions.success(data));
        })
        .catch((error: Error) => {
            dispatch(createTaskActions.failure(error));
        });
};

export const deleteTasks =
    (id: string, columnId: string) => (dispatch: Dispatch) => {
        dispatch(deleteTaskActions.request());
        api.delete('tasks', { data: id })
            .then(() => {
                dispatch(deleteTaskActions.success({ id, columnId }));
            })
            .catch((error: Error) => {
                dispatch(deleteTaskActions.failure(error));
            });
    };

export const updateTasks =
    (id: string, taskText: string) => (dispatch: Dispatch) => {
        dispatch(updateTaskActions.request());
        api.put('tasks', { id, taskText })
            .then(() => {
                dispatch(updateTaskActions.success({ id, taskText }));
            })
            .catch((error: Error) => {
                dispatch(updateTaskActions.failure(error));
            });
    };

export const dropTasks =
    (id: string, destinationId: string, sourceId: string, order: number) =>
    (dispatch: Dispatch) => {
        dispatch(dropTaskActions.request());
        api.put('tasks', { id, destinationId, sourceId, order })
            .then(() => {
                dispatch(
                    dropTaskActions.success({
                        id,
                        destinationId,
                        sourceId,
                        order,
                    })
                );
            })
            .catch((error: Error) => {
                dispatch(dropTaskActions.failure(error));
            });
    };
