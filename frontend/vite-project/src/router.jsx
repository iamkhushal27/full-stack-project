import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home";
import Registration from "./pages/registration";
import Login from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/registration",
    Component: Registration,
    
  },
  {
    path: "/login",
    Component: Login,
    
  },
]);

export default router;
