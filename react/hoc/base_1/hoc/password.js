import React from 'react';
import commonComponent from "./wrappComponent";

class HocPassword extends React.Component {
    render() {
        return (
            <div>
                密码: <input value={this.props.value} onChange={this.props.handleChange}/>
            </div>
        )
    }
}

export default commonComponent(HocPassword, 'password');