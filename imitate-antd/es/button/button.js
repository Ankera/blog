import React from 'react';
const Button = (props) => {
    const { children } = props;
    return React.createElement("button", { type: "button" }, children);
};
export default Button;
