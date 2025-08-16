import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { LiaComments } from "react-icons/lia";
import trainerImg from "../../assets/Images/trainerOne.jpeg";

const trainers = [
  {
    name: "John Smith",
    specialty: "Tennis Coach",
    image:
      "https://images.unsplash.com/photo-1598965402089-9d52ec6d5a08?q=80&w=600",
    bio: "John has over 15 years of experience coaching national-level tennis players and specializes in improving agility, technique, and mindset.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    specialty: "Fitness Trainer",
    image:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=600",
    bio: "Sarah is a certified fitness coach with expertise in strength training, endurance, and injury prevention programs.",
    rating: 4,
  },
  {
    name: "David Lee",
    specialty: "Swimming Instructor",
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=600",
    bio: "David is an Olympic-level swimming instructor with a passion for teaching beginners and refining competitive swimmers' techniques.",
    rating: 5,
  },
];

export default function TrainersSection() {
  return (
    <section className="py-16 ">
      <div className=" px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className=" mb-12"
        >
          <h2 className="title">Meet Our Trainers & Staff</h2>
          <p className="mt-1 subtitle">
            Professional coaches dedicated to helping you reach your sporting
            goals.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer, index) => (
            <div class="flex items-center justify-center bg-gray-50 shadow-gray-950 rounded-3xl p-3">
              <div class="w-full rounded-3xl shadow-2xl flex flex-col items-center overflow-hidden relative">
                <img
                  class="w-full object-cover rounded-3xl blur-"
                  src={trainerImg}
                  alt="Sophie Bennett"
                />
                <div class="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent backdrop-blur-md pointer-events-none"></div>

                <div className="absolute bottom-0 w-full  p-6 z-20">
                  <div class=" mt-4">
                    <h2 class="text-white text-2xl font-semibold flex items-center  space-x-2">
                      <span>Sophie Bennett</span>
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
                    </h2>
                    <p class="text-gray-400 text-sm mt-1">
                      A Product Designer focused on intuitive user experiences.
                    </p>
                  </div>
                  <div class="flex items-center justify-between w-full mt-2">
                    <div class="flex items-center space-x-4 text-gray-400 text-sm">
                      <div class="flex items-center space-x-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="w-4 h-4"
                        >
                          <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.065A8.235 8.235 0 0 1 10 18a8.235 8.235 0 0 1 6.135-2.442 1.23 1.23 0 0 0 .41-1.065A8.966 8.966 0 0 0 10 12.5c-2.03 0-4.04-.49-5.87-1.444A1.23 1.23 0 0 0 3.464 14.493Z" />
                        </svg>
                        <span>312</span>
                      </div>
                      <div class="flex items-center space-x-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="w-4 h-4"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.5 2a.5.5 0 0 0-.5.5v11a.5.5 0 0 1-1 0v-11A1.5 1.5 0 0 1 5.5 1h9A1.5 1.5 0 0 1 16 2.5v11a.5.5 0 0 0 1 0v-11A1.5 1.5 0 0 0 14.5 1h-9ZM7 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 7 4Z"
                            clip-rule="evenodd"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M12.5 4a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-1 0V4.5a.5.5 0 0 1 .5-.5ZM10 6a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0v-9A.5.5 0 0 1 10 6Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span>48</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
