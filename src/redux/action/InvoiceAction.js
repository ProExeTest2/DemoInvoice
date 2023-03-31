import { createInvoice, getInvoice } from "../../helper/Global/functions";
import { CREATE_INVOICE, GET_INVOICE } from "./types";

export const getInvoiceActions = () => async (dispatch) => {
  const productdatas = getInvoice();
  dispatch({ type: GET_INVOICE, payload: productdatas });
};
export const createInvoiceActions = (invoice) => async (dispatch) => {
  const newinvoice = createInvoice(invoice);
  dispatch({ type: CREATE_INVOICE, payload: newinvoice });
};
