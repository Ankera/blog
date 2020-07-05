import React from 'react';
import { Input, Button, List, Icon } from 'antd';
import { bindActionCreators } from "./redux/index";
import counterAction from "./store/actions/counter";
import todosAction from "./store/actions/todos"

class Todos extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.store.getState().todos
        }

        let { dispatch, subscribe } = this.props.store;
        this.unsubscribe = subscribe(this.subscribe);
        
        this.acions = bindActionCreators(todosAction, dispatch);
    }

    subscribe = () => {
        this.setState({
            data: this.props.store.getState().todos
        })
    }

    handleChange = (e) => {
        let { changeValue } = this.acions;
        changeValue(e.target.value);
    }

    btn = () => {
        let { addValue } = this.acions;
        addValue();
    }

    del = (index) => {
        let { delValue } = this.acions;
        delValue(index)
    }

    render() {
        let { inputVal, list } = this.state.data;
        return (
            <div>
                <h1>TODOS</h1>
                <Input
                    value={inputVal}
                    onChange={this.handleChange}
                    style={{ width: "120px" }} />
                <Button
                    onClick={this.btn}>提交</Button>
                <List
                    bordered
                    dataSource={list}
                    renderItem={(item, i) => (
                        <List.Item key={i}>
                            {item}
                            <span
                                onClick={this.del.bind(this, i)}
                                style={{ marginLeft: "32px", cursor: "pointer" }}>
                                <Icon type="close" />
                            </span>
                        </List.Item>)}
                />
            </div>
        )
    }
}

class Counter extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.store.getState().counter
        }

        let { dispatch, subscribe } = this.props.store;
        this.unsubscribe = subscribe(this.subscribe);
        this.acions = bindActionCreators(counterAction, dispatch);
    }

    subscribe = () => {
        this.setState({
            data: this.props.store.getState().counter
        })
    }


    render() {
        let { add, minus } = this.acions;
        return (
            <div>
                <h1>计数器: {this.state.data.number}</h1>
                <Button onClick={() => add()}>+</Button>
                <Button onClick={() => minus()}>-</Button>
            </div>
        )
    }
}

class Page extends React.Component {
    render() {
        return (
            <div style={{margin: "36px"}}>
                <Todos store={this.props.store}/>
                <p style={{
                    height: "54px",
                    lineHeight: "54px",
                    backgroundColor: "#f0f0f0",
                    margin: "16px 0"
                }}>****************************</p>
                <Counter store={this.props.store}/>
            </div>
        )
    }
}

export default Page;