import React from 'react';
class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }

    componentWillMount() {
        this.setState({
            value: localStorage.getItem("password")
        })
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        });
        localStorage.setItem("password", e.target.value)
    }

    render() {
        return (
            <div>
                密码: <input onChange={this.handleChange} defaultValue={this.state.value} />
            </div>
        )
    }
}

export default Password;