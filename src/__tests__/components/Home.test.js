import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import HomePage from '../../components/Home'
import App from '../../components/App'


const middlewares = [];
const mockStore = configureStore(middlewares);


configure({adapter: new Adapter()});


describe('<HomePage/> when logged out', () => {
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
        // component should be mounted and rendered without any issue
        expect(wrapper.length).toEqual(1)
    });

    it('props should be equal with the initial', () => {

        // test if props are the same
        expect(wrapper.find('HomePage').prop('auth').isAuthenticated).toEqual(false)
    });

    it('a tag should be only 2', () => {
        // <a> tags in home page by default are 2
        expect(wrapper.find('HomePage').find('a').length).toEqual(2)
    });

})

describe('<HomePage/> when logged in', () => {
    let store, wrapper;
    let initialState = {
        auth: {
            isAuthenticated: true
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

    it('should render link to shopping list', () => {
        // should render a
        expect(wrapper.find('HomePage').find('a').length).toEqual(1)
        expect(wrapper.find('HomePage').find("span.welcome-text").length).toEqual(1)
    });

});

describe('<Home/> Errors', () => {
    let store, wrapper;
    let initialState = {
        auth: {
            isAuthenticated: 123
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

    it('display nothing if isAuthenticated property is unknown', () => {
        // if isAuthenticated is not a boolean nothing should be displayed
        expect(wrapper.find('HomePage').contains(<div className="error"/>)).toEqual(true)
    })
})