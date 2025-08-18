import React from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import img1 from "../../../assets/Images/Football Match Cartoon Illustration Advertising Background, Football, Sports, Club Background Image And Wallpaper for Free Download.jpeg";
import img2 from "../../../assets/Images/Fondo deportivo de juegos olímpicos con….jpeg";
import img3 from "../../../assets/Images/Olympic games sports background with copy space for text _ Premium AI-generated image.jpeg";

const slides = [
  {
    title: "Welcome to Elite Sports Club",
    subtitle: "Top-class courts and premium facilities",
    image: img1,
  },
  {
    title: "State-of-the-art Courts",
    subtitle: "Book your favorite court today",
    image: img2,
  },
  {
    title: "Exciting Activities",
    subtitle: "Join activities and tournaments",
    image: img3,
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
              <motion.img
                src={slide.image}
                alt={slide.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
                initial={{ scale: 1.05, rotate: 0 }}
                animate={{ scale: 1.1, rotate: 2 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60">
                <div className="relative z-10 flex flex-col justify-center items-center text-center text-white h-full px-6">
                  <div className="p-6 rounded-md max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                      {slide.title}
                    </h1>

                    <p className="text-lg md:text-2xl mb-8 text-gray-200 drop-shadow-md">
                      {slide.subtitle}
                    </p>

                    <Link
                      to="/courts"
                      className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg transform transition duration-300 hover:scale-105"
                    >
                      Book a Court
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
