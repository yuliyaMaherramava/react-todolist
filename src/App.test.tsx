import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Middleware, Dispatch, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import { initialState } from './store/reducers/columnReducer';

const middlewares:
    | Middleware<Record<string, unknown>, unknown, Dispatch<AnyAction>>[]
    | undefined = [];
const mockStore = configureStore(middlewares);
const mockInitialState = {
    columns: initialState,
    tasks: { byId: {}, allIds: [] },
};
const store = mockStore(mockInitialState);

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: unknown) => key }),
}));

describe('App', () => {
    it('should add a task to state', () => {
        const component = render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const textField = component.getByRole('textbox') as HTMLInputElement;
        const button = component.getByText('buttons.addTask');

        fireEvent.change(textField, { target: { value: 'TaskName' } });
        fireEvent.click(button);

        const actions = store.getActions();
        const expectedPayload = {
            type: 'ADD_TASK',
            payload: { name: 'TaskName' },
        };
        expect(actions[0].type).toEqual(expectedPayload.type);
        expect(actions[0].payload.name).toEqual(expectedPayload.payload.name);
    });
});
