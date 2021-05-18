import * as actionTypes from './actionTypes';
import * as types from './types';

export const addTask = (payload: string): actionTypes.AddTaskType => ({
  type: types.ADD_TASK,
  payload,
});
export const deleteTask = (payload: string): actionTypes.DeleteTaskType => ({
  type: types.DELETE_TASK,
  payload,
});
export const editTask = (id: string, text: string): actionTypes.EditTaskType => ({
  type: types.EDIT_TASK,
  payload: {
    id,
    text,
  },
});
