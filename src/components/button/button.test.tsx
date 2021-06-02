import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import ButtonComponent from '.';

describe('button', () => {
    const handleOnClick = jest.fn();
    let component: RenderResult<
        typeof import('@testing-library/dom/types/queries'),
        HTMLElement
    >;
    let button: HTMLButtonElement;

    beforeEach(() => {
        component = render(
            <ButtonComponent value="Add" onClick={handleOnClick} />
        );
        button = component.getByRole('button') as HTMLButtonElement;
    });

    it('should display correct value from prop', () => {
        expect(button.value).toEqual('Add');
    });

    it('callback should be called after click', () => {
        fireEvent.click(button);
        expect(handleOnClick).toBeCalled();
    });
});
