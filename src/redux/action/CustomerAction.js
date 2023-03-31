import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  updateCustomer,
} from "../../helper/Global/functions";
import {
  CREATE_CUSTOMER,
  DELETE_CUSTOMER,
  GET_CUSTOMER,
  GET_SELECTED_CUSTOMER,
  UPDATE_CUSTOMER,
} from "./types";

// export const getCustomerAction = () => async (dispatch) => {
//   const customerdatas = getCustomer();
//   dispatch({ type: GET_CUSTOMER, payload: customerdatas });
// };

export const getSelectedCustomerAction = (customer) => async (dispatch) => {
  //createCustomer(customer);
  dispatch({ type: GET_SELECTED_CUSTOMER, payload: customer });
};

export const createCustomerAction = (customer) => async (dispatch) => {
  createCustomer(customer);
  dispatch({ type: CREATE_CUSTOMER, payload: customer });
};

export const updateCustomerAction = (customer, key) => async (dispatch) => {
  updateCustomer(customer, key);
  dispatch({
    type: UPDATE_CUSTOMER,
    payload: { customerinfo: customer, key: key },
  });
};

export const deleteCustomerAction = (key) => async (dispatch) => {
  deleteCustomer(key);
  dispatch({ type: DELETE_CUSTOMER, payload: key });
};
