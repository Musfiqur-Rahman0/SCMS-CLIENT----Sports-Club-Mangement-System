"use client";

import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import SharedTable from "@/Pages/Shared/SharedTable";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: myBookings = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["myBookings", user?.email],
    enabled: !!user?.email, // only run when email exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return <p>Loading your bookings...</p>;
  }

  if (isError) {
    return <p>Something went wrong while fetching bookings.</p>;
  }

  const headItems = [
    "#",
    "Court",
    "Type",
    "Slot(s)",
    "Price",
    "Status",
    "Booking Date",
  ];

  const bodyItems = myBookings.map((booking, index) => ({
    cells: [
      index + 1,
      booking.courtName || "N/A",
      booking.type || "N/A",
      booking.slots || "N/A",
      `$${booking.totalPrice || 0}`,
      booking.status || "Pending",
      new Date(booking.date).toLocaleDateString(),
    ],
  }));

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        My Bookings ({myBookings.length})
      </h2>
      <SharedTable headItems={headItems} bodyItems={bodyItems} />
    </div>
  );
};

export default MyBookings;
