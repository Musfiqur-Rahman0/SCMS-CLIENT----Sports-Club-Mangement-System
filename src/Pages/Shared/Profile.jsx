"use client";

import React from "react";
import useUserRole from "@/Hooks/useUserRole";
// Assuming you have a custom auth hook for user info
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AdminProfile from "../Dashboard/admin/AdminProfile";
import MemberProfile from "../Dashboard/member/MemberProfile";
import UserProfile from "../Dashboard/user/UserProfile";
import useAuth from "@/Hooks/useAuth";

export default function Profile() {
  const { role, roleLoading } = useUserRole();
  const { user } = useAuth();

  return (
    <div className="w-[80%] mx-auto p-8">
      {role === "admin" && <AdminProfile user={user} stats={{}} />}
      {role === "member" && <MemberProfile user={user} />}
      {role === "user" && <UserProfile user={user} />}
    </div>
  );
}
