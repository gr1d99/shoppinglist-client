import React from 'react';


export const conditionedComponents = (WrappedComponent) => {
    // ensures that the wrapped component can be accessed whe not authenticated
    return class Check extends React.Component {
        componentWillMount = () => {
            const { isAuthenticated } = this.props.auth;
            switch (isAuthenticated) {
                case true:
                    return this.props.history.push('/');

                case false:
                    return null;

                default:
                    return null;
            }
        };

        render () {
            return <WrappedComponent {...this.props}/>
        }
    }
};


export const loginRequired = (WrappedComponent) => {
    // ensures that the wrapped component can be accessed only when authenticated

    return class LoginRequired extends React.Component {
        constructor(props){
            super(props);

            const { isAuthenticated } = this.props.auth;

            if (!isAuthenticated) {
                this.props.history.push('/login');
            }
    };
        render () {
            return <WrappedComponent {...this.props}/>
        }
    }
};


