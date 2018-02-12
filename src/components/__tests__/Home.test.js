import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import HomePage from '../Home'
import App from '../../components/App'


const middlewares = [];
const mockStore = configureStore(middlewares);


configure({adapter: new Adapter()});



describe('<HomePage/> container', () => {
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
        )
    });

    it("should renders fine", () => {
        expect(wrapper.length).toEqual(1)
    });

    it('props should be equal with the initial', () => {
        expect(wrapper.find('HomePage').prop('auth').isAuthenticated).toEqual(false)
    });

    it('a tag should be only 2', () => {
        expect(wrapper.find('HomePage').find('a').length).toEqual(2)
    });

});