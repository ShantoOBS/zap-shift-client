import React from "react";
import Logo from "../Compontens/Logo";
import authImage from "/assets/authImage.png";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">

      {/* LEFT SIDE (Form Section) */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col">
        <Logo color={false} />

        <div className="py-4 md:px-16 lg:px-20 md:py-6 flex-1">
          <Outlet />
        </div>
      </div>

      {/* RIGHT SIDE (Image Section) */}
      <div className="bg-[#fafdf0] w-full md:w-1/2 p-10 md:p-16 hidden md:flex justify-center items-center">
        <img
          src={authImage}
          alt="Auth Image"
          className="max-w-full h-auto object-contain"
        />
      </div>

    </div>
  );
}
