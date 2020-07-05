import React from 'react';
class MouseTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0
        }
    }

    move = (e) => {
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }

    render() {
        // let { x, y } = this.state;
        let render = this.props.children ? this.props.children : this.props.render;
        return (
            <div
                onMouseMove={this.move}
                style={{ border: "2px solid red" }}>
                    {
                        render(this.state)
                    }
                {/* <h1>现在你可以移动鼠标</h1>
                <p>当前鼠标位置x = {x}, y = {y}</p> */}
            </div>
        )
    }
}

export default MouseTracker;