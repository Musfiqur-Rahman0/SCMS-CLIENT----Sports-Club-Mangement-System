"use client";

import React from "react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SharedTable from "@/Pages/Shared/SharedTable";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function ManageCoupons() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch all coupons
  const {
    data: coupons = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  // Delete coupon mutation
  const deleteCouponMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/coupons/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      Swal.fire("Deleted!", "Coupon has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete coupon.", "error");
    },
  });

  const handleDelete = (coupon) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete coupon "${coupon.code}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCouponMutation.mutate(coupon._id);
      }
    });
  };

  if (isPending) return <p>Loading coupons...</p>;
  if (isError) return <p>Error loading coupons</p>;

  // Table config
  const headItems = [
    "#",
    "Code",
    "Discount Type",
    "Value",
    "Status",
    "Actions",
  ];
  const bodyItems = coupons.map((coupon, index) => ({
    cells: [
      index + 1,
      coupon.code,
      coupon.discountType,
      coupon.discountValue,
      coupon.isActive ? "Active" : "Inactive",
      <div className="flex gap-2">
        <Button
        // onClick={() => navigate(`/dashboard/edit-coupon/${coupon._id}`)}
        // TODO Open a modal and update the data if needed
        >
          Edit
        </Button>
        <Button variant="destructive" onClick={() => handleDelete(coupon)}>
          Delete
        </Button>
      </div>,
    ],
  }));

  return (
    <div className="p-8 w-[90%] mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Manage Coupons ({coupons.length})
      </h2>

      <SharedTable headItems={headItems} bodyItems={bodyItems} />
    </div>
  );
}
