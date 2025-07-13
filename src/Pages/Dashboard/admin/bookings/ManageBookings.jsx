import { Button } from "@/components/ui/button";
import useAxios from "@/Hooks/useAxios";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useCurd from "@/Hooks/useCurd";
import SharedTable from "@/Pages/Shared/SharedTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookType } from "lucide-react";
import React from "react";
import Swal from "sweetalert2";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { read } = useCurd("/bookings?status=pending", [
    "user",
    "admin",
    "member",
  ]);
  const { data: pendingBookings, isPending, isError } = read;

  const approveMutation = useMutation({
    mutationFn: async ({ bookingId, status, booked_by }) => {
      const res = await axiosSecure.patch(`/bookings/${bookingId}`, {
        status,
        booked_by,
      });
      return res.data;
    },
    onSuccess: () => {
      // ✅ Refetch bookings to reflect changes
      queryClient.invalidateQueries(["approved-bookings"]);
      queryClient.invalidateQueries(["pending-bookings"]);

      // ✅ Or show a toast or SweetAlert
      Swal.fire({
        icon: "success",
        title: "Status updated!",
        text: "The booking status has been updated successfully.",
      });
    },
    onError: (error) => {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while updating status!",
      });
    },
  });

  const handleApprove = (booking) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to approve this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate({
          bookingId: booking._id,
          status: "approved",
          booked_by: booking.userEmail,
        });
      }
    });
  };

  const handleReject = (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to Reject this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate({
          bookingId: bookingId,
          status: "rejected",
        });
      }
    });
  };

  if (isPending) {
    return <p>loading...</p>;
  }

  const headItems = [
    "#",
    "Court",
    "User",
    "Date",
    "Slots",
    "Total Price",
    "Status",
    "Actions",
  ];

  const bodyItems = pendingBookings.map((booking, index) => ({
    cells: [
      index + 1,
      booking.courtName || "N/A",
      booking.userEmail,
      new Date(booking.date).toLocaleDateString(),
      booking.slots,
      `$${booking.totalPrice}`,
      booking.status,
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => handleApprove(booking)}
          disabled={approveMutation.isPending}
        >
          Approve
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleReject(booking._id)}
          disabled={approveMutation.isPending}
        >
          Reject
        </Button>
      </div>,
    ],
  }));

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Pending Bookings ({pendingBookings.length})
      </h2>
      <SharedTable headItems={headItems} bodyItems={bodyItems} />
    </div>
  );
};

export default ManageBookings;
