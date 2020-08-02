import {
    TAG_HOST,
    TAG_ROOT,
    ELEMENT_TEXT,
    TAG_TEXT,
    TAG_CLASS,
    PLACEMENT,
    DELETION,
    UPDATE
} from "./constants";

import {
    setProps
} from "./utils"
import { UpdateQueue } from "./updateQueue";

let nextUnitOfWork = null; // 下一个工作单元
let workInProgressRoot = null; // 正在渲染的树
let currentRoot = null; // 当前树
let deletions = []; // 删除的元素，并不记录到 effectList 里面，单独记录，统一删除

/**
 * 从根节点开始渲染和调度
 * 两个阶段
 * 1. diff阶段，对比新旧vdom，进行增加，修改，删除，render阶段
 *    此阶段花费时间较长，可以对任务进行拆分，拆分的维度是vdom，可以暂停
 *  结果是 effectList 
 * 两个任务，a、根据 vdom 生成 fiber树； b、收集effectList 
 * 2. commit阶段，进行dom更新创建，不能暂停，否则引起视觉卡顿
 * @param rootFiber
 */
export function scheduleRoot(rootFiber) {
    // 偶数渲染
    if (currentRoot && currentRoot.alternate) {
        workInProgressRoot = currentRoot.alternate;
        workInProgressRoot.alternate = currentRoot;
        if (rootFiber) {
            workInProgressRoot.props = rootFiber.props;
        }
    } else if (currentRoot) {
        if (rootFiber) {
            rootFiber.alternate = currentRoot;
            workInProgressRoot = rootFiber;
        } else {
            workInProgressRoot = {
                ...currentRoot,
                alternate: currentRoot
            }
        }
    } else {
        // 首次渲染
        workInProgressRoot = rootFiber;
    }

    workInProgressRoot.firstEffect = workInProgressRoot.lastEffect = workInProgressRoot.nextEffect = null;
    nextUnitOfWork = workInProgressRoot;
}

function workLoop(deadline) {
    let shouldYield = false; // 本帧时间片有空余
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1; // 没有时间片，控制权交给浏览器
    }

    if (!nextUnitOfWork && workInProgressRoot) {
        console.log("render 阶段结束");
        commitRoot();
    }

    // 重新调度一次
    requestIdleCallback(workLoop, { timeout: 500 })
}

requestIdleCallback(workLoop, { timeout: 500 })

function performUnitOfWork(currentFiber) {
    beginWork(currentFiber);

    if (currentFiber.child) {
        return currentFiber.child;
    }

    while (currentFiber) {
        completeUnitOfWork(currentFiber); // 构建 effectList

        if (currentFiber.sibling) {
            return currentFiber.sibling;
        }

        currentFiber = currentFiber.return;
    }
}

/**
 * beginWork 开始收下线的钱
 * 
 * 
 * 创建DOM
 * 创建 子fiber
 * @param {*} currentFiber 
 */
function beginWork(currentFiber) {
    if (currentFiber.tag === TAG_ROOT) {
        updateHostRoot(currentFiber);
    } else if (currentFiber.tag === TAG_TEXT) {
        updateHostText(currentFiber);
    } else if (currentFiber.tag === TAG_HOST) {
        updateHost(currentFiber);
    } else if (currentFiber.tag === TAG_CLASS) {
        updateClassComponent(currentFiber);
    }
}

function updateClassComponent(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = new currentFiber.type(currentFiber.props);
        currentFiber.stateNode.internalFiber = currentFiber;
        currentFiber.updateQueue = new UpdateQueue();
    }

    currentFiber.stateNode.state = currentFiber.updateQueue.forceUpdate(currentFiber.stateNode.state);
    let newElement = currentFiber.stateNode.render();
    let newChildren = [newElement];
    reconclieChildren(currentFiber, newChildren);
}

function updateHostRoot(currentFiber) {
    let newChildren = currentFiber.props.children;
    reconclieChildren(currentFiber, newChildren);
}

function updateHostText(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);
    }
}

function updateHost(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);
    }
    let newChildren = currentFiber.props.children;
    reconclieChildren(currentFiber, newChildren);
}

function createDOM(currentFiber) {
    if (currentFiber.tag === TAG_TEXT) {
        return document.createTextNode(currentFiber.props.text);
    } else if (currentFiber.tag === TAG_HOST) {
        let stateNode = document.createElement(currentFiber.type);
        updateDOM(stateNode, {}, currentFiber.props);
        return stateNode;
    }
}

/**
 * 协调子节点
 * vdom 数组 转成 fiber 数组
 * @param {*} currentFiber 
 * @param {*} newChildren 
 */
