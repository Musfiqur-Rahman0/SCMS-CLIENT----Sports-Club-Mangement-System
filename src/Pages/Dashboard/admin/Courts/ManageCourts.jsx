import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { useState } from "react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import SharedTable from "@/Pages/Shared/SharedTable";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router";

export default function ManageCourts() {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [editCourt, setEditCourt] = useState(null);
  const navigate = useNavigate();

  const {
    data: courts,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courts");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/courts/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Court deleted successfully!", "success");
      queryClient.invalidateQueries(["courts"]);
    },
  });

  const handleDelete = (court) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete "${court.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(court._id);
      }
    });
  };

  const handleUpdate = (courtData) => {
    updateMutation.mutate(courtData);
  };

  if (isPending) {
    return <p>Loading...</p>;
  }

  console.log(editCourt);
  return (
    <div>
      {/* Your table rows */}
      <SharedTable
        headItems={["#", "Name", "Type", "Capacity", "Price/hr", "Actions"]}
        bodyItems={courts.map((court, i) => ({
          cells: [
            i + 1,
            court.name,
            court.type,
            court.capacity,
            `$${court.price}`,
            <div className="flex gap-2">
              <Button
                onClick={() => navigate(`/dashboard/update-court/${court._id}`)}
              >
                Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(court)}>
                Delete
              </Button>
            </div>,
          ],
        }))}
      />
    </div>
  );
}
