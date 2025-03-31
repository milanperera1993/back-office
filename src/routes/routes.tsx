import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import DashboardLayout from "../layouts/DashboardLayout";
import LoginLayout from "../layouts/LoginLayout";

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
          <Navigate to="/dashboard" replace />
        ) : (
          <Navigate to="/login" replace />
        ),
      },
      {
        path: "login",
        element: <LoginLayout />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
      },
    ],
  },
]);

export default router;


