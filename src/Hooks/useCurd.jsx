import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useUserRole from "./useUserRole";
import Swal from "sweetalert2";

const useCurd = (endpoint, allowedRoles = []) => {
  const axiosSecure = useAxiosSecure();
  const { role } = useUserRole();
  const queryClient = useQueryClient();

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

  const create = useMutation({
    mutationFn: safeMutation(async (newItem) => {
      const res = await axiosSecure.post(endpoint, newItem);
      return res.data;
    }),
    onSuccess: () => {
      Swal.fire("Data posted!!!", "Data posted successfully!", "success");
      queryClient.invalidateQueries([endpoint]);
    },
  });

  const updateWithPut = useMutation({
    mutationFn: safeMutation(async ({ id, updatedItems }) => {
      const res = await axiosSecure.put(`${endpoint}/${id}`, updatedItems);
      return res.data;
    }),
    onSuccess: () => {
      Swal.fire("Updated Succesfully", "Data updated successfully!", "success");
      queryClient.invalidateQueries([endpoint]);
    },
  });

  const updateWithPatch = useMutation({
    mutationFn: safeMutation(async ({ id, updatedItems }) => {
      const res = await axiosSecure.patch(`${endpoint}/${id}`, updatedItems);
      return res.data;
    }),
    onSuccess: () => {
      Swal.fire("Updated Succesfully", "Data updated successfully!", "success");
      queryClient.invalidateQueries([endpoint]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: safeMutation(async (id) => {
      const res = await axiosSecure.delete(`${endpoint}/${id}`);
      return res.data;
    }),
    onSuccess: () => {
      Swal.fire("Deleted ", "Data Deleted successfully!", "success");
      queryClient.invalidateQueries([endpoint]);
    },
  });

  return { create, read, updateWithPut, deleteMutation, updateWithPatch };
};

export default useCurd;
