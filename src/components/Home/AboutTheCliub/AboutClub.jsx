import React from "react";
import aboutImage from "../../../../src/assets/Images/aboutImage.jpeg";

const AboutClub = () => {
  return (
    <section className="max-w-7xl   mx-auto py-16 px-8 grid md:grid-cols-2 gap-8 items-center">
      <img src={aboutImage} alt="About" className="w-full rounded " />
      <div>
        <h2 className="text-3xl font-bold mb-4">About Our Club</h2>
        <p className="text-gray-700 mb-4">
          Founded in 1998, Elite Sports Club has been a hub for passionate
          sports enthusiasts. Our mission is to promote a healthy, active
          lifestyle with top-notch facilities and professional coaching.
        </p>
        <p className="text-gray-700">
          Whether you love tennis, badminton, squash or want to join community
          events — we have it all!
        </p>
      </div>
    </section>
  );
};

export default AboutClub;
