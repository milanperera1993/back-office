import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginLayout from "../layouts/LoginLayout";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import ErrorBoundary from "../pages/ErrorBoundary";
import PrivateRoute from "./PrivateRoute";
import ProductLayout from "../layouts/ProductLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary/>,
    children: [
      {
        path: "login",
        element: <LoginLayout />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <ProductLayout />,
            children: [
              {
                path: "products/:categoryId?",
                element: <Products />,
              },
              {
                path: "products/:categoryId/details/:id",
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