import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/dashboard";
import Registration from "./pages/registration";
import Login from "./pages/login";
import Settings from "./pages/myTodos";
import MyAccount from "./pages/myaccount";
import Category from "./pages/categories";
import SingleCategory from "./pages/singleCategory";
import AuthRoute from "./components/protectedRoute";
import StoreMy from "./pages/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <App />
      </AuthRoute>
    ), // ✅ element not Component
    children: [
      { index: true, Component: Dashboard },
      { path: "settings", Component: Settings },
      { path: "myaccount", Component: MyAccount },
      { path: "Store", Component: StoreMy },
      {
        path: "categories",
        children: [
          { index: true, Component: Category },
          { path: ":id", Component: SingleCategory },
        ],
      },
    ],
  },
  { path: "/login", Component: Login }, // ✅ public
  { path: "/registration", Component: Registration }, // ✅ public
  { path: "*", element: <Navigate to="/login" replace /> },
]);

export default router;
