import React, { useState } from "react";
import profileOne from "../../assets/Images/profile.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Sara Ali",
      comment:
        "Creative graphic designer with a passion for minimalism and modern branding.",
      image: profileOne,
    },
    {
      id: 2,
      name: "David Kim",
      comment:
        "Full-stack developer specializing in scalable web applications and APIs.",
      image: profileOne,
    },
    {
      id: 3,
      name: "Aisha Khan",
      comment:
        "UI/UX designer with a keen eye for detail and love for interactive design.",
      image: profileOne,
    },
    {
      id: 4,
      name: "James Lee",
      comment:
        "Marketing strategist helping brands connect with their audience through digital campaigns.",
      image: profileOne,
    },
    {
      id: 5,
      name: "Olivia Smith",
      comment:
        "Content creator and storyteller passionate about travel and lifestyle.",
      image: profileOne,
    },
    {
      id: 6,
      name: "Michael Chen",
      comment:
        "Data analyst turning complex datasets into actionable business insights.",
      image: profileOne,
    },
  ];

  console.log(activeIndex);

  return (
    <div>
      <div className="">
        <h2 className="title">Success Stories & Experiences</h2>
        <p className="subtitle mt-1">
          From beginners to champions - see how our club has made an impact.
        </p>
      </div>

      {/* testimonials card */}

      {/* <div className="grid grid-cols-3 mt-16 gap-16"> */}
      {/* <div className="bg-blue-300 rounded-2xl rotate-12 h-80   w-full relative">
          <div className="absolute inset-0 bg-white -rotate-12 shadow-lg  shadow-gray-500 rounded-2xl">
            <div className="h-full w-full ">
              <div className="relative w-full h-40">
                <div className="absolute p-2 rounded-full aspect-square h-40 w-40 bg-gray-100 left-1/2 -translate-x-1/2 -top-10">
                  <img
                    src={profile}
                    alt="user profile"
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="px-4 py-1">
                <div className="flex flex-col items-center text-center space-y-2">
                  <h3 className="font-semibold text-2xl flex items-center gap-3">
                    <span>Sara Ali</span>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6 text-blue-500"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </h3>
                  <p className="text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veniam, a.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

      <Swiper
        slidesPerView={3}
        spaceBetween={50}
        navigation={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex + 1)}
        modules={[Navigation]}
        className="mt-10"
      >
        {reviews.map((review, idx) => (
          <SwiperSlide key={review.id} className="w-full py-10 px-5 ">
            <div
              className={`${
                activeIndex === idx
                  ? "bg-red-500 scale-105 transition-all ease-linear"
                  : "bg-blue-400"
              } rounded-2xl rotate-12 w-full relative`}
            >
              <div className="bg-white -rotate-12 shadow-lg shadow-gray-500 rounded-2xl">
                {/* Profile Image */}
                <div className="relative w-full">
                  <div className="absolute p-2 rounded-full aspect-square w-40 bg-gray-100 left-1/2 -translate-x-1/2 -top-10">
                    <img
                      src={review.image}
                      alt="user profile"
                      className="h-full w-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 pt-32 pb-10">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <h3 className="font-semibold text-2xl flex items-center gap-3">
                      <span>{review.name}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-blue-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </h3>
                    <p className="text-center">{review.comment}</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* </div> */}
    </div>
  );
};

export default Testimonials;
