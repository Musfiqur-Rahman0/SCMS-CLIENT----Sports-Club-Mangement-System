import useUserRole from "@/Hooks/useUserRole";
import React from "react";

const Profile = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <p>Loading...</p>;
  }
  return <div>Profile page of {role}</div>;
};

export default Profile;
