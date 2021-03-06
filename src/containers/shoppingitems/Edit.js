import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import { updateShoppingListItem } from "../../dispatchers/index";
import SubmitButton  from '../../components/common/Button';
import { loginRequired } from "../auth/helpers/index";
import { backButton } from "../../components/common/BackButton";
import Loading from '../../components/common/Loading'
import * as actions from "../../actions";

export class EditShoppingListItem extends React.Component {
    /* Handle editing of shopping list item functionality */

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: '',
            quantity_description: '',
            bought: null
        };
    }

    componentWillMount = () => {
        /* fetch shopping item details before components mount */

        const { isAuthenticated } = this.props.auth;

        switch (isAuthenticated) {
            /* Check if user is authenticated */
            case true:
                if (this.props.shoppingItem.shlItemDetail) {
                    const { name, price, quantity_description, bought } = this.props.shoppingItem.shlItemDetail;
                    this.setState({name, price, quantity_description, bought })}
                return;

            // REDIRECT USERS TO LOGIN IF THEY ARE NOT AUTHENTICATED.
            case false:
                return this.props.history.push('/login');

            default:
                return this.props.history.push('/login');
        }
    };


    handleChange = e => {
        /* Listen for changes in form and update state */

        const key = e.target.name;
        let value = e.target.value;
        key === 'bought' && (value = e.target.checked);

        let obj = {};

        obj[key] = value;
        this.setState(obj);
    };

    handleSubmit = e => {
        /* Submit proposed changes */

        const shlId = this.props.shoppingItem.shlId;
        const itemId = this.props.match.params.id;

        e.preventDefault();

        this.props.updateShoppingListItem(
            this.props.history,
            shlId,
            itemId,
            this.state);
        this.props.dispatch(actions.activateLoading()) // activate loading
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

    render() {
        return (
            <div className="col-sm-6 col-sm-offset-3">

                <div className="thumbnail shopping-item-edit">

                    <h3 className="text-center heading">Edit</h3>

                    <form className="form shopping-item-edit" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                id='id_name'
                                placeholder="Name"
                                onChange={this.handleChange}
                                value={this.state.name}/>
                            {this.getErrorMessages('name')}
                        </div>
                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                name="price"
                                id="id_price"
                                placeholder="Price"
                                onChange={this.handleChange}
                                value={this.state.price}
                                step=".01"
                                min={0}/>
                            {this.getErrorMessages('price')}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="quantity_description"
                                id="id_quantity"
                                placeholder="Quantity description"
                                onChange={this.handleChange}
                                value={this.state.quantity_description}/>
                            {this.getErrorMessages('quantity_description')}
                        </div>

                        <div className="form-group">
                            <input
                                type="checkbox"
                                name="bought"
                                id='id_bought'
                                onChange={this.handleChange}
                                checked={this.state.bought}/> Bought
                            {this.getErrorMessages('bought')}
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
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateShoppingListItem: bindActionCreators(updateShoppingListItem, dispatch),
        dispatch
    }
};

const mapStateToProps = ({shoppingItem, auth, loader}) => {
    return {shoppingItem, auth, loader}
};

export default connect(mapStateToProps, mapDispatchToProps)(loginRequired(backButton(EditShoppingListItem)))