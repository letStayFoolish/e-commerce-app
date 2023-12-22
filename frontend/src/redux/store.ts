import { configureStore, Middleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer, { type RootState } from "./slices";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware: Middleware<object, RootState>[] = [
  sagaMiddleware as Middleware<object, RootState>,
];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware<RootState>().concat(middleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;

export default store;
