import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';

import { List } from "../../../containers/shoppinglist/List";

Enzyme.configure({adapter: new Adapter()});

const setup = () => {
    const shoppingList = {
        data: [
            {
                id: 1,
                name: 'item 1',
                description: 'description'
            },
            {
                id: 2,
                name: 'item 2',
                description: 'description'
            },
            {
                id: 3,
                name: 'item 3',
                description: 'description'
            }]
    };

    const props = {
        auth: {isAuthenticated: true},
        shoppingList,
        getUserShoppingLists: () => {}
    };

    let enzymeWrapper;
    enzymeWrapper = mount(
        <BrowserRouter>
            <List {...props}/>
        </BrowserRouter>
    );
    return {props, enzymeWrapper}
};

describe('it works', () => {
    const { enzymeWrapper } = setup();
    it('should render without crashing', () => {
        expect(enzymeWrapper.length).toBe(1)
    });

    it('should render 3 shopping lists', () => {
        expect(enzymeWrapper.find('.shl').length).toEqual(3)
    });

});