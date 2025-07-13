import { AuthContext } from "@/Context/AuthContext";
import useUserRole from "@/Hooks/useUserRole";
import React, { use } from "react";
import { Navigate, Outlet } from "react-router";

const PrivetRoute = ({ children, allowedRoles = [] }) => {
  const { roleLoading, role } = useUserRole();
  const { user, isLoading } = use(AuthContext);

  if (roleLoading || isLoading) {
    return <p>loading...</p>;
  }

  if (!user) {
    return <Navigate to={"/login"} state={location.pathname} />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={"/forbidden"} />;
  }

  return children;
};

export default PrivetRoute;
