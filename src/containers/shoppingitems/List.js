import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

import { fetchShoppingItems, getUserShoppingListItemDetail, deleteShoppingItem } from "../../dispatchers/index";
import { itemToEditId } from "../../actions/index";
import { loginRequired } from "../auth/helpers/index";
import { backButton } from "../../components/common/BackButton";

import DataTable, { destroyDataTable} from './initItems';

export class List extends React.Component {
    /* Handles shopping items retrieval */

    componentDidMount = () => {
        /* When component mounts, retrieve all shopping items */

        const { isAuthenticated } = this.props.auth;

        // User should be authenticated else redirect the user back to login
        switch (isAuthenticated) {
            case true:
                const shlId = this.props.match.params.id;
                this.props.fetchShoppingItems(this.props.history, shlId);

                return;

            case false:
                return this.props.history.push('/login');

            default:
                return this.props.history.push('/login');
        }
    };

    componentWillUpdate() {
        destroyDataTable("#items-list");
    }


    componentDidUpdate() {
        DataTable("#items-list");
    }

    handleEditClick = (shlId, itemId) => e => {
        /* Take user to item edit page and also fetch shopping item details */

        e.preventDefault();

        this.props.getUserShoppingListItemDetail(this.props.history, shlId, itemId);
        this.props.itemToEditId(shlId)
    };

    handleDelete = (shlId, itemid) => e => {
        confirmAlert({
            title: 'Click confirm to delete',
            confirmLabel: 'Confirm',
            cancelLabel: 'Cancel',
            onConfirm: () => this.props.deleteShoppingItem(this.props.history, shlId, itemid)
        });
    };

    renderBoughtField = status => {
        return <span className={status ? 'glyphicon glyphicon-ok-circle': 'glyphicon glyphicon-remove-sign'}></span>
    };

    renderShoppingItems = () => {
        /* Render all shopping items in a table */

        const shlId = this.props.match.params.id;

        if (this.props.shoppingItem.items) {
            if (this.props.shoppingItem.items.shopping_items) {
                return this.props.shoppingItem.items.shopping_items.map(
                    item => {
                        let {id, name, price, bought, quantity_description, created_on, updated_on} = item;
                        return (
                            <tr key={id}>
                                <td>{name}</td>
                                <td>{price}</td>
                                <td>{bought ? this.renderBoughtField(true) : this.renderBoughtField(false)}</td>
                                <td>{quantity_description}</td>
                                <td>{created_on}</td>
                                <td>{updated_on}</td>
                                <td>
                                    <Link id="btn edit-item" onClick={this.handleEditClick(shlId, id)}
                                          className='btn btn-info btn-xs'
                                          to={`../../shoppinglists/${shlId}/items/${id}/edit`}>
                                        <span className="glyphicon glyphicon-pencil"></span>
                                    </Link>
                                    <button id="btn edit-delete"
                                            className='btn btn-danger btn-xs'
                                            onClick={this.handleDelete(shlId, id)}>
                                        <span className="glyphicon glyphicon-trash"></span>
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                )
            }
        } else {
            return <div><h1>Loading..</h1></div>
        }
    };

    render () {
        return (
            <div className="row">
                <div className="create-link text-center">
                    <Link className="btn btn-success btn-xs"
                          to={`../../shoppinglists/${this.props.match.params.id}/items/create`}>
                        <span className="glyphicon glyphicon-plus-sign">
                        </span> Add new</Link>
                    <br/>
                    <br/>
                </div>
                <div className="col-lg-12">
                    <table className="table table-hover" id="items-list">
                        <caption className="text-center">
                            <h4>Items</h4>
                        </caption>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price (Kes)</th>
                            <th>Bought</th>
                            <th>Quantity Description</th>
                            <th>Date Added</th>
                            <th>Date Modified</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderShoppingItems()}
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
}

const mapStateToProps = ({shoppingItem, auth}) => {
    return {shoppingItem, auth}
}

const mapDispatchToProps = dispatch => {
    return {
        fetchShoppingItems: bindActionCreators(fetchShoppingItems, dispatch),
        getUserShoppingListItemDetail: bindActionCreators(getUserShoppingListItemDetail, dispatch),
        deleteShoppingItem: bindActionCreators(deleteShoppingItem, dispatch),
        itemToEditId: bindActionCreators(itemToEditId, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(loginRequired(backButton(List)))