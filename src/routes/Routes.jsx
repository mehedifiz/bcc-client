import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import Root from "../layouts/Root";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard/AdminDashboard";
import UserDashboard from "../pages/Dashboard/User/UserDashboard/UserDashboard";
import Home from "../pages/Home/Home";
import Myprofile from "../pages/Dashboard/profile/myprofile";

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
      
      {
        path: "profile",
        element: <Myprofile />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "admin",
        element: <AdminDashboard />,
      },
      {
        path: "user",
        element: <UserDashboard />,
      },
    
    ],
  },
]);
