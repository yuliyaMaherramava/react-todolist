import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import InputComponent from '.';

describe('Input', () => {
    const handleOnChange = jest.fn();
    it('should display correct value and label from prop', () => {
        const component = render(
            <InputComponent
                value="task 1"
                placeholder="Enter a task"
                onChange={handleOnChange}
            />
        );
        const textField = component.getByRole('textbox') as HTMLInputElement;
        expect(textField.value).toEqual('task 1');
        expect(component.getByLabelText('Enter a task')).toBeTruthy();
    });

    it('callback should be called with the value after change', () => {
        const component = render(
            <InputComponent
                value="task 1"
                placeholder="Enter a task"
                onChange={handleOnChange}
            />
        );
        const textField = component.getByRole('textbox') as HTMLInputElement;
        fireEvent.change(textField, { target: { value: 'entering a task' } });
        expect(handleOnChange).toBeCalledWith('entering a task');
    });
});
