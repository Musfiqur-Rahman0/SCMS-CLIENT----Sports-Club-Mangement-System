import AuthLayout from "@/Layouts/AuthLayout";
import Dashboard from "@/Layouts/Dashboard";
import Root from "@/Layouts/Root";
import Login from "@/Pages/Auth/loginpage/Login";
import Signup from "@/Pages/Auth/signupPage/Signup";
import CourtsPage from "@/Pages/Courts/CourtsPage";
import Announcement from "@/Pages/Dashboard/admin/Announcement/Announcement";
import MakeAnnouncement from "@/Pages/Dashboard/admin/Announcement/MakeAnnouncement";
import AllApprovedBookings from "@/Pages/Dashboard/admin/bookings/AllApprovedBookings";
import ConfirmedBookings from "@/Pages/Dashboard/admin/bookings/ConfirmedBookings";
import ManageBookings from "@/Pages/Dashboard/admin/bookings/ManageBookings";
// import RejectedBookings from "@/Pages/Dashboard/admin/bookings/ApprovedBookings";
import AddCourts from "@/Pages/Dashboard/admin/Courts/AddCourts";
import EditCourt from "@/Pages/Dashboard/admin/Courts/EditCourt";
import ManageCourts from "@/Pages/Dashboard/admin/Courts/ManageCourts";
import AddCoupons from "@/Pages/Dashboard/admin/cuppons/AddCoupons";
import ManageCoupons from "@/Pages/Dashboard/admin/cuppons/ManageCuppons";
import Coupons from "@/Pages/Dashboard/admin/cuppons/ManageCuppons";
import AllUsers from "@/Pages/Dashboard/admin/members/AllUsers";
import ChangeUserRole from "@/Pages/Dashboard/admin/members/ChangeUserRole";
import ManageMembers from "@/Pages/Dashboard/admin/members/ManageMembers";
import MakePayments from "@/Pages/Dashboard/member/Payments/MakePayments";
import PaymentHistory from "@/Pages/Dashboard/member/Payments/PaymentHistory";
import ErrorPage from "@/Pages/Error/ErrorPage";
import Home from "@/Pages/Home/Home";
import ApprovedBookings from "@/Pages/Shared/Bookings/ApprovedBookings";
import MyPendingBookings from "@/Pages/Shared/Bookings/MyPendingBookings";
import MyBookings from "@/Pages/Shared/MyBookings";
// import PendingBookings from "@/Pages/Shared/PendingBookings";
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
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "pending-bookings",
        element: <ManageBookings />,
      },
      {
        path: "confirmed-bookings",
        element: <ConfirmedBookings />,
      },
      {
        path: "approved-bookings",
        element: <ApprovedBookings />,
      },
      {
        path: "all-approved-bookings",
        element: <AllApprovedBookings />,
      },
      {
        path: "payment/:id",
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
      {
        path: "add-coupons",
        element: <AddCoupons />,
      },
      {
        path: "manage-coupons",
        element: <ManageCoupons />,
      },
      {
        path: "my-pending-bookings",
        element: <MyPendingBookings />,
      },
      {
        path: "my-approved-bookings",
        element: <ApprovedBookings />,
      },
      {
        path: "my-confirmed-bookings",
        element: <ConfirmedBookings />,
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
