import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from '../components/Home';
import Dashboard from '../components/auth/Dashboard';
// import GetResetToken from '../components/auth/password/GetResetToken';
// import ShowResetToken from '../components/auth/password/ShowToken';
//
// import AlertMessages from '../containers/utils/messages'
//
import SignUp from '../containers/auth/Signup';
import Login from '../containers/auth/Login';
import Logout from '../containers/auth/Logout';
// import EditAccount from '../containers/auth/Edit';
// import ResetPassword from '../containers/auth/password/ResetPassword';
//
import ShoppingList from '../containers/shoppinglist/List';
import CreateShoppingList from '../containers/shoppinglist/Create';
import ShoppingListDetail from '../containers/shoppinglist/Detail';
import EditShoppingList from '../containers/shoppinglist/Edit';
//
import CreateShoppingItem from '../containers/shoppingitems/Create';
// import ShoppingItems from '../containers/shoppingitems/List';
// import EdiShoppingItem from '../containers/shoppingitems/Edit';
// import SearchShoppingLists from '../containers/search/Search';
//
import AppLinks, { ShoppingListsLink } from './includes/AppLinks';

import '../static/App.css';

export class App extends Component {
    render() {
    return (
        <BrowserRouter>
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand" to="/"><span className="glyphicon glyphicon-home"></span> Shopping List</Link>
                            <ShoppingListsLink isAuthenticated={this.props.auth.isAuthenticated}/>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <AppLinks isAuthenticated={this.props.auth.isAuthenticated}/>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <div className="col-md-12">
                        {/*<AlertMessages/>*/}
                    </div>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/signup" component={SignUp}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/shoppinglists/create" component={CreateShoppingList}/>
                        {/*<Route path="/shoppinglists/search" component={SearchShoppingLists}/>*/}
                        {/*<Route path="/shoppinglists/:id/items/:id/edit" component={EdiShoppingItem}/>*/}
                        <Route path="/shoppinglists/:id/items/create" component={CreateShoppingItem}/>
                        {/*<Route path="/shoppinglists/:id/items" component={ShoppingItems}/>*/}
                        <Route path="/shoppinglists/:id/edit" component={EditShoppingList}/>
                        <Route path="/shoppinglists/:id" component={ShoppingListDetail}/>
                        <Route path="/shoppinglists" component={ShoppingList}/>
                        {/*<Route path="/dashboard/account/edit" component={EditAccount}/>*/}
                        {/*<Route path="/forgot-password/reset-token/show" component={ShowResetToken}/>*/}
                        {/*<Route path="/forgot-password/reset" component={ResetPassword}/>*/}
                        {/*<Route path="/forgot-password" component={GetResetToken}/>*/}
                        <Route path="/dashboard" component={Dashboard}/>
                    </Switch>
                </div>
                <footer className="navbar-default navbar-fixed-bottom">
                    <div className="container-fluid">
                        <p><span className="glyphicon glyphicon-copyright-mark"></span> Shopping List 2018</p>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = ({auth, shoppingList, alerts}) => {
    return {auth, shoppingList, alerts}
};

export default connect(mapStateToProps, {})(App)