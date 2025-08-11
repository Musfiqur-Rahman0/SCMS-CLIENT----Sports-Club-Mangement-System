"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, SwatchBookIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCurd from "@/Hooks/useCurd";
import axios from "axios";

export default function EditCourt() {
  const [deadline, setDeadline] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [slotInput, setSlotInput] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const { read } = useCurd(`/courts/${id}`, ["admin"]);
  const { data: selectedCourt, isPending, isError } = read;
  const [slots, setSlots] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      capacity: 1,
      location: "",
      price: 0,
      type: selectedCourt?.type || "",
      description: "",
      rules: "",
      more: "",
      image: "",
      deadline: null,
    },
  });

  const handleAddSlot = () => {
    if (slotInput.trim()) {
      setSlots([...slots, slotInput.trim()]);
      setSlotInput("");
    }
  };

  const handleRemoveSlot = (index) => {
    const newSlots = [...slots];
    newSlots.splice(index, 1);
    setSlots(newSlots);
  };

  useEffect(() => {
    if (selectedCourt) {
      reset({
        name: selectedCourt.name,
        capacity: selectedCourt.capacity,
        location: selectedCourt.location,
        price: selectedCourt.price,
        type: selectedCourt.type,
        description: selectedCourt.description,
        rules: selectedCourt.rules,
        more: selectedCourt.more,
        image: selectedCourt.image,
        deadline: selectedCourt.deadline
          ? new Date(selectedCourt.deadline)
          : null,
      });

      setValue("type", selectedCourt.type);
      setDeadline(
        selectedCourt.deadline ? new Date(selectedCourt.deadline) : null
      );
      setSlots(selectedCourt.slotTimes);
    }
  }, [selectedCourt, reset]);

  const handleFormSubmit = async (data) => {
    const file = data.image[0];

    const formData = new FormData();
    formData.append("image", file);
    data.slotTimes = slots; // pass slots as array

    try {
      const result = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      const photoURL = result.data.data.display_url;
      data.image = photoURL;
      const updatedCourt = {
        ...data,
        deadline: deadline ? deadline.toISOString() : null,
      };

      const res = await axiosSecure.put(`/update-court/${id}`, updatedCourt);
      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Updated!",
          text: "Court information has been successfully updated.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/dashboard/manage-courts");
          }
        });
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      Swal.fire("error!!", "Error updating court data", "error");
    }
  };

  if (isPending) return <p>Loading court data...</p>;
  if (isError) return <p>Failed to load court data.</p>;

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 w-[90%]  mx-auto p-4 md:p-8"
    >
      <h1 className="text-2xl font-bold mb-4">Edit Court</h1>

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

      <Controller
        name="type"
        key={selectedCourt?.id || "select-type"}
        control={control}
        rules={{ required: "Court type is required" }}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tennis">Tennis</SelectItem>
              <SelectItem value="Badminton">Badminton</SelectItem>
              <SelectItem value="Football">Football</SelectItem>
              <SelectItem value="Basketball">Basketball</SelectItem>
              <SelectItem value="Squash">Squash</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      {errors.type && (
        <p className="text-sm text-red-500 ">{errors.type.message}</p>
      )}

      <div>
        <Label htmlFor="location" className="mb-1 block">
          Location
        </Label>
        <Textarea
          {...register("location", { required: "Location is required" })}
          placeholder="Address or location details"
        />
        {errors.location && (
          <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
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
        <Label htmlFor="slotTimes" className="mb-1 block">
          Slot Times
        </Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={slotInput}
            onChange={(e) => setSlotInput(e.target.value)}
            placeholder="E.g., 07:00AM-08:00AM"
          />
          <Button type="button" onClick={handleAddSlot}>
            Add Slot
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {slots.map((slot, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-3 py-1 bg-gray-200 rounded-full text-sm"
            >
              {slot}
              <button
                type="button"
                onClick={() => handleRemoveSlot(idx)}
                className="ml-2 text-red-500"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
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
              {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={deadline}
              onSelect={(selectedDate) => {
                setDeadline(selectedDate);
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
          {...register("description", { required: "Description is required" })}
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
          Court Image URL
        </Label>
        <Input
          id={"image"}
          type={"file"}
          {...register("image", {
            required: {
              value: true,
              message: "Please upload  aimage to update ",
            },
          })}
        />
        {errors.image && (
          <p className="text-sm text-red-500 mt-1">{errors.image.message}</p>
        )}
      </div>

      <Button type="submit">Update Court</Button>
    </form>
  );
}
