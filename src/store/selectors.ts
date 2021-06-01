import { createSelector } from 'reselect';
import { getTimeFromDate } from '../helpers';

const columnsSelector = (state: StateType): ColumnState => state.columns;
const tasksSelector = (state: StateType): TaskState => state.tasks;

const sortedColumnsSelector = createSelector(columnsSelector, (columns) =>
    columns.allIds
        .map((id) => columns.byId[id])
        .sort((column1, column2) => column1.order - column2.order)
);
export const columnWithTasksSelector = createSelector(
    sortedColumnsSelector,
    tasksSelector,
    (columns, tasksState) => {
        const columnWithTasks = columns.map((column) => {
            const tasks = column.tasks
                .map((id) => tasksState.byId[id])
                .sort((task1, task2) => {
                    const date1 = getTimeFromDate(task1.createdAt);
                    const date2 = getTimeFromDate(task2.createdAt);
                    return date1 - date2;
                });
            return {
                ...column,
                tasks,
            };
        });
        return columnWithTasks;
    }
);
