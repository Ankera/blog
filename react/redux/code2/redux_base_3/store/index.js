import { createStore } from "../redux/index";
import reducers from "./reducers/index";

const store = createStore(reducers);
export default store;