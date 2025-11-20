import React from "react";
import Logo from "../../Compontens/Logo";
import { Link } from "react-router";
import facebook from "../../../public/assets/facebook.png";
import linkden from "../../../public/assets/linkedin-icon 2.png";
import youtube from "../../../public/assets/youtube.png";
import twitter from "../../../public/assets/twitter-logo-2 3.png";

export default function Footer() {
  return (
    <footer className="p-10 bg-black rounded-2xl text-white text-center">

      {/* Main Content */}
      <div className="w-full md:w-[70%] mx-auto space-y-4 ">

       <div className="w-full flex justify-center">
         <Logo color={true} />
       </div>

        <p className="text-[#dadada] text-xs md:text-sm leading-5">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>

        {/* Menu Links */}
        <div className="flex flex-wrap justify-center text-[#dadada] text-sm gap-5 my-5">
          <Link to="/services" className="hover:text-gray-100">Services</Link>
          <Link to="/coverage" className="hover:text-gray-100">Coverage</Link>
          <Link to="/about" className="hover:text-gray-100">About Us</Link>
          <Link to="/pricing" className="hover:text-gray-100">Pricing</Link>
          <Link to="/rider" className="hover:text-gray-100">Be a Rider</Link>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-5">
          <img src={facebook} alt="facebook" className="w-6 h-6 md:w-7 md:h-7" />
          <img src={linkden} alt="linkedin" className="w-6 h-6 md:w-7 md:h-7" />
          <img src={youtube} alt="youtube" className="w-6 h-6 md:w-7 md:h-7" />
          <img src={twitter} alt="twitter" className="w-6 h-6 md:w-7 md:h-7" />
        </div>

      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-700 my-6"></div>

      {/* Bottom Copyright */}
      <p className="text-[#dadada] text-xs md:text-sm">
        Copyright © {new Date().getFullYear()} - All rights reserved
      </p>

    </footer>
  );
}
