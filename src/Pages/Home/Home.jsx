import AboutClub from "@/components/Home/AboutTheCliub/AboutClub";
import Coupons from "@/components/Home/Coupon/Coupons";
import Hero from "@/components/Home/Herosection/Hero";
import OurLocation from "@/components/Home/location/OurLocation";
import useUserRole from "@/Hooks/useUserRole";

import React from "react";

const Home = () => {
  const { role, roleLoading } = useUserRole();

  return (
    <div>
      <Hero />
      <AboutClub />
      <OurLocation />
      <Coupons />
    </div>
  );
};

export default Home;
