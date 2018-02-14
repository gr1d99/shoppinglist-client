import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


export class HomePage extends React.Component {
    /* Application home page container */

    renderContent = () => {
        /* Checks if user is authenticated and renders
         * content based on the authentication flag */

        switch (this.props.auth.isAuthenticated){
            case false:
                return (
                    <span className="lead">
                        Please <Link to='/login'>login</Link>/<Link to='/signup'>signup</Link> to enjoy our services.
                        <br/>
                        You will be able to create and add items to your shopping list.
                    </span>
                );

            case true:
                return (
                    <span className="welcome-text">
                        <br/>
                        <br/>
                        Keep track of your shopping list with just few simple steps.
                        <br/>
                        <br/>
                        <Link className='btn btn-success btn-sm text-center' to='/shoppinglists'>Get started</Link>
                    </span>
                );

            default:
                return <div className="error"></div>
        }
    };

    render () {
        return (
            <div>
                <div className="jumbotron welcome-box">
                    <h4 className="text-center">
                        <span className="text-uppercase">Welcome to online shopping list app</span>
                        <br/>
                        <span className="intro-text">
                            {this.renderContent()}
                        </span>
                    </h4>
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({auth}) => {
    return {auth}
};

export default connect(mapStateToProps, null)(HomePage)
