// Root Saga:

import { all } from "redux-saga/effects";
import { watchGetAllProduct } from "./ProductsSaga";

function* rootSaga() {
  yield all([watchGetAllProduct()]);
}

export default rootSaga;
