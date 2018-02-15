import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SubmitButton  from '../../components/common/Button';
import { registerUser } from "../../dispatchers";
import { conditionedComponents } from "./helpers";
import { backButton } from "../../components/common/BackButton";
import Loading from '../../components/common/Loading'
import * as actions from "../../actions";

export class SignUp extends React.Component {
    /* Handles user sign-up/registration functionality */

    constructor (props) {
        super(props);

        // default internal state
        this.state = {
            username: '',
            email: '',
            password: '',
            confirm: '',
        }
    }

    componentWillReceiveProps = () => {
        /* when clean up action is fired clear the
          * internal state values. */

        const { cleanup_required } = this.props.cleanup;
        switch (cleanup_required) {
            case true:
                return this.setState({
                    username: '',
                    email: '',
                    password: '',
                    confirm: '',
                });

            case false:
                return '';

            default:
                return '';
        }
    };

    handleChange = (e) => {
        /* Listen for changes in the form and update
         * internal state */

        const key = e.target.name;
        const value = e.target.value;
        let obj = {};

        obj[key] = value;

        this.setState(obj);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.registerUser(this.props.history, this.state);
        this.props.dispatch(actions.activateLoading())
    };

    getErrorMessages = field => {
        /* Checks if an error exists for a specific
         * field and displays it */

        if (this.props.auth.signup_errors) {
            if (this.props.auth.signup_errors.messages) {
                if (this.props.auth.signup_errors.messages.hasOwnProperty(field)) {
                    return (
                        this.props.auth.signup_errors.messages[field].map(error => {
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
                    <div className="thumbnail signup">

                        <h3 className="text-center">Signup</h3>

                        <form className="signup-form" method="post" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text"
                                       className="form-control"
                                       name="username"
                                       placeholder="Your username"
                                       onChange={this.handleChange}/>
                                {this.getErrorMessages('username')}
                            </div>

                            <div className="form-group">
                                <input type="email"
                                       className="form-control"
                                       name="email"
                                       placeholder="Your email"
                                       onChange={this.handleChange}/>
                                {this.getErrorMessages('email')}
                            </div>

                            <div className="form-group">
                                <input type="password"
                                       className="form-control"
                                       name="password"
                                       placeholder="Your password"
                                       onChange={this.handleChange}/>
                                {this.getErrorMessages('password')}
                            </div>

                            <div className="form-group">
                                <input type="password"
                                       className="form-control"
                                       name="confirm"
                                       placeholder="Confirm password"
                                       onChange={this.handleChange}/>
                                {this.getErrorMessages('confirm')}
                            </div>

                            {this.props.loader.isLoading ? <Loading/> :
                                <SubmitButton
                                    type='submit'
                                    className='btn btn-success'
                                    value='Create Account'/>
                            }

                            <p className="pull-right">Have an account? <span><Link to="/login">Login</Link></span>
                            </p>
                        </form>

                    </div>
                </div>

            );

    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerUser: bindActionCreators(registerUser, dispatch),
        dispatch
    }
};

const mapStateToProps = ({auth, cleanup, loader}) => {
    return {auth, cleanup, loader}
};

export default connect(mapStateToProps, mapDispatchToProps)(conditionedComponents(backButton(SignUp)))