import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";

export default function MakeAnnouncement() {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [date, setDate] = useState(null);

  const onSubmit = (data) => {
    data.date = date ? date.toISOString() : null;
    console.log("Announcement Data:", data);
    // 🔥 এখানে তুমি API POST করতে পারো
    reset();
  };

  return (
    <div className=" w-[80%] lg:w-[60%] mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Make a New Announcement</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="mb-1 block">
            Title
          </Label>
          <Input
            {...register("title", { required: "Title is required" })}
            placeholder="Enter announcement title"
          />
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message" className="mb-1 block">
            Message
          </Label>
          <Textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Write your announcement here..."
          />
        </div>

        {/* Announcement Date */}
        <div>
          <Label htmlFor="date" className="mb-1 block">
            Announcement Date
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
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Active Switch */}
        <div className="flex items-center gap-2">
          <Label htmlFor="isActive" className="mb-1 block">
            Active
          </Label>
          <Switch
            checked={watch("isActive")}
            onCheckedChange={(val) => setValue("isActive", val)}
          />
        </div>

        {/* Submit */}
        <Button type="submit">Post Announcement</Button>
      </form>
    </div>
  );
}
