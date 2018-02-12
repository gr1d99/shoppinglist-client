import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {SignUp} from './Signup';

configure({adapter: new Adapter()});

describe('<Signup />', () => {
    it('renders 1 <Signup /> component', () => {
        const SignupComponent = shallow(<SignUp/>);
        expect(SignupComponent).toHaveLength(1);
    })
});