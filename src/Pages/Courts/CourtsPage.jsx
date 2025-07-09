"use client";

import React, { use, useState } from "react";
import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthContext } from "@/Context/AuthContext";
import { useNavigate } from "react-router";
import BookNowModal from "@/components/courts/BookNowModal";

export default function CourtsPage() {
  const axiosInstance = useAxios();
  const { user, isLoading } = use(AuthContext);
  const [open, setOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const navigate = useNavigate();

  const {
    data: courts = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["All Courts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/courts");
      return res.data;
    },
  });

  if (isPending) {
    return <p className="text-center mt-8">Loading courts...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-8">Error loading courts.</p>
    );
  }

  const handleCourtBook = async () => {
    if (!user && !isLoading) {
      navigate("/login");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {courts.map((court) => (
        <div
          key={court._id}
          className="border rounded-lg shadow p-4 flex flex-col space-y-4"
        >
          <img
            src={court.image}
            alt={court.name}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="text-xl font-semibold">{court.name}</h2>
          <p>Type: {court.type}</p>
          <p>Price per Session: ${court.price}</p>
          {/* You can add slots info here if available */}
          <Button onClick={() => setSelectedCourt(court)}>Book Now</Button>
        </div>
      ))}

      {/* Book Now Modal */}
      {selectedCourt && (
        <BookNowModal
          open={!!selectedCourt}
          court={selectedCourt}
          onClose={() => setSelectedCourt(null)}
        />
      )}
    </div>
  );
}
