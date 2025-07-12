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
import useCurd from "@/Hooks/useCurd";
import AnnouncementForm from "./AnnouncementForm";
import { useNavigate } from "react-router";

export default function MakeAnnouncement() {
  const { create } = useCurd("/announcements", ["admin"]);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const now = new Date().toISOString();
    data.posted_on = now;
    console.log("Announcement Data:", data);
    // 🔥 এখানে তুমি API POST করতে পারো
    await create.mutateAsync(data);
    navigate("/dashboard/announcements");
  };

  return (
    <div className=" w-[80%] lg:w-[60%] mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Make a New Announcement</h2>

      <AnnouncementForm handerFunc={onSubmit} />
    </div>
  );
}
