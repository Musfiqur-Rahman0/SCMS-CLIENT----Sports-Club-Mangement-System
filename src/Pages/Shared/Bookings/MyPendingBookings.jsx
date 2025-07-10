import useAuth from "@/Hooks/useAuth";
import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import SharedTable from "../SharedTable";

const MyPendingBookings = () => {
  const { user } = useAuth();
  const axiosInstence = useAxios();
  const { email } = user;

  const {
    data: myPendingBookings = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["mypending-bookings", email],
    queryFn: async () => {
      const res = await axiosInstence.get(
        `/bookings?email=${email}&status=pending`
      );
      return res.data;
    },
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  const headItems = [
    "#",
    "Court",
    "User",
    "Booking Date",
    "Slots",
    "Total Price",
    "Status",
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
    ],
  }));

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
