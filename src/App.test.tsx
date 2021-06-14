import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { getType } from 'typesafe-actions';
import App from './App';
import { initialState } from './store/columns/columnReducer';
import { actions } from './store/actions';

const mockStore = configureStore();
const mockInitialState = {
    columns: initialState,
    tasks: { byId: {}, allIds: [] },
};
const store = mockStore(mockInitialState);

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: unknown) => key }),
}));

describe('App', () => {
    it('should add a task to state', async () => {
        const component = render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const textField = component.getByRole('textbox') as HTMLInputElement;
        const button = component.getByText('buttons.addTask');

        await waitFor(() => {
            fireEvent.change(textField, { target: { value: 'TaskName' } });
        });
        await waitFor(() => {
            fireEvent.click(button);
        });

        const storeActions = store.getActions();
        const expectedPayload = {
            type: getType(actions.taskActions.addTask),
            payload: { name: 'TaskName' },
        };
        expect(storeActions[0].type).toEqual(expectedPayload.type);
        expect(storeActions[0].payload.name).toEqual(
            expectedPayload.payload.name
        );
    });
});
