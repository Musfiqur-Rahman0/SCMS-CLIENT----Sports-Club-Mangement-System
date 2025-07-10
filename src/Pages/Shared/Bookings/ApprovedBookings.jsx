"use client";

import React from "react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SharedTable from "@/Pages/Shared/SharedTable";
import useAxios from "@/Hooks/useAxios";
import useAuth from "@/Hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function ApprovedBookings() {
  const axiosInstence = useAxios();
  const { user } = useAuth();
  const { email } = user;
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

  if (isPending) return <p>Loading approved bookings...</p>;
  if (isError) return <p>Error loading bookings.</p>;

  const headItems = [
    "#",
    "User Name",
    "Court",
    "Date",
    "Slots",
    "Total Price",
    "Status",
    "Action",
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
      <Button>Pay</Button>,
    ],
  }));

  return (
    <div className="w-[90%] mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">
        Approved Bookings ({bookings.length})
      </h2>

      <SharedTable headItems={headItems} bodyItems={bodyItems} />
    </div>
  );
}
