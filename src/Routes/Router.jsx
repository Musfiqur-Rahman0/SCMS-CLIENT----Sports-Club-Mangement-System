import AuthLayout from "@/Layouts/AuthLayout";
import Dashboard from "@/Layouts/Dashboard";
import Root from "@/Layouts/Root";
import Login from "@/Pages/Auth/loginpage/Login";
import Signup from "@/Pages/Auth/signupPage/Signup";
import CourtsPage from "@/Pages/Courts/CourtsPage";
import Admin from "@/Pages/Dashboard/admin/Admin";
import Member from "@/Pages/Dashboard/member/Member";
import User from "@/Pages/Dashboard/user/User";
import ErrorPage from "@/Pages/Error/ErrorPage";
import Home from "@/Pages/Home/Home";

import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // ✅ Use element for consistency
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "courts",
        element: <CourtsPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "member", // ✅ Lowercase for consistency
        element: <Member />,
      },
    ],
  },
  {
    element: <AuthLayout />, // ✅ No duplicate `/` path
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
