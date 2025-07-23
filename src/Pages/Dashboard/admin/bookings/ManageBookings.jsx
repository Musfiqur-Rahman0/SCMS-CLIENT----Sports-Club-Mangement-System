import { Button } from "@/components/ui/button";

import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useCurd from "@/Hooks/useCurd";
import useUserRole from "@/Hooks/useUserRole";
import PaginationComp from "@/Pages/Shared/PaginationComp";
import SearchInput from "@/Pages/Shared/SearchInput";
import SharedTable from "@/Pages/Shared/SharedTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTitle, setSearchTitle] = useState("");
  const [pendingBookings, setPendingBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBookings, setTotalBookings] = useState(0);

  const limit = 10;

  const { role, roleLoading } = useUserRole();

  const { read } = useCurd(
    `/bookings?status=pending&page=${currentPage}&limit=${limit}`,
    ["user", "admin", "member"]
  );
  const { updateWithPatch } = useCurd("/bookings", ["user", "member", "admin"]);

  const { mutate: updateBookings } = updateWithPatch;

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
        // approveMutation.mutate({
        //   bookingId: booking._id,
        //   status: "approved",
        //   booked_by: booking.userEmail,
        // });

        // TODO I HAVE TO CHECK THIS OUT IS THIS WORKING OR NOT ...
        updateBookings({
          id: booking._id,
          updatedItems: {
            status: "approved",
            booked_by: booking.userEmail,
          },
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
    setPendingBookings(res.data.data);
  };

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

  const bodyItems = pendingBookings?.map((booking, index) => ({
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
      setPendingBookings(data.data);
      setTotalPages(data.totalPages);
      setTotalBookings(data.totalBookings);
    }
  }, [data, currentPage]);

  if (isPending) {
    return <p>loading...</p>;
  }

  return (
    <div className="p-6 space-y-5">
      {totalBookings && (
        <h2 className="text-xl font-bold mb-4">
          Pending Bookings ({totalBookings})
        </h2>
      )}
      <SearchInput
        query={searchTitle}
        setQuery={setSearchTitle}
        handleSearch={handleSearch}
      />

      <SharedTable headItems={headItems} bodyItems={bodyItems} />

      {totalPages > 1 && (
        <div className="flex items-center justify-center">
          <PaginationComp
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
