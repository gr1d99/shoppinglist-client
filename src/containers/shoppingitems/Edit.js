import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import { updateShoppingListItem } from "../../dispatchers/index";
import SubmitButton  from '../../components/common/button';
import { loginRequired } from "../auth/helpers";
import { backButton } from "../../components/common/BackButton";

class EditShoppingListItem extends React.Component {
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
        const { isAuthenticated } = this.props.auth;
        switch (isAuthenticated) {
            case true:
                if (this.props.shoppingItem.shlItemDetail) {
                    const { name, price, quantity_description, bought } = this.props.shoppingItem.shlItemDetail;
                    this.setState({name, price, quantity_description, bought })}
                return;

            case false:
                return this.props.history.push('/login');

            default:
                return this.props.history.push('/login');
        }
    }


    handleChange = e => {
        const key = e.target.name;
        let value = e.target.value;
        key === 'bought' && (value = e.target.checked);

        let obj = {};

        obj[key] = value;
        this.setState(obj);
    };

    handleSubmit = e => {
        const shlId = this.props.shoppingItem.shlId;
        const itemId = this.props.match.params.id;
        e.preventDefault();
         this.props.updateShoppingListItem(
            this.props.history,
            shlId,
            itemId,
            this.state)};

    getErrorMessages = field => {
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

                    <h3 className="text-center">Edit</h3>

                    <form className="form shopping-item-edit" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="name"
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
                                placeholder="Quantity description"
                                onChange={this.handleChange}
                                value={this.state.quantity_description}/>
                            {this.getErrorMessages('quantity_description')}
                        </div>

                        <div className="form-group">
                            <input
                                type="checkbox"
                                name="bought"
                                onChange={this.handleChange}
                                checked={this.state.bought}/> Bought
                            {this.getErrorMessages('bought')}
                        </div>

                        <SubmitButton
                            type='submit'
                            className='btn btn-success'
                            value='Submit' />

                    </form>

                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateShoppingListItem: bindActionCreators(updateShoppingListItem, dispatch),
    }
};

const mapStateToProps = ({shoppingItem, auth}) => {
    return {shoppingItem, auth}
};

export default connect(mapStateToProps, mapDispatchToProps)(loginRequired(backButton(EditShoppingListItem)))