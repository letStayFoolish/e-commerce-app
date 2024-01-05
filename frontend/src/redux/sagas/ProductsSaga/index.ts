import { put, takeEvery } from "redux-saga/effects";
import { getProductsAPI } from "../../../apis/getProducts";
import {
  getAllProductsSliceFailure,
  getAllProductsSliceStart,
  getAllProductsSliceSuccess,
} from "../../slices/ProductsSlice";

function* getAllProductsSaga() {
  console.log("SAGA!");
  try {
    const products = yield getProductsAPI();

    console.log("PRODUCTS: ", products);

    yield put(getAllProductsSliceSuccess(products));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getAllProductsSliceFailure(error.message));
    }
  }
}

export function* watchGetAllProduct() {
  yield takeEvery(getAllProductsSliceStart.type, getAllProductsSaga);
}
