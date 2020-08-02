import React from './react';
import ReactDOM from './react-dom';

/**
 * react 库提供最基本的元素功能
 * react-dom 提供所有的操作
 */

// import React from './react/react';
// import ReactDOM from './react-dom/react-dom';


// class Demo extends React.Component {
//     render() {
//         return (
//             <ul>
//                 <li>Demo——wuhan</li>
//                 <li>Demo--hangzhou</li>
//             </ul>
//         )
//     }
// }

// class Todos extends React.Component {
//     render() {
//         return (
//             <ul>
//                 <li>wuhan</li>
//                 <li>hangzhou</li>
//                 <Demo/>
//             </ul>
//         )
//     }
// }

/**
 * babel 转换
    React.createElement(Ding, {
        data: {
            name: "Tom"
        },
        key: "_internal",
        ref: "_sun"
    });

    内部在调用 ReactElment函数，返回react元素
 */
/*
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");

let style = {
    border: "10px solid red",
    margin: "12px"
}
var element = (
    <div id="A1" style={style}>
        A1
        <div id="B1" style={style}>
            B1
            <div id="C1" style={style}>C1</div>
            <div id="C2" style={style}>C2</div>
        </div>
        <div id="B2" style={style}>B2</div>
    </div>
    // <div id="A1" style={style}>
    //     <div id="B1" style={style}>
    //         <div id="C1" style={style}>C1</div>
    //         <div id="C2" style={style}>C2</div>
    //     </div>
    //     <div id="B2" style={style}>
    //         <div id="D1" style={style}>D1</div>
    //         <div id="D2" style={style}>D2</div>
    //     </div>
    // </div>
)

ReactDOM.render(element, document.getElementById('root'));

let style1 = {
    border: "1px solid blue",
    margin: "5px"
}
let element1 = (
    <div id="A1-new" style={style1}>
        A1-new
        <div id="B1-new" style={style1}>
            B1-new
            <div id="C1-new" style={style1}>C1-new</div>
            <div id="C2-new" style={style1}>C2-new</div>
        </div>
        <div id="B2-new" style={style1}>B2-new</div>
        <div id="B3-new-add" style={style1}>B2-new-add</div>
    </div>
)

btn1.addEventListener("click", () => {

    ReactDOM.render(element1, document.getElementById('root'));
})

// let style2 = {
//     border: "1px solid blue",
//     margin: "5px"
// }
// let element2 = (
//     <div id="A1-new" style={style1}>
//         A1-new
//         <div id="B1-new" style={style1}>
//             B1-new
//             <div id="C1-new" style={style1}>C1-new</div>
//             <div id="C2-new" style={style1}>C2-new</div>
//         </div>
//         <div id="B2-new" style={style1}>B2-new</div>
//         <div id="B3-new-add" style={style1}>B2-new-add</div>
//     </div>
// )
btn2.addEventListener("click", () => {
    let style2 = {
        border: "5px solid yellow",
        margin: "5px"
    }
    let element2 = (
        <div id="A1-btn2" style={style2}>
            A1-btn2
            <div id="B1-btn2" style={style2}>
                B1-btn2
                <div id="C1-btn2" style={style2}>C1-btn2</div>
                <div id="C2-btn2" style={style2}>C2-btn2</div>
            </div>
            <div id="B2-btn2" style={style2}>B2-btn2</div>
            <div id="B3-btn3" style={style2}>B3-btn3</div>
            <div id="B4-btn4" style={style2}>B4-btn4</div>
        </div>
    )
    ReactDOM.render(element2, document.getElementById('root'));
})
*/

class Counter extends React.Component {
    constructor(props = {}) {
        super(props);
        this.state = {
            number: 0
        }
    }

    btn = () => {
        this.setState(state => ({
            number: state.number + 1
        }))
    }

    render() {
        return (
            <div>
                <h1>{this.state.number}</h1>
                <button onClick={this.btn}>+</button>
            </div>
        )
    }
}
console.log(<Counter name="武汉"/>)
ReactDOM.render(<Counter name="武汉"/>, document.getElementById('root'));