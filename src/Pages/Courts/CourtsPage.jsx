import React, { use, useState } from "react";
import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "@/Context/AuthContext";
import { useNavigate } from "react-router";
import BookNowModal from "@/components/courts/BookNowModal";

import CourtCard from "../Shared/CourtCard";
import Loader from "@/components/loader/Loader";

export default function CourtsPage() {
  const axiosInstance = useAxios();
  const { user, isLoading } = use(AuthContext);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const navigate = useNavigate();

  const {
    data: courts = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/courts");
      return res.data;
    },
  });

  if (isPending) {
    return <Loader />;
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
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {courts.map((court) => (
        <CourtCard
          key={court._id}
          court={court}
          setSelectedCourt={setSelectedCourt}
        />
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
