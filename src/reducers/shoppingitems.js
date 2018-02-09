import * as types from '../actions/ActionTypes'

export const initialState = {
    error_messages: '',
    shlItemDetail: {},
    items: [],
    shlId: null
}

export const shoppingItemReducer = (state=initialState, action) => {
    switch (action.type){
        case types.CREATE_SHOPPING_ITEM:
            return {};

        case types.CREATE_SHOPPING_ITEM_ERROR:
            return Object.assign({}, state, {
                error_messages: action.payload,
            });

        case types.FETCH_SHOPPING_ITEMS:
            return Object.assign({}, state, {
                error_messages: '',
                items: action.payload.data
            });

        case types.FETCH_SHOPPING_ITEMS_ERROR:
            return action.payload;

        case types.FETCH_SHOPPING_ITEM_DETAIL:
            return Object.assign({}, state, {
                shlItemDetail: action.payload.data.data});

        case types.FETCH_SHOPPING_ITEM_DETAIL_ERROR:
            return action.payload;

        case types.ITEM_ID:
            return Object.assign({}, state, {
                shlId: action.payload
            });

        default:
            return state
    }
}