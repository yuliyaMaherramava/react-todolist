import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Middleware, Dispatch, AnyAction } from 'redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { initialState } from '../store/reducers/columnReducer';
import Column from '../components/column';

const middlewares:
    | Middleware<Record<string, unknown>, unknown, Dispatch<AnyAction>>[]
    | undefined = [];
const mockStore = configureStore(middlewares);
const mockInitialState = { initialState };
const store = mockStore(mockInitialState);

describe('column', () => {
    it('renders with correct name and tasks ', () => {
        const tasks = [
            {
                id: '1',
                name: 'to make tea',
                columnId: '1',
                createdAt: new Date(),
            },
        ];
        const component = render(
            <Provider store={store}>
                <DragDropContext onDragEnd={() => ({})}>
                    <Column name="to do" id="10" tasks={tasks} />
                </DragDropContext>
            </Provider>
        );
        const columnText = component.container.querySelector('h3');
        expect(columnText.textContent).toBe('to do');
        const taskText = component.getByTestId('task').querySelector('p');
        expect(taskText.textContent).toBe(tasks[0].name);
    });
});
