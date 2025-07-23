import useCurd from "@/Hooks/useCurd";
import PaginationComp from "@/Pages/Shared/PaginationComp";
import SharedTable from "@/Pages/Shared/SharedTable";
import React, { useEffect, useState } from "react";

const AllConfirmedBookings = () => {
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalConfirmedBookings, setTotalConfirmedBookings] = useState(0);
  const limit = 10;

  const { read } = useCurd(
    `/bookings?status=confirmed&page=${currentPage}&limit=${limit}`,
    ["admin"]
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

  useEffect(() => {
    if (data) {
      setConfirmedBookings(data.data);
      setTotalPages(data.totalPages);
      setTotalConfirmedBookings(data.totalBookings);
    }
  }, [data, currentPage]);

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Confimed Bookings ({totalConfirmedBookings})
      </h2>
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
};

export default AllConfirmedBookings;
