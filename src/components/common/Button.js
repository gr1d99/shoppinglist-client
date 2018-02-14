import React from 'react';


const Button = (props) => {
    /* Reusable button component that
     * can be customized depending on
      * the required functionality*/

    return (
      <button
          type={props.type}
          className={props.className}>
          {props.value}
          </button>
    );
};


export default Button;