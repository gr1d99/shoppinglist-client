import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { createShoppingItem } from "../../dispatchers/index";
import SubmitButton  from '../../components/common/Button';
import { loginRequired } from "../auth/helpers/index";
import { backButton } from "../../components/common/BackButton";
import Loading from '../../components/common/Loading'
import * as actions from "../../actions";

export class CreateShoppingItem extends React.Component {
    /* Handles creation of shopping item */

    constructor (props) {
        super (props);

        this.state = {
            name: '',
            price: '',
            quantity: ''
        }
    }

    handleChange = (e) => {
        /* Listen for changes in
         * form and update state */

        const key = e.target.name;
        const value = e.target.value;
        let obj = {};

        obj[key] = value;
        this.setState(obj);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const shlId = this.props.match.params.id;
        this.props.createShoppingList(
            this.props.history,
            shlId,
            this.state);
        this.props.dispatch(actions.activateLoading())
    };

    getErrorMessages = field => {
        /* Checks if an error exists for a specific
         * field and displays it */

        if (this.props.shoppingItem.error_messages) {
            if (this.props.shoppingItem.error_messages.messages) {
                if (this.props.shoppingItem.error_messages.messages.hasOwnProperty(field)) {
                    return (
                        this.props.shoppingItem.error_messages.messages[field].map(error => {
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
                    <div className="thumbnail shopping-item-create">

                        <h3 className="text-center heading">Add Item to Shopping List</h3>

                        <form className="form shopping-item-create" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    id="id_name"
                                    placeholder="Name"
                                    onChange={this.handleChange}
                                    value={this.state.name}/>
                                {this.getErrorMessages('name')}
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    id="id_price"
                                    className="form-control"
                                    name="price"
                                    placeholder="Price"
                                    onChange={this.handleChange}
                                    value={this.state.price} step=".01"
                                    min={0}/>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="quantity"
                                    id='id_quantity'
                                    placeholder="Quantity description"
                                    onChange={this.handleChange}
                                    value={this.state.quantity}/>
                                {this.getErrorMessages('quantity')}
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

const mapStateToProps = ({shoppingItem, auth, loader}) => {
    return {shoppingItem, auth, loader}
}

const mapDispatchToProps = dispatch => {
    return {
        createShoppingList: bindActionCreators(createShoppingItem, dispatch),
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(loginRequired(backButton(CreateShoppingItem)));