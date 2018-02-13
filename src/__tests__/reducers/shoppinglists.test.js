import * as types from '../../actions/ActionTypes'
import { shoppingListReducer, initialState } from "../../reducers/shoppinglists";


// tests for shopping list reducer.
describe('Shopping list reducer', () => {
    it('should return a default state', () => {
        // default state
        expect(shoppingListReducer(undefined,
            {type: 'unknown'}))
            .toEqual(initialState)
    })

    it('should handle CREATE_SHOPPINGLIST', () => {
        // CREATE_SHOPPINGLIST type
        const payload = {data: {message: 'success'}}
        expect(shoppingListReducer(undefined,
            {type: types.CREATE_SHOPPINGLIST, payload}))
            .toEqual({
                success_message: payload.data.message,
                error_messages: '',
                shlDetail: {}
            })
    })

    it('should handle CREATE_SHOPPINGLIST_ERROR', () => {
        // CREATE_SHOPPINGLIST_ERROR type
        const payload = 'failed';
        expect(shoppingListReducer(
            undefined, {type: types.CREATE_SHOPPINGLIST_ERROR, payload}))
            .toEqual({"error_messages": payload, "shlDetail": {}})
    })

    it('should handle FETCH_SHOPPINGLISTS', () => {
        // FETCH_SHOPPINGLISTS type
        const payload = {data: {}};
        expect(shoppingListReducer(
            undefined, {type: types.FETCH_SHOPPINGLISTS, payload}))
            .toEqual(payload.data)
    })

    it('should handle FETCH_SHOPPINGLISTS_ERROR', () => {
        // FETCH_SHOPPINGLISTS_ERROR type
        const payload = 'error';
        expect(shoppingListReducer(
            undefined, {type: types.FETCH_SHOPPINGLISTS_ERROR, payload}))
            .toEqual(payload)
    })

    it('should handle SHOPPINGLIST_DETAIL', () => {
        // SHOPPINGLIST_DETAIL type
        const payload = {data: {data: {}}};
        expect(shoppingListReducer(
            undefined, {type: types.SHOPPINGLIST_DETAIL, payload}))
            .toEqual({
                error_messages: '',
                shlDetail: payload.data.data
            })
    })

    it('should handle SHOPPINGLIST_DETAIL_ERROR', () => {
        // SHOPPINGLIST_DETAIL_ERROR type
        const payload = 'error';
        expect(shoppingListReducer(
            undefined, {type: types.SHOPPINGLIST_DETAIL_ERROR, payload}))
            .toEqual(payload)
    })

    it('should handle UPDATE_SHOPPINGLIST', () => {
        // UPDATE_SHOPPINGLIST type
        const payload = {data: {data: {}}};
        expect(shoppingListReducer(
            undefined, {type: types.UPDATE_SHOPPINGLIST, payload}))
            .toEqual({
                error_messages: '',
                shlDetail: payload.data.data
            })
    })

    it('should handle UPDATE_SHOPPINGLIST_ERROR', () => {
        // UPDATE_SHOPPINGLIST_ERROR type
        expect(shoppingListReducer(
            undefined, {type: types.UPDATE_SHOPPINGLIST_ERROR}))
            .toEqual(initialState)
    })


});