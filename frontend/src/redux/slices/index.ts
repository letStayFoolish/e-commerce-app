// Root slice:
import productsReducer from "./ProductsSlice";
import authSliceReducer from "./UserSlice/authSlice";
import cartReducer from "./CartSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  productsReducer,
  cartReducer,
  authSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
