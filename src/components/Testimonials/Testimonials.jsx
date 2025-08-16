import React from "react";

const Testimonials = () => {
  return (
    <div>
      <div className="">
        <h2 className="title">Success Stories & Experiences</h2>
        <p className="subtitle mt-1">
          From beginners to champions - see how our club has made an impact.
        </p>
      </div>

      {/* testimonials card */}
      <div className="grid grid-cols-3 mt-12 gap-16">
        <div className="bg-blue-300 rounded-2xl rotate-12 h-80 w-full relative">
          <div className="absolute inset-0 bg-white -rotate-12 shadow-lg  shadow-gray-500 rounded-2xl"></div>
        </div>
        <div className="bg-blue-300 rounded-2xl -rotate-12 h-80 w-full relative">
          <div className="absolute inset-0 bg-white rotate-12 shadow-lg  shadow-gray-500 rounded-2xl"></div>
        </div>
        <div className="bg-blue-300 rounded-2xl rotate-12 h-80 w-full relative">
          <div className="absolute inset-0 bg-white -rotate-12 shadow-lg  shadow-gray-500 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
