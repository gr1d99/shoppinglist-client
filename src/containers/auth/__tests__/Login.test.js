import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Login } from "../Login";

Enzyme.configure({adapter: new Adapter()});

const setup = () => {
    const props = {
        auth: {},
        loginUser: jest.fn()};
    const enzymeWrapper = shallow(<Login {...props}/>);

    return {
        props,
        enzymeWrapper}
};

describe('<Login/> component', () => {
    describe('Renders', () => {
        const { enzymeWrapper } = setup();

        it('should render without crashing', () => {
            expect(enzymeWrapper.length).toBe(1);

        });

        it('should have one form only', () => {
            // check if form is rendered
            expect(enzymeWrapper.find('form.login-form').length).toEqual(1);
        });
    });

    describe('Headings', () => {
        it('should ', () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.find('.login-header').text()).toEqual('Login')
        });
    });

    describe('form interactions', () => {
        const { props, enzymeWrapper } = setup();

        it('when submit it should call loginUser function', () => {
            expect(enzymeWrapper.find('form.login-form').length).toEqual(1)
            enzymeWrapper.find('form.login-form').simulate(
                'submit', {preventDefault() {}}
            );

            expect(props.loginUser.mock.calls.length).toBe(1)
        });

        it('should be called with username and password in the state as arguments', () => {
            // initialize test values.
            const username = 'user100';
            const password = 'user100password';

            // set username
            enzymeWrapper.find('#id_username').simulate(
                'change',
                {target: {
                    name: 'username', value: username}}
            );

            // set password
            enzymeWrapper.find('#id_password').simulate(
                'change',
                {target: {
                    name: 'password', value: password}}
            );

            // simulate submission
            enzymeWrapper.find('.login-form').simulate(
                'submit',
                {preventDefault() {}}
            );

            // test submitted arguments
            expect(props.loginUser.mock.calls[1][1]).toEqual({username: username, password: password})
        });

        it('should have empty values in internal state', () => {
            // internal state should hold nothing by default
            expect(enzymeWrapper.find('input[id="id_username"]').prop('type')).toEqual('text')
        });

    });
});




