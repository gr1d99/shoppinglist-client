import * as types from '../actions/ActionTypes'

const initialState = {
    success_message: '',
    warning_message: '',
    error_message: '',
    category: ''
};


export const alertsReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.SUCCESS_ALERT:
            return Object.assign({}, state, {
                success_message: action.payload,
                warning_message: '',
                error_message: '',
                category: types.SUCCESS_ALERT
            });

        case types.WARNING_ALERT:
            return Object.assign({}, state, {
                success_message: '',
                warning_message: action.payload,
                error_message: '',
                category: types.WARNING_ALERT
            });

        case types.ERROR_ALERT:
            return Object.assign({}, state, {
                success_message: '',
                warning_message: '',
                error_message: action.payload,
                category: types.ERROR_ALERT
            });

        case types.CLEAR_ALERT:
            return Object.assign({}, state, {
                success_message: '',
                warning_message: '',
                error_message: '',
                category: ''
            });

        default:
            return state
    }
};