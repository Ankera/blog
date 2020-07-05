import React from 'react';
class Username extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }

    componentWillMount() {
        this.setState({
            value: localStorage.getItem("username")
        })
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        });
        localStorage.setItem("username", e.target.value)
    }

    render() {
        return (
            <div>
                用户名: <input onChange={this.handleChange} defaultValue={this.state.value}/>
            </div>
        )
    }
}

export default Username;