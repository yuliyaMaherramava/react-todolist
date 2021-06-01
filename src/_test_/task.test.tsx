import React from 'react';
import { Provider } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { Middleware, Dispatch, AnyAction } from 'redux';
import { initialState } from '../store/reducers/taskReducer';
import Task from '../components/column/task';

const middlewares:
    | Middleware<Record<string, unknown>, unknown, Dispatch<AnyAction>>[]
    | undefined = [];
const mockStore = configureStore(middlewares);
const mockInitialState = { initialState };
const store = mockStore(mockInitialState);

describe('test', () => {
    it('renders correctly ', () => {
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
        expect(taskText.textContent).toBe('task1');
    });
});
