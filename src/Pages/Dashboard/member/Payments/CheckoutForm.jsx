"use client";

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "@/Hooks/useAuth";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckoutForm({ selectedBookings }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [isMakingPayments, setIsMakingPayment] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(
    selectedBookings.totalPrice || 0
  );

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleApplyCoupon = async () => {
    if (!coupon) return;
    try {
      const res = await axiosSecure.post("/coupons/validate", { code: coupon });
      const couponData = res.data;
      if (couponData.valid) {
        const discountAmount =
          (selectedBookings.totalPrice * couponData.discountPercentage) / 100;
        const newPrice = selectedBookings.totalPrice - discountAmount;
        setDiscountedPrice(newPrice);
        Swal.fire(
          "Success!",
          `Coupon applied! ${couponData.discountPercentage}% off.`,
          "success"
        );
      } else {
        Swal.fire("Invalid", "Invalid coupon code.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Could not validate coupon.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setError("");
    setIsMakingPayment(true);

    const amountInCents = discountedPrice * 100;

    try {
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
        if (result.paymentIntent.status === "succeeded") {
          const transactionId = result.paymentIntent.id;

          const paymentData = {
            bookingId: selectedBookings._id,
            email: user?.email,
            amount: discountedPrice,
            transactionId: transactionId,
            paymentMethod: result.paymentIntent.payment_method_types,
            coupon: coupon || null,
          };

          const paymentRes = await axiosSecure.post("/payments", paymentData);
          if (paymentRes.data.insertedId) {
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
    } catch (err) {
      setError("Something went wrong while processing payment.");
    } finally {
      setIsMakingPayment(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      {/* Coupon code input */}
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Label>Coupon Code</Label>
          <Input
            type="text"
            placeholder="Enter coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
        </div>
        <Button type="button" onClick={handleApplyCoupon} variant="outline">
          Apply
        </Button>
      </div>

      {/* Readonly payment info */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label>Email</Label>
          <Input value={user?.email} readOnly />
        </div>

        <div>
          <Label>Court Type</Label>
          <Input value={selectedBookings.type} readOnly />
        </div>

        <div>
          <Label>Number of Slots</Label>
          <Input value={selectedBookings.slots} readOnly />
        </div>

        <div>
          <Label>Date</Label>
          <Input
            value={new Date(selectedBookings.date).toLocaleDateString()}
            readOnly
          />
        </div>

        <div>
          <Label>Price</Label>
          <Input value={`$${discountedPrice}`} readOnly />
        </div>
      </div>

      {/* Card Element */}
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
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <Button
        type="submit"
        disabled={
          !stripe ||
          selectedBookings.paymentStatus === "paid" ||
          isMakingPayments
        }
        className="w-full bg-green-600 hover:bg-green-700"
      >
        {isMakingPayments
          ? "Processing..."
          : `Pay Now $${discountedPrice.toFixed(2)}`}
      </Button>
    </form>
  );
}
