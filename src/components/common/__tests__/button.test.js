import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../button';


describe('Button component', () => {
    it('should render correctly', () => {
        const component = renderer.create(
            <Button className="button" type="submit"/>,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});