import AboutClub from "@/components/Home/AboutTheCliub/AboutClub";
import Coupons from "@/components/Home/Coupon/Coupons";
import Hero from "@/components/Home/Herosection/Hero";
import OurLocation from "@/components/Home/location/OurLocation";
import { Card } from "@/components/ui/card";
import useUserRole from "@/Hooks/useUserRole";

import React from "react";
import CourtCard from "../Shared/CourtCard";

const Home = () => {
  const { role, roleLoading } = useUserRole();

  return (
    <div className="mb-20">
      <Hero />
      <AboutClub />
      <OurLocation />
      <Coupons />
    </div>
  );
};

export default Home;
