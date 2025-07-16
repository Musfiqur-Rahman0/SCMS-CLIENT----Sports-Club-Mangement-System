import React from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";

const slides = [
  {
    title: "Welcome to Elite Sports Club",
    subtitle: "Top-class courts and premium facilities",
    image:
      "https://i.ibb.co/G3bygZz6/group-of-sport-players-action-Ad-action.jpg",
  },
  {
    title: "State-of-the-art Courts",
    subtitle: "Book your favorite court today",
    image: "https://i.ibb.co/Xf21Twvc/7608d374-7e7d-4b6f-a775-f287ce66c1f5.jpg",
  },
  {
    title: "Exciting Activities",
    subtitle: "Join activities and tournaments",
    image: "https://i.ibb.co/Xf21Twvc/7608d374-7e7d-4b6f-a775-f287ce66c1f5.jpg",
  },
];

export default function Hero() {
  return (
    <section className="w-full h-[80vh] relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <motion.img
                src={slide.image}
                alt={slide.title}
                className="absolute top-0 left-0 w-full h-full aspect-square object-cover"
                initial={{ scale: 1.05, rotate: 0 }}
                animate={{ scale: 1.1, rotate: 2 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30">
                <div className="relative z-10 flex flex-col justify-center items-center text-center text-white h-full px-4 w-full">
                  <div className="b p-6 rounded-md max-w-7xl">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-6 drop-shadow-md">
                      {slide.subtitle}
                    </p>
                    <Link
                      to="/courts"
                      className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
                    >
                      Book a Court
                    </Link>
                  </div>
                </div>
              </div>

              {/* Text Content */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
