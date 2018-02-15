import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { SignUp } from '../../../containers/auth/Signup'


const middlewares = [];
const mockStore = configureStore(middlewares);


configure({adapter: new Adapter()});

describe('<Signup/>', () => {
    let store, wrapper;
    let initialState = {
        auth: {
            isAuthenticated: false
        },
        loader: {},
        alerts: {}
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

});
