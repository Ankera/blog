import React from 'react';
import { ADD, MINUS } from './redux/index'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        let store = this.props.store;

        this.state = {
            number: store.getState().number
        }

        this.unsubscribe = store.subscribe(this.sub.bind(this))
    }

    componentWillUnmount() {
        // 卸载时取消订阅
        this.unsubscribe();
    }

    sub = () => {
        let store = this.props.store;
        this.setState({
            number: store.getState().number
        })
    }

    add = () => {
        this.props.store.dispatch({
            type: ADD
        })
    }

    minus = () => {
        this.props.store.dispatch({
            type: MINUS
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.number}</h1>
                <button onClick={this.add.bind(this)}>+</button>
                <button onClick={this.minus}>-</button>
            </div>
        )
    }
}