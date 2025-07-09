"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import useAxios from "@/Hooks/useAxios";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { generateImageUrl } from "@/lib/utils";
import Swal from "sweetalert2";

export default function AddCourts() {
  const [date, setDate] = useState();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      type: "",
      capacity: 1,
      location: "",
      price: 0,
      deadline: null,
      description: "",
      rules: "",
      more: "",
      image: null,
    },
  });

  const onSubmit = async (data) => {
    const file = data.image[0];
    // a utility function what upload the given image file to the imgbb and give the url
    const imageUrl = await generateImageUrl(file);
    data.image = imageUrl;
    data.deadline = data.deadline.toISOString();
    const newCourts = {
      ...data,
      added_on: new Date().toISOString(),
    };

    const res = await axiosSecure.post("/add-courts", newCourts);
    if (res.data.insertedId) {
      Swal.fire({
        title: "Success!",
        text: "Court has been added successfully.",
        icon: "success",
        confirmButtonText: "OK",
        showConfirmButton: true,
      });
      reset();
    }
  };

  return (
    <div className="md:w-[80%] mx-auto p-8 md:p-4">
      <h1 className="text-3xl font-bold mb-8">Add New Court</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="name" className="mb-1 block">
            Court Name
          </Label>
          <Input
            {...register("name", { required: "Court name is required" })}
            placeholder="Court A"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="type" className="mb-1 block">
              Court Type
            </Label>
            <Select
              onValueChange={(val) =>
                setValue("type", val, { shouldValidate: true })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tennis">Tennis</SelectItem>
                <SelectItem value="Badminton">Badminton</SelectItem>
                <SelectItem value="Football">Football</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-red-500 mt-1">
                Court type is required
              </p>
            )}
          </div>

          <div className="flex-1">
            <Label htmlFor="capacity" className="mb-1 block">
              Capacity
            </Label>
            <Input
              type="number"
              {...register("capacity", {
                required: "Capacity is required",
                valueAsNumber: true,
                min: { value: 1, message: "Capacity must be at least 1" },
              })}
              min={1}
            />
            {errors.capacity && (
              <p className="text-sm text-red-500 mt-1">
                {errors.capacity.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="location" className="mb-1 block">
            Location
          </Label>
          <Textarea
            {...register("location", { required: "Location is required" })}
            placeholder="Address or location details"
          />
          {errors.location && (
            <p className="text-sm text-red-500 mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="price" className="mb-1 block">
            Price per Hour
          </Label>
          <Input
            type="number"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: { value: 0, message: "Price must be at least 0" },
            })}
            min={0}
          />
          {errors.price && (
            <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="deadline" className="mb-1 block">
            Booking Deadline
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  setValue("deadline", selectedDate, { shouldValidate: true });
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.deadline && (
            <p className="text-sm text-red-500 mt-1">Deadline is required</p>
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
            placeholder="Short description about this court"
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="rules" className="mb-1 block">
            Rules & Regulations
          </Label>
          <Textarea
            {...register("rules", { required: "Rules are required" })}
            placeholder="Specify rules & guidelines"
          />
          {errors.rules && (
            <p className="text-sm text-red-500 mt-1">{errors.rules.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="more" className="mb-1 block">
            More Details
          </Label>
          <Textarea
            {...register("more")}
            placeholder="Any additional information"
          />
        </div>

        <div>
          <Label htmlFor="image" className="mb-1 block">
            Court Image
          </Label>
          <Input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
          />
          {errors.image && (
            <p className="text-sm text-red-500 mt-1">{errors.image.message}</p>
          )}
        </div>

        <Button type="submit">Add Court</Button>
      </form>
    </div>
  );
}
