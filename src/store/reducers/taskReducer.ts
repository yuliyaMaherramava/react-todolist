import { v4 as uuidv4 } from 'uuid';
import { StateType } from '../../types';
import { ActionTypes } from '../actionTypes';
import * as types from '../types';

const initialState: StateType = {
  columns: {
    byId: {
      1: {
        id: '1',
        name: 'To do',
        tasks: [],
        propertyOrder: 1,
      },
      2: {
        id: '2',
        name: 'In progress',
        tasks: [],
        propertyOrder: 2,
      },
      3: {
        id: '3',
        name: 'Done',
        tasks: [],
        propertyOrder: 3,
      },
    },
    allIds: ['1', '2', '3'],
  },
  tasks: {
    byId: {},
    allIds: [],
  },
};

const taskReducer = (state = initialState, action: ActionTypes): StateType => {
  switch (action.type) {
    case types.ADD_TASK: {
      const newTask = {
        id: uuidv4(),
        name: action.payload,
        columnId: '1',
        createdAt: new Date(),
      };
      return {
        ...state,
        tasks: {
          ...state.tasks,
          byId: {
            ...state.tasks.byId,
            [newTask.id]: newTask,
          },
          allIds: [
            ...state.tasks.allIds,
            newTask.id,
          ],
        },
        columns: {
          ...state.columns,
          byId: {
            ...state.columns.byId,
            1: {
              ...state.columns.byId['1'],
              tasks: [
                ...state.columns.byId['1'].tasks,
                newTask.id,
              ],
            },
          },
          allIds: [...state.columns.allIds],
        },
      };
    }
    case types.DELETE_TASK: {
      const tasksWithoutDeleted = state.tasks.byId;
      delete tasksWithoutDeleted[action.payload];
      const taskColumnId = state.tasks.byId[action.payload].columnId;
      return {
        ...state,
        tasks: {
          byId: { ...tasksWithoutDeleted },
          allIds: state.tasks.allIds.filter((id) => id !== action.payload),
        },
        columns: {
          ...state.columns,
          byId: {
            ...state.columns.byId,
            [taskColumnId]: {
              tasks: state.columns.byId[taskColumnId].tasks.filter((id) => id !== action.payload),
            },
          },
          allIds: [...state.columns.allIds],
        },
      };
    }
    case types.EDIT_TASK: {
      return {
        ...state,
        tasks: {
          byId: {
            ...state.tasks.byId,
            [action.payload.id]: {
              ...state.tasks.byId[action.payload.id],
              name: [action.payload.text],
            },
          },
          allIds: [...state.tasks.allIds],
        },
      };
    }
    default:
      return state;
  }
};

export default taskReducer;
