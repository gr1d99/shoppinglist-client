import * as types  from "../../src/actions/ActionTypes";
import { Authenticate, _auth } from "../../src/reducers/auth";


describe('Authentication reducer', () => {
    it('returns default state', () => {
        expect(
            Authenticate(undefined, {type: 'unknown'})
        ).toEqual(
            {isAuthenticated: _auth, userDetail: null, password_reset_token: ''}
        )
    })

    it('handles LOGIN', () => {
        expect(
            Authenticate(undefined, {type: types.LOGIN})
        ).toEqual(
            {isAuthenticated: _auth, userDetail: null, password_reset_token: ''}
        )
    })

    it('handles LOGOUT', () => {
        expect(
            Authenticate(undefined, {type: types.LOGOUT})
        ).toEqual(
            {isAuthenticated: _auth, userDetail: null, password_reset_token: ''}
        )
    })

    it('handles SIGNUP', () => {
        expect(
            Authenticate(undefined, {type: types.SIGNUP})
        ).toEqual(
            {isAuthenticated: _auth, userDetail: null, password_reset_token: ''}
        )
    })

    it('handles SIGNUP_ERRORS', () => {
        expect(
            Authenticate(undefined, {type: types.SIGNUP_ERROR, payload: 'invalid details'})
        ).toEqual(
            {signup_errors: 'invalid details'}
        )
    })

    it('handles SIGNUP_ERRORS', () => {
        expect(
            Authenticate(undefined, {type: types.SIGNUP_ERROR, payload: 'invalid details'})
        ).toEqual(
            {signup_errors: 'invalid details'}
        )
    })

    it('handles LOGOUT_ERRORS', () => {
        expect(
            Authenticate(undefined, {type: types.LOGOUT_ERROR, payload: 'invalid details'})
        ).toEqual(
            {login_error: 'invalid details'}
        )
    })

    it('handles USER_INFO', () => {
        expect(
            Authenticate(undefined, {type: types.USER_INFO, payload: {data: {
                data: 'gideon'
                    }}})
        ).toEqual(
            {isAuthenticated: _auth, userDetail: 'gideon', password_reset_token: ''}
        )
    })

    it('handles USER_INFO_ERROR', () => {
        expect(
            Authenticate(undefined, {type: types.USER_INFO_ERROR, payload: 'invalid details'})
        ).toEqual(
            {isAuthenticated: _auth, userDetail: null, password_reset_token: '', edit_errors: 'invalid details'}
        )
    })

    it('handles GET_RESET_TOKEN', () => {
        expect(
            Authenticate(undefined, {type: types.GET_RESET_TOKEN, payload: {data: {data: {password_reset_token: '123'}}}})
        ).toEqual(
            {isAuthenticated: _auth, userDetail: null, password_reset_token: '123'}
        )
    })

    it('handles GET_RESET_TOKEN_ERROR', () => {
        expect(
            Authenticate(undefined, {type: types.GET_RESET_TOKEN_ERROR, payload: 'invalid request'})
        ).toEqual(
            {reset_password_errors: 'invalid request'}
        )
    })

    it('handles RESET_PASSWORD', () => {
        expect(
            Authenticate(undefined, {type: types.RESET_PASSWORD})
        ).toEqual(
            {isAuthenticated: _auth, userDetail: null, password_reset_token: ''}
        )
    })

    it('handles RESET_PASSWORD_ERROR', () => {
        expect(
            Authenticate(undefined, {type: types.RESET_PASSWORD_ERROR, payload: 'invalid credentials'})
        ).toEqual(
            {reset_password_errors: 'invalid credentials'}
        )
    })

})