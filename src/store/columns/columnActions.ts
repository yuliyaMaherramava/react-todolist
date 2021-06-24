import { Dispatch } from 'redux';
import { createAsyncAction } from 'typesafe-actions';
import api from '../../api';

// export const editColumn = createAction(
//     'columns/EDIT',
//     (id: string, text: string) => ({
//         id,
//         text,
//     })
// )();

// export const deleteColumn = createAction('columns/DELETE', (id: string) => ({
//     id,
// }))();

export const getColumnActions = createAsyncAction(
    'columns/GET_REQUEST',
    'columns/GET_SUCCESS',
    'columns/GET_FAILED'
)<undefined, Array<Column>, Error>();

export const deleteColumnActions = createAsyncAction(
    'columns/DELETE_REQUEST',
    'columns/DELETE_SUCCESS',
    'columns/DELETE_FAILED'
    // eslint-disable-next-line @typescript-eslint/member-delimiter-style
)<undefined, { id: string }, Error>();

export const updateColumnActions = createAsyncAction(
    'columns/UPDATE_REQUEST',
    'columns/UPDATE_SUCCESS',
    'columns/UPDATE_FAILED'
)<undefined, UpdateColumnPayload, Error>();

export const getColumns = () => (dispatch: Dispatch) => {
    dispatch(getColumnActions.request());
    api.get<Array<Column>>('columns')
        // eslint-disable-next-line prettier/prettier
        .then(({data}) => {
            dispatch(getColumnActions.success(data));
        })
        .catch((error: Error) => {
            dispatch(getColumnActions.failure(error));
        });
};

export const deleteColumns = (id: string) => (dispatch: Dispatch) => {
    dispatch(deleteColumnActions.request());
    api.delete('columns', { data: id })
        .then(() => {
            dispatch(deleteColumnActions.success({ id }));
        })
        .catch((error: Error) => {
            dispatch(deleteColumnActions.failure(error));
        });
};

export const updateColumns =
    (id: string, text: string) => (dispatch: Dispatch) => {
        dispatch(updateColumnActions.request());
        api.put('columns', { id, text })
            .then(() => {
                dispatch(updateColumnActions.success({ id, text }));
            })
            .catch((error: Error) => {
                dispatch(updateColumnActions.failure(error));
            });
    };
