import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CreateShoppingList } from "../../../containers/shoppinglist/Create";

Enzyme.configure({adapter: new Adapter()});

const setup = () => {
    const props = {
        shoppingList: {
            error_messages: {
                messages: {
                    name: ['must not be all `s`']
                }
            }
        },
        auth: {isAuthenticated: true},
        createShoppingList: jest.fn(),
        loader: {}
    };

    let enzymeWrapper;
    enzymeWrapper = mount(
        <CreateShoppingList {...props}/>
    );
    return {props, enzymeWrapper}
};

describe('it works', () => {
    const {props, enzymeWrapper} = setup();
    it('should render without crashing', () => {
        expect(enzymeWrapper.length).toBe(1)
    });

    it('should render error message', () => {
        // get expected error
        const expectedError = props.shoppingList.error_messages.messages.name[0];
        expect(enzymeWrapper.find('form.shoppinglist-create').find('span').text()).toEqual(expectedError);

        // ensure if we call getErrorMessages we get the expected error
        expect(enzymeWrapper.instance().getErrorMessages('name')[0].props.children).toEqual(expectedError);
    });

})

