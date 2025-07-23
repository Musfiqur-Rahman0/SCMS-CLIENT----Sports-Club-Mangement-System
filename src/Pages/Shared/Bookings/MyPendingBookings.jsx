import useAuth from "@/Hooks/useAuth";
import useAxios from "@/Hooks/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import SharedTable from "../SharedTable";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import axios from "axios";
import { data } from "react-router";
import PaginationComp from "../PaginationComp";

const MyPendingBookings = () => {
  const { user } = useAuth();
  const [myPendingBookings, setMyPendingBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPendingBookings, setTotalPendingBookings] = useState([]);
  const limit = 10;
  const axiosSecure = useAxiosSecure();
  const { email } = user;

  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: ["mypending-bookings", email, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?email=${email}&status=pending&page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (bookingID) => {
      const res = await axiosSecure.delete(`/bookings/${bookingID}`);
      return res.data;
    },
    onSuccess: () => {
      // ✅ Refetch bookings to reflect changes
      queryClient.invalidateQueries(["mypending-bookings"]);

      // ✅ Or show a toast or SweetAlert
      Swal.fire({
        icon: "success",
        title: "Booking Canceled!",
        text: "The booking status has been updated successfully.",
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

  const handleCencelBooking = (bookingID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this booking? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(bookingID);
        Swal.fire("Deleted", "Sucessfully deleted booking", "success");
      }
    });
  };

  const headItems = [
    "#",
    "Court",
    "User",
    "Booking Date",
    "Slots",
    "Total Price",
    "Status",
    "Actions",
  ];

  const bodyItems = myPendingBookings.map((booking, index) => ({
    cells: [
      index + 1,
      booking.courtName || "N/A",
      booking.userEmail,
      new Date(booking.date).toLocaleDateString(),
      booking.slots,
      `$${booking.totalPrice}`,
      booking.status,
      <Button
        onClick={() => handleCencelBooking(booking._id)}
        variant={"outline"}
      >
        Cencel Booking
      </Button>,
    ],
  }));

  useEffect(() => {
    if (data) {
      setMyPendingBookings(data.data);
      setTotalPages(data.totalPages);
      setTotalPendingBookings(data.totalBookings);
    }
  }, [data, currentPage]);

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Pending Bookings ({totalPendingBookings})
      </h2>
      <SharedTable headItems={headItems} bodyItems={bodyItems} />

      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-3">
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

export default MyPendingBookings;
