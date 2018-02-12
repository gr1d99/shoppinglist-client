import React from 'react';
import { Link } from 'react-router-dom';


const AppLinks = props => {
    if (props.isAuthenticated) {
        return (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/dashboard"><span className="glyphicon glyphicon-dashboard"></span> Dashboard</Link></li>
                <li><Link to="/logout"><span className="glyphicon glyphicon-log-out"></span> Logout</Link></li>
            </ul>
        )
    } else {
        return (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/signup"><span className="glyphicon glyphicon-export"></span> Sign Up</Link></li>
                <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
            </ul>
        )
    }
}

export default AppLinks;

export const ShoppingListsLink = (props) => {
    if (props.isAuthenticated) {
        return (
            <ul className="nav navbar-nav">
                <li className="active"><Link to="/shoppinglists"><span className="glyphicon glyphicon-list"></span> My Shopping Lists <span className="sr-only">(current)</span></Link></li>
                <li><Link to='/shoppinglists/search'><span className="glyphicon glyphicon-search"></span> Search</Link></li>

            </ul>
        )
    } else {
        return <span></span>
    }
}