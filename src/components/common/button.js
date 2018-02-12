import React from 'react';


const SubmitButton = (props) => {
    return (
      <button
          type={props.type}
          className={props.className}>

          {props.value}

          </button>
    );
};


export default SubmitButton;