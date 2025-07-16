import React, { useState } from "react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useUserRole from "@/Hooks/useUserRole";
import useCurd from "@/Hooks/useCurd";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AnnouncementForm from "./AnnouncementForm";

export default function Announcements() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { role } = useUserRole();
  const { read, deleteMutation, updateWithPut } = useCurd("/announcements", [
    "admin",
    "member",
    "user",
  ]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedAnnounement, setSelectedAnnouncement] = useState({});

  const { data: announcements = [], isPending, isError } = read;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This announcement will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleUpdate = (data) => {
    data.modified_on = new Date().toISOString();

    const id = selectedAnnounement._id;
    if (!id) {
      Swal.fire("Something went worng", "Please try again", "error");
      return;
    }
    updateWithPut.mutate({ id: selectedAnnounement._id, updatedItems: data });
    setIsUpdateModalOpen(false);
  };

  const handleModalOpen = (data) => {
    setIsUpdateModalOpen(true);
    setSelectedAnnouncement(data);
  };

  if (isPending) return <p>Loading announcements...</p>;
  if (isError) return <p>Error loading announcements!</p>;

  return (
    <section className="w-[80%]  mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">📢 Announcements</h2>

      {announcements.length === 0 && (
        <p className="text-gray-500">No announcements available.</p>
      )}

      <Accordion type="multiple" className="space-y-4 ">
        {announcements.map((announcement) => (
          <AccordionItem
            key={announcement._id}
            value={announcement._id}
            className="border  rounded-lg p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{announcement.title} </h3>
                <div className="flex items-center gap-2 mt-1"></div>
              </div>

              <span className="text-sm text-gray-500">
                {new Date(announcement?.posted_on).toLocaleDateString()}
              </span>
            </div>

            <AccordionTrigger className="mt-3 cursor-pointer">
              Show Details
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
              <p>{announcement?.message}</p>

              {/* 🔒 Admin actions */}
              {role === "admin" && (
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleModalOpen(announcement)}
                  >
                    ✏️ Update
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(announcement._id)}
                  >
                    🗑️ Delete
                  </Button>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Dialog
        open={isUpdateModalOpen}
        onOpenChange={() => setIsUpdateModalOpen(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Announcements details</DialogTitle>
          </DialogHeader>
          <AnnouncementForm
            handerFunc={handleUpdate}
            selectedAnnounement={selectedAnnounement}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}
