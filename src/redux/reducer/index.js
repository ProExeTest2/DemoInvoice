import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import { CLEAR_ALL } from "../action/types";
import CustomerReducer from "./CustomerReducer";
import ProductReducer from "./ProductReducer";
import InvoiceReducer from "./InvoiceReducer";
import PrestartrReducer from "./PrestartrReducer";

const appReducer = combineReducers({
  user: UserReducer,
  customer: CustomerReducer,
  product: ProductReducer,
  invoice: InvoiceReducer,
  prestartr: PrestartrReducer,
});
export default rootReducer = (state, action) => {
  if (action.type === CLEAR_ALL) {
    state = undefined;
  }
  return appReducer(state, action);
};
