import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { LogoutUserComponent } from './Logout';
import {LogoutUser} from "../../dispatchers";

Enzyme.configure({adapter: new Adapter()});

const setup = (connected=false) => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    const props = {
        auth: {},
        LogoutUser: jest.fn()};
    const store = mockStore(props);
    let enzymeWrapper;

    switch (connected){

        case true:
            enzymeWrapper = mount(
                <Provider store={store}>
                    <LogoutUserComponent {...props}/>
                </Provider>
            );
            return {enzymeWrapper};

        case false:
            enzymeWrapper = shallow(<LogoutUserComponent {...props}/>);
            return {
                props,
                enzymeWrapper,
                store};

        default:
            enzymeWrapper = shallow(<LogoutUserComponent {...props}/>);
            return {
                props,
                enzymeWrapper}
    }
};

describe('<Logout/> component', () => {

    const {props, enzymeWrapper} = setup()

    describe('Renders as expected', () => {
        it('should render without crashing', () => {
            expect(enzymeWrapper.length).toBe(1)
        });

        it('should contain correct heading text', () => {
            // heading text should be `Sign Out`
            expect(enzymeWrapper.find('.logout-heading').text()).toEqual('Sign Out')
        });

        it('should contain a button with text Logout', () => {
            expect(enzymeWrapper.find('button').length).toEqual(1)
            expect(enzymeWrapper.find('button').children().text()).toEqual('Logout')
        })

        it('should call LogoutUser action', () => {
            // simulate submission
            enzymeWrapper.find('button').simulate(
                'click',
                {preventDefault() {}}
            );

            // test submitted arguments
            expect(props.LogoutUser.mock.calls.length).toBeGreaterThan(0)
        })
    });

    describe('<Logout/> container', () => {
        const { enzymeWrapper, store } = setup(true);
        it('should render as expected', () => {
            // simulate submission
            expect(enzymeWrapper.length).toEqual(1);
        });
    })
});