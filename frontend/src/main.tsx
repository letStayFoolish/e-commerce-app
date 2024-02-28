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
import AdminRoute from "./components/AdminRoute/index.tsx";
import OrderListPage from "./pages/admin/OrderListPage/index.tsx";
import ProductListPage from "./pages/admin/ProductListPage/index.tsx";
import EditProductPage from "./pages/admin/EditProductPage/index.tsx";
import UsersListPage from "./pages/admin/UsersListPage";
import UserEditPage from "./pages/admin/UserEditPage/index.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/search/:keyword" element={<Home />} />
      <Route path="/page/:pageNumber" element={<Home />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<Home />} />
      <Route path="/product/:productId" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Auth user routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Admin routes */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListPage />} />
        <Route path="/admin/productlist" element={<ProductListPage />} />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductListPage />}
        />
        <Route path="/admin/product/:id/edit" element={<EditProductPage />} />
        <Route path="/admin/userlist" element={<UsersListPage />} />
        <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
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
