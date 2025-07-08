import React from "react";
import { Link } from "react-router";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";

const Hero = () => {
  return (
    <Swiper>
      {[...Array(5)].map((_, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[400px]">
            <img
              src="club1.jpg"
              className="w-full h-full object-cover"
              alt="Club"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
              <h1 className="text-4xl font-bold">
                Welcome to Elite Sports Club
              </h1>
              <p className="mt-2">
                Your place for Tennis, Badminton, Squash & More!
              </p>
              <Link
                to="/courts"
                className="mt-4 px-5 py-2 bg-blue-500 rounded text-white"
              >
                Book a Court
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
      ...
    </Swiper>
  );
};

export default Hero;
