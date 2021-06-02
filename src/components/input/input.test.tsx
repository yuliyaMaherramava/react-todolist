import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import InputComponent from '.';

describe('Input', () => {
    const handleOnChange = jest.fn();
    let component: RenderResult<
        typeof import('@testing-library/dom/types/queries'),
        HTMLElement
    >;
    let textField: HTMLInputElement;

    beforeEach(() => {
        component = render(
            <InputComponent
                value="task 1"
                placeholder="Enter a task"
                onChange={handleOnChange}
            />
        );
        textField = component.getByRole('textbox') as HTMLInputElement;
    });

    it('should display correct value and label from prop', () => {
        expect(textField.value).toEqual('task 1');
        expect(component.getByLabelText('Enter a task')).toBeTruthy();
    });

    it('callback should be called with the value after change', () => {
        fireEvent.change(textField, { target: { value: 'entering a task' } });
        expect(handleOnChange).toBeCalledWith('entering a task');
    });
});
