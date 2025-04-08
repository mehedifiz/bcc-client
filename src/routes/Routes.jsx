import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Register from "../pages/login/Register";
import Login from "../pages/login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  // {
  //   path: "/dashboard",
  //   element: <Dashboard/>,
  //   children: [
  //     {
  //       path: "admin",
  //       element: <AdminDashboard />
  //     },
  //     {
  //       path: "user",
  //       element: <UserDashboard />
  //     }
  //   ],
  // },
]);
