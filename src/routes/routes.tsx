import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Dashboard from "../layouts/Dashboard";

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
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;


