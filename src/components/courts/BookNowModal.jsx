"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "@/Hooks/useAuth";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useCurd from "@/Hooks/useCurd";

export default function BookNowModal({ open, onClose, court }) {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { slotTimes } = court;

  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState(1);
  const [selectedSlotTime, setSelectedSlotTime] = useState("");
  const { user } = useAuth();
  const { create } = useCurd("/bookings", ["member", "user", "admin"]);

  const { mutate: bookCourt } = create;

  const pricePerSession = court?.price || 0;
  const totalPrice = slots * pricePerSession;

  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      slots: 1,
      date: null,
      slotTime: "",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (newBooking) => {
      const res = await axiosSecure.post("/bookings", newBooking);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"]);
      Swal.fire(
        "Success",
        "Booking request sent and is pending approval.",
        "success"
      );
      onClose();
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    },
  });

  const onSubmit = (data) => {
    const bookingData = {
      courtId: court._id,
      courtName: court.name,
      type: court.type,
      pricePerSession: pricePerSession,
      slots: slots,
      totalPrice: totalPrice,
      date: selectedDate?.toISOString(),
      slotTime: selectedSlotTime,
      status: "pending",
      userName: user?.displayName,
      userEmail: user?.email,
      paymentStatus: "unpaid",
    };

    bookCourt(bookingData);
    // bookingMutation.mutate(bookingData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Court</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Court Name</Label>
            <Input value={court?.name} readOnly />
          </div>

          <div>
            <Label>Type</Label>
            <Input value={court?.type} readOnly />
          </div>

          <div>
            <Label>Price per Session</Label>
            <Input value={`$${pricePerSession}`} readOnly />
          </div>

          <div>
            <Label htmlFor="slots">Number of Slots</Label>
            <Input
              type="number"
              min={1}
              {...register("slots")}
              value={slots}
              onChange={(e) => setSlots(Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setValue("date", date);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Select Slot Time</Label>
            <Select
              value={selectedSlotTime}
              onValueChange={(value) => {
                setSelectedSlotTime(value);
                setValue("slotTime", value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                {slotTimes?.map((time, idx) => (
                  <SelectItem key={idx} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Total Price</Label>
            <Input value={`$${totalPrice}`} readOnly />
          </div>

          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={
              bookingMutation.isPending || !selectedDate || !selectedSlotTime
            }
          >
            {bookingMutation.isPending ? "Booking..." : "Submit Booking"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
