import * as types from '../../actions/ActionTypes'
import { shoppingItemReducer, initialState } from "../shoppingitems";


// tests for shopping items reducer.
describe('Shopping items reducer', () => {
    it('should return a default state', () => {
        // default state
        expect(shoppingItemReducer(undefined,
            {type: 'unknown'}))
            .toEqual(
                initialState
            )
    });

    it('should handle CREATE_SHOPPING_ITEM', () => {
        // CREATE_SHOPPING_ITEM type.
        expect(shoppingItemReducer(undefined, {type: types.CREATE_SHOPPING_ITEM}))
            .toEqual({})
    });

    it('should handle CREATE_SHOPPING_ITEM_ERROR', () => {
        // CREATE_SHOPPING_ITEM_ERROR type.
        const error_message = 'invalid data'
        expect(shoppingItemReducer(undefined, {type: types.CREATE_SHOPPING_ITEM_ERROR, payload: error_message}))
            .toEqual({
                error_messages: error_message,
                shlItemDetail: {},
                items: [],
                shlId: null
            })
    });


    it('should handle FETCH_SHOPPING_ITEMS', () => {
        // FETCH_SHOPPING_ITEMS type.
        const payload = {data: []}
        expect(shoppingItemReducer(undefined, {type: types.FETCH_SHOPPING_ITEMS, payload}))
            .toEqual({
                error_messages: '',
                shlItemDetail: {},
                items: payload.data,
                shlId: null
            })
    });

    it('should handle FETCH_SHOPPING_ITEMS_ERROR', () => {
        // FETCH_SHOPPING_ITEMS_ERROR type.
        const payload = 'invalid'
        expect(shoppingItemReducer(undefined, {type: types.FETCH_SHOPPING_ITEMS_ERROR, payload}))
            .toEqual(payload)
    });

    it('should handle FETCH_SHOPPING_ITEM_DETAIL', () => {
        // FETCH_SHOPPING_ITEM_DETAIL type.
        const payload = {data: {data: {}}};
        expect(shoppingItemReducer(undefined, {type: types.FETCH_SHOPPING_ITEM_DETAIL, payload}))
            .toEqual({
                error_messages: '',
                shlItemDetail: payload.data.data,
                items: [],
                shlId: null
            })
    });

    it('should handle FETCH_SHOPPING_ITEM_DETAIL_ERROR', () => {
        // FETCH_SHOPPING_ITEM_DETAIL_ERROR type.
        const payload = 'server error';
        expect(shoppingItemReducer(undefined, {type: types.FETCH_SHOPPING_ITEM_DETAIL_ERROR, payload}))
            .toEqual(payload)
    });

    it('should handle ITEM_ID', () => {
        // ITEM_ID type.
        const payload = 1;
        expect(shoppingItemReducer(undefined, {type: types.ITEM_ID, payload}))
            .toEqual({
                error_messages: '',
                shlItemDetail: {},
                items: [],
                shlId: payload
            })
    });
});


