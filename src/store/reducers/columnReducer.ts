import { ActionTypes } from '../actionTypes';
import * as types from '../types';

const initialState: ColumnStateType = {
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

const columnReducer = (state = initialState, action: ActionTypes): ColumnStateType => {
  switch (action.type) {
    case types.ADD_TASK: {
      return {
        ...state,
        byId: {
          ...state.byId,
          1: {
            ...state.byId['1'],
            tasks: [
              ...state.byId['1'].tasks,
              action.payload.id,
            ],
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
            tasks: state.byId[columnId].tasks.filter((id) => id !== taskId),
          },
        },
      };
    }
    default:
      return state;
  }
};

export default columnReducer;
