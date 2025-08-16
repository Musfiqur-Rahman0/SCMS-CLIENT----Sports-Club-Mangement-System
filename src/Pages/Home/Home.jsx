import AboutClub from "@/components/Home/AboutTheCliub/AboutClub";
import Coupons from "@/components/Home/Coupon/Coupons";
import Hero from "@/components/Home/Herosection/Hero";
import OurLocation from "@/components/Home/location/OurLocation";
import { Card } from "@/components/ui/card";
import useUserRole from "@/Hooks/useUserRole";

import React from "react";
import CourtCard from "../Shared/CourtCard";
import UpcomingCourts from "@/components/Home/upcoming-matches/UpcomingCourts";
import MembershipPlans from "@/components/MemberShipOverview/MembershipPlans";
import WhatDefineUs from "@/components/Defenation/WhatDefineUs";
import TrainersSection from "@/components/Trainers/TrainerSection";

const Home = () => {
  const { role, roleLoading } = useUserRole();

  return (
    <div className="mb-20">
      <Hero />
      <main className="max-w-7xl mx-auto space-y-16 mt-16">
        <UpcomingCourts />
        <AboutClub />
        <TrainersSection />
        <MembershipPlans />
        <OurLocation />
        <Coupons />
      </main>
    </div>
  );
};

export default Home;
