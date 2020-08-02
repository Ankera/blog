import React from './react';

let ThemeContext = React.createContext(null);
console.log(ThemeContext.Consumer)
class Header extends React.Component {
    // static contextType = ThemeContext;
    render() {
        return (
            <ThemeContext.Consumer>
                {
                    value => (
                        <div style={{ border: `5px solid ${value.color}`, padding: "5px" }}>
                            <div>Header</div>
                            <Title />
                        </div>
                    )
                }
            </ThemeContext.Consumer>
        )
    }
}

class Title extends React.Component {
    static contextType = ThemeContext;
    render() {
        return (
            <div style={{ border: `5px solid ${this.context.color}`, padding: "5px" }}>
                <div>Titles</div>
            </div>
        )
    }
}

class Main extends React.Component {
    static contextType = ThemeContext;
    render() {
        return (
            <div style={{ border: `5px solid ${this.context.color}`, padding: "5px" }}>
                <div>Titles</div>
            </div>
        )
    }
}

class FunctionHeader extends React.Component {
    render() {
        return (
            <ThemeContext.Consumer >
                {
                    value => (
                        <div style={{ border: `5px solid ${value.color}`, padding: "5px" }}>
                            <div>FunctionHeader</div>
                            <FunctionTitle />
                        </div>
                    )
                }
            </ThemeContext.Consumer>
        )
    }
}

class FunctionTitle extends React.Component {
    render() {
        return (
            <ThemeContext.Consumer >
                {
                    value => (
                        <div style={{ border: `5px solid ${value.color}`, padding: "5px" }}>
                            <div>FunctionTitle</div>
                        </div>
                    )
                }
            </ThemeContext.Consumer>
        )
    }
}

class FunctionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "red"
        }
    }

    changeColor = color => {
        this.setState({
            color
        })
    }

    render() {
        let contextVal = {
            changeColor: this.changeColor,
            color: this.state.color
        }
        return (
            <ThemeContext.Provider value={contextVal}>
                <div style={{ border: `5px solid ${this.state.color}`, padding: "5px", width: "400px" }}>
                    <div>page</div>
                    {/* <FunctionHeader /> */}
                </div>
            </ThemeContext.Provider>
        )
    }
}

export default FunctionPage;