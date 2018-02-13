import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createShoppingList} from "../../dispatchers";
import SubmitButton from '../../components/common/button'
import { loginRequired } from "../auth/helpers";
import { backButton } from "../../components/common/BackButton";


class CreateShoppingList extends React.Component {
    constructor (props) {
        super (props);

        this.state = {
            name: '',
            description: '',
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
        this.props.createShoppingList(this.props.history, this.state)
    };

    getErrorMessages = field => {
        if (this.props.shoppingList.error_messages) {
            if (this.props.shoppingList.error_messages.messages) {
                if (this.props.shoppingList.error_messages.messages.hasOwnProperty(field)) {
                    return (
                        this.props.shoppingList.error_messages.messages[field].map(error => {
                            return <p className="text-danger" key={error}>{error}</p>
                        })
                    )
                }
            }
        }
    };

    render () {
        return (
            <div>
                <div className="col-sm-6 col-sm-offset-3">
                    <div className="thumbnail shoppinglist-create">

                        <h3 className="text-center">Create new Shopping List</h3>

                        <form className="form shoppinglist-create" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Name"
                                    onChange={this.handleChange}
                                    value={this.state.name}/>
                                <span>
                                    { this.getErrorMessages('name') }
                                </span>
                            </div>


                            <div className="form-group">
                            <textarea
                                className="form-control"
                                name="description"
                                placeholder="Description"
                                onChange={this.handleChange}
                                value={this.state.description}/>
                            </div>

                            <SubmitButton
                                type='submit'
                                className='btn btn-success'
                                value='Submit' />

                        </form>

                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = ({shoppingList, auth}) => {
    return {shoppingList, auth}
};

const mapDispatchToProps = dispatch => {
    return {
        createShoppingList: bindActionCreators(createShoppingList, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(loginRequired(backButton(CreateShoppingList)));