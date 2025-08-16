import { Button } from "@/components/ui/button";
import CourtCard from "@/Pages/Shared/CourtCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaArrowRightLong } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const UpcomingCourts = () => {
  const [upcomingCourts, setUpcomingCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState([]);
  const navigate = useNavigate();

  const {
    data: response,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = axios.get("http://localhost:3000/courts?page=1&limit=3");
      return (await res).data;
    },
  });

  useEffect(() => {
    if (response) {
      setUpcomingCourts(response.courts);
    }
  }, [response, isPending]);

  return (
    <section className="space-y-8">
      <div>
        <h2 className=" title">Upcoming Events & Matches</h2>
        <p className="subtitle mt-1">
          Stay ahead of the game — mark your calendar and join the action!
        </p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {upcomingCourts.map((court) => (
          <CourtCard
            key={court._id}
            court={court}
            setSelectedCourt={setSelectedCourt}
          />
        ))}
      </div>

      <div className="w-full flex items-center justify-center ">
        {" "}
        <Button
          className={""}
          variant={"outline"}
          onClick={() => navigate("/courts")}
        >
          Browse more <FaArrowRightLong />
        </Button>
      </div>
    </section>
  );
};

export default UpcomingCourts;
