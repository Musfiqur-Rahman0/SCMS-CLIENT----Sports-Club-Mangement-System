"use client";

import React, { useEffect, useState } from "react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SharedTable from "@/Pages/Shared/SharedTable";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useCurd from "@/Hooks/useCurd";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

export default function ManageCoupons() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const { read, updateWithPut, deleteMutation } = useCurd("/coupons", [
    "admin",
  ]);

  const { data: coupons = [], isPending, isError } = read;
  const { mutate } = updateWithPut;

  const handleDelete = (coupon) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete coupon "${coupon.code}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // mutation.mutate(coupon._id);
        deleteMutation.mutate(coupon._id);
      }
    });
  };

  const handleUpdate = (coupon) => {
    setSelectedCoupon(coupon);
    setIsModalOpen(true);
  };

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

          onClick={() => handleUpdate(coupon)}
        >
          Edit
        </Button>
        <Button variant="destructive" onClick={() => handleDelete(coupon)}>
          Delete
        </Button>
      </div>,
    ],
  }));

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: 0,
      maxDiscountAmount: 0,
      minOrderAmount: 0,
      usageLimit: 0,
      usageCount: 0,
      isActive: true,
    },
  });

  useEffect(() => {
    if (selectedCoupon) {
      reset({
        code: selectedCoupon.code,
        description: selectedCoupon.description,
        discountType: selectedCoupon.discountType,
        discountValue: selectedCoupon.discountValue,
        maxDiscountAmount: selectedCoupon.maxDiscountAmount,
        minOrderAmount: selectedCoupon.minOrderAmount,
        usageLimit: selectedCoupon.usageLimit,
        usageCount: selectedCoupon.usageCount,
        startDate: new Date(selectedCoupon.startDate).toLocaleDateString(),
        endDate: new Date(selectedCoupon.endDate).toLocaleDateString(),
        isActive: selectedCoupon.isActive,
      });
    }
  }, [selectedCoupon, reset]);

  const onSubmit = async (data) => {
    const id = selectedCoupon?._id;
    if (!id) {
      return;
    }
    data.startDate = startDate ? startDate.toISOString() : null;
    data.endDate = endDate ? endDate.toISOString() : null;

    mutate({ id, updatedItems: data });
    setIsModalOpen(false);
  };

  if (isPending) return <p>Loading coupons...</p>;
  if (isError) return <p>Error loading coupons</p>;

  return (
    <div className="p-8 w-[90%] mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Manage Coupons ({coupons.length})
      </h2>

      <SharedTable headItems={headItems} bodyItems={bodyItems} />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Coupon</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="code" className="mb-1 block">
                Coupon Code
              </Label>
              <Input
                defaultValue={selectedCoupon?.code}
                {...register("code", { required: "Coupon code is required" })}
              />
              {errors.code && (
                <p className="text-red-500 text-sm">{errors.code.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description" className="mb-1 block">
                Description
              </Label>
              <Textarea
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discountType" className="mb-1 block">
                  Discount Type
                </Label>
                <Select
                  onValueChange={(val) => setValue("discountType", val)}
                  defaultValue="percentage"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="discountValue" className="mb-1 block">
                  Discount Value
                </Label>
                <Input
                  type="number"
                  {...register("discountValue", { valueAsNumber: true })}
                  min={0}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxDiscountAmount" className="mb-1 block">
                  Max Discount Amount
                </Label>
                <Input
                  type="number"
                  {...register("maxDiscountAmount", { valueAsNumber: true })}
                  min={0}
                />
              </div>
              <div>
                <Label htmlFor="minOrderAmount" className="mb-1 block">
                  Min Order Amount
                </Label>
                <Input
                  type="number"
                  {...register("minOrderAmount", { valueAsNumber: true })}
                  min={0}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="usageLimit" className="mb-1 block">
                  Usage Limit
                </Label>
                <Input
                  type="number"
                  {...register("usageLimit", { valueAsNumber: true })}
                  min={0}
                />
              </div>
              <div>
                <Label htmlFor="usageCount" className="mb-1 block">
                  Usage Count
                </Label>
                <Input
                  type="number"
                  {...register("usageCount", { valueAsNumber: true })}
                  min={0}
                  disabled
                  value={0}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" className="mb-1 block">
                  Start Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="endDate" className="mb-1 block">
                  End Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? (
                        format(endDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Label htmlFor="isActive" className="mb-1 block">
                Active
              </Label>
              <Switch
                checked={watch("isActive")}
                onCheckedChange={(val) => setValue("isActive", val)}
              />
            </div>

            <Button type="submit">Update Coupon</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
