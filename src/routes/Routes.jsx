import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import Root from "../layouts/Root";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard/AdminDashboard";
import UserDashboard from "../pages/Dashboard/User/UserDashboard/UserDashboard";
import Home from "../pages/Home/Home";
import Myprofile from "../pages/Dashboard/profile/Myprofile";
import NewIndividualComplaint from "../pages/Complaint/NewIndividualComplaint";
import NewInstitutionalComplaint from "../pages/Complaint/NewInstitutionalComplaint";
import MyComplaint from "../pages/Complaint/MyComplaint";
import IndividualComplaintView from "../pages/Complaint/IndividualComplaintView";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import ErrorElement from "../pages/ErrorElement/ErrorElement";
import InstitutionalComplaintView from "../pages/Complaint/InstitutionalComplaintView";
import Allcomplaints from "../pages/Complaint/Admin/Allcomplaints";
import PaymentFailed from "../pages/ErrorElement/PaymentFailed";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorElement />,
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
      {
        path: "payment/failed",
        element: <PaymentFailed />
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "admin",
        element: <AdminDashboard />,
      },
      {
        path: "user",
        element: <UserDashboard />,
      },
       
      {
        path: "/dashboard/user/new-individual-complaint",
        element: <NewIndividualComplaint />,
      },
       
      {
        path: "/dashboard/user/my-complaints",
        element: <MyComplaint />,
      },
      {
        path: "/dashboard/user/new-institutional-complaint",
        element: <NewInstitutionalComplaint />,
      },
      {
        path: "/dashboard/complaint/individual/:id",
        element: <IndividualComplaintView />
      },
      {
        path: "/dashboard/complaint/institutional/:id",
        element: <InstitutionalComplaintView />
      },
     
       
      {
        path: "/dashboard/admin/complaints",
        element: <Allcomplaints />
      },
    
    ],
  },
    // Add PageNotFound for undefined routes
    {
      path: "*",
      element: <PageNotFound />,
    },
]);
