import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { DragDropContext } from 'react-beautiful-dnd';
import { initialState } from '../../store/reducers/columnReducer';
import Column from '.';

const mockStore = configureStore();
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

    const renderComponent = () => {
        const component = render(
            <Provider store={store}>
                <DragDropContext onDragEnd={() => ({})}>
                    <Column name="to do" id="10" tasks={tasks} />
                </DragDropContext>
            </Provider>
        );
        return component;
    };

    it('should render with correct name  ', () => {
        const component = renderComponent();
        const columnText = component.container.querySelector('h3');
        expect(columnText).toBeTruthy();
        expect(columnText.textContent).toBe('to do');
    });

    it('should render with correct tasks ', () => {
        const component = renderComponent();
        const taskText = component.getByTestId('task').querySelector('p');
        expect(taskText).toBeTruthy();
        expect(taskText.textContent).toBe(tasks[0].name);
    });
});
