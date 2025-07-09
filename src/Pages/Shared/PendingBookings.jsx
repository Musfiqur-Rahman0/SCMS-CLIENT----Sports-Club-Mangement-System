import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import SharedTable from "./SharedTable";

const PendingBookings = () => {
  const axiosInstence = useAxios();
  const {
    data: pendingBookings = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["pending-bookings"],
    queryFn: async () => {
      const res = await axiosInstence.get(`/bookings?status=pending`);
      return res.data;
    },
  });

  if (isPending) {
    return <p>loading...</p>;
  }

  const headItems = [
    "#",
    "Court",
    "User",
    "Date",
    "Slots",
    "Total Price",
    "Status",
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
      // <div className="flex gap-2">
      //   <Button
      //     size="sm"
      //     onClick={() => approveMutation.mutate(booking._id)}
      //     disabled={approveMutation.isPending}
      //   >
      //     Approve
      //   </Button>
      //   <Button
      //     variant="destructive"
      //     size="sm"
      //     onClick={() => rejectMutation.mutate(booking._id)}
      //     disabled={rejectMutation.isPending}
      //   >
      //     Reject
      //   </Button>
      // </div>,
    ],
  }));

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Pending Bookings ({pendingBookings.length})
      </h2>
      <SharedTable headItems={headItems} bodyItems={bodyItems} />
    </div>
  );
};

export default PendingBookings;
