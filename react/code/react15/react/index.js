import {
    TEXT,
    ELEMENT,
    CLASS_COMPONENT,
    FUNC_COMPONENT
} from "./constants";
import { ReactElement } from "./vdom";
import Component from "./component";
import { onlyOne, flatten } from "./utils";

function createElement(type, config, ...children) {
    delete config.__source;
    delete config.__self;

    let { key = null, ref = null, ...props } = config;
    let $$typeof = null;

    if (typeof type === "string") {
        $$typeof = ELEMENT;
    } else if (typeof type === "function" && type.prototype.isReactComponent) {
        $$typeof = CLASS_COMPONENT;
    } else if (typeof type === "function") {
        $$typeof = FUNC_COMPONENT;
    }

    children = flatten(children);
    props.children = children.map(child => {
        if (typeof child === "object") {
            return child;
        } else {
            return {
                $$typeof: TEXT,
                type: TEXT,
                content: child,
                key: null,
                ref: null
            }
        }
    });

    return ReactElement($$typeof, type, key, ref, props);
}

function createRef() {
    return {
        current: null
    }
}

function createContext(defalutValue) {
    Provider.value = defalutValue;
    function Provider(props) {
        Provider.value = props.value;
        return props.children;
    }

    function Consumer(props) {
        return onlyOne(props.children)(Provider.value)
    }

    return {
        Provider,
        Consumer
    }
}

const React = {
    createElement,
    Component,
    createRef,
    createContext
}

export default React;