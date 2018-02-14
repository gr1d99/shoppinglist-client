import * as types from '../actions/ActionTypes'

export const initialState = {
    error_messages: '',
    shlDetail: {},
    success_message: ''
}

export const shoppingListReducer = (state=initialState, action) => {
    switch(action.type) {
        case types.CREATE_SHOPPINGLIST:
            return {
                ...state,
                success_message: action.payload.data.message
            };

        case types.CREATE_SHOPPINGLIST_ERROR:
            return {
                ...state,
                error_messages: action.payload
            };

        case types.FETCH_SHOPPINGLISTS:
            return action.payload.data;

        case types.FETCH_SHOPPINGLISTS_ERROR:
            return action.payload;

        case types.SHOPPINGLIST_DETAIL:
            return {
                ...state,
                shlDetail: action.payload.data.data
            };

        case types.SHOPPINGLIST_DETAIL_ERROR:
            return action.payload;

        case types.UPDATE_SHOPPINGLIST:
            return {
                ...state,
                shlDetail: action.payload.data.data,
            };

        case types.UPDATE_SHOPPINGLIST_ERROR:
            return state;

        default:
            return state
    }
}

