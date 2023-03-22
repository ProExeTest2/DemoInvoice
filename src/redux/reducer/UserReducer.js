import { SAVE_LOGIN } from "../action/types";

const initialState = {
  userData: [],
};
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_LOGIN:
      return { userData: [action.payload] };

    default:
      return state;
  }
};
export default UserReducer;
