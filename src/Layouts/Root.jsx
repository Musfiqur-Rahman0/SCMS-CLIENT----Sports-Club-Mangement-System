import ScrollToTop from "@/components/scrollTop/ScrollToTop";
import { Footer } from "@/components/ui/footer";
import FooterSection from "@/Pages/Shared/Footer";
import Header from "@/Pages/Shared/Header";
import React from "react";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <>
      <Header />
      <ScrollToTop />
      <main className="mt-[72px]">
        <Outlet />
      </main>
      <FooterSection />
    </>
  );
};

export default Root;
