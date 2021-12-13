import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    attributes: [],
    isCartOpen: false,
    grandTotal: 0,
    currency: "USD",
  },
  reducers: {
    toggleCart(state, action) {
      document.body.style.overflow = "hidden";
      return { ...state, isCartOpen: !state.isCartOpen };
    },
    toggleCartClose(state, action) {
      document.body.style.overflow = "scroll";
      return { ...state, isCartOpen: false };
    },
    toggleCartOpen(state, action) {
      return { ...state, isCartOpen: true };
    },
    filterCurrency(state, action) {
      state.currency = action.payload;
      updateAmount(state);
    },
    addCart(state, action) {
      let cart = state.carts.slice();
      let alreadyInCart = false;
      const { attributes } = action.payload;
      const { id } = action.payload;
      let items = [attributes];
      for (let i = 0; i < attributes.length; i++) {
        let item = {
          att_id: attributes[i]?.id,
          att_type: attributes[i]?.type,
          pr_id: id,
          att_value: attributes[i]?.items[0]?.displayValue,
        };
        items[i] = item;
      }
      if (!cart.length) {
        alreadyInCart = false;
      } else {
        cart.forEach((item) => {
          items.every((z) => {
            item.attributes.filter((s) => {
              if (_.isEqual(z, s)) {
                alreadyInCart = true;
                item.count++;
                state.attributes = [];
              }
              return false;
            });
            return false;
          });
        });
      }
      if (!alreadyInCart) {
        state.carts.push({
          ...action.payload,
          count: 1,
          co: 0,
          attributes: [...items],
        });
        state.attributes = [];
      }
      updateAmount(state);
    },
    addToCart(state, action) {
      let attribute = state.attributes.slice();
      let cart = state.carts.slice();
      let alreadyInCart = false;
      cart.forEach((item) => {
        state.attributes.every((z) => {
          item.attributes.filter((s) => {
            if (_.isEqual(z, s)) {
              alreadyInCart = true;
              item.count++;
              state.attributes = [];
            }
            return false;
          });
          return false;
        });
      });
      if (!alreadyInCart) {
        state.carts.push({
          ...action.payload,
          count: 1,
          co: 0,
          attributes: attribute,
        });
        state.attributes = [];
      }
      updateAmount(state);
    },
    toggleAmount(state, action) {
      const { products, value } = action.payload;
      let cart = state.carts.slice();
      cart.filter((cart, index) => {
        if (index === products) {
          if (value === "increase") {
            const newCo = cart.count++;
            return { ...cart, count: newCo };
          }
          if (value === "decrease") {
            const newCo = cart.count--;
            return { ...cart, count: newCo };
          }
        }
        return cart;
      });
      updateAmount(state);
    },
    toggleImage(state, action) {
      const { products, value } = action.payload;
      let cart = state.carts.slice();
      cart.filter((cart, index) => {
        if (index === products) {
          if (value === "increase") {
            const news = [cart.co === 5 ? (cart.co = 0) : cart.co++];
            return { ...cart, news };
          }
          if (value === "decrease") {
            const news = [cart.co === 0 ? (cart.co = 4) : cart.co--];
            return { ...cart, news };
          }
        }
        return cart;
      });
    },
    remove(state, action) {
      const { product } = action.payload;
      let cart = state.carts.slice();
      const temp = cart.filter((x, index) => index !== product);
      state.carts = temp;
      updateAmount(state);
      if (!state.carts.length) {
        return void { ...(state.grandTotal = 0) };
      }
    },
    NewAttribut(state, action) {
      const attribute = state.attributes.slice();
      let alreadyInCart = false;
      const { pr_id, att_id, att_value, att_type } = action.payload;
      const obj = {
        pr_id: pr_id,
        att_id: att_id,
        att_value: att_value,
        att_type: att_type,
      };
      if (!attribute.length) {
        return { ...state, attributes: [...state.attributes, obj] };
      } else {
        const filtered = attribute.filter((e) =>
          e.att_id === att_id && e.pr_id === pr_id
            ? (e.att_value = att_value) && (alreadyInCart = true)
            : (alreadyInCart = false)
        );
        let attribut = [...attribute];
        const index = attribut.findIndex(
          (el) => el.att_id === att_id && el.pr_id === pr_id
        );
        attribut[index] = filtered;
        if (!filtered.length) {
        } else {
          return void { ...state, attributes: attribut };
        }
        if (!alreadyInCart) {
          state.attributes = [...state.attributes, obj];
        }
      }
    },
    emptyAttributes(state, action) {
      return void { ...(state.attributes = []) };
    },
  },
});
const updateAmount = (state) => {
  let total = 0;
  state.carts.forEach((item) => {
    item.prices.forEach((j) => {
      if (j.currency === `${state.currency}`) {
        total = total + j.amount * item.count;
      }
      return (state.grandTotal = total);
    });
  });
};
export const AddAttributes = (pr_id, att_id, att_value, att_type) => {
  return (dispatch) => {
    dispatch(
      cartSlice.actions.NewAttribut({ pr_id, att_id, att_value, att_type })
    );
  };
};
export const toggleAmountFunc = (products, value) => {
  return (dispatch) => {
    dispatch(cartSlice.actions.toggleAmount({ products, value }));
  };
};
export const removeAmountFunc = (product) => {
  return (dispatch) => {
    dispatch(cartSlice.actions.remove({ product }));
  };
};
export const toggleImageFunc = (products, value) => {
  return (dispatch) => {
    dispatch(cartSlice.actions.toggleImage({ products, value }));
  };
};

export const {
  addToCart,
  NewAttribut,
  remove,
  toggleCart,
  filterCurrency,
  increment,
  toggleCartOpen,
  decrement,
  toggleCartClose,
  ProductImageDec,
  ProductImageInc,
  toggleAmount,
  cartTotalReducer,
  addCart,
  emptyAttributes,
} = cartSlice.actions;
