import { LOGOUT, SAVE_LOGIN, SELECTED_LANGUAGE } from "./types";
export const saveloginAction = (credentials) => async (dispatch) => {
  dispatch({ type: SAVE_LOGIN, payload: credentials });
};
export const logoutAction = () => async (dispatch) => {
  dispatch({ type: LOGOUT, payload: [] });
};
export const selectedLanguageAction = (lan) => async (dispatch) => {
  dispatch({ type: SELECTED_LANGUAGE, payload: lan });
};
