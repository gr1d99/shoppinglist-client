import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import { updateShoppingList, getUserShoppingListDetail } from "../../dispatchers/index";
import { loginRequired } from "../auth/helpers";
import { backButton } from "../../components/common/BackButton";

class EditShoppingList extends React.Component {
    /* Render shopping list edit form */

    constructor(props) {
        super(props);

        console.log('edit', this.props)

        this.state = {
            name: '',
            description: ''
        }

    }

    componentWillMount = () => {
        /* Fetch user shopping list before component mounts */

        const {isAuthenticated} = this.props.auth;

        /* Check if user is authenticated */
        switch (isAuthenticated) {
            case true:
                const shlId = this.props.match.params.id;
                this.props.getUserShoppingListDetail(this.props.history, shlId);

                if (this.props.shoppingList.shlDetail) {
                    const {name, description} = this.props.shoppingList.shlDetail;
                    this.setState({name, description})
                }
                return;

            case false:
                return this.props.history.push('/login');

            default:
                return this.props.history.push('/login');
        }
    };

    handleChange = e => {
        /* Listen for changes in edit form and update component state */

        const key = e.target.name;
        const value = e.target.value;
        let obj = {};

        obj[key] = value;
        this.setState(obj);
    };

    handleSubmit = e => {
        /* Submit new changes */

        const shlId = this.props.match.params.id;

        e.preventDefault();
        this.props.updateShoppingList(
            this.props.history,
            shlId,
            this.state
        )
    };

    render() {
        return (
            <div className="col-sm-6 col-sm-offset-3">

                <div className="thumbnail shoppinglist-edit">

                    <h3 className="text-center">Edit</h3>

                    <form className="form shoppinglist-edit" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="id_name">Name</label>
                            <input
                                id="id_name"
                                className="form-control"
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="id_description">Description</label>
                            <textarea
                                id="id_description"
                                className="form-control"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleChange}>
                            </textarea>
                        </div>

                        <button type="submit" className="btn btn-info">Update</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateShoppingList: bindActionCreators(updateShoppingList, dispatch),
        getUserShoppingListDetail: bindActionCreators(getUserShoppingListDetail, dispatch),
    }
}

const mapStateToProps = ({shoppingList, auth}) => {
    return {shoppingList, auth}
}

export default connect(mapStateToProps, mapDispatchToProps)(loginRequired(backButton(EditShoppingList)))