// Root slice:
import productsReducer from "./ProductsSlice";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ productsReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
