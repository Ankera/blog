import * as types from "../../action-types";

export default {
    changeValue: (value) => ({
        type: types.CHANGE_INPUT_VALUE,
        value
    }),
    addValue: () => ({
        type: types.ADD_TODO_ITEM
    }),
    delValue: (index) => ({
        type: types.DELETE_TODO_ITEM,
        index
    })
}