import React from 'react';
import { Provider } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { initialState } from '../../../store/tasks/taskReducer';
import Task from '.';

const mockStore = configureStore();
const mockInitialState = { initialState };
const store = mockStore(mockInitialState);

describe('Task', () => {
    it('should render component with correct name from prop', () => {
        const component = render(
            <Provider store={store}>
                <DragDropContext onDragEnd={() => ({})}>
                    <Droppable droppableId="1">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <Task
                                    name="task1"
                                    id="1"
                                    columnId="2"
                                    index={5}
                                />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Provider>
        );
        const taskText = component.container.querySelector('p');
        expect(taskText).toBeTruthy();
        expect(taskText.textContent).toBe('task1');
    });
});
