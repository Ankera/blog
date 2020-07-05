function bindActionCreator(actionCreator, dispatch) {
    return function () {
        dispatch(actionCreator.apply(this, arguments));
    }
}

export default function bindActionCreators(actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch);
    }
    if (typeof actionCreators === 'object') {
        const boundActionCreators = {};
        const keys = Object.keys(actionCreators);
        for (let i = 0; i < keys.length; i++) {
            const creator = actionCreators[keys[i]];
            boundActionCreators[keys[i]] = bindActionCreator(creator, dispatch);
        }
        return boundActionCreators;
    }

    throw new Error("actionCreators type is error");
}