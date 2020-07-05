import React from 'react';
import Username from './component/username';
import Password from './component/password';
import MouseTracker from './component/tracker';

// hoc
import HocUsername from "./hoc/username";
import HocPassword from "./hoc/password";
import withMouseTracker from "./hoc/withTracker"

function Panel(props) {
    return (
        <div>
            <p>name = {props.name}</p>
            <h1>现在你可以移动鼠标</h1>
            <p>当前鼠标位置x = {props.x}, y = {props.y}</p>
        </div>
    )
}

Panel = withMouseTracker(Panel);

/**
 * 测试函数有返回值
 * @param {*} Com 
 */
function App(Com) {
    return props => {
        console.log(props)
        return (
            <div>
                {props.name}
                <Com />
            </div>
        )
    }
}
function Fn() {
    return <div>111</div>
}
Fn = App(Fn);


class Page extends React.Component {
    render() {
        return (
            <div style={{ margin: "36px" }}>
                <Username />
                <Password />
                <button>提交</button>
                <hr />
                <HocUsername />
                <HocPassword />
                <hr />

                {/* render-props */}
                <MouseTracker render={params => (
                    <>
                        <h1>现在你可以移动鼠标</h1>
                        <p>当前鼠标位置x = {params.x}, y = {params.y}</p>
                    </>
                )} />

                <Panel name={"Tom"} />
                <Fn name="aaa" />
            </div>
        )
    }
}

export default Page;