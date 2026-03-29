import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/dashboard";
import Registration from "./pages/registration";
import Login from "./pages/login";
import Settings from "./pages/settings";
import MyAccount from "./pages/myaccount";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path:"settings",
        Component: Settings,
      },
      {
        path:"myaccount",
        Component: MyAccount,
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
