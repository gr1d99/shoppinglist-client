import { alertsReducer } from "../../src/reducers/alerts";
import { initialState } from "../../src/reducers/alerts";
import {
    SUCCESS_ALERT,
    WARNING_ALERT,
    ERROR_ALERT,
    CLEAR_ALERT } from "../../src/actions/ActionTypes";


describe('Alert reducer', () => {
    it('has a default state', () => {
        expect(alertsReducer(
            undefined,
            {type: 'unexpected'}))
            .toEqual(initialState);
    })

    it('handles SUCCESS_ALERT', () => {
        expect(alertsReducer(
            undefined,
            {type: SUCCESS_ALERT, payload: 'success'}))
            .toEqual({
                success_message: 'success',
                warning_message: '',
                error_message: '',
                category: SUCCESS_ALERT
            })
    })

    it('handles WARNING_ALERT', () => {
        expect(alertsReducer(
            undefined,
            {type: WARNING_ALERT, payload: 'warning'}))
            .toEqual({
                success_message: '',
                warning_message: 'warning',
                error_message: '',
                category: WARNING_ALERT
            })
    })

    it('handles ERROR_ALERT', () => {
        expect(alertsReducer(
            undefined,
            {type: ERROR_ALERT, payload: 'error'}))
            .toEqual({
                success_message: '',
                warning_message: '',
                error_message: 'error',
                category: ERROR_ALERT
            })
    })

    it('handles CLEAR_ALERT', () => {
        expect(alertsReducer(
            undefined,
            {type:  CLEAR_ALERT}))
            .toEqual(initialState)
    })
});