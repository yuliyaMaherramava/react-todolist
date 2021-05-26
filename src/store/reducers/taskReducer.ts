import { ActionTypes } from '../actionTypes';
import * as types from '../types';

const initialState: TaskStateType = {
  byId: {},
  allIds: [],
};

const taskReducer = (
  state = initialState,
  action: ActionTypes
): TaskStateType => {
  switch (action.type) {
    case types.ADD_TASK: {
      const newTask = {
        id: action.payload.id,
        name: action.payload.name,
        columnId: '1',
        createdAt: new Date(),
      };
      return {
        ...state,
        byId: {
          ...state.byId,
          [newTask.id]: newTask,
        },
        allIds: [...state.allIds, newTask.id],
      };
    }
    case types.DELETE_TASK: {
      const tasksWithoutDeleted = { ...state.byId };
      delete tasksWithoutDeleted[action.payload.taskId];
      return {
        ...state,
        byId: { ...tasksWithoutDeleted },
        allIds: state.allIds.filter((id) => id !== action.payload.taskId),
      };
    }
    case types.EDIT_TASK: {
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
      const { destionationId, draggableId } = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [draggableId]: {
            ...state.byId[draggableId],
            columnId: destionationId,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default taskReducer;
