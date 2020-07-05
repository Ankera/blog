import React from 'react';
import commonComponent from "./wrappComponent";

class HocUsername extends React.Component {
    render() {
        return (
            <div>
                用户名: <input value={this.props.value} onChange={this.props.handleChange}/>
            </div>
        )
    }
}

export default commonComponent(HocUsername, 'username');