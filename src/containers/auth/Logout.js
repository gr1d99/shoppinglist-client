import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { LogoutUser} from "../../dispatchers";
import { loginRequired } from "./helpers";
import { backButton } from "../../components/common/BackButton";

class LogoutUserComponent extends React.Component {

    handleLogout = () => {
        this.props.LogoutUser(this.props.history)
    };

    getErrorMessage = () => {
        console.log(this.props.auth);
        if (this.props.auth.login_errors) {
            if (this.props.auth.login_errors.message) {
                return (
                    <p className="text-danger text-justified">{this.props.auth.login_errors.message}</p>
                )
            }
        }
    };

    render () {
        return (
            <div className="text-center">
                <h2>Sign Out</h2>

                {this.getErrorMessage()}

                <button onClick={this.handleLogout} className="btn btn-danger">Logout</button>
            </div>
        );
    }
}


const mapStateToProps = ({auth}) => {
    return {auth}
};

const mapDispatchToProps = dispatch => {
    return {
        LogoutUser: bindActionCreators(LogoutUser, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(loginRequired(backButton(LogoutUserComponent)))