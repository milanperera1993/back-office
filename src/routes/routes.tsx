import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import DashboardLayout from "../layouts/ProductLayout";
import LoginLayout from "../layouts/LoginLayout";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";

const isAuthenticated = () => {
  return false;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: isAuthenticated() ? (
          <Navigate to="/product" replace />
        ) : (
          <Navigate to="/login" replace />
        ),
      },
      {
        path: "login",
        element: <LoginLayout />,
      },
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/product" replace />
          },
          {
            path: "product",
            element: <Products />,
          },
          {
            path: "product/:id",
            element: <ProductDetails />,
          }
        ],
      },
    ],
  },
]);

export default router;