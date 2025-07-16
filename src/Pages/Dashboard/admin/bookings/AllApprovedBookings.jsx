"use client";

import { useQuery } from "@tanstack/react-query";
import useAxios from "@/Hooks/useAxios";
import SharedTable from "@/Pages/Shared/SharedTable";
import React from "react";
import useCurd from "@/Hooks/useCurd";

export default function AllApprovedBookings() {
  const { read } = useCurd("/bookings?status=approved", ["admin", "member"]);
  const { data: approvedBookings = [], isPending, isError } = read;

  if (isPending) return <p>Loading approved bookings...</p>;
  if (isError) return <p>Failed to load approved bookings!</p>;

  const headItems = [
    "#",
    "Court",
    "User Email",
    "Date",
    "Slots",
    "Total Price",
    "Status",
  ];

  const bodyItems = approvedBookings.map((booking, index) => ({
    cells: [
      index + 1,
      booking.courtName || "N/A",
      booking.userEmail,
      new Date(booking.date).toLocaleDateString(),
      booking.slots || "N/A",
      `$${booking.totalPrice}`,
      booking.status,
    ],
  }));

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Approved Bookings ({approvedBookings.length})
      </h2>
      <SharedTable headItems={headItems} bodyItems={bodyItems} />
    </div>
  );
}
