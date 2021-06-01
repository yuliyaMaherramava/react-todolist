import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ButtonComponent from '../components/button';

describe('button', () => {
    const handleOnClick = jest.fn();

    it('should display correct value from prop', () => {
        const component = render(
            <ButtonComponent value="Add" onClick={handleOnClick} />
        );
        const button = component.getByRole('button') as HTMLButtonElement;
        expect(button.value).toEqual('Add');
    });

    it('callback should be called after click', () => {
        const component = render(
            <ButtonComponent value="Add" onClick={handleOnClick} />
        );
        const button = component.getByRole('button') as HTMLButtonElement;
        fireEvent.click(button);
        expect(handleOnClick.mock.calls.length).toEqual(1);
    });
});
