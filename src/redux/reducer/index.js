import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import { CLEAR_ALL } from "../action/types";

const appReducer = combineReducers({
  user: UserReducer,
});
export default rootReducer = (state, action) => {
  if (action.type === CLEAR_ALL) {
    state = undefined;
  }
  return appReducer(state, action);
};
