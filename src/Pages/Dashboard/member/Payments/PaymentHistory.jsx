"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useAuth from "@/Hooks/useAuth";
import SharedTable from "@/Pages/Shared/SharedTable";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: payments = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isPending) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Loading your payment history...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">
          Failed to load payment history. Please try again.
        </p>
      </div>
    );
  }

  const headItems = [
    "#",
    "Transaction Id",
    "Amount",
    "Date",
    "Status",
    "Method",
  ];

  const bodyItems = payments.map((payment, index) => ({
    cells: [
      index + 1,
      payment.transactionId || "N/A",
      `$${payment.amount}`,
      new Date(payment.paid_at_string).toLocaleDateString(),
      payment.status || "Paid",
      payment.paymentMethod[0] || "Card",
    ],
  }));

  return (
    <div className="px-4 py-6 w-[90%] mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
        My Payment History ({payments.length})
      </h2>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
        <SharedTable headItems={headItems} bodyItems={bodyItems} />
      </div>
    </div>
  );
};

export default PaymentHistory;
