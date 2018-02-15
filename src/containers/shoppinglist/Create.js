import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createShoppingList} from "../../dispatchers";
import SubmitButton from '../../components/common/Button'
import { loginRequired } from "../auth/helpers";
import { backButton } from "../../components/common/BackButton";
import Loading from '../../components/common/Loading'
import * as actions from "../../actions";

export class CreateShoppingList extends React.Component {
    /* Handle creation of shopping list functionality */

    constructor (props) {
        super (props);

        this.state = {
            name: '',
            description: '',
        }
    }

    handleChange = (e) => {
        /* Listen for changes in form and update state */

        const key = e.target.name;
        const value = e.target.value;
        let obj = {};

        obj[key] = value;

        this.setState(obj);
    };

    handleSubmit = (e) => {
        /* Submit form data to backend */

        e.preventDefault();
        this.props.createShoppingList(this.props.history, this.state);
        this.props.dispatch(actions.activateLoading()) // activate loading
    };

    getErrorMessages = field => {
        /* Checks if an error exists for a specific
         * field and displays it */

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

                        <h3 className="text-center">Create Shopping List</h3>

                        <form className="form shoppinglist-create" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="id_name"
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
                                id="id_description"
                                placeholder="Description"
                                onChange={this.handleChange}
                                value={this.state.description}/>
                            </div>

                            {this.props.loader.isLoading ? <Loading/> :
                                <SubmitButton
                                    type='submit'
                                    className='btn btn-success'
                                    value='Submit'/>
                            }

                        </form>

                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = ({shoppingList, auth, loader}) => {
    return {shoppingList, auth, loader}
};

const mapDispatchToProps = dispatch => {
    return {
        createShoppingList: bindActionCreators(createShoppingList, dispatch),
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(loginRequired(backButton(CreateShoppingList)));