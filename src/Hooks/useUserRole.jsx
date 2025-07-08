import React, { useState } from "react";
import useAxios from "./useAxios";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();

  const email = user?.email;
  const {
    data: role,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${email}`);
      return res.data.role;
    },
  });

  return { role, roleLoading: isLoading };
};

export default useUserRole;
