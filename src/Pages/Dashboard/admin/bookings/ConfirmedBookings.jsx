import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useCurd from "@/Hooks/useCurd";
import SharedTable from "@/Pages/Shared/SharedTable";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const AllConfirmedBookings = () => {
  const { read } = useCurd();
  const axiosSecure = useAxiosSecure();

  const {
    data: confirmedBookings = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["all confirmed bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings?status=confirmed");
      return res.data;
    },
  });

  const headItems = [
    "#",
    "Court",
    "User Email",
    "Date",
    "Slots",
    "Total Price",
    "Status",
  ];

  const bodyItems = confirmedBookings.map((booking, index) => ({
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

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Confimed Bookings ({confirmedBookings.length})
      </h2>
      <SharedTable headItems={headItems} bodyItems={bodyItems} />
    </div>
  );
};

export default AllConfirmedBookings;
