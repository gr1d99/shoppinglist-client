import * as types from '../actions/ActionTypes'

export const initialState = {
    error_messages: '',
    shlDetail: {}
}

export const shoppingListReducer = (state=initialState, action) => {
    switch(action.type) {
        case types.CREATE_SHOPPINGLIST:
            return Object.assign({}, state, {
                success_message: action.payload.data.message
            });

        case types.CREATE_SHOPPINGLIST_ERROR:
            return Object.assign({}, state, {
                error_messages: action.payload
            })

        case types.FETCH_SHOPPINGLISTS:
            return action.payload.data;

        case types.FETCH_SHOPPINGLISTS_ERROR:
            return action.payload;

        case types.SHOPPINGLIST_DETAIL:
            return Object.assign({}, state, {
                shlDetail: action.payload.data.data
            });

        case types.SHOPPINGLIST_DETAIL_ERROR:
            return action.payload;

        case types.UPDATE_SHOPPINGLIST:
            return Object.assign({}, state, {
                shlDetail: action.payload.data.data,
            });

        case types.UPDATE_SHOPPINGLIST_ERROR:
            return state;

        default:
            return state
    }
}

