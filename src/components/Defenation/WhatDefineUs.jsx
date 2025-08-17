import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Building, Star, Users } from "lucide-react";

const cardsData = [
  {
    icon: <Building className="w-8 h-8 text-orange-600" />,
    title: "Our Rich History",
    subtitle: "Since 1995",
    description:
      "Founded in 1995, our club has been a cornerstone of the community for over 25 years. We have consistently provided top-notch facilities and fostered sportsmanship among members of all ages.",
    features: ["25+ Years Legacy", "Community Hub", "Award Winning Club"],
    dotColor: "bg-orange-500",
    bgColor: "bg-gray-50",
  },
  {
    icon: <Star className="w-8 h-8 text-purple-600" />,
    title: "Our Mission",
    subtitle: "Excellence in Sports",
    description:
      "To inspire a healthy lifestyle, build strong community ties, and offer exceptional opportunities for training, recreation, and personal growth.",
    features: ["Health & Wellness", "Community Building", "Personal Growth"],
    dotColor: "bg-purple-500",
    bgColor: "bg-green-50",
  },
  {
    icon: <Users className="w-8 h-8 text-green-600" />,
    title: "What We Offer",
    subtitle: "Premium Facilities",
    description:
      "From state-of-the-art courts to expert coaching and vibrant community events, our club is your home for sports and recreation.",
    features: ["Modern Courts", "Expert Coaching", "Community Events"],
    dotColor: "bg-green-500",
    bgColor: "bg-purple-50",
  },
];

export default function WhatDefineUs() {
  return (
    <section className="py-16 bg-white">
      <div className=" px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {cardsData.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                className={`rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all py-5 h-full w-full ${card.bgColor}`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {card.icon}
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        {card.title}
                      </CardTitle>
                      <p className="text-sm text-gray-500">{card.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700">
                    {card.description}
                  </CardDescription>
                  <ul className="mt-4 space-y-2">
                    {card.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <span
                          className={`w-2 h-2 rounded-full ${card.dotColor} mr-2`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
