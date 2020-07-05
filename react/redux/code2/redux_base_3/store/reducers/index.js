import todos from "./todos";
import counter from "./counter";
import { combineReducers } from "../../redux/index";

export default combineReducers({
    todos,
    counter
})

