import { Button } from "@/components/ui/button";
import CourtCard from "@/Pages/Shared/CourtCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaArrowRightLong } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { CourtCardSkeleton } from "@/components/courts/CourtCardSkeleton";
import { motion } from "motion/react";

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
      const res = await axios.get(
        "https://a12-server-rho.vercel.app/courts?page=1&limit=3"
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (response) {
      setUpcomingCourts(response.courts);
    }
  }, [response, isPending]);

  return (
    <section className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className=" title">Upcoming Events & Matches</h2>
        <p className="subtitle mt-1">
          Stay ahead of the game — mark your calendar and join the action!
        </p>
      </motion.div>

      {isPending ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          <CourtCardSkeleton />
          <CourtCardSkeleton />
          <CourtCardSkeleton />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            slidesPerView={3}
            spaceBetween={50}
            navigation={true}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },

              640: {
                slidesPerView: 2,
              },

              1024: {
                slidesPerView: 3,
              },
            }}
            // onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex + 1)}
            modules={[Navigation]}
            className=""
          >
            {upcomingCourts.map((court) => (
              <SwiperSlide key={court._id}>
                <CourtCard court={court} setSelectedCourt={setSelectedCourt} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}

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
