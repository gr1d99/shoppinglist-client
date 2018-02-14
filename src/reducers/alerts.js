import * as types from '../actions/ActionTypes'

export const initialState = {
    success_message: '',
    warning_message: '',
    error_message: '',
    category: ''
};

// Alert reducer
export const alertsReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.SUCCESS_ALERT:
            return {
                ...state,
                success_message: action.payload,
                category: types.SUCCESS_ALERT
            };

        case types.WARNING_ALERT:
            return {
                ...state,
                warning_message: action.payload,
                category: types.WARNING_ALERT
            };

        case types.ERROR_ALERT:
            return {
                ...state,
                error_message: action.payload,
                category: types.ERROR_ALERT
            };

        case types.CLEAR_ALERT:
            return {
                ...state,
                success_message: '',
                warning_message: '',
                error_message: '',
                category: ''
            };

        default:
            return state
    }
};