import React from "react";
import { Outlet } from "react-router";
import bgImg from "../assets/Images/Aesthetic Fantasy Concept Art.jpeg";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 flex h-full w-full z-0">
        <div className="w-3/5 h-full">
          <img
            src={bgImg}
            alt="background image"
            className="h-full w-full object-cover transform -rotate-3 scale-105"
          />
        </div>

        <div className="w-2/5 h-full bg-gray-100 transform rotate-3 scale-110"></div>
      </div>

      <div className=" z-10  w-[80%] grid grid-cols-2 items-center gap-10   p-4 rounded-2xl bg-gray-100 shadow-2xl">
        {/* Main card container */}

        {/* Background image container with gradient overlay */}
        <div className="  h-full w-full rounded-xl overflow-hidden ">
          <img
            src={bgImg}
            alt="Andrew's Selected Works"
            className="w-full h-full object-cover"
          />
          {/* Subtle dark gradient overlay at the bottom to improve text readability */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div> */}
        </div>
        <div className="h-full w-full flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
