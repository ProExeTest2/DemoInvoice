import { ADD_USER_DATA } from "./types";

export const addUserActions = (user) => async (dispatch) => {
  dispatch({ type: ADD_USER_DATA, payload: user });
};
