import * as types  from "../actions/ActionTypes";

export const cleanup = (state={cleanup_required: false}, action) => {
    switch (action.type) {
        case types.CLEAR_INTERNAL_STATE:
            return Object.assign({}, state, {
                cleanup_required: true
            });

        default:
            return state;
    }
};