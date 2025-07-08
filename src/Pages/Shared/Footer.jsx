import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-8 fixed bottom-0 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p>© 2025 SCMS. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
