import {
  createProduct,
  getProduct,
  updateProduct,
} from "../../helper/Global/functions";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT,
  GET_SELECTED_PRODUCTS,
  UPDATE_PRODUCT,
} from "../action/types";

export const getProductAction = (products) => async (dispatch) => {
  //const productdatas = getProduct();
  dispatch({ type: GET_PRODUCT, payload: products });
};

export const getSelectedProductAction =
  (product, totalvalue) => async (dispatch) => {
    //createCustomer(customer);
    dispatch({ type: GET_SELECTED_PRODUCTS, payload: product });
  };

export const createProductAction = (customer) => async (dispatch) => {
  const newcustomer = createProduct(customer);
  dispatch({ type: CREATE_PRODUCT, payload: newcustomer });
};

export const updateProductAction = (product, key) => async (dispatch) => {
  const productinfo = updateProduct(product, key);
  console.log("product,data ", product, key);
  dispatch({ type: UPDATE_PRODUCT, payload: productinfo });
};

export const deleteProductAction = (key) => async (dispatch) => {
  deleteProduct(key);
  dispatch({ type: DELETE_PRODUCT, payload: key });
};
