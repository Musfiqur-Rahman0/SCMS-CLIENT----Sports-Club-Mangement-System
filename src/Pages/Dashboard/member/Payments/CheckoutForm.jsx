"use client";

import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

export default function CheckoutForm({ bookingId }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Booking ID:", bookingId);

    if (!stripe || !elements) return;

    // ✅ Later: create PaymentIntent, confirm payment, update DB...
    console.log("Here you’ll handle payment confirmation with Stripe API.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border p-4 rounded-md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
      </div>
      <Button type="submit" disabled={!stripe}>
        Pay Now
      </Button>
    </form>
  );
}
