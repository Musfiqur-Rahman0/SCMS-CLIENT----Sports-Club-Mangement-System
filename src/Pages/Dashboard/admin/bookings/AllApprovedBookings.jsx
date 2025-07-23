import SharedTable from "@/Pages/Shared/SharedTable";
import React, { useEffect, useState } from "react";
import useCurd from "@/Hooks/useCurd";
import PaginationComp from "@/Pages/Shared/PaginationComp";

export default function AllApprovedBookings() {
  const [approvedBookings, setApprovedBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalApprovedBookings, setTotalApprovedBookings] = useState(0);
  const limit = 10;

  const { read } = useCurd(
    `/bookings?status=approved&page=${currentPage}&limit=${limit}`,
    ["admin", "member"]
  );
  const { data, isPending, isError } = read;

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

  useEffect(() => {
    if (data) {
      setApprovedBookings(data.data);
      setTotalPages(data.totalPages);
      setTotalApprovedBookings(data.totalBookings);
    }
  }, [data, currentPage]);

  if (isPending) return <p>Loading approved bookings...</p>;
  if (isError) return <p>Failed to load approved bookings!</p>;

  return (
    <div className="p-6">
      {totalApprovedBookings && (
        <h2 className="text-xl font-bold mb-4">
          Approved Bookings ({totalApprovedBookings})
        </h2>
      )}
      <SharedTable headItems={headItems} bodyItems={bodyItems} />

      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-5">
          <PaginationComp
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
}
