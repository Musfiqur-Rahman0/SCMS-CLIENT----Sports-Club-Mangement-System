import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;

  const {
    data: role,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${email}`);
      return res.data.role;
    },
  });

  return { role, roleLoading: isLoading };
};

export default useUserRole;
