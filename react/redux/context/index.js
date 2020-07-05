import React from 'react';

function createContext() {
    // 注意不能继承PureComponent, 和 shouldComponentUpdate 返回值为false，会阻止render
    // https://juejin.im/post/5cf0e961f265da1b8e7085e6
    class Provider extends React.Component {
        static value;
        constructor(props) {
            super(props);
            this.state = {
                value: this.props.value
            }
        }

        static getDerivedStateFromProps(nextProps, prevState) {
            Provider.value = nextProps.value;
            return prevState;
        }

        render() {
            return this.props.children;
        }
    }

    class Consumer extends React.Component {
        render() {
            return this.props.children(Provider.value);
        }
    }

    return { Provider, Consumer }
}