"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useAuth from "@/Hooks/useAuth";
import SharedTable from "@/Pages/Shared/SharedTable";
import PaginationComp from "../PaginationComp";

const ConfirmedBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalConfirmedBookings, setTotalConfirmedBookings] = useState(1);
  const limit = 10;

  const { email } = user;
  const { data, isPending, isError } = useQuery({
    queryKey: ["confirmed-bookings", email, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?status=confirmed&email=${email}&page=${currentPage}&limit=${limit}`
      );

      return res.data;
    },
    enabled: !!user?.email, // prevent query if no user yet
  });

  useEffect(() => {
    if (data) {
      setConfirmedBookings(data.data);
      setTotalPages(data?.totalPages);
      setTotalConfirmedBookings(data?.totalBookings);
    }
  }, [data, currentPage]);

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

export default ConfirmedBookings;
