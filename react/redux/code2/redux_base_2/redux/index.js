import { bindActionCreators } from './redux';

const CHANGE_INPUT_VALUE = "CHANGE_INPUT_VALUE";
const ADD_TODO_ITEM = "ADD_TODO_ITEM";
const DELETE_TODO_ITEM = "DELETE_TODO_ITEM";

const initState = {
    inputVal: "",
    list: ["anker", "abcd"]
}

export function reducer(state = initState, action) {
    switch (action.type) {
        case CHANGE_INPUT_VALUE:
            return { ...state, inputVal: action.value };
        case ADD_TODO_ITEM:
            return { list: [...state.list, state.inputVal], inputVal: "" }
        case DELETE_TODO_ITEM:
            state.list.splice(action.index, 1)
            return { list: [...state.list] };
        default:
            return state;
    }
}

const actionCreators = {
    changeInputValue: value => ({
        type: CHANGE_INPUT_VALUE,
        value
    }),
    addTodoItem: () => ({
        type: ADD_TODO_ITEM
    }),
    delTodoItem: index => ({
        type: DELETE_TODO_ITEM,
        index
    })
}

export const actions = dispatch => bindActionCreators(actionCreators, dispatch);