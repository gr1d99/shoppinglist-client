import * as types  from "../actions/ActionTypes";

export const search = (state={results: ''}, action) => {
    switch (action.type){
        case types.SEARCH:
            return Object.assign({}, state, {
                results: action.payload.data
            });

        case types.SEARCH_ERROR:
            return action.payload;

        default:
            return state;
    }
};