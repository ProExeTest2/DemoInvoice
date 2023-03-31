import {
  CREATE_CUSTOMER,
  DELETE_CUSTOMER,
  GET_CUSTOMER,
  GET_SELECTED_CUSTOMER,
  UPDATE_CUSTOMER,
} from "../action/types";

const initialState = {
  CustomerData: [],
  invoicecustomer: {},
};

const CustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER:
      console.log("Action: ", action);
      return { CustomerData: action.payload };

    case CREATE_CUSTOMER:
      return { CustomerData: [...state.CustomerData, action.payload] };

    case UPDATE_CUSTOMER:
      const ids = state.CustomerData.findIndex(
        (item) => item.key == action.payload.key
      );
      state.CustomerData[ids].address = action.payload.customerinfo.address;
      state.CustomerData[ids].address1 = action.payload.customerinfo.address1;
      state.CustomerData[ids].customername =
        action.payload.customerinfo.customername;
      state.CustomerData[ids].emailaddress =
        action.payload.customerinfo.emailaddress;
      state.CustomerData[ids].gstnumber = action.payload.customerinfo.gstnumber;
      state.CustomerData[ids].gststate = action.payload.customerinfo.gststate;
      state.CustomerData[ids].gststatecode =
        action.payload.customerinfo.gststatecode;
      state.CustomerData[ids].pannumber = action.payload.customerinfo.pannumber;
      state.CustomerData[ids].phonenumber =
        action.payload.customerinfo.phonenumber;
      state.CustomerData[ids].state = action.payload.customerinfo.state;
      state.CustomerData[ids].state1 = action.payload.customerinfo.state1;
      state.CustomerData[ids].town = action.payload.customerinfo.town;
      s;
      state.CustomerData[ids].town1 = action.payload.customerinfo.town1;
      return { CustomerData: [...state.CustomerData] };

    case DELETE_CUSTOMER:
      return {
        CustomerData: [
          ...state.CustomerData.filter((item) => item.key !== action.payload),
        ],
      };
    case GET_SELECTED_CUSTOMER:
      return {
        CustomerData: [...state.CustomerData],
        invoicecustomer: action.payload,
      };
    default:
      return state;
  }
};
export default CustomerReducer;
