import React from 'react';

export const backButton = WrappedClass => {
    return  class ShowBackButton extends React.Component {
        goBack = e => {
            switch (this.props.match.path) {
                case "/shoppinglists/:id":
                case "/shoppinglists/search":
                    return this.props.history.push('/shoppinglists');

                case "/shoppinglists/:id/items":
                case "/shoppinglists/:id/items/:id/edit":
                case "/shoppinglists/:id/items/create":
                case "/shoppinglists/:id/edit":
                    const id = this.props.match.url.match('[0-9]+')[0];
                    return this.props.history.push(`/shoppinglists/${id}`);

                default:
                    return this.props.history.push('/')

            }
        }
        render() {
            return (
                <div className="col-md-12">
                    <button className="btn btn-default btn-xs pull-left" onClick={this.goBack}><span className="glyphicon glyphicon-arrow-left"></span> Go back</button>
                    <WrappedClass {...this.props}/>
                </div>
            )
        }
    }
};