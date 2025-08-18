"use client";

import React, { useEffect, useState } from "react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SharedTable from "@/Pages/Shared/SharedTable";
import useAxios from "@/Hooks/useAxios";
import useAuth from "@/Hooks/useAuth";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useCurd from "@/Hooks/useCurd";
import PaginationComp from "../PaginationComp";

export default function ApprovedBookings() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { email } = user;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [approvedBookings, setApprovedBookings] = useState([]);
  const [totalApprovedBookings, setTotalApprovedBookings] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const { data, isPending, isError } = useQuery({
    queryKey: ["approved-Bookings", email, currentPage],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?status=approved&email=${email}&page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (approvedBookingsID) => {
      const res = await axiosSecure.delete(`/bookings/${approvedBookingsID}`);
      return res.data;
    },
    onSuccess: () => {
      // ✅ Refetch approvedBookingss to reflect changes
      queryClient.invalidateQueries(["mypending-approvedBookingss"]);

      // ✅ Or show a toast or SweetAlert
      Swal.fire({
        icon: "success",
        title: " Bookings Canceled!",
        text: "The  Bookings status has been updated successfully.",
      });
    },
    onError: (error) => {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while cenceling!",
      });
    },
  });

  const handleCencelapprovedBookings = (approvedBookingsID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this Bookings? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(approvedBookingsID);
        Swal.fire("Deleted", "Sucessfully deleted Bookings", "success");
      }
    });
  };

  const headItems = [
    "#",
    "User Name",
    "Court",
    "Date",
    "Slots",
    "Total Price",
    "Status",
    "Actions",
  ];

  const bodyItems = approvedBookings.map((approvedBookings, index) => ({
    cells: [
      index + 1,
      approvedBookings.userName || "N/A",
      approvedBookings.courtName || "N/A",
      approvedBookings.date
        ? new Date(approvedBookings.date).toLocaleDateString()
        : "N/A",
      Array.isArray(approvedBookings.slots)
        ? approvedBookings.slots.join(", ")
        : approvedBookings.slots,
      `$${approvedBookings.totalPrice || 0}`,
      approvedBookings.status || "Approved",
      <div className="flex items-center gap-3">
        <Button
          onClick={() => navigate(`/dashboard/payment/${approvedBookings._id}`)}
        >
          Pay
        </Button>
        <Button
          variant={"outline"}
          onClick={() => handleCencelapprovedBookings(approvedBookings._id)}
        >
          Cancel
        </Button>
      </div>,
    ],
  }));

  useEffect(() => {
    if (data) {
      setApprovedBookings(data.data);
      setTotalPages(data.totalPages);
      setTotalApprovedBookings(data.totalBookings);
    }
  }, [data, currentPage]);

  if (isPending) return <p>Loading approved Bookingss...</p>;
  if (isError) return <p>Error loading approved Bookingss.</p>;

  return (
    <div className="w-[95%] mx-auto p-3 md:p-8">
      {totalApprovedBookings > 0 && (
        <h2 className="text-2xl font-bold mb-6">
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
