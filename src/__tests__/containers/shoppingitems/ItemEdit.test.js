import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { EditShoppingListItem } from "../../../containers/shoppingitems/Edit";

Enzyme.configure({adapter: new Adapter()});

const setup = () => {
    const shoppingItem = {
        shlItemDetail: {
            name: 'bread',
            price: 100,
            quantity_description: 'big brown bread',
            bought: false,
        }
    };
    const props = {
        shoppingItem: shoppingItem,
        auth: {isAuthenticated: true},
        updateShoppingListItem: jest.fn(),
        match: {params: {id: 1}}
    };

    let enzymeWrapper;
    enzymeWrapper = mount(
        <EditShoppingListItem {...props}/>
    );
    return {props, enzymeWrapper}
};

describe('it works', () => {
    const { props, enzymeWrapper } = setup();
    it('should render without crashing', () => {
        expect(enzymeWrapper.length).toBe(1)
    });

    it('should render form', () => {
        expect(enzymeWrapper.find('form').length).toEqual(1)
    });

    it('should have appropriate elements with expected values', () => {
        expect(enzymeWrapper.find('.heading').text()).toEqual('Edit');

        // test default input values
        expect(enzymeWrapper.find('input[id="id_name"]').prop('value')).toEqual(props.shoppingItem.shlItemDetail.name);
        expect(enzymeWrapper.find('input[id="id_price"]').prop('value')).toEqual(props.shoppingItem.shlItemDetail.price);
        expect(enzymeWrapper.find('input[id="id_quantity"]').prop('value')).toEqual(props.shoppingItem.shlItemDetail.quantity_description)
    });
});

describe('form interactions', () => {
    const { props, enzymeWrapper } = setup();

    it('when submit it should call updateShoppingListItem function', () => {
        expect(enzymeWrapper.find('form.shopping-item-edit').length).toEqual(1)
        enzymeWrapper.find('form.shopping-item-edit').simulate(
            'submit', {preventDefault() {}}
        );

        expect(props.updateShoppingListItem.mock.calls.length).toBe(1)
    });

    it('should be called with new values and update state with new data', () => {
        // initialize test values.
        const name = 'chicken';
        const price = 200;

        const {quantity_description, bought} = props.shoppingItem.shlItemDetail;

        // set username
        enzymeWrapper.find('#id_name').simulate(
            'change',
            {target: {
                    name: 'name', value: name}}
        );

        // set password
        enzymeWrapper.find('#id_price').simulate(
            'change',
            {target: {
                    name: 'price', value: price}}
        );

        // simulate submission
        enzymeWrapper.find('.form.shopping-item-edit').simulate(
            'submit',
            {preventDefault() {}}
        );

        // test submitted arguments
        expect(props.updateShoppingListItem.mock.calls[1][3])
            .toEqual({
                name: name,
                price: price,
                quantity_description: quantity_description,
                bought: bought
            })
    });

});