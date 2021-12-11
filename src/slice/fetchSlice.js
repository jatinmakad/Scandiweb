import { createSlice } from "@reduxjs/toolkit";
import { gql } from "apollo-boost";
import { request } from "graphql-request";
const DATA_USER = gql`
  {
    category {
      products {
        id
        inStock
        name
        gallery
        description
        category
        brand
        prices {
          currency
          amount
        }
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
      }
    }
    currencies
  }
`;
export const productSlice = createSlice({
  name: "productFetch",
  initialState: {
    product: [],
    currencies: [],
    isDropdwonOpen: false,
    productDescription: {},
    productCategory: "all",
    switchImage: 0,
  },
  reducers: {
    updateList(state, action) {
      state.product = action.payload;
    },
    updateCurrency(state, action) {
      state.currencies = action.payload;
    },
    toggleDropdownOpen(state, action) {
      return { ...state, isDropdwonOpen: true };
    },
    toggleDropdownClose(state, action) {
      return { ...state, isDropdwonOpen: false };
    },
    productSingle(state, action) {
      state.productDescription = action.payload;
    },
    filteredProduct(state, action) {
      state.productCategory = action.payload;
    },
    switchImages(state, action) {
      state.switchImage = action.payload;
    },
  },
});
export const fetchProduct = () => {
  return (dispatch) => {
    request("http://localhost:4000/", DATA_USER).then((data) => {
      dispatch(productSlice.actions.updateList(data.category.products));
      dispatch(productSlice.actions.updateCurrency(data.currencies));
    });
  };
};
export const fetchSingleProduct = (id) => {
  const Query = gql`
  {
    product(id:"${id}") {
      id
      name
      gallery
      description
      brand
      prices {
        currency
        amount
      }
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
    }
  }
`;
  return (dispatch) => {
    request("http://localhost:4000/", Query).then((data) => {
      dispatch(productSlice.actions.productSingle(data));
    });
  };
};

export const {
  toggleDropdownClose,
  toggleDropdownOpen,
  filterCurrency,
  filteredProduct,
  switchImages,
} = productSlice.actions;
