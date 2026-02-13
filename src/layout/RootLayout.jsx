import React from "react";
import { Outlet } from "react-router";
import Navbar from "../page/Shared/Navbar";
import Footer from "../page/Shared/Footer";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-[#eaeced] text-black">
      <Navbar />
      <main className="mx-auto max-w-6xl  ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
