import React from 'react';
import { Provider } from 'react-redux';
import { render, RenderResult } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Middleware, Dispatch, AnyAction } from 'redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { initialState } from '../../store/reducers/columnReducer';
import Column from '.';

const middlewares:
    | Middleware<Record<string, unknown>, unknown, Dispatch<AnyAction>>[]
    | undefined = [];
const mockStore = configureStore(middlewares);
const mockInitialState = { initialState };
const store = mockStore(mockInitialState);

describe('column', () => {
    const tasks = [
        {
            id: '1',
            name: 'to make tea',
            columnId: '1',
            createdAt: new Date(),
        },
    ];
    let component: RenderResult<
        typeof import('@testing-library/dom/types/queries'),
        HTMLElement
    >;

    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <DragDropContext onDragEnd={() => ({})}>
                    <Column name="to do" id="10" tasks={tasks} />
                </DragDropContext>
            </Provider>
        );
    });

    it('should render with correct name  ', () => {
        const columnText = component.container.querySelector('h3');
        expect(columnText.textContent).toBe('to do');
    });

    it('should render with correct tasks ', () => {
        const taskText = component.getByTestId('task').querySelector('p');
        expect(taskText.textContent).toBe(tasks[0].name);
    });
});