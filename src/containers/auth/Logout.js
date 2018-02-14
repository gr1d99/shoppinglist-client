import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { LogoutUser} from "../../dispatchers";
import { loginRequired } from "./helpers";
import { backButton } from "../../components/common/BackButton";

export class LogoutUserComponent extends React.Component {
    /* Handles user logout functionality */

    handleLogout = e => {
        e.preventDefault();
        this.props.LogoutUser(this.props.history)
    };

    render () {
        return (
            <div className="text-center">
                <h2 className="logout-heading">Sign Out</h2>

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