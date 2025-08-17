import React from "react";
import aboutImage from "../../../../src/assets/Images/aboutImage.jpeg";
import WhatDefineUs from "@/components/Defenation/WhatDefineUs";
import { motion } from "motion/react";

const AboutClub = () => {
  return (
    <section>
      <div className=" py-5 px-8 grid md:grid-cols-2 gap-8 items-center">
        <img src={aboutImage} alt="About" className="w-full rounded " />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="title ">About Our Club</h2>
          <p className="subtitle ">
            Founded in 1998, Elite Sports Club has been a hub for passionate
            sports enthusiasts. Our mission is to promote a healthy, active
            lifestyle with top-notch facilities and professional coaching.
          </p>
          <p className="subtitle">
            Whether you love tennis, badminton, squash or want to join community
            events — we have it all!
          </p>
        </motion.div>
      </div>
      <WhatDefineUs />
    </section>
  );
};

export default AboutClub;
