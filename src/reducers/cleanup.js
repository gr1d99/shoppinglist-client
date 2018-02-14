import * as types  from "../actions/ActionTypes";

// Reducer to clear states
export const cleanup = (state={cleanup_required: false}, action) => {
    switch (action.type) {
        case types.CLEAR_INTERNAL_STATE:
            return {
                ...state,
                cleanup_required: true
            };

        default:
            return state;
    }
};