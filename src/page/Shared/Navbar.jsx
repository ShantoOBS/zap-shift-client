'use client';
import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../Compontens/Logo";
import CircleButton from "../../Compontens/CircleButton";

export default function Navbar() {
  const [open, setOpen] = useState(false);


  return (
    <nav className="w-full bg-white rounded-2xl  mb-5 shadow-sm">
      <div className="px-6 md:px-8 py-3 flex items-center justify-between">

        {/* LEFT LOGO */}
        <Logo />

        {/* CENTER LINKS (DESKTOP) */}
        <div className="hidden md:flex text-[#606060] text-sm gap-6">
          <Link to="/services" className="hover:text-black">Services</Link>
          <Link to="/coverage" className="hover:text-black">Coverage</Link>
          <Link to="/about" className="hover:text-black">About Us</Link>
          <Link to="/pricing" className="hover:text-black">Pricing</Link>
          <Link to="/rider" className="hover:text-black">Be a Rider</Link>
        </div>

        {/* RIGHT BUTTONS (DESKTOP) */}
        <div className="hidden md:flex gap-3 items-center">
          <button className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 text-[#606060]">
            Sign In
          </button>

          <div className="flex items-center ">
            <button className="px-4 py-2 rounded-md bg-[#caeb66] hover:bg-[#abc758] text-black font-bold">
              Be a Rider
            </button>
            <CircleButton />
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-gray-800 text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU WITH ANIMATION */}
      <AnimatePresence>
  {open && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      
      className="
        md:hidden
        absolute top-20 left-0 w-full mx-5
        bg-white shadow-lg rounded-b-2xl
        px-6 pb-4 space-y-3 
        z-50
      "
    >
      <div className="space-y-2">
        <Link to="/services" className="block py-2 border-b">Services</Link>
        <Link to="/coverage" className="block py-2 border-b">Coverage</Link>
        <Link to="/about" className="block py-2 border-b">About Us</Link>
        <Link to="/pricing" className="block py-2 border-b">Pricing</Link>
        <Link to="/rider" className="block py-2 border-b">Be a Rider</Link>
      </div>

      <div className="pt-2 flex flex-col gap-3">
        <button className="w-full py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 text-[#606060]">
          Sign In
        </button>

        <button className="w-full py-2 rounded-md bg-[#caeb66] hover:bg-[#abc758] text-black">
          Be a Rider
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </nav>
  );
}
