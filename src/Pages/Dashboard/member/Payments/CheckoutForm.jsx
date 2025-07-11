"use client";

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "@/Hooks/useAuth";
import { useNavigate } from "react-router";

export default function CheckoutForm({ selectedBookings }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [isMakingPayments, setIsMakingPayment] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const amount = selectedBookings.totalPrice;
  const amountInCents = amount * 100;
  // console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Booking ID:", selectedBookings._id);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      setIsMakingPayment(true);
      console.log(paymentMethod);

      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          const transactionId = result.paymentIntent.id;

          const paymentData = {
            bookingId: selectedBookings._id,
            email: user?.email,
            amount,
            transactionId: transactionId,
            paymentMethod: result.paymentIntent.payment_method_types,
          };

          const paymentRes = await axiosSecure.post("/payments", paymentData);
          if (paymentRes.data.insertedId) {
            // ✅ Show SweetAlert with transaction ID
            await Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
              confirmButtonText: "Go to My payments",
            }).then((res) => {
              if (res.isConfirmed) {
                navigate("/dashboard/payment-history");
              }
            });
          }
        }
      }

      setIsMakingPayment(false);
    }
  };

  // console.log()

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
        <p className="text-red-500">{error}</p>
      </div>
      <Button
        type="submit"
        disabled={
          !stripe ||
          selectedBookings.paymentStatus === "paid" ||
          isMakingPayments
        }
        className={"w-full text-center bg-green-600 hover:bg-green-700"}
      >
        Pay Now ${selectedBookings.totalPrice}
      </Button>
    </form>
  );
}
