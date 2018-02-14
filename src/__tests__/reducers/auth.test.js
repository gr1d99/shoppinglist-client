import * as types  from "../../actions/ActionTypes";
import { Authenticate, _auth, initialState } from "../../reducers/auth";


describe('Authentication reducer', () => {
    it('returns default state', () => {
        expect(
            Authenticate(undefined, {type: 'unknown'})
        ).toEqual(initialState)
    });

    it('handles LOGIN', () => {
        expect(
            Authenticate(undefined, {type: types.LOGIN})
        ).toEqual(initialState)
    });

    it('handles LOGOUT', () => {
        expect(
            Authenticate(undefined, {type: types.LOGOUT})
        ).toEqual(initialState)
    });

    it('handles SIGNUP', () => {
        expect(
            Authenticate(undefined, {type: types.SIGNUP})
        ).toEqual(initialState)
    });

    it('handles SIGNUP_ERRORS', () => {
        const signup_errors = 'invalid details';
        const expectedState = {...initialState, signup_errors: signup_errors};

        expect(
            Authenticate(undefined, {type: types.SIGNUP_ERROR, payload: signup_errors})
        ).toEqual(expectedState)
    });

    it('handles LOGOUT_ERRORS', () => {
        const login_error = 'invalid details';
        const expectedState = {...initialState, login_error: login_error};

        expect(
            Authenticate(undefined, {type: types.LOGOUT_ERROR, payload:  login_error})).toEqual(expectedState)
    });

    it('handles USER_INFO', () => {
        const userDetail = 'gideon';
        const payload = {data: {data: userDetail}};
        const expectedState = {...initialState, userDetail: userDetail}

        expect(
            Authenticate(undefined, {type: types.USER_INFO, payload: payload})
        ).toEqual(expectedState)
    });

    it('handles USER_INFO_ERROR', () => {
        const edit_error = 'invalid details';
        const expectedState = {...initialState, edit_errors: 'invalid details'};
        expect(
            Authenticate(undefined, {type: types.USER_INFO_ERROR, payload: edit_error})
        ).toEqual(expectedState)
    });

    it('handles GET_RESET_TOKEN', () => {
        const payload = {data: {data: {password_reset_token: '123'}}};
        const expectedState = {...initialState, password_reset_token: '123'};
        expect(Authenticate(undefined, {type: types.GET_RESET_TOKEN, payload: payload})).toEqual(expectedState)
    })

    it('handles GET_RESET_TOKEN_ERROR', () => {
        const error = 'invalid request';
        const expectedState = {...initialState, reset_password_errors: error};
        expect(
            Authenticate(undefined, {type: types.GET_RESET_TOKEN_ERROR, payload: 'invalid request'})
        ).toEqual(expectedState)
    })

    it('handles RESET_PASSWORD', () => {
        expect(
            Authenticate(undefined, {type: types.RESET_PASSWORD})
        ).toEqual(initialState)
    })

    it('handles RESET_PASSWORD_ERROR', () => {
        const error = 'invalid credentials';
        const expectedState = { ...initialState, reset_password_errors: error};
        expect(Authenticate(undefined, {type: types.RESET_PASSWORD_ERROR, payload: 'invalid credentials'})).toEqual(expectedState)
    })

})