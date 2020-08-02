import React from './react';
import ReactDOM from './react-dom';
import FunctionPage from "./app"

// let onClick = (event) => {
//     console.log(event);
//     // event.persist()
//     setTimeout(() => {
//         console.log(event)
//     }, 1000);
// };

// let element1 = React.createElement("button", {
//     id: "sayHello", onClick
// }, "say", React.createElement("span", {
//     style: { color: "red" }
// }, "hello"));

// class ClassComponent extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             React.createElement("h1", { id: "counter_class" }, "hello")
//         )
//     }
// }

// function fun2() {
//     return (
//         React.createElement("h1", { id: "counter_fun1" }, "fun2",)
//     )
// }

function FunComponent(props) {
    console.log(props)
    return (
        React.createElement("h2", { id: "counter_fun", style: { color: props.color }, ...props }, "world", props.number)
    )
}

// let element2 = React.createElement(ClassComponent, { name: "Tom" });
// let element3 = React.createElement(funComponent, { age: 10086 })

// ReactDOM.render(
//     element1,
//     document.getElementById('root')
// );

class ChildCounter extends React.Component {
    constructor(props) {
        super(props);
        console.log('child constructor');
    }

    componentWillReceiveProps() {
        console.log("child componentWillReceiveProps");
    }

    static getDerviedStateFromProps(nextProps, prevState) {
        console.log(nextProps)
    }

    componentWillMount() {
        console.log('child componentWillMount');
    }

    componentDidMount() {
        console.log('child componentDidMount');
    }

    componentWillUpdate() {
        console.log('child componentWillUpdate');
    }

    componentDidUpdate() {
        console.log('child componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('child  组件将要卸载');
    }

    render() {
        console.log('child  render');
        return (
            <div>child -- {this.props.number}</div>
        )
    }
}

class App extends React.Component {
    btn = (event) => {
        console.log(event);
        // 事件持久化
        event.persist();
        setTimeout(() => {
            console.log(event);
        }, 3000)
    }
    render() {
        return (
            <div>
                <button onClick={this.btn}>+</button>
                APp
            </div>
        )
    }
}

// ReactDOM.render(
//     <App />,
//     document.getElementById('root')
// );



// 计数器
class Counter extends React.Component {

    static defaultProps = {
        name: "武汉-杭州"
    }

    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            name: "wuhan",
            color: "red",
            show: true,
        }

        console.log('parent constructor');
    }

    componentWillMount() {
        console.log('parent componentWillMount');
    }

    componentDidMount() {
        console.log('parent componentDidMount');

        // setTimeout(() => {
        //     this.setState({
        //         number: this.state.number + 1
        //     })
        // }, 2000)
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('parent shouldComponentUpdate');
        return nextState.number > 2;
    }

    componentWillUpdate() {
        console.log('parent componentWillUpdate');
    }

    componentDidUpdate() {
        console.log('parent componentDidUpdate');
    }

    btn = (event) => {
        // this.setState({
        //     number: this.state.number + 1,
        //     show: !this.state.show
        // })

        this.setState(state => ({
            number: state.number + 1,
            show: !state.show
        }))


        // this.setState(state => ({
        //     number: state.number+1
        // }))

        // console.log(this.state.number)
        // this.setState({
        //     number: this.state.number+1
        // })
        // console.log(this.state.number)
        // this.setState({
        //     number: this.state.number+1
        // })
        // console.log(this.state.number)
        // this.setState({
        //     number: this.state.number+1
        // })
        // console.log(this.state.number)
    }

    render() {
        console.log('parent  render');
        let { number, name } = this.state;
        return (
            <div>
                <p>{name}</p>
                <p data-index={number}>{number}</p>
                {
                    number > 3 ? null : <ChildCounter number={number} />
                }
                <button onClick={this.btn}>+</button>


                {/* {
                    this.state.show ?
                        <ul onClick={this.btn}>
                            <li key="A">A</li>
                            <li key="B">B</li>
                            <li key="C">C</li>
                            <li key="D">D</li>
                        </ul>
                        :
                        <ul onClick={this.btn}>
                            <li key="A">A</li>
                            <li key="C">C</li>
                            <li key="B">B</li>
                            <li key="E">E</li>
                            <li key="F">F</li>
                        </ul>
                } */}
            </div>
        )
    }
}

class ScrollingList extends React.Component {
    wrapper;
    timeID;
    constructor(props) {
        super(props);
        this.state = {
            message: []
        }
        this.wrapper = React.createRef();
    }

    addMessage = () => {
        this.setState({
            message: [this.state.message.length, ...this.state.message]
        })
    }

    componentDidMount() {
        // this.timeID = setInterval(() => {
        //     this.addMessage();
        // }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timeID);
    }

    getSnapshotBeforeUpdate = () => {
        return this.wrapper.current.scrollHeight;
    }

    componentDidUpdate(prevState, prevProps, prevScrollHeight) {
        let curScrollTop = this.wrapper.current.scrollTop;
        this.wrapper.current.scrollTop = curScrollTop + (this.wrapper.current.scrollHeight - prevScrollHeight);
    }

    render() {
        let style = {
            height: "100px",
            width: "200px",
            border: "1px solid red",
            overflow: "auto"
        }
        let { message } = this.state;
        return (
            <div style={style} ref={this.wrapper}>
                {
                    message.map((el, i) => (
                        <div key={i}>{el}</div>
                    ))
                }
            </div>
        )
    }
}

ReactDOM.render(
    <div>
        {/* <Counter /> */}
        {/* <hr/> */}
        {/* <ScrollingList /> */}
        <hr />
        <FunctionPage/>
    </div>,
    document.getElementById('root')
);