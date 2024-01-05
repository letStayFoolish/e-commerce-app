import App from "./App.tsx";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProductDetails from "./pages/ProductDetails/index.tsx";
import Home from "./pages/Home/index.tsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/product/:productId" element={<ProductDetails />} />
    </Route>
  )
);
