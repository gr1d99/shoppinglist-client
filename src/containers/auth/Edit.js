import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import SubmitButton  from '../../components/common/Button';
import { backButton } from "../../components/common/BackButton";
import { updateUserInfo } from "../../dispatchers";
import { loginRequired } from "./helpers";
import Loading from '../../components/common/Loading'
import * as actions from "../../actions";

class Edit extends React.Component {
    /* Renders user account edit form */

    constructor (props) {
        super(props);

        this.state = {
            username: '',
        }
    }

    componentWillReceiveProps = () => {
        const { cleanup_required } = this.props.cleanup;
        switch (cleanup_required) {
            case true:
                return this.setState({
                    username: '',
                });

            case false:
                return '';

            default:
                return '';
        }
    };

    handleChange = (e) => {
        /* Listen for changes in the form
         * and update component internal
          * state*/

        const key = e.target.name;
        const value = e.target.value;
        let obj = {};

        obj[key] = value;
        this.setState(obj);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateUserInfo(this.props.history, this.state);
        this.props.dispatch(actions.activateLoading())
    };

    getErrorMessages = field => {
        /* Checks if an error exists for a specific
         * field and displays it */

        if (this.props.auth.edit_errors) {
            if (this.props.auth.edit_errors.messages) {
                if (this.props.auth.edit_errors.messages.hasOwnProperty(field)) {
                    return (
                        this.props.auth.edit_errors.messages[field].map(error => {
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
                <div className="thumbnail account-edit">


                    <h3 className="text-center">Update Account</h3>

                    <form className="form account-edit-form" method="post" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text"
                                   className="form-control"
                                   name="username"
                                   placeholder="Your username"
                                   onChange={this.handleChange}/>
                            {this.getErrorMessages('username')}
                        </div>

                        {this.props.loader.isLoading ? <Loading/> :
                            <SubmitButton
                                type='submit'
                                className='btn btn-success'
                                value='Update Account'/>
                        }
                    </form>

                </div>
            </div>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUserInfo: bindActionCreators(updateUserInfo, dispatch),
        dispatch
    }
};

const mapStateToProps = ({auth, cleanup, loader}) => {
    return {auth, cleanup, loader}
};

export default connect(mapStateToProps, mapDispatchToProps)(loginRequired(backButton(Edit)));