import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';

import { ShoppingListDetailComponent } from "./Detail";

Enzyme.configure({adapter: new Adapter()});

const setup = () => {
    const props = {
        shoppingList: {
            shlDetail: {}
        },
        match: {params: {id: 1}},
        auth: {isAuthenticated: true},
        getUserShoppingListDetail: jest.fn(),
        deleteShoppingList: jest.fn()
    };

    let enzymeWrapper;
    enzymeWrapper = mount(
        <BrowserRouter>
            <ShoppingListDetailComponent {...props}/>
        </BrowserRouter>
    );
    return {props, enzymeWrapper}
};

describe('it works', () => {
    const {props, enzymeWrapper} = setup();
    it('should render without crashing', () => {
        expect(enzymeWrapper.length).toBe(1)
    });

    it('should have one buttons', () => {
        expect(enzymeWrapper.find('button').length).toEqual(1)
    });

    it('should have two links', () => {
        expect(enzymeWrapper.find('button').length).toEqual(1)
    });

    it('when submit it should call updateShoppingListItem function', () => {
        expect(enzymeWrapper.find('button#id_delete').length).toEqual(1)
        enzymeWrapper.find('button#id_delete').simulate(
            'click', {preventDefault() {}}
        );

        expect(props.getUserShoppingListDetail.mock.calls.length).toBe(1)
    });

});