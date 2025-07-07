import Footer from "@/Pages/Shared/Footer";
import Header from "@/Pages/Shared/Header";
import React from "react";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
