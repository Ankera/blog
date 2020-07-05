import React from 'react';
import ReactDOM from 'react-dom';

class Protal extends React.Component {
    constructor(props) {
        super(props)
        this.node = document.createElement('div');
        document.body.appendChild(this.node);
    }
    
    render() {
        const { children } = this.props;
        return ReactDOM.createPortal(
            children,
            this.node,
        );
    }
}


class Toast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.toggle}>切换</button>
                <Protal>
                    {
                        this.state.visible ? <h1>这是createPortal</h1> : null
                    }
                </Protal>
            </div>
        )
    }
}
export default Toast