function reconclieChildren(currentFiber, newChildren) {
    let newChildIndex = 0; // 子节点索引
    let prevSibling = null; // 上一个新的 fiber
    let oldFiber = currentFiber.alternate && currentFiber.alternate.child;
    if (oldFiber) {
        oldFiber.firstEffect = oldFiber.nextEffect = oldFiber.lastEffect = null;
    }

    while (newChildIndex < newChildren.length) {
        let newChild = newChildren[newChildIndex];
        let tag = null;
        let newFiber;
        let sameType = oldFiber && newChild && oldFiber.type === newChild.type;
        if (newChild && typeof newChild.type === "function" && newChild.type.prototype.isReactComponent) {
            tag = TAG_CLASS;
        } else if (newChild && newChild.type === ELEMENT_TEXT) {
            // 文本节点 { tag: TAG_TEXT, type: ELEMENT_TEXT }
            tag = TAG_TEXT;
        } else if (typeof newChild.type === "string") {
            tag = TAG_HOST;
        }
        if (sameType) {
            if (oldFiber.alternate) {
                newFiber = oldFiber.alternate;
                newFiber.props = newChild.props;
                newFiber.alternate = oldFiber;
                newFiber.effectTag = UPDATE;
                newFiber.nextEffect = null;
                newFiber.updateQueue = oldFiber.updateQueue || new UpdateQueue();
            } else {
                newFiber = {
                    tag: oldFiber.tag,
                    type: oldFiber.type,
                    props: newChild.props,
                    stateNode: oldFiber.stateNode,        // DOM
                    return: currentFiber,    // 父fiber
                    alternate: oldFiber,
                    effectTag: UPDATE,  // 首次是插入
                    nextEffect: null,
                    updateQueue: oldFiber.updateQueue || new UpdateQueue()
                }
            }
        } else {
            if (newChild) {
                newFiber = {
                    tag,
                    type: newChild.type,
                    props: newChild.props,
                    stateNode: null,        // DOM
                    return: currentFiber,    // 父fiber
                    effectTag: PLACEMENT,  // 首次是插入
                    nextEffect: null,
                    updateQueue: new UpdateQueue()
                }
            }
            if (oldFiber) {
                oldFiber.effectTag = DELETION;
                deletions.push(oldFiber);
            }
        }

        // 向后移动一次
        if (oldFiber) {
            oldFiber = oldFiber.sibling;
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
        // 把自己的儿子挂载到父节点上
        if (!returnFiber.firstEffect) {
            returnFiber.firstEffect = currentFiber.firstEffect;
        }
        if (currentFiber.lastEffect) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;
            }
            returnFiber.lastEffect = currentFiber.lastEffect;
        }

        // 把自己挂载到父节点
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

function updateDOM(parentNode, oldProps, newProps) {
    if (parentNode.setAttribute) {
        setProps(parentNode, oldProps, newProps)
    }
}

function commitRoot() {
    // 执行 effectList 之前，先删除要删除的元素
    deletions.forEach(commitWork);

    let currentFiber = workInProgressRoot.firstEffect || null;
    while (currentFiber) {
        commitWork(currentFiber);
        currentFiber = currentFiber.nextEffect;
    }

    deletions.length = 0; // 每次执行完 effectList 之后，清空删除的数组
    currentRoot = workInProgressRoot; // 把当前渲染成功的 fiber 给当前渲染的树
    workInProgressRoot = null;
}

function commitWork(currentFiber) {
    if (!currentFiber) {
        return;
    }

    let returnFiber = currentFiber.return;

    while (returnFiber.tag !== TAG_HOST &&
        returnFiber.tag !== TAG_TEXT &&
        returnFiber.tag !== TAG_ROOT) {
        returnFiber = returnFiber.return;
    }

    let returnDOM = returnFiber.stateNode;
    if (currentFiber.effectTag === PLACEMENT) {
        let nextFiber = currentFiber;
        while (nextFiber.tag !== TAG_TEXT && nextFiber.tag !== TAG_HOST) {
            nextFiber = currentFiber.child;
        }

        returnDOM.appendChild(nextFiber.stateNode);
    } else if (currentFiber.effectTag === DELETION) {
        // returnDOM.removeChild(currentFiber.stateNode);
        return commitDeletion(currentFiber, returnDOM);
    } else if (currentFiber.effectTag === UPDATE) {
        if (currentFiber.type === ELEMENT_TEXT) {
            if (currentFiber.alternate.props.text !== currentFiber.props.text) {
                currentFiber.stateNode.textContent = currentFiber.props.text;
            }
        } else {
            if (currentFiber.tag === TAG_CLASS) {
                return;
            }
            updateDOM(currentFiber.stateNode, currentFiber.alternate.props, currentFiber.props);
        }
    }

    currentFiber.effectTag = null;
}

function commitDeletion(currentFiber, returnDOM) {
    if (currentFiber.tag === TAG_TEXT || currentFiber.tag === TAG_HOST) {
        returnDOM.removeChild(currentFiber.stateNode);
    } else {
        commitDeletion(currentFiber.child, returnDOM);
    }
}