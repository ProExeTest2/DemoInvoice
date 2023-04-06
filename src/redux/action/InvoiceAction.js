import { createInvoice, getInvoice } from "../../helper/Global/functions";
import { CREATE_INVOICE, GET_INVOICE } from "./types";

export const getInvoiceActions = (invoices) => async (dispatch) => {
  //const productdatas = getInvoice();
  dispatch({ type: GET_INVOICE, payload: invoices });
};
export const createInvoiceActions = (invoice, key) => async (dispatch) => {
  console.log("CREATE INVOICE ", invoice, key);
  createInvoice(invoice, key);
  dispatch({ type: CREATE_INVOICE, payload: invoice });
};
