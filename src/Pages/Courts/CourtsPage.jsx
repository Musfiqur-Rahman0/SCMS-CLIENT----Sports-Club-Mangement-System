import React, { use, useEffect, useState } from "react";
import useAxios from "@/Hooks/useAxios";
import { AuthContext } from "@/Context/AuthContext";

import BookNowModal from "@/components/courts/BookNowModal";

import CourtCard from "../Shared/CourtCard";
import Loader from "@/components/loader/Loader";
import useCurd from "@/Hooks/useCurd";

// empty state animation
import noCourt from "@/assets/Animations/No-Data.json";
import Lottie from "lottie-react";
import PaginationComp from "../Shared/PaginationComp";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CourtCardSkeleton } from "@/components/courts/CourtCardSkeleton";

export default function CourtsPage() {
  const axiosInstance = useAxios();
  const { user, isLoading } = use(AuthContext);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [courts, setCourts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const {
    data: response,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["courts", currentPage, user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/courts?page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (response) {
      setCourts(response.courts);
      setTotalPages(response.totalPages);
    }
  }, [currentPage, response]);

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-8">Error loading courts.</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1  lg:grid-cols-3 gap-6 p-4">
      {isPending ? (
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, idx) => (
            <CourtCardSkeleton key={idx} />
          ))}
        </div>
      ) : courts.length !== 0 ? (
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courts.map((court) => (
            <CourtCard
              key={court._id}
              court={court}
              setSelectedCourt={setSelectedCourt}
            />
          ))}
        </div>
      ) : (
        <div className="col-span-3 flex items-center justify-center h-[calc(100vh-300px)]">
          <Lottie animationData={noCourt} style={{ height: 400, width: 400 }} />
        </div>
      )}

      {/* Book Now Modal */}
      {selectedCourt && (
        <BookNowModal
          open={!!selectedCourt}
          court={selectedCourt}
          onClose={() => setSelectedCourt(null)}
        />
      )}

      {totalPages > 1 && (
        <div className="flex items-center w-full col-span-3">
          <PaginationComp
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
}
