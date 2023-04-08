import { LOGOUT, SAVE_LOGIN, SELECTED_LANGUAGE } from "../action/types";

const initialState = {
  userData: [],
  selectedLanguage: "",
};
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_LOGIN:
      return { userData: [action.payload] };
    case SELECTED_LANGUAGE:
      return { selectedLanguage: action.payload };
    case LOGOUT:
      return { userData: [] };
    default:
      return state;
  }
};
export default UserReducer;
