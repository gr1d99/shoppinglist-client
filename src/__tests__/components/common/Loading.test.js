import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Loading from "../../../components/common/Loading";

Enzyme.configure({adapter: new Adapter()});

const setup = () => {
    const enzymeWrapper = mount(<Loading/>);

    return {enzymeWrapper}
};

describe('<Loading/> component', () => {
    const {enzymeWrapper} = setup();

    it('should render without crashing', () => {
        expect(enzymeWrapper.length).toEqual(1)
    });

    it('should have all elements', () => {
        expect(enzymeWrapper.find('label').length).toEqual(1); // ensure there is only one label
        expect(enzymeWrapper.find('label').text()).toEqual(' Loading...'); // ensure text is correct
        expect(enzymeWrapper.find('label').children().find('span').length).toEqual(1);
    });
});