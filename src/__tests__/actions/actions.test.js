import * as types from '../../actions/ActionTypes'
import * as actions from "../../actions";
import expect from 'expect';


describe('action creators', () => {

    it('should create an action to register user', () => {
        const response = {};
        const expectedAction = {
            type: types.SIGNUP,
            payload: response
        };

        expect(actions.RegisterUserSuccess(response)).toEqual(expectedAction)
    });

    it('should create an action to display errors when user registers', () => {
        const error = {response: {data: {}}};
        const expectedAction = {
            type: types.SIGNUP_ERROR,
            payload: error.response.data
        };

        expect(actions.RegisterUserError(error)).toEqual(expectedAction)
    });

    it('should return an action to authenticate user', () => {
        const response = {data: {data: {auth_token: 'token'}}};
        const expectedAction = {
            type: types.LOGIN
        };

        expect(actions.LoginUserSuccess(response)).toEqual(expectedAction)
    });

    it('should return an action indicating login error', () => {
        const error = {response: {data: {}}};
        const expectedAction = {
            type: types.LOGIN_ERROR,
            payload: error.response.data
        };

        expect(actions.LoginUserError(error)).toEqual(expectedAction)
    });

    it('should return an action indicating logout error', () => {
        const error = {data: {}};
        const expectedAction = {
            type: types.LOGOUT_ERROR,
            payload: error.data
        };

        expect(actions.LogoutUserError(error)).toEqual(expectedAction)
    });

    it('should return an action indicating user info retrieved', () => {
        const response = {};
        const expectedAction = {
            type: types.USER_INFO,
            payload: response
        };

        expect(actions.fetchUserInfoSuccess(response)).toEqual(expectedAction)
    });

    it('should return an action indicating user info retrieval failed', () => {
        const error = {data: {}};
        const expectedAction = {
            type: types.USER_INFO_ERROR,
            payload: error.data
        };

        expect(actions.fetchUserInfoError(error)).toEqual(expectedAction)
    });

    it('should return an action indicating user update info success', () => {
        const response = {};
        const expectedAction = {
            type: types.UPDATE_USER_INFO,
            payload: response
        };

        expect(actions.updateUserInfoSuccess(response)).toEqual(expectedAction)
    });


    it('should return an action user info update error', () => {
        const error = {response: {data: {}}};
        const expectedAction = {
            type: types.USER_INFO_ERROR,
            payload: error.response.data
        };

        expect(actions.updateUserInfoError(error)).toEqual(expectedAction)
    });

    it('should return an action delete user account', () => {
        const response = {};
        const expectedAction = {
            type: types.DELETE_USER_ACCOUNT,
            payload: response
        };

        expect(actions.deleteUserAccountSuccess(response)).toEqual(expectedAction)
    });

    it('should return an action delete account failure', () => {
        const error = {response: {data: {}}};
        const expectedAction = {
            type: types.DELETE_USER_ACCOUNT_ERROR,
            payload: error.response.data
        };

        expect(actions.deleteUserAccountError(error)).toEqual(expectedAction)
    });

    it('should return an action to get reset token', () => {
        const response = {};
        const expectedAction = {
            type: types.GET_RESET_TOKEN,
            payload: response
        };

        expect(actions.getResetTokenSuccess(response)).toEqual(expectedAction)
    });

    it('should create an action to alert successful message', () => {
        const msg = 'Success';
        const expectedAction = {
            type: types.SUCCESS_ALERT,
            payload: msg
        };

        expect(actions.successfulOperation(msg)).toEqual(expectedAction)
    });

    it('should create an action to clear alert messages', () => {
        const expectedAction = {
            type: types.CLEAR_ALERT
        };

        expect(actions.clearAlertMessage()).toEqual(expectedAction)
    });

    it('should create an action to provide item to edit id', () => {
        const ID = 12;
        const expectedAction = {
            type: types.ITEM_ID,
            payload: ID
        };

        expect(actions.itemToEditId(ID)).toEqual(expectedAction)
    });
});