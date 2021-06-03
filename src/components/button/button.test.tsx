import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ButtonComponent from '.';

describe('button', () => {
    const handleOnClick = jest.fn();

    const renderAndFindButton = () => {
        const component = render(
            <ButtonComponent value="Add" onClick={handleOnClick} />
        );
        const button = component.getByRole('button') as HTMLButtonElement;
        expect(button).toBeTruthy();
        return button;
    };

    it('should display correct value from prop', () => {
        const button = renderAndFindButton();
        expect(button.value).toEqual('Add');
    });

    it('callback should be called after click', () => {
        const button = renderAndFindButton();
        fireEvent.click(button);
        expect(handleOnClick).toBeCalled();
    });
});
