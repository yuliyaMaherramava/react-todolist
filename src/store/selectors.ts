import { createSelector } from 'reselect';

const columnsSelector = (state: StateType): ColumnState => state.columns;
const tasksSelector = (state: StateType): TaskState => state.tasks;

export const sortedColumnsSelector = createSelector(
    columnsSelector,
    (columns) =>
        columns.allIds
            .map((id) => columns.byId[id])
            .sort((column1, column2) => column1.order - column2.order)
);
export const columnWithTasksSelector = createSelector(
    sortedColumnsSelector,
    tasksSelector,
    (columns, tasksState) => {
        const columnWithTasks = columns.map((column) => {
            const tasks =
                tasksState.byColumn[column._id]?.map(
                    (id) => tasksState.byId[id]
                ) ?? [];
            return {
                ...column,
                tasks,
            };
        });
        return columnWithTasks;
    }
);
