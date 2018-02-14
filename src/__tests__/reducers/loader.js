import { loader, initialState }  from "../../reducers/loader";
import { IS_LOADING, IS_NOT_LOADING } from "../../actions/ActionTypes";


describe('Alert reducer', () => {
    /* test loader reducer */

    it('should returns default state', () => {
        expect(loader(undefined, {undefined})).toEqual(initialState);
    });

    it('should set is loading to true', () => {
        // isLoading should be true
        const expectedState = { ...initialState, isLoading: true };
        expect(loader(undefined, {type: IS_LOADING})).toEqual(expectedState);
    });

    it('should set is loading to false', () => {
        // is loading should be false
        const expectedState = { ...initialState, isLoading: false };
        expect(loader(undefined, {type: IS_NOT_LOADING})).toEqual(expectedState);
    });
});