import React from 'react';
import renderer from 'react-test-renderer';
import { backButton } from '../../../src/components/common/BackButton';


describe('BackButton component', () => {
    // back button should render correctly
    it('should render correctly', () => {
        const component = renderer.create(
            <backButton>Buttonq</backButton>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});