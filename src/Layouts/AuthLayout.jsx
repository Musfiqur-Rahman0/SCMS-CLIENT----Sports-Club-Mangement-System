import React from "react";
import { Outlet } from "react-router";
import bgImg from "../assets/Images/Aesthetic Fantasy Concept Art.jpeg";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 flex h-full w-full z-0">
        <div className="w-full md:w-3/5 h-full">
          <img
            src={bgImg}
            alt="background image"
            className="h-full w-full object-cover transform -rotate-3 scale-105"
          />
        </div>

        <div className="hidden md:block w-2/5 h-full bg-gray-100 transform rotate-3 scale-110"></div>
      </div>

      {/* Background image container with gradient overlay */}
      <div className="z-10 grid grid-cols-2 gap-8  p-4  bg-gray-100 rounded-3xl w-[80%]">
        <div className="hidden md:block  h-full w-full rounded-xl overflow-hidden ">
          <img
            src={bgImg}
            alt="Andrew's Selected Works"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-2 md:col-span-1 h-full w-full flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
