import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import LoginLayout from "../layouts/LoginLayout";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import ErrorBoundary from "../pages/ErrorBoundary";
import AdminRoute from "./AdminRoute";
import ProductLayout from "../layouts/ProductLayout";

const isAuthenticated = () => {
  return false;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary/>,
    children: [
      {
        index: true,
        element: isAuthenticated() ? (
          <Navigate to="/products" replace />
        ) : (
          <Navigate to="/login" replace />
        ),
      },
      {
        path: "login",
        element: <LoginLayout />,
      },
      {
        element: <AdminRoute />,
        children: [
          {
            path: "/",
            element: <ProductLayout/>,
            children: [
              {
                index: true,
                element: <Navigate to="/products" replace />,
              },
              {
                path: "products",
                element: <Products />,
              },
              {
                path: "products/:id",
                element: <ProductDetails />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;