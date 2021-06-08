import { ActionType } from 'typesafe-actions';
import * as taskActions from './tasks/taskActions';
import * as columnsActions from './columns/columnActions';

export const actions = {
    taskActions,
    columnsActions,
};
export type RootAction = ActionType<typeof actions>;
