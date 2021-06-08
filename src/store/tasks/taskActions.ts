import { createAction } from 'typesafe-actions';
import { v4 as uuidv4 } from 'uuid';

export const addTask = createAction('tasks/ADD', (name: string) => ({
    id: uuidv4(),
    name,
}))();

export const deleteTask = createAction(
    'tasks/DELETE',
    (taskId: string, columnId: string) => ({
        taskId,
        columnId,
    })
)();

export const editTask = createAction(
    'tasks/EDIT',
    (id: string, text: string) => ({
        id,
        text,
    })
)();

export const dropTask = createAction(
    'tasks/DROP',
    (payload: DropTaskPayload) => payload
)();
