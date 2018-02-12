import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

import { fetchShoppingItems, getUserShoppingListItemDetail, deleteShoppingItem } from "../../dispatchers";
import { itemToEditId } from "../../actions";
import { loginRequired } from "../auth/helpers";
import { backButton } from "../../components/common/BackButton";

class List extends React.Component {

    componentDidMount = () => {
        const { isAuthenticated } = this.props.auth;
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

    handleEditClick = (shlId, itemId) => e => {
        e.preventDefault();
        this.props.getUserShoppingListItemDetail(this.props.history, shlId, itemId);
        this.props.itemToEditId(shlId)

    };

    handleClick = url => e => {
        const shlId = this.props.match.params.id;
        e.preventDefault();
        this.props.fetchShoppingItems(
            this.props.history,
            shlId,
            url)
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

    pageMetaData = (location) => {
        if (this.props.shoppingItem.items) {
            const {
                total_items,
                current_page,
                next_page,
                total_pages,
                next_page_url,
                previous_page_url
            } = this.props.shoppingItem.items;

            switch (location) {
                case 'up':
                    return <span>({total_items > 0 ? total_items : 0})</span>;

                case 'down':
                    if (next_page > 0 || current_page > 1) {
                        return (
                            <div>
                                <button onClick={this.handleClick(next_page_url)} className="pull-right">Next
                                    Page {next_page}</button>
                                <span className="text-center page-info">Page {current_page} of {total_pages}</span>
                                <button onClick={this.handleClick(previous_page_url)} className="pull-left">Previous
                                    Page
                                </button>
                            </div>
                        );
                    } else {
                        return ''
                    }

                default:
                    return ''
            }
        } else {
            return <div><h1>Loading..</h1></div>
        }
    };

    renderShoppingItems = () => {
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
                                        Edit
                                    </Link>
                                    <button id="btn edit-delete"
                                            className='btn btn-danger btn-xs'
                                            onClick={this.handleDelete(shlId, id)}>
                                        Delete
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
                    <table className="table table-hover">
                        <caption className="text-center">
                            <h4>Items {this.pageMetaData('up')}</h4>
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
                    <div className="col-lg-12">
                        { this.pageMetaData('down') }
                    </div>
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