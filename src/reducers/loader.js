/* loader reducer */

import * as types from '../actions/ActionTypes';

const initialState = {
    isLoading: false
};

export const loader = (state=initialState, action) => {
    switch (action.type) {
        case types.IS_LOADING:
            return {
                ...state,
                isLoading: true
            };

        case types.IS_NOT_LOADING:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state
    }
};