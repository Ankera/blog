export const ADD = "ADD";
export const MINUS = "MINUS";

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
        type: "@@TYPE/REDUX_INIT"
    })

    return {
        getState,
        dispatch,
        subscribe
    }
}

export function reducer(state = { number: 100 }, action) {
    switch (action.type) {
        case ADD:
            return { number: state.number + 1 };
        case MINUS:
            return { number: state.number - 1 };
        default:
            return state;
    }
}