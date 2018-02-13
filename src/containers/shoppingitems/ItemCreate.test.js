import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CreateShoppingItem } from "./Create";

Enzyme.configure({adapter: new Adapter()});

const setup = () => {
    const shoppingItem = {};
    const props = {
        shoppingItem: shoppingItem,
        auth: {isAuthenticated: true},
        createShoppingList: jest.fn()
    };

    let enzymeWrapper;
    enzymeWrapper = mount(
            <CreateShoppingItem {...props}/>
    );
    return {props, enzymeWrapper}
};

describe('it works', () => {
    const { enzymeWrapper } = setup();
    it('should render without crashing', () => {
        expect(enzymeWrapper.length).toBe(1)
    });

    it('should render form', () => {
        expect(enzymeWrapper.find('form').length).toEqual(1)
    });

    it('should have appropriate elements with expected values', () => {
        expect(enzymeWrapper.find('.heading').text()).toEqual('Add Item to Shopping List');

        // test default input values
        expect(enzymeWrapper.find('input[id="id_name"]').prop('value')).toEqual('');
        expect(enzymeWrapper.find('input[id="id_price"]').prop('value')).toEqual('');
        expect(enzymeWrapper.find('input[id="id_quantity"]').prop('value')).toEqual('')
    });
});
