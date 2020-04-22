import { createStore } from "redux";
import reducer from "./components/reducers/reducer";

const store = createStore(reducer);

export default store;