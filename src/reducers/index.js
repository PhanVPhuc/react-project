import { combineReducers } from "redux";
import hobbyReducer from "./hobby";

// tap hop cac reduces
const rootReducer = combineReducers({
  hobby: hobbyReducer,
});

export default rootReducer;
