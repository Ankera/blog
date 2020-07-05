const REDUX_INIT = "@@TYPE/REDUX_INIT";

export function createStore(reducer) {
    let state;
    let listeners = [];

    function getState() {
        return state;
    }

    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(fn => fn());
    }

    function subscribe(listener) {
        listeners.push(listener);
        return function () {
            listeners = listeners.filter(fn => fn !== listener);
        }
    }

    dispatch({
        type: REDUX_INIT
    });

    return {
        getState,
        dispatch,
        subscribe
    }
}

// 它是一个动作的创建者
function bindActionCreator(actionCreator, dispatch) {
    return function () {
        dispatch(actionCreator.apply(this, arguments));
    }
}

export function bindActionCreators(actionCreators, dispatch) {
    if(typeof actionCreators === "function"){
        bindActionCreator(actionCreators, dispatch);
    }

    if(typeof actionCreators === 'object'){
        let keys = Object.keys(actionCreators);
        let boundActionCreators = {};

        for (let i = 0; i < keys.length; i++) {
            let creator = actionCreators[keys[i]];
            boundActionCreators[keys[i]] = bindActionCreator(creator, dispatch);
        }

        return boundActionCreators;
    }
}



