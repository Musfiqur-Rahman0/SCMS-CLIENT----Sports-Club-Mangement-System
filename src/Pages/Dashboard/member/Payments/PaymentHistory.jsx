"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useAuth from "@/Hooks/useAuth";
import SharedTable from "@/Pages/Shared/SharedTable";
import PaginationComp from "@/Pages/Shared/PaginationComp";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPaymentsCount, setTotalPaymentsCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const [payments, setPayments] = useState([]);

  const [view, setView] = useState("table");

  const { data, isPending, isError } = useQuery({
    queryKey: ["payment-history", user?.email, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments?email=${user?.email}&page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (data) {
      setPayments(data.data);
      setTotalPages(data.totalPages);
      setTotalPaymentsCount(data.totalPayments);
    }
  }, [data, currentPage]);

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-center sm:text-left">
          My Payment History ({payments.length})
        </h2>

        <Button
          variant="outline"
          onClick={() => setView(view === "table" ? "card" : "table")}
        >
          Switch to {view === "table" ? "Card" : "Table"} View
        </Button>
      </div>

      {view === "table" ? (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
          <SharedTable headItems={headItems} bodyItems={bodyItems} />
        </div>
      ) : (
        <div className="grid gap-4  md:grid-cols-2 xl:grid-cols-3">
          {payments.map((payment, index) => (
            <Card key={index} className="shadow-md py-3 w-full">
              <CardHeader>
                <CardTitle className="text-lg ">
                  Transaction ID:
                  <div className="font-light break-all w-full  text-wrap">
                    {payment.transactionId || "N/A"}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Amount:</span> ${payment.amount}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(payment.paid_at_string).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  {payment.status || "Paid"}
                </p>
                <p>
                  <span className="font-medium">Method:</span>{" "}
                  {payment.paymentMethod[0] || "Card"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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

export default PaymentHistory;
