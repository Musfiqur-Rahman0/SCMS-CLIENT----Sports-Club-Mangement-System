import Footer from "@/Pages/Shared/Footer";
import Header from "@/Pages/Shared/Header";
import React from "react";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <>
      <Header />
      <main className="mt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
