import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const AnnouncementForm = ({ handerFunc, selectedAnnounement }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (selectedAnnounement) {
      reset({
        title: selectedAnnounement.title,
        message: selectedAnnounement.message,
      });
    }
  }, [selectedAnnounement, reset]);

  return (
    <form onSubmit={handleSubmit(handerFunc)} className="space-y-6">
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

      {/* Submit */}
      <Button type="submit">Post Announcement</Button>
    </form>
  );
};

export default AnnouncementForm;
