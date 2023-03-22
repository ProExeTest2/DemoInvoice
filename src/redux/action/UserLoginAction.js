import { SAVE_LOGIN } from "./types";
export const saveloginAction = (credentials) => async (dispatch) => {
  dispatch({ type: SAVE_LOGIN, payload: credentials });
};
