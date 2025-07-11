"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useAuth from "@/Hooks/useAuth";
import SharedTable from "@/Pages/Shared/SharedTable";

const ConfirmedBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: confirmedBookings = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["confirmed-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?status=confirmed&email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email, // prevent query if no user yet
  });

  if (isPending) {
    return <p>Loading your confirmed bookings...</p>;
  }

  if (isError) {
    return <p>Something went wrong. Please try again later.</p>;
  }

  const headItems = ["#", "Court Name", "Date", "Slots", "Price", "Status"];

  const bodyItems = confirmedBookings.map((booking, index) => ({
    cells: [
      index + 1,
      booking.courtName || "N/A",
      new Date(booking.date).toLocaleDateString(),
      booking.slots,
      `$${booking.totalPrice}`,
      booking.status,
    ],
  }));

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        My Confirmed Bookings ({confirmedBookings.length})
      </h2>
      <SharedTable headItems={headItems} bodyItems={bodyItems} />
    </div>
  );
};

export default ConfirmedBookings;
