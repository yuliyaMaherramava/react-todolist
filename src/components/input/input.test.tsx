import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import InputComponent from '.';

describe('Input', () => {
    const handleOnChange = jest.fn();

    const renderAndFindInput = () => {
        const component = render(
            <InputComponent
                id="taskText"
                name="taskText"
                value="task 1"
                placeholder="Enter a task"
                error={undefined}
                onChange={handleOnChange}
            />
        );
        const textField = component.getByRole('textbox') as HTMLInputElement;
        expect(textField).toBeTruthy();
        return textField;
    };

    it('should display correct value and label from prop', () => {
        const textField = renderAndFindInput();
        expect(textField.value).toEqual('task 1');
        expect(screen.getByLabelText('Enter a task')).toBeTruthy();
    });

    it('callback should be called with the value after change', () => {
        const textField = renderAndFindInput();
        fireEvent.change(textField, { target: { value: 'entering a task' } });
        expect(handleOnChange).toBeCalled();
    });
});
