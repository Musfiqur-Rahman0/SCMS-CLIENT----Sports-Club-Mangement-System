import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useUserRole from "./useUserRole";

const useCurd = (endpoint, allowedRoles = []) => {
  const axiosSecure = useAxiosSecure();
  const { role } = useUserRole();

  const canUse = allowedRoles.includes(role);

  const safeMutation =
    (mutationFn) =>
    async (...args) => {
      if (!canUse) {
        throw new Error("Unauthorized access");
      }
      return mutationFn(...args);
    };

  const read = useQuery({
    queryKey: [endpoint],
    queryFn: safeMutation(async () => {
      const res = await axiosSecure.get(endpoint);
      return res.data;
    }),
    enabled: !!role,
  });

  return { read };
};

export default useCurd;
