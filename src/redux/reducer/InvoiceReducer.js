import { CREATE_INVOICE, GET_INVOICE } from "../action/types";

const initialState = {
  InvoiceData: [],
  selectedInvoice: {},
};
const InvoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVOICE:
      return { InvoiceData: action.payload };
    case CREATE_INVOICE:
      return { InvoiceData: [...state.InvoiceData, action.payload] };
    default:
      return state;
  }
};
export default InvoiceReducer;
