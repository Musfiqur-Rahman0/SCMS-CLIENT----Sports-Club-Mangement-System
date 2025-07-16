"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useCurd from "@/Hooks/useCurd";

const AddCoupons = () => {
  const axiosSecure = useAxiosSecure();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const navigate = useNavigate();

  const { create } = useCurd("/coupons", ["admin"]);

  const {
    register,
    handleSubmit,
    setValue,
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

  const onSubmit = async (data) => {
    data.startDate = startDate ? startDate.toISOString() : null;
    data.endDate = endDate ? endDate.toISOString() : null;
    try {
      await create.mutateAsync(data);
      Swal.fire("Success!", "Coupon added successfully!", "success");
      navigate("/dashboard/manage-coupons");
    } catch (err) {
      Swal.fire("Error", "Failed to add coupon", "error");
    }
  };

  return (
    <div className="w-[95%] md:w-[80%] mx-auto p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6">Add New Coupon</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="code" className="mb-1 block">
            Coupon Code
          </Label>
          <Input
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
            <p className="text-red-500 text-sm">{errors.description.message}</p>
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
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
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

        <Button type="submit">Add Coupon</Button>
      </form>
    </div>
  );
};

export default AddCoupons;
