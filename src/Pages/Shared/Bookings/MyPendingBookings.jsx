import useAuth from "@/Hooks/useAuth";
import useAxios from "@/Hooks/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import SharedTable from "../SharedTable";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import axios from "axios";

const MyPendingBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { email } = user;

  const queryClient = useQueryClient();

  const {
    data: myPendingBookings = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["mypending-bookings", email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?email=${email}&status=pending`
      );
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (bookingID) => {
      const res = await axiosSecure.delete(`/bookings/${bookingID}`);
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
    "Court",
    "User",
    "Booking Date",
    "Slots",
    "Total Price",
    "Status",
    "Actions",
  ];

  const bodyItems = myPendingBookings.map((booking, index) => ({
    cells: [
      index + 1,
      booking.courtName || "N/A",
      booking.userEmail,
      new Date(booking.date).toLocaleDateString(),
      booking.slots,
      `$${booking.totalPrice}`,
      booking.status,
      <Button
        onClick={() => handleCencelBooking(booking._id)}
        variant={"outline"}
      >
        Cencel Booking
      </Button>,
    ],
  }));

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Pending Bookings ({myPendingBookings.length})
      </h2>
      <SharedTable headItems={headItems} bodyItems={bodyItems} />
    </div>
  );
};

export default MyPendingBookings;
