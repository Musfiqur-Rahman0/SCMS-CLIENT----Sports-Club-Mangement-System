"use client";

import React from "react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SharedTable from "@/Pages/Shared/SharedTable";
import useAxios from "@/Hooks/useAxios";
import useAuth from "@/Hooks/useAuth";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function ApprovedBookings() {
  const axiosInstence = useAxios();
  const { user } = useAuth();
  const { email } = user;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Fetch only approved bookings
  const {
    data: bookings = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["approved-bookings"],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosInstence.get(
        `/bookings?status=approved&email=${email}`
      );
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (bookingID) => {
      const res = await axiosInstence.delete(`/bookings/${bookingID}`);
      return res.data;
    },
    onSuccess: () => {
      // ✅ Refetch bookings to reflect changes
      queryClient.invalidateQueries(["mypending-bookings"]);

      // ✅ Or show a toast or SweetAlert
      Swal.fire({
        icon: "success",
        title: "Booking Canceled!",
        text: "The booking status has been updated successfully.",
      });
    },
    onError: (error) => {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while cenceling!",
      });
    },
  });

  const handleCencelBooking = (bookingID) => {
    mutation.mutate(bookingID);
  };

  const headItems = [
    "#",
    "User Name",
    "Court",
    "Date",
    "Slots",
    "Total Price",
    "Status",
    "Actions",
  ];

  const bodyItems = bookings.map((booking, index) => ({
    cells: [
      index + 1,
      booking.userName || "N/A",
      booking.courtName || "N/A",
      booking.date ? new Date(booking.date).toLocaleDateString() : "N/A",
      Array.isArray(booking.slots) ? booking.slots.join(", ") : booking.slots,
      `$${booking.totalPrice || 0}`,
      booking.status || "Approved",
      <div className="flex items-center gap-3">
        <Button onClick={() => navigate(`/dashboard/payment/${booking._id}`)}>
          Pay
        </Button>
        <Button
          variant={"outline"}
          onClick={() => handleCencelBooking(booking._id)}
        >
          Cancel
        </Button>
      </div>,
    ],
  }));

  if (isPending) return <p>Loading approved bookings...</p>;
  if (isError) return <p>Error loading bookings.</p>;

  return (
    <div className="w-[90%] mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">
        Approved Bookings ({bookings.length})
      </h2>

      <SharedTable headItems={headItems} bodyItems={bodyItems} />
    </div>
  );
}
