import React from 'react';
import { Link } from 'react-router-dom';


const AppLinks = props => {
    /* Render appropriate links based on whether the user is authenticated or not */

    if (props.isAuthenticated) {
        /* Render links that require user to be authenticated */

        return (
            <ul className="nav navbar-nav navbar-right">

                <li>
                    <Link
                        to="/dashboard">
                        <span className="glyphicon glyphicon-cog"></span> My Account
                    </Link>
                </li>

                <li>
                    <Link
                        to="/logout">
                        <span className="glyphicon glyphicon-log-out"></span> Logout
                    </Link>
                </li>

            </ul>
        )
    } else {
        /* Render links that don't require authentication */

        return (
            <ul className="nav navbar-nav navbar-right">
                <li>

                    <Link
                        to="/signup">
                        <span className="glyphicon glyphicon-export"></span> Sign Up
                    </Link>
                </li>

                <li>
                    <Link
                        to="/login">
                        <span className="glyphicon glyphicon-log-in"></span> Login
                    </Link>
                </li>

            </ul>
        )
    }
};

export default AppLinks;

export const ShoppingListsLink = (props) => {
    /* Handle rendering of shopping list.
    This is separate because of styling purposes  */

    if (props.isAuthenticated) {
        return (
            <ul className="nav navbar-nav">

                <li className="active">
                    <Link to="/shoppinglists">
                        <span className="glyphicon glyphicon-list"></span>
                        My Shopping Lists
                        <span className="sr-only">(current)</span>
                    </Link>
                </li>

                <li>
                    <Link to='/shoppinglists/search'>
                        <span className="glyphicon glyphicon-search"></span>
                        Search
                    </Link>
                </li>

            </ul>
        )
    } else {
        /* Render an empty span if user is not authenticated */
        return <span></span>
    }
}