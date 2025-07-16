import React from "react";

import useCurd from "@/Hooks/useCurd";
import AnnouncementForm from "./AnnouncementForm";
import { useNavigate } from "react-router";

export default function MakeAnnouncement() {
  const { create } = useCurd("/announcements", ["admin"]);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const now = new Date().toISOString();
    data.posted_on = now;

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
