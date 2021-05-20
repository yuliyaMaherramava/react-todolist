import { TaskStateType } from '../../types';
import { ActionTypes } from '../actionTypes';
import * as types from '../types';

const initialState: TaskStateType = {
  byId: {
    1: {
      id: '1',
      name: 'ABRA',
      columnId: '1',
      createdAt: new Date('2021-05-15T10:51:17.203Z'),
    },
    2: {
      id: '2',
      name: 'KADABRA',
      columnId: '1',
      createdAt: new Date('2021-05-16T10:51:17.203Z'),
    },
    3: {
      id: '3',
      name: 'YA',
      columnId: '1',
      createdAt: new Date('2021-05-16T10:55:17.203Z'),
    },
    4: {
      id: '4',
      name: 'SOSHLA',
      columnId: '1',
      createdAt: new Date('2021-05-16T10:56:55.203Z'),
    },
  },
  allIds: ['4', '1', '3', '2'],
};

const taskReducer = (state = initialState, action: ActionTypes): TaskStateType => {
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
        allIds: [
          ...state.allIds,
          newTask.id,
        ],
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
    default:
      return state;
  }
};

export default taskReducer;
