import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import App from '../../components/App'


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
        wrapper = mount(
            <Provider store={store}>
                <App/>
            </Provider>
    )})

    // it('props should be equal with the initial', () => {
    //     // test if props are the same
    //     expect(wrapper.find('S').prop('auth').isAuthenticated).toEqual(false)
    // });
});