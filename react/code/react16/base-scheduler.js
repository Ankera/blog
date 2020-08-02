import {
    TAG_HOST,
    TAG_ROOT,
    ELEMENT_TEXT,
    TAG_TEXT,
    PLACEMENT
} from "./constants";

import {
    setProps
} from "./utils"

let nextUnitOfWork = null;
let workInProgressRoot = null;

function scheduleRoot(rootFiber) {
    nextUnitOfWork = rootFiber;
    workInProgressRoot = rootFiber;
}

function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1;
    }

    if (!nextUnitOfWork) {
        console.log("render over ...")
        commitRoot();
    } else {
        requestIdleCallback(workLoop, { timeout: 500 });
    }
}

function performUnitOfWork(currentFiber) {
    beginWork(currentFiber);

    if (currentFiber.child) {
        return currentFiber.child;
    }

    while (currentFiber) {
        completeUnitOfWork(currentFiber);

        if (currentFiber.sibling) {
            return currentFiber.sibling;
        }

        currentFiber = currentFiber.return;
    }
}

function beginWork(currentFiber) {
    if (currentFiber.tag === TAG_ROOT) {
        updateHostRoot(currentFiber);
    } else if (currentFiber.tag === TAG_HOST) {
        updateHost(currentFiber);
    } else if (currentFiber.tag === TAG_TEXT) {
        updateHostText(currentFiber);
    }
}

function updateHostRoot(currentFiber) {
    let newChildren = currentFiber.props.children;
    reconcileChildren(currentFiber, newChildren);
}

function updateHost(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);
    }

    let newChildren = currentFiber.props.children;
    reconcileChildren(currentFiber, newChildren);
}

function updateHostText(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);
    }
}

function createDOM(currentFiber) {
    let stateNode = null;
    if (currentFiber.tag === TAG_HOST) {
        let stateNode = document.createElement(currentFiber.type);
        setProps(stateNode, {}, currentFiber.props);
    } else if (currentFiber.tag === TAG_TEXT) {
        stateNode = document.createTextNode(currentFiber.props.text);
    }

    return stateNode;
}

function reconcileChildren(currentFiber, newChildren) {
    let newChildIndex = 0;
    let prevSibling = null;

    while (newChildIndex < newChildren.length) {
        let tag;
        let newChild = newChildren[newChildIndex];
        if (newChild.type === ELEMENT_TEXT) {
            tag = TAG_TEXT;
        } else if (typeof newChild.type === "string") {
            tag = TAG_HOST;
        }

        let newFiber = {
            tag,
            type: newChild.type,
            props: newChild.props,
            stateNode: null,
            return: currentFiber,
            effectTag: PLACEMENT,
            nextEffect: null
        }

        if (newFiber) {
            if (newChildIndex === 0) {
                currentFiber.child = newFiber;
            } else {
                prevSibling.sibling = newFiber;
            }
            prevSibling = newFiber;
        }

        newChildIndex++;
    }
}

function completeUnitOfWork(currentFiber) {
    let returnFiber = currentFiber.return;
    if (returnFiber) {

        if(!returnFiber.firstEffect){
            returnFiber.firstEffect = currentFiber.lastEffect;
        }

        if (currentFiber.lastEffect) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;
            } 
            returnFiber.lastEffect = currentFiber.lastEffect;
        }

        // 创建单链表
        let effectTag = currentFiber.effectTag;
        if (effectTag) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber;
            } else {
                returnFiber.firstEffect = currentFiber;
            }
            returnFiber.lastEffect = currentFiber;
        }
    }
}

function commitRoot() {
    let currentFiber = workInProgressRoot.firstEffect;
    while (currentFiber) {
        console.log(currentFiber)
        commitWork(currentFiber);
        currentFiber = currentFiber.nextEffect;
    }

    workInProgressRoot = null;
}

function commitWork(currentFiber) {
    if (!currentFiber) {
        return;
    }

    let returnFiber = currentFiber.return;
    let returnDOM = returnFiber.stateNode;
    if (currentFiber.effectTag === PLACEMENT) {
        returnDOM.appendChild(currentFiber.stateNode);
    }

    currentFiber.effectTag = null;
}




requestIdleCallback(workLoop, { timeout: 500 });

export {
    scheduleRoot
}