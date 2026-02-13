import React from "react";
import Logo from "../Compontens/Logo";
import authImage from "/assets/authImage.png";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#eaeced] text-black md:flex-row">
      {/* Form side */}
      <div className="flex w-full flex-col md:w-1/2 md:min-h-screen">
        <header className="shrink-0 p-6 md:p-8">
          <Logo color={false} />
        </header>
        <div className="flex flex-1 flex-col justify-center px-6 pb-12 md:px-12 lg:px-20">
          <Outlet />
        </div>
      </div>

      {/* Image side */}
      <div className="hidden md:flex md:w-1/2 md:items-center md:justify-center md:bg-[#f0f9f4] md:p-12 lg:p-16">
        <img
          src={authImage}
          alt=""
          className="max-h-[85vh] w-full max-w-lg object-contain"
        />
      </div>
    </div>
  );
}
