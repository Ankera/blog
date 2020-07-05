import * as types from "../../action-types";

const initState = {
    inputVal: "",
    list: ["init", "hello world"]
}

export default function todoReducer(state = initState, action) {
    switch (action.type) {
        case types.CHANGE_INPUT_VALUE:
            return { list: [...state.list], inputVal: action.value }
        case types.ADD_TODO_ITEM:
            return { list: [...state.list, state.inputVal], inputVal: "" }
        case types.DELETE_TODO_ITEM:
            state.list.splice(action.index, 1);
            return { list: [...state.list] }
        default:
            return state;
    }
}