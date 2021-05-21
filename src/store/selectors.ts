import { createSelector } from 'reselect';

const columnsSelector = (state: StateType): ColumnStateType => state.columns;
const tasksSelector = (state: StateType): TaskStateType => state.tasks;

const sortedColumnsSelector = createSelector(
  columnsSelector,
  (columns) => columns.allIds
    .map((id) => columns.byId[id])
    .sort((column1, column2) => column1.order - column2.order),
);
export const columnWithTasksSelector = createSelector(
  sortedColumnsSelector,
  tasksSelector,
  (columns, tasksState) => {
    const columnWithTasks = columns.map((column) => {
      const tasks = column.tasks.map((id) => tasksState.byId[id]).sort((task1, task2) => {
        const dateA = task1.createdAt.getTime();
        const dateB = task2.createdAt.getTime();
        return dateA - dateB;
      });
      return {
        ...column,
        tasks,
      };
    });
    return columnWithTasks;
  },
);
