import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Lottie from "lottie-react";
import { Link } from "react-router";

import errorAnimation from "../../../src/assets/Animations/error.json";

export default function ErrorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center bg-white dark:bg-background w-full">
      {/* Motion container */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md"
      >
        <Lottie
          animationData={errorAnimation}
          loop
          className="w-full h-72 mx-auto"
        />

        <h1 className="text-4xl font-bold mb-2">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-6">
          We can't find the page you’re looking for. It might have been removed
          or renamed.
        </p>

        <Button asChild>
          <Link to="/" className="font-semibold">
            Go Back Home
          </Link>
        </Button>
      </motion.div>
    </main>
  );
}
