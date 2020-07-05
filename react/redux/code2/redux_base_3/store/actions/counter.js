import * as types from "../../action-types";

export default {
    add() {
        return { type: types.ADD }
    },
    minus() {
        return { type: types.MINUS }
    }
}