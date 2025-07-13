import Lottie from "lottie-react";
import React from "react";
import cat from "../../../src/assets/Animations/Loader cat.json";

const Loader = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Lottie
        animationData={cat}
        style={{
          height: 300,
          width: 300,
        }}
      />
    </div>
  );
};

export default Loader;
