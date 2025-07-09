import AuthLayout from "@/Layouts/AuthLayout";
import Dashboard from "@/Layouts/Dashboard";
import Root from "@/Layouts/Root";
import Login from "@/Pages/Auth/loginpage/Login";
import Signup from "@/Pages/Auth/signupPage/Signup";
import CourtsPage from "@/Pages/Courts/CourtsPage";
import Announcement from "@/Pages/Dashboard/admin/Announcement/Announcement";
import MakeAnnouncement from "@/Pages/Dashboard/admin/Announcement/MakeAnnouncement";
import ConfirmedBookings from "@/Pages/Dashboard/admin/bookings/ConfirmedBookings";
import ManageBookings from "@/Pages/Dashboard/admin/bookings/ManageBookings";
import RejectedBookings from "@/Pages/Dashboard/admin/bookings/RejectedBookings";
import AddCourts from "@/Pages/Dashboard/admin/Courts/AddCourts";
import EditCourt from "@/Pages/Dashboard/admin/Courts/EditCourt";
import ManageCourts from "@/Pages/Dashboard/admin/Courts/ManageCourts";
import Coupons from "@/Pages/Dashboard/admin/cuppons/Cuppons";
import AllUsers from "@/Pages/Dashboard/admin/members/AllUsers";
import ChangeUserRole from "@/Pages/Dashboard/admin/members/ChangeUserRole";
import ManageMembers from "@/Pages/Dashboard/admin/members/ManageMembers";
import Member from "@/Pages/Dashboard/member/Member";
import MakePayments from "@/Pages/Dashboard/member/Payments/MakePayments";
import PaymentHistory from "@/Pages/Dashboard/member/Payments/PaymentHistory";
import User from "@/Pages/Dashboard/user/User";
import ErrorPage from "@/Pages/Error/ErrorPage";
import Home from "@/Pages/Home/Home";
import Profile from "@/Pages/Shared/Profile";

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
        index: true,
        element: <Profile />,
      },
      {
        path: "pending-bookings",
        element: <ManageBookings />,
      },
      {
        path: "approved-bookings",
        element: <ConfirmedBookings />,
      },
      {
        path: "rejected-bookings",
        element: <RejectedBookings />,
      },
      {
        path: "payment",
        element: <MakePayments />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "announcements",
        element: <Announcement />,
      },
      {
        path: "manage-members",
        element: <ManageMembers />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "add-courts",
        element: <AddCourts />,
      },
      {
        path: "manage-courts",
        element: <ManageCourts />,
      },
      {
        path: "manage-coupons",
        element: <Coupons />,
      },
      {
        path: "make-announcement",
        element: <MakeAnnouncement />,
      },
      {
        path: "announcements",
        element: <Announcement />,
      },
      {
        path: "make-admin",
        element: <ChangeUserRole />,
      },
      {
        path: "update-court/:id",
        element: <EditCourt />,
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
