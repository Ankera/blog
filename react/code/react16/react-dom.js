import {
    TAG_ROOT
} from "./constants";
import {
    scheduleRoot
} from "./class-scheduler";

function render(element, container) {
    let rootFiber = {
        tag: TAG_ROOT,
        stateNode: container,
        props: {
            children: [element]
        }
    }

    scheduleRoot(rootFiber);
}

const ReactDOM = {
    render
}

export default ReactDOM;