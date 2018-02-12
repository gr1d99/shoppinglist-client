import React from 'react';

export const backButton = WrappedClass => {
    return class ShowBackButton extends React.Component {
        render() {
            return (
                <div className="col-md-12">
                    <button className="btn btn-default btn-xs pull-left" onClick={this.props.history.goBack}><span className="glyphicon glyphicon-arrow-left"></span> Go back</button>
                    <WrappedClass {...this.props}/>
                </div>
            )
        }
    }
};