import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { backButton } from "../../common/BackButton";

const ShowResetToken = (props) => {
    if (props.auth.password_reset_token) {
        return (
            <div className="well-lg">
                <p className="text-center">Your password reset token
                    is <strong>{props.auth.password_reset_token}</strong>
                </p>
                <p className="text-center">
                    <Link className="btn btn-success btn-xs" to="/forgot-password/reset">Change Password</Link>
                </p>

            </div>
        )
    } else {
        return (
            <div className="well-lg">
                <p className="text-center">Oops!! it appears your reset token has expired, kindly request a new one.</p>
            </div>
        )
    }
};


const mapStateToProps = ({auth}) => {
    return {auth}
};


export default connect(mapStateToProps, null)(backButton(ShowResetToken));