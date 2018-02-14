import * as types  from "../actions/ActionTypes";

export let _auth = !(localStorage.getItem('apiKey') === null);

const initialState = {
    isAuthenticated: _auth,
    userDetail: null,
    password_reset_token: '',
    isLoading: false
}

export const Authenticate = (state=initialState, action) => {
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

        case types.LOGIN:
            return Object.assign({}, state, {
                isAuthenticated: _auth
            });

        case types.LOGIN_ERROR:
            return {login_errors: action.payload};

        case types.SIGNUP:
            return state;

        case types.SIGNUP_ERROR:
            return {signup_errors: action.payload};

        case types.LOGOUT:
            return state;

        case types.LOGOUT_ERROR:
            return {login_error: action.payload};

        case types.USER_INFO:
            return Object.assign({}, state, {
                userDetail: action.payload.data.data
            });

        case types.USER_INFO_ERROR:
            return Object.assign({}, state, {
                edit_errors: action.payload
            });

        case types.GET_RESET_TOKEN:
            return Object.assign({}, state, {
                password_reset_token: action.payload.data.data.password_reset_token
            });

        case types.GET_RESET_TOKEN_ERROR:
            return {reset_password_errors: action.payload};

        case types.RESET_PASSWORD:
            return state;

        case types.RESET_PASSWORD_ERROR:
            return {reset_password_errors: action.payload};

        default:
            return state
    }
};

export default Authenticate;