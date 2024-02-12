import React from "react";
import ReactDOM from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.tsx";
import "./assets/styles/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/bootstrap.custom.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import Home from "./pages/Home/index.jsx";
import ProductDetails from "./pages/ProductDetails/index.tsx";
import Cart from "./pages/Cart/index.tsx";
import LoginPage from "./pages/Auth/LoginPage.tsx";
import RegisterPage from "./pages/Auth/RegisterPage.tsx";
import ShippingPage from "./pages/Shipping/index.tsx";
import PrivateRoute from "./components/PrivateRoute/index.tsx";
import PaymentPage from "./pages/Payment/index.tsx";
import PlaceOrderPage from "./pages/PlaceOrder/index.tsx";
import OrderPage from "./pages/OrderPage/index.tsx";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ProfilePage from "./pages/Profile/index.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/product/:productId" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PayPalScriptProvider deferLoading={true}> */}
      <RouterProvider router={router} />
      {/* </PayPalScriptProvider> */}
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
