import { createAction } from 'typesafe-actions';

export const editColumn = createAction(
    'columns/EDIT',
    (id: string, text: string) => ({
        id,
        text,
    })
)();

export const deleteColumn = createAction('columns/DELETE', (id: string) => ({
    id,
}))();
