import React from 'react';

export default function commonComponent(WrappedComponent, key) {
    return class Hoc extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                value: ""
            }
        }

        componentWillMount() {
            this.setState({
                value: localStorage.getItem(key)
            })
        }

        handleChange = (e) => {
            this.setState({
                value: e.target.value
            });
            localStorage.setItem(key, e.target.value)
        }

        render() {
            return <WrappedComponent
                handleChange={this.handleChange}
                value={this.state.value} />
        }
    }
}