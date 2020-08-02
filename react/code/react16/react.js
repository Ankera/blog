import {
    ELEMENT_TEXT
} from "./constants";
import { UpdateQueue, Update } from "./updateQueue";
import { scheduleRoot } from "./class-scheduler";

function createElement(type, config, ...children) {
    delete config.__source;
    delete config.__self;
    return {
        type,
        props: {
            ...config,
            children: children.map(child => {
                return typeof child === "object" ? child : {
                    type: ELEMENT_TEXT,
                    props: {
                        text: child,
                        children: []
                    }
                }
            })
        }
    }
}

class Component {
    constructor(props) {
        this.props = props;
        // this.updateQueue = new UpdateQueue();
    }

    setState(payload){
        let update = new Update(payload);
        this.internalFiber.updateQueue.enqueueUpdate(update);

        scheduleRoot();
    }
}

Component.prototype.isReactComponent = true;

const React = {
    createElement,
    Component
}

export default React;