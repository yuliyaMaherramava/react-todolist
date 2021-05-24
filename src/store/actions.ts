import { v4 as uuidv4 } from 'uuid';
import * as actionTypes from './actionTypes';
import * as types from './types';

export const addTask = (name: string): actionTypes.AddTaskType => {
  const newTaskId = uuidv4();
  return {
    type: types.ADD_TASK,
    payload: {
      id: newTaskId,
      name,
    },
  };
};

export const deleteTask = (taskId: string, columnId: string): actionTypes.DeleteTaskType => ({
  type: types.DELETE_TASK,
  payload: {
    taskId,
    columnId,
  },
});

export const editTask = (id: string, text: string): actionTypes.EditTaskType => ({
  type: types.EDIT_TASK,
  payload: {
    id,
    text,
  },
});

export const editColumn = (id: string, text: string): actionTypes.EditColumnType => ({
  type: types.EDIT_COLUMN,
  payload: {
    id,
    text,
  },
});

export const deleteColumn = (id: string): actionTypes.DeleteColumnType => ({
  type: types.DELETE_COLUMN,
  payload: {
    id,
  },
});

export const dropTask = (
  destionationId: string,
  sourceId: string,
  draggableId:string,
): actionTypes.DropTaskType => ({
  type: types.DROP_TASK,
  payload: {
    destionationId,
    sourceId,
    draggableId,
  },
});
