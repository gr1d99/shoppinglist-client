import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SubmitButton  from '../../components/common/Button';
import { LoginUser } from "../../dispatchers";
import { conditionedComponents } from "./helpers";
import { backButton } from "../../components/common/BackButton";


export class Login extends React.Component {
    /* Renders login form and submits request
     * to backend */

    constructor (props) {
        super (props);

        this.state = {
            username: '',
            password: '',
        }
    }

    handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        let obj = {};
        obj[key] = value;
        this.setState(obj);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.loginUser(this.props.history, this.state);
    };

    getErrorMessages = field => {
        /* Checks if an error exists for a specific
         * field and displays it */

        if (this.props.auth.login_errors) {
            if (this.props.auth.login_errors.messages) {
                if (this.props.auth.login_errors.messages.hasOwnProperty(field)) {
                    return (
                        this.props.auth.login_errors.messages[field].map(error => {
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
                <div className="thumbnail login">
                    <h3 className="login-header text-center">Login</h3>

                    <form className="login-form" method="post" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text"
                                   value={this.props.username}
                                   className="form-control"
                                   name="username"
                                   id='id_username'
                                   placeholder="Your username"
                                   onChange={this.handleChange}/>
                            {this.getErrorMessages('username')}
                        </div>

                        <div className="form-group">
                            <input type="password"
                                   id='id_password'
                                   className="form-control"
                                   name="password"
                                   value={this.props.password}
                                   placeholder="Your password"
                                   onChange={this.handleChange}/>
                            {this.getErrorMessages('password')}
                        </div>

                        <SubmitButton
                            type='submit'
                            className='btn btn-success'
                            value='Login'/>

                        <Link to="/forgot-password" className="pull-right">Forgot Password</Link>

                    </form>

                </div>
            </div>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: bindActionCreators(LoginUser, dispatch)
    }
};

const mapStateToProps = ({auth}) => {
    return {auth}
};

export default connect(mapStateToProps, mapDispatchToProps)(conditionedComponents(backButton(Login)))