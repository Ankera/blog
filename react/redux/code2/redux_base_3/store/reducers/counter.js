import * as types from "../../action-types";

const initState = {
    number: 0
}
export default function counterReducer(state = initState, action) {
    switch (action.type) {
        case types.ADD:
            return { number: state.number + 1 }
        case types.MINUS:
            return { number: state.number - 1 }
        default:
            return state;
    }
}