import React from 'react';

const Loading = () => {
    /* Helper component to indicate
     * request is running */

    return (
        <label className="btn btn-sm btn-info">
            <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate">
            </span> Loading...</label>
    )
};

export default Loading;
