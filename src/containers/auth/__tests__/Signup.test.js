import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { SignUp } from '../Signup'


const middlewares = [];
const mockStore = configureStore(middlewares);


configure({adapter: new Adapter()});

describe('<Signup/>', () => {
    let store, wrapper;
    let initialState = {
        auth: {
            isAuthenticated: false
        }
    };

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = shallow(
            <Provider store={store}>
                <SignUp/>
            </Provider>
        )
    });

    it('should render without crashing', () => {
        // if isAuthenticated is not a boolean nothing should be displayed
        expect(wrapper.length).toEqual(1);
    });

    it('should render just one form', () => {
        // check if it contains one form
        let auth = {auth: {}};

        wrapper = shallow(<SignUp auth={auth}/>)

        expect(wrapper.find('form').length).toEqual(1)
    });

});


describe('form interactions', () => {
    let wrapper;
    let auth = {auth: {}};
    const registerUser = jest.fn();

    beforeEach(() => {
        wrapper = shallow(<SignUp auth={auth} registerUser={registerUser}/>)
    });

    it('when submit it should call registerUser function', () => {
        expect(wrapper.find('.signup-form').length).toEqual(1)
        wrapper.find('.signup-form').simulate(
            'submit', {preventDefault() {}}
        );

        expect(registerUser.mock.calls.length).toBe(1)
    });

});