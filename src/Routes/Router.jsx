import AuthLayout from "@/Layouts/AuthLayout";
import Dashboard from "@/Layouts/Dashboard";
import Root from "@/Layouts/Root";
import Login from "@/Pages/Auth/loginpage/Login";
import Signup from "@/Pages/Auth/signupPage/Signup";
import CourtsPage from "@/Pages/Courts/CourtsPage";
import Announcement from "@/Pages/Dashboard/admin/Announcement/Announcement";
import MakeAnnouncement from "@/Pages/Dashboard/admin/Announcement/MakeAnnouncement";
import AllApprovedBookings from "@/Pages/Dashboard/admin/bookings/AllApprovedBookings";
import AllConfirmedBookings from "@/Pages/Dashboard/admin/bookings/ConfirmedBookings";
// import ConfirmedBookings from "@/Pages/Dashboard/admin/bookings/ConfirmedBookings";
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
import ConfirmedBookings from "@/Pages/Shared/Bookings/ConfirmedBookings";
import MyPendingBookings from "@/Pages/Shared/Bookings/MyPendingBookings";
import MyBookings from "@/Pages/Shared/MyBookings";
// import PendingBookings from "@/Pages/Shared/PendingBookings";
import Profile from "@/Pages/Shared/Profile";

import { createBrowserRouter } from "react-router";
import PrivetRoute from "./PrivetRoute";
import ForbiddenPage from "@/Pages/Forbidden/ForbiddenPage";

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
      {
        path: "/forbidden",
        element: <ForbiddenPage />,
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
        element: (
          <PrivetRoute allowedRoles={["member", "user"]}>
            <MyBookings />
          </PrivetRoute>
        ),
      },
      {
        path: "my-confirmed-bookings",
        element: (
          <PrivetRoute allowedRoles={["member"]}>
            <ConfirmedBookings />
          </PrivetRoute>
        ),
      },
      {
        path: "pending-bookings",
        element: (
          <PrivetRoute allowedRoles={["admin"]}>
            <ManageBookings />
          </PrivetRoute>
        ),
      },
      // {
      //   path: "approved-bookings",
      //   element: (
      //     <PrivetRoute allowedRoles={["member"]}>
      //       <ApprovedBookings />
      //     </PrivetRoute>
      //   ),
      // },
      {
        path: "all-confirmed-bookings",
        element: (
          <PrivetRoute allowedRoles={["admin"]}>
            <AllConfirmedBookings />
          </PrivetRoute>
        ),
      },
      {
        path: "all-approved-bookings",
        element: (
          <PrivetRoute allowedRoles={["admin"]}>
            <AllApprovedBookings />
          </PrivetRoute>
        ),
      },

      {
        path: "payment",
        element: (
          <PrivetRoute allowedRoles={["member"]}>
            <ApprovedBookings />
          </PrivetRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <PrivetRoute allowedRoles={["member"]}>
            <MakePayments />
          </PrivetRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivetRoute allowedRoles={["member"]}>
            <PaymentHistory />
          </PrivetRoute>
        ),
      },
      {
        path: "announcements",
        element: <Announcement />,
      },
      {
        path: "manage-members",
        element: (
          <PrivetRoute allowedRoles={["admin"]}>
            <ManageMembers />
          </PrivetRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <PrivetRoute allowedRoles={["admin"]}>
            <AllUsers />
          </PrivetRoute>
        ),
      },
      {
        path: "add-courts",
        element: (
          <PrivetRoute allowedRoles={["admin"]}>
            <AddCourts />
          </PrivetRoute>
        ),
      },
      {
        path: "manage-courts",
        element: (
          <PrivetRoute allowedRoles={["admin"]}>
            <ManageCourts />
          </PrivetRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <PrivetRoute allowedRoles={["admin"]}>
            <Coupons />
          </PrivetRoute>
        ),
      },
      {
        path: "make-announcement",
        element: (
          <PrivetRoute allowedRoles={["admin"]}>
            <MakeAnnouncement />
          </PrivetRoute>
        ),
      },
      {
        path: "announcements",
        element: <Announcement />,
      },
      {
        path: "make-admin",
        element: (
          <PrivetRoute allowedRoles={["admin"]}>
            <ChangeUserRole />
          </PrivetRoute>
        ),
      },
      {
        path: "update-court/:id",
        element: (
          <PrivetRoute allowedRoles={["admin"]}>
            <EditCourt />
          </PrivetRoute>
        ),
      },
      {
        path: "add-coupons",
        element: (
          <PrivetRoute allowedRoles={["admin"]}>
            <AddCoupons />
          </PrivetRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <PrivetRoute allowedRoles={["admin"]}>
            <ManageCoupons />
          </PrivetRoute>
        ),
      },
      {
        path: "my-pending-bookings",
        element: (
          <PrivetRoute allowedRoles={["member", "user"]}>
            <MyPendingBookings />
          </PrivetRoute>
        ),
      },
      {
        path: "my-approved-bookings",
        element: (
          <PrivetRoute allowedRoles={["member"]}>
            <ApprovedBookings />
          </PrivetRoute>
        ),
      },
      {
        path: "my-confirmed-bookings",
        element: (
          <PrivetRoute allowedRoles={["member"]}>
            <ConfirmedBookings />
          </PrivetRoute>
        ),
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
