import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { backButton } from "../../common/BackButton";
import SubmitButton  from '../../common/button';
import { getPasswordResetToken } from "../../../dispatchers";

class GetResetToken extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            email: '',
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
        this.props.getPasswordResetToken(this.props.history, this.state);
    };

    getErrorMessages = field => {
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
                <div className="thumbnail get-password-reset-token">


                    <h3 className="text-center">Get Password Reset Token</h3>

                    <form className="form account-edit-form" method="post" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text"
                                   className="form-control"
                                   name="email"
                                   placeholder="Your email"
                                   onChange={this.handleChange}/>
                            {this.getErrorMessages('email')}
                        </div>

                        <SubmitButton
                            type='submit'
                            className='btn btn-success'
                            value='Proceed'/>
                    </form>

                </div>
            </div>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPasswordResetToken: bindActionCreators(getPasswordResetToken, dispatch)
    }
};

const mapStateToProps = ({auth}) => {
    return {auth}
};

export default connect(mapStateToProps, mapDispatchToProps)(backButton(GetResetToken));