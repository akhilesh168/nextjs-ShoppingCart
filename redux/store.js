import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth.slice";
import { cartReducer } from "./cart.slice";
import { categoryReducer } from "./category.slice";
import { productReducer } from "./product.slice";

const reducer = {
  cart: cartReducer,
  products: productReducer,
  categories: categoryReducer,
  authUser: authReducer,
};
const store = configureStore({ reducer });

export default store;
