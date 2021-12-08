import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productSlice } from "./slice/fetchSlice";
import { cartSlice } from "./slice/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "product"],
};
const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  product: productSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
export default store;
