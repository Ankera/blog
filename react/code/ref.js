import React from "react";
import { Button } from "antd";
import ReactDOM from "react-dom";
import "./index.css";


/**
 * 非受控组件
 * 指的是DOM元素的值存在DOM元素值内部，不受React控制
 * 
 * 受控组件
 * 受state控制
 */
class FeiSKong extends React.Component {

    add = () => {
        console.log(this.num)
    }

    render() {
        return (
            <>
                <input title="非受控组件" ref={inst => this.num = inst} />
                <Button onClick={this.add}>非受控组件</Button>
            </>
        )
    }
}

function createRef() {
    return {
        current: null
    }
}

function forwardRef(FuncComp) {
    return function (props) {
        return FuncComp(props, props.ref)
    }
}

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.txt = createRef();
    }

    render() {
        return (
            <>
                <input ref={this.txt} />
            </>
        )
    }
}

function TextInput2(props, ref) {
    return <input className="input" ref={ref} />
}

let TextInput3 = React.forwardRef(TextInput2);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.numA = createRef();
        this.numB = createRef();
        this.result = createRef();
        this.txt = createRef();
        this.txt3 = createRef();
    }

    add() {
        let numA = this.numA.current.value;
        let numB = this.numB.current.value;
        this.result.current.value = parseFloat(numA) + parseFloat(numB);
    }

    txtInput = () => {
        // console.log(this.txt.current.txt.current)
        this.txt.current.txt.current.focus();
    }

    txtInput3 = () => {
        console.log(this.txt3.current)
        this.txt3.current.focus();
    }

    render() {
        return (
            <div className="all">
                <input ref={this.numA} />
                <Button>+</Button>
                <input ref={this.numB} />
                <Button onClick={this.add.bind(this)}>=</Button>
                <input ref={this.result} />
                <hr />
                <Button onClick={this.txtInput}>txt</Button>
                <TextInput ref={this.txt} />
                <hr />
                <Button onClick={this.txtInput3}>txt3</Button>
                <TextInput3 ref={this.txt3} />
                <hr/>
                <FeiSKong/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));