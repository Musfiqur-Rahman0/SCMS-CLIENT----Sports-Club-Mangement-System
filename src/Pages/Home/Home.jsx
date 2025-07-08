import AboutClub from "@/components/Home/AboutTheCliub/AboutClub";
import Hero from "@/components/Home/Herosection/Hero";
import OurLocation from "@/components/Home/location/OurLocation";
import useUserRole from "@/Hooks/useUserRole";

import React from "react";

const Home = () => {
  const { role, roleLoading } = useUserRole();
  console.log(role, roleLoading);
  return (
    <div>
      <Hero />
      <AboutClub />
      <OurLocation />
    </div>
  );
};

export default Home;
