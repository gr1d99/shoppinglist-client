import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { backButton } from "../../../components/common/BackButton";
import SubmitButton  from '../../../components/common/Button';
import { resetUserPassword } from "../../../dispatchers";
import Loading from '../../../components/common/Loading'
import * as actions from "../../../actions";

class ResetPassword extends React.Component {
    /* Takes in input required to reset the user and posts them
     * to the api */
    constructor (props) {
        super (props);

        this.state = {
            username: '',
            new_password: '',
            confirm: '',
            password_reset_token: '',
        }
    }

    handleChange = (e) => {
        /* Listen for changes in the form
         * and update component internal
          * state */

        const key = e.target.name;
        const value = e.target.value;
        let obj = {};

        obj[key] = value;
        this.setState(obj);
    };

    handleSubmit = (e) => {
        /* Submits provided data */

        e.preventDefault();
        this.props.resetUserPassword(this.props.history, this.state);
        this.props.dispatch(actions.activateLoading()) // activate loading
    };

    getErrorMessages = field => {
        /* Checks if an error exists for a specific
         * field and displays it */

        if (this.props.auth.reset_password_errors) {
            if (this.props.auth.reset_password_errors.messages) {
                if (this.props.auth.reset_password_errors.messages.hasOwnProperty(field)) {
                    return (
                        this.props.auth.reset_password_errors.messages[field].map(error => {
                            return <p className="text-danger" key={error}>{error}</p>
                        })
                    )
                }
            }
        }
    };

    render () {
        return (

            <div className="col-sm-6 col-sm-offset-3">
                <div className="thumbnail account-password-reset">

                    <h3 className="text-center">Reset Password</h3>

                    <form className="form account-password-reset-form" method="post" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text"
                                   className="form-control"
                                   name="username"
                                   placeholder="Your username"
                                   onChange={this.handleChange}/>
                            {this.getErrorMessages('username')}
                        </div>

                        <div className="form-group">
                            <input type="password"
                                   className="form-control"
                                   name="new_password"
                                   placeholder="New password"
                                   onChange={this.handleChange}/>
                            {this.getErrorMessages('new_password')}
                        </div>

                        <div className="form-group">
                            <input type="password"
                                   className="form-control"
                                   name="confirm"
                                   placeholder="Confirm password"
                                   onChange={this.handleChange}/>
                            {this.getErrorMessages('confirm')}
                        </div>

                        <div className="form-group">
                            <input type="password_reset_token"
                                   className="form-control"
                                   name="password_reset_token"
                                   placeholder="Password reset token"
                                   onChange={this.handleChange}/>
                            {this.getErrorMessages('reset_token')}
                        </div>

                        {this.props.loader.isLoading ? <Loading/> :
                            <SubmitButton
                                type='submit'
                                className='btn btn-success'
                                value='Proceed'/>
                        }

                    </form>

                </div>
            </div>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetUserPassword: bindActionCreators(resetUserPassword, dispatch),
        dispatch
    }
};

const mapStateToProps = ({auth, loader}) => {
    return {auth, loader}
};

export default connect(mapStateToProps, mapDispatchToProps)(backButton(ResetPassword));