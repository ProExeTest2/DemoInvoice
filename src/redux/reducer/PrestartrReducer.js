import { ADD_USER_DATA } from "../action/types";

const initialState = {
  UserData: {},
};
const PrestartrReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_DATA:
      return { InvoiceData: action.payload };

    default:
      return state;
  }
};
export default PrestartrReducer;
