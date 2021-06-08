import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App from './App';
import { initialState } from './store/columns/columnReducer';

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

        const actions = store.getActions();
        const expectedPayload = {
            type: 'tasks/ADD',
            payload: { name: 'TaskName' },
        };
        expect(actions[0].type).toEqual(expectedPayload.type);
        expect(actions[0].payload.name).toEqual(expectedPayload.payload.name);
    });
});
