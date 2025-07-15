import { Button } from "@/components/ui/button";
import useAxios from "@/Hooks/useAxios";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useCurd from "@/Hooks/useCurd";
import SearchInput from "@/Pages/Shared/SearchInput";
import SharedTable from "@/Pages/Shared/SharedTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookType } from "lucide-react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTitle, setSearchTitle] = useState("");
  const [pendingBookings, setPendingBookings] = useState([]);
  const { read } = useCurd("/bookings?status=pending", [
    "user",
    "admin",
    "member",
  ]);

  const { data, isPending, isError } = read;

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

  const rejectMutation = useMutation({
    mutationFn: async ({ bookingId }) => {
      const res = await axiosSecure.delete(`/bookings/${bookingId}`);
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

  const handleReject = (booking) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to Reject this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate({
          bookingId: booking._id,
        });
      }
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axiosSecure.get(
      `/bookings?title=${searchTitle}&status=pending`
    );
    setPendingBookings(res.data);
  };
  console.log(pendingBookings);

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
          onClick={() => handleReject(booking)}
          disabled={approveMutation.isPending}
        >
          Reject
        </Button>
      </div>,
    ],
  }));

  useEffect(() => {
    if (data) {
      setPendingBookings(data);
    }
  }, [data]);

  if (isPending) {
    return <p>loading...</p>;
  }

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-xl font-bold mb-4">
        Pending Bookings ({pendingBookings.length})
      </h2>
      <SearchInput
        query={searchTitle}
        setQuery={setSearchTitle}
        handleSearch={handleSearch}
      />

      <SharedTable headItems={headItems} bodyItems={bodyItems} />
    </div>
  );
};

export default ManageBookings;
