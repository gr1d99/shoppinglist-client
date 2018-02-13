import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { AlertMessages } from "../../../src/containers/utils/messages";

Enzyme.configure({adapter: new Adapter()});

const setup = (category) => {
    const alerts = {
        category: category
    };

    const props = {
        alerts: alerts
    };

    let enzymeWrapper;
    enzymeWrapper = mount(
        <AlertMessages {...props}/>
    );
    return {props, enzymeWrapper}
};


describe('it works', () => {
    it('should render without crashing', () => {
        const {enzymeWrapper} = setup(undefined);
        expect(enzymeWrapper.length).toBe(1)
    })

    it('should render success alert div', () => {
        const {enzymeWrapper} = setup('SUCCESS_ALERT');
        expect(enzymeWrapper.find('.alert-success').length).toEqual(1)

    });

    it('should render warning alert div', () => {
        const {enzymeWrapper} = setup('WARNING_ALERT');
        expect(enzymeWrapper.find('.alert-warning').length).toEqual(1)

    });

    it('should render error alert div', () => {
        const {enzymeWrapper} = setup('ERROR_ALERT');
        expect(enzymeWrapper.find('.alert-danger').length).toEqual(1)

    });
})