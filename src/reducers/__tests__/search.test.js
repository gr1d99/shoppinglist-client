import { search } from "./search";
import { SEARCH, SEARCH_ERROR } from "../actions/ActionTypes";

describe('Search reducer', () => {
    it('should return default state', () => {
        expect(search(undefined, {type: 'unknown'})).toEqual(
            {results: ''}
        )
    })

    it('handles SEARCH', () => {
        expect(search(undefined, {type: SEARCH, payload: {data: [1, 2]}})).toEqual(
            {results: [1, 2]}
        )
    })

    it('handles SEARCH_ERROR', () => {
        expect(search(undefined, {type: SEARCH_ERROR, payload: 'not found'})).toEqual(
            'not found'
        )
    })
});