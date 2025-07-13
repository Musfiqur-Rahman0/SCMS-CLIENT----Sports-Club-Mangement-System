import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import { useParams } from "react-router";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/Hooks/useAxios";
import useCurd from "@/Hooks/useCurd";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const MakePayments = () => {
  const { id } = useParams();

  const { read } = useCurd(`/bookings/${id}`, ["admin", "member"]);
  const { data: selectedBookings = {}, isPending, isError } = read;

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Make Payment</h1>
      <p className="mb-6 text-gray-600">
        Please complete your payment for :{" "}
        <strong>{selectedBookings.courtName}</strong>
      </p>

      {/* ✅ Stripe Elements context */}
      <Elements stripe={stripePromise}>
        <CheckoutForm selectedBookings={selectedBookings} />
      </Elements>
    </div>
  );
};

export default MakePayments;
