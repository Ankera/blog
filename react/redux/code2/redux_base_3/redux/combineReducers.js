export default function combineReducers(reducers) {
    // 返回的函数初始化在 createStore 的 dispatch 中调用
    return function (state = {}, action) {
        const reducerKeys = Object.keys(reducers);
        const nextState = {};
        let hasChanged = false;
        for (let i = 0; i < reducerKeys.length; i++) {
            const key = reducerKeys[i];
            const prevStateForKey = state[key];
            const reducer = reducers[key];
            const nextStateForKey = reducer(prevStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== prevStateForKey;
        }

        return hasChanged ? nextState : state;
    }
}


// 简写
function composeReducers(reducers) {
    let netState = {};
    return (state = {}, action) => {
        for (const name in reducers) {
            if (reducers.hasOwnProperty(name)) {
                netState[name] = reducers[name](state, action);
            }
        }
        return netState;
    }
}