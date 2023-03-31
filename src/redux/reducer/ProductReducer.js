import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT,
  GET_SELECTED_PRODUCTS,
  UPDATE_PRODUCT,
} from "../action/types";

const initialState = {
  ProductData: [],
  selectedproducts: [],
};
const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return { ProductData: action.payload };

    case CREATE_PRODUCT:
      return { ProductData: [...state.ProductData, action.payload] };

    case UPDATE_PRODUCT:
      const ids = state.ProductData.findIndex(
        (item) => item.key == action.payload.key
      );
      state.ProductData[ids].desription = action.payload.desription;
      state.ProductData[ids].hsncode = action.payload.hsncode;
      state.ProductData[ids].igst = action.payload.igst;
      state.ProductData[ids].price = action.payload.price;
      state.ProductData[ids].productimage = action.payload.productimage;
      state.ProductData[ids].productname = action.payload.productname;
      state.ProductData[ids].stock = action.payload.stock;
      return { ProductData: [...state.ProductData] };

    case DELETE_PRODUCT:
      return {
        ProductData: [
          ...state.ProductData.filter((item) => item.key !== action.payload),
        ],
      };
    case GET_SELECTED_PRODUCTS:
      return {
        ProductData: [...state.ProductData],
        selectedproducts: action.payload,
      };
    default:
      return state;
  }
};
export default ProductReducer;
