import React from 'react';
import { Input, Button, List, Icon } from 'antd';
import { actions } from "./redux/index";

export default class TodosTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.store.getState()
        }

        this.unsubscribe = this.props.store.subscribe(this.sub);
        
        let { dispatch } = this.props.store;
        this.actions = actions(dispatch);
    }

    sub = () => {
        this.setState({
            data: this.props.store.getState()
        })
    }

    handleChange = (e) => {
        let { changeInputValue } = this.actions;
        changeInputValue(e.target.value);
    }

    btn = () => {
        let { addTodoItem } = this.actions;
        addTodoItem();
    }

    del = (index) => {
        let { delTodoItem } = this.actions;
        delTodoItem(index);
    }

    render() {
        let { inputVal, list } = this.state.data;
        return (
            <div>
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