import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { clearAlertMessage } from "../../actions";
import { ERROR_ALERT, SUCCESS_ALERT, WARNING_ALERT } from "../../actions/ActionTypes";

const TIMEOUT = 5000;


class AlertMessages extends React.Component {
    displayAlerts = () => {
        switch (this.props.alerts.category) {
            case SUCCESS_ALERT:
                setTimeout(() => {
                    this.props.clearAlertMessage()
                }, TIMEOUT);
                return (
                    <div className="alert alert-success alert-dismissible" role="alert">
                        <button type="button"
                                className="close"
                                data-dismiss="alert"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        {this.props.alerts.success_message}
                    </div>
                );

            case WARNING_ALERT:
                setTimeout(() => {
                    this.props.clearAlertMessage()
                }, TIMEOUT);
                return (
                    <div className="alert alert-warning alert-dismissible" role="alert">
                        <button type="button"
                                className="close"
                                data-dismiss="alert"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        {this.props.alerts.warning_message}
                    </div>
                );

            case ERROR_ALERT:
                setTimeout(() => {
                    this.props.clearAlertMessage()
                }, TIMEOUT);
                return (
                    <div className="alert alert-danger alert-dismissible" role="alert">
                        <button type="button"
                                className="close"
                                data-dismiss="alert"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        {this.props.alerts.error_message}
                    </div>
                );

            default:
                return <div></div>
        }
    };

    render () {
        return this.displayAlerts()
    }
}

const mapStateToProps = ({alerts}) => {
    return {alerts}
};

const mapDispatchToProps = dispatch => {
    return {
        clearAlertMessage: bindActionCreators(clearAlertMessage, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertMessages)